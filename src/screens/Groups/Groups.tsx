import { UsersIcon, PlusIcon, MessageCircleIcon, ChevronDownIcon, ImageIcon, CrownIcon, SearchIcon, BellIcon, SettingsIcon, EditIcon, TrashIcon, EyeIcon, XIcon, CheckIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

import { DeleteConfirmationModal } from "../../components/ui/delete-confirmation-modal";
import { useAbility } from "../../casl/AbilityContext";
import { getAllRoles } from "../../apis/getAllRoles";
import { fetchAllUsers } from "../../apis/getAllUsers";
import { fetchAllPermissions } from "../../apis/getAllPermission"; // Add this import
// import { Role } from "../AdminDashboard";
import { deleteRole } from "../../apis/deleteAssignRole";
import { addRole } from "../../apis/addRoles";
import { assignRoles } from "../../apis/assignRole";
import { fetchAllQuests, Quest } from "../../apis/getAllQuest";
import { availableGroups, groupAdminData, myGroups, roleManagement } from "../../constant/GroupJson";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

interface Permission {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Role {
  id: string;
  name: string;
  description?: string;
  discordRoleId?: string;
  color?: number;
  level?: number;
  isActive?: boolean;
  permissions?: Permission[];
}

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  emailVerified: boolean;
  image: string;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
  permissions: Permission[];
}

interface RoleFormData {
  name: string;
  description: string;
  discordRoleId: string;
  color: number;
  level: number;
  isActive: boolean;
}

interface AssignPermissionFormData {
  userId: string;
  permissions: string[];
  isActive: true
}

interface AssignRoleFormData {
  userId: string;
  roleIds: string[];
}



interface MissionStep {
  id: number;
  title: string;
  xpReward: string;
  coinsReward: string;
  description: string;
  rewardType: string;
}

interface MissionData {
  title: string;
  description: string;
  banner: number[]; // Add this line
  category: string;
  type: string;
  xpRewards: string;
  coinsRewards: string;
  unlockConditions: string;
  submissionDeadline: string;
  startDate: string;
  endDate: string;
  visibility: string;
  steps: MissionStep[];
}

// Replace the FormattedAPIData interface with this:
interface FormattedAPIData {
  title: string;
  description: string;
  banner: number[];
  category: string;
  type: string;
  unlockConditions: string;
  submissionDeadline: string;
  startDate: string;
  endDate: string;
  visibility: string;
  xpRewards: number;
  coinsRewards: number;
  steps: {
    title: string;
    description: string;
    xpReward: number;
    coinsReward: number;
    isCompleted: boolean;
    rewardType: string;
    proof: number[];
  }[];
}

interface MissionCategory {
  id: number;
  name: string;
  active: boolean;
}

interface APIResponse {
  success: boolean;
  message?: string;
  data?: any;
}

interface MissionData {
  title: string;
  description: string;
  banner: number[]; // Add this line
  category: string;
  type: string;
  xpRewards: string;
  coinsRewards: string;
  unlockConditions: string;
  submissionDeadline: string;
  startDate: string;
  endDate: string;
  visibility: string;
  steps: MissionStep[];
}

type PopupMode = 'addRole' | 'editPermissions';

export const Groups = (): JSX.Element => {

  const ability = useAbility();
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("available");
  const [showGroupAdminModal, setShowGroupAdminModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isAssign, setIsAssign] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showAllRoles, setShowAllRoles] = useState<boolean>(false);
  const [deletingRoleId, setDeletingRoleId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [roleToDelete, setRoleToDelete] = useState<{ id: string; name: string } | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [editRoles, setEditRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [showNewMissionModal, setShowNewMissionModal] = useState<boolean>();
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [popupMode, setPopupMode] = useState<PopupMode>('addRole');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [quests, setQuests] = useState<Quest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [editMissionId, setEditMissionId] = useState<string>()
  const [missionCategories] = useState<MissionCategory[]>([
    { id: 1, name: 'Onboarding', active: true },
    { id: 2, name: 'Social', active: false },
    { id: 3, name: 'Content', active: false },
    { id: 4, name: 'Engagement', active: false },
    { id: 5, name: 'Learning', active: false },
  ]);

  // Main mission data state with clean initial values
  const [missionData, setMissionData] = useState<MissionData>({
    title: "",
    description: "",
    banner: [], // Add this line
    category: "Onboarding",
    type: "Step by Step",
    xpRewards: "",
    coinsRewards: "",
    unlockConditions: "No Requirements",
    submissionDeadline: "1 Week",
    startDate: "",
    endDate: "",
    visibility: "Public",
    steps: [
      {
        id: 1,
        title: "",
        xpReward: "",
        coinsReward: "",
        description: "",
        rewardType: "Screenshot Upload"
      }
    ]
  });

  // Form data for assign permissions
  const [assignPermissionData, setAssignPermissionData] = useState<AssignPermissionFormData>({
    userId: '',
    permissions: [],
    isActive: true
  });

  // Form data for assign roles
  const [assignRoleData, setAssignRoleData] = useState<AssignRoleFormData>({
    userId: '',
    roleIds: []
  });

  const [formData, setFormData] = useState<RoleFormData>({
    name: '',
    description: '',
    discordRoleId: '',
    color: 0,
    level: 0,
    isActive: false
  });
  // src/pages/AllQuests.tsx



  useEffect(() => {
    const loadQuests = async () => {
      try {
        const response = await fetchAllQuests();
        setQuests(response.result);
      } catch (error) {
        console.error("Failed to load quests:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuests();
  }, []);


  // Load initial data - users only
  useEffect(() => {
    const getUsersData = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data.result);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    getUsersData();
  }, []);

  console.log(permissions, "set all permissions");

  // Handle permission selection for editPermissions mode
  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setAssignPermissionData(prev => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, permissionId]
        : prev.permissions.filter(id => id !== permissionId)
    }));
  };

  // Handle role selection for addRole mode
  const handleRoleChange = (roleId: string, checked: boolean) => {
    setAssignRoleData(prev => ({
      ...prev,
      roleIds: checked
        ? [...prev.roleIds, roleId]
        : prev.roleIds.filter(id => id !== roleId)
    }));
  };

  // Load permissions when opening addRole popup
  const loadPermissions = async () => {
    try {
      const data = await fetchAllPermissions(); // Use fetchAllPermissions API
      setPermissions(data.result);
    } catch (err) {
      console.error('Failed to load permissions:', err);
    }
  };

  // Load roles when opening editPermissions popup
  const loadRoles = async () => {
    try {
      const data = await getAllRoles(); // Use getAllRoles API
      setRoles(data);
    } catch (err) {
      console.error('Failed to load roles:', err);
    }
  };

  // Open add role popup
  const openAddRolePopup = async () => {
    setPopupMode('addRole');
    setIsAssign(false);

    // Load permissions for add role popup
    await loadPermissions();

    // Reset form data
    setAssignPermissionData({
      userId: '',
      permissions: [],
      isActive: true
    });

    setIsOpen(true);
  };

  // Open edit permissions popup (assign roles to user)
  const openEditPermissionsPopup = async (userId: string) => {
    setPopupMode('editPermissions');
    setSelectedUserId(userId);

    // Load roles for edit permissions popup
    await loadRoles();

    // Pre-populate with user's current roles
    const user = users.find(u => u.id === userId);
    setAssignRoleData({
      userId,
      roleIds: user?.roles?.map(role => role.id) || []
    });

    setIsOpen(true);


  };



  // Handle assign roles to user (editPermissions mode)
  const handleAssignRoles = async () => {
    try {
      console.log('Assigning roles:', assignRoleData);

      let res = await assignRoles(assignRoleData.userId, assignRoleData.roleIds);

      if (res.success) {
        // Refresh users data after successful assignment
        const updatedUsers = await fetchAllUsers();
        setUsers(updatedUsers.result);

        setIsOpen(false);
        console.log('Roles assigned successfully');
      } else {
        console.error('Failed to assign roles');
      }
    } catch (error) {
      console.error('Error assigning roles:', error);
    }
  };

  // Handle create new role with permissions (addRole mode)
  const handleCreateRole = async () => {
    try {
      // Create role data including selected permissions
      const roleData = {
        ...formData,
        permissions: assignPermissionData.permissions
      };

      const res = await addRole(roleData);

      if (res.success) {
        setIsOpen(false);
        console.log('Role created successfully');

        // Reset form data
        setFormData({
          name: '',
          description: '',
          discordRoleId: '',
          color: 0,
          level: 0,
          isActive: false
        });
        setAssignPermissionData({
          userId: '',
          permissions: [],
          isActive: true
        });
      } else {
        console.error('Failed to create role');
      }
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  // Get popup title
  const getPopupTitle = (): string => {
    switch (popupMode) {
      case 'addRole': return "Add New Role";
      case 'editPermissions': return "Edit User Roles";
      default: return '';
    }
  };

  // Get submit button text
  const getSubmitButtonText = (): string => {
    switch (popupMode) {
      case 'addRole': return "Create Role";
      case 'editPermissions': return "Update Roles";
      default: return 'Submit';
    }
  };

  // Handle submit based on popup mode
  const handlePopupSubmit = () => {
    if (popupMode === 'addRole') {
      handleCreateRole();
    } else if (popupMode === 'editPermissions') {
      handleAssignRoles();
    }
  };
  const handleManageGroup = (group: any) => {
    setSelectedGroup(group);
    setShowGroupAdminModal(true);
    loadRoles()
  };

  const handleJoinGroup = (group: any) => {
    setSelectedGroup(group);
    setShowGroupAdminModal(true);
    loadRoles()
  };

  const handleCloseModal = () => {
    setShowGroupAdminModal(false);
    setSelectedGroup(null);
    loadRoles()
  };

  const handleDeleteClick = (type: string, name: string, id: number) => {
    setDeleteItem({ type, name, id });
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteItem) return;

    setIsDeleting(true);

    // Simulate delete operation
    setTimeout(() => {
      console.log(`Deleting ${deleteItem.type}: ${deleteItem.name} (ID: ${deleteItem.id})`);
      setIsDeleting(false);
      setShowDeleteModal(false);
      setDeleteItem(null);
      // Here you would typically update your data state to remove the deleted item
    }, 2000);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeleteItem(null);
  };

  const getDeleteModalContent = () => {
    if (!deleteItem) return { title: "", description: "" };

    switch (deleteItem.type) {
      case "role":
        return {
          title: "Delete Role",
          description: "Are you sure you want to delete this role? This will remove all permissions and assignments associated with this role."
        };
      case "mission":
        return {
          title: "Delete Mission",
          description: "Are you sure you want to delete this mission? All progress and submissions will be permanently lost."
        };
      default:
        return {
          title: "Delete Item",
          description: "Are you sure you want to delete this item? This action cannot be undone."
        };
    }
  };

  const getButtonColor = (action: string) => {
    switch (action) {
      case "Join Group":
        return "bg-[#30bdee] hover:bg-[#2aa3d1] text-white";
      case "Manage Group":
        return "bg-[#30bdee] hover:bg-[#2aa3d1] text-white";
      case "View Group":
        return "bg-[#30bdee] hover:bg-[#2aa3d1] text-white";
      default:
        return "bg-[#30bdee] hover:bg-[#2aa3d1] text-white";
    }
  };

  if (!ability.can('read', 'group')) {
    return <div className="flex items-center justify-center h-screen text-white font-bold text-xl">
      You are not authorized to view this page.
    </div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'color' || name === 'level' ? Number(value) : value,
    }));
  };

  const handleConfirmDelete = async (roleId: string, roleName: string) => {
    setDeletingRoleId(roleId);

    try {
      const success = await deleteRole(roleId);

      if (success) {
        // Remove the deleted role from the local state
        setRoles(prevRoles => prevRoles.filter(role => role.id !== roleId));

        // Show success message (you can use toast or console)
        console.log(`Role "${roleName}" deleted successfully`);
        // toast.success(`Role "${roleName}" deleted successfully`);
      } else {
        // Show error message
        console.error(`Failed to delete role "${roleName}"`);
        // toast.error(`Failed to delete role "${roleName}"`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      // toast.error(`Error deleting role "${roleName}"`);
    } finally {
      setDeletingRoleId(null);
    }
  };


  const handleEditMission = (mission: any) => {
    // Process QuestSteps to match your form structure
    const processedSteps = mission.QuestSteps && mission.QuestSteps.length > 0
      ? mission.QuestSteps.map((step: any) => ({
        id: step.id,
        title: step.title || "",
        xpReward: step.xpReward?.toString() || "", // Convert to string since your form expects strings
        coinsReward: step.coinsReward?.toString() || "", // Convert to string
        description: step.description || "",
        rewardType: step.rewardType || "Screenshot Upload"
      }))
      : [
        {
          id: Date.now(),
          title: "",
          xpReward: "",
          coinsReward: "",
          description: "",
          rewardType: "Screenshot Upload"
        }
      ];

    // Store mission data in missionData state
    const newMissionData = {
      title: mission.title || "",
      description: mission.description || "",
      banner: mission.banner || [],
      category: mission.category || "Onboarding",
      type: mission.type || "Step by Step",
      xpRewards: mission.xpRewards?.toString() || "", // Convert to string
      coinsRewards: mission.coinsRewards?.toString() || "", // Convert to string
      unlockConditions: mission.unlockConditions || "No Requirements",
      submissionDeadline: mission.submissionDeadline || "1 Week",
      startDate: mission.startDate ? mission.startDate.split('T')[0] : "", // Format date for input
      endDate: mission.endDate ? mission.endDate.split('T')[0] : "", // Format date for input
      visibility: mission.visibility || "Public",
      steps: processedSteps
    };
    setEditMissionId(mission?.id)
    console.log('Processed mission data:', newMissionData);
    console.log('Processed steps:', newMissionData.steps);

    setMissionData(newMissionData);

    // Open the popup
    setShowGroupAdminModal(false);
    setShowNewMissionModal(true);
  };

  const handleCloseNewMission = (): void => {
    setShowNewMissionModal(false);
    setError(null);
    setSuccess(false);
  };


  const handleCategorySelect = (categoryName: string): void => {
    setMissionData({ ...missionData, category: categoryName });
    setShowCategoryDropdown(false);
  };

  const handleAddStep = (): void => {
    const newStep: MissionStep = {
      id: Date.now(),
      title: "",
      xpReward: "",
      coinsReward: "",
      description: "",
      rewardType: "Screenshot Upload"
    };
    setMissionData({
      ...missionData,
      steps: [...missionData.steps, newStep]
    });
  };
  const handleRemoveStep = (stepId: number): void => {
    setMissionData({
      ...missionData,
      steps: missionData.steps.filter((step: MissionStep) => step.id !== stepId)
    });
  };

  const updateStep = (stepId: number, field: keyof MissionStep, value: string): void => {
    setMissionData({
      ...missionData,
      steps: missionData.steps.map((step: MissionStep) =>
        step.id === stepId ? { ...step, [field]: value } : step
      )
    });
  };

  const resetForm = (): void => {
    setMissionData({
      title: "",
      description: "",
      banner: [], // Add this line
      category: "Onboarding",
      type: "Step by Step",
      xpRewards: "",
      coinsRewards: "",
      unlockConditions: "No Requirements",
      submissionDeadline: "1 Week",
      startDate: "",
      endDate: "",
      visibility: "Public",
      steps: [{
        id: Date.now(),
        title: "",
        xpReward: "",
        coinsReward: "",
        description: "",
        rewardType: "Screenshot Upload"
      }]
    });
    setError(null);
    setSuccess(false);
  };

  const formatMissionDataForAPI = (data: MissionData): FormattedAPIData => {
    return {
      title: data.title.trim(),
      description: data.description.trim(),
      // banner: data.banner || [],
      category: data.category,
      type: data.type,
      unlockConditions: data.unlockConditions,
      submissionDeadline: data.submissionDeadline,
      startDate: data.startDate,
      endDate: data.endDate,
      visibility: data.visibility, // Remove .toLowerCase()
      xpRewards: parseInt(data.xpRewards) || 0, // Flat structure
      coinsRewards: parseInt(data.coinsRewards) || 0, // Flat structure
      steps: data.steps.map((step: MissionStep) => ({
        title: step.title.trim(),
        description: step.description.trim(),
        xpReward: parseInt(step.xpReward) || 0,
        coinsReward: parseInt(step.coinsReward) || 0,
        isCompleted: false, // Add this
        rewardType: step.rewardType,
        // proof: [] // Add this
      }))
    };
  };
  const API_BASE_URL: string = import.meta.env.VITE_API_URL || 'https://your-api-endpoint.com';
  const API_ENDPOINTS = {
    CREATE_MISSION: '/quests',
  } as const;

  // API call function
  const updateMissionAPI = async (missionData: FormattedAPIData): Promise<APIResponse> => {
    try {
      const response: Response = await fetch(`${API_BASE_URL}/quests/update/${editMissionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(missionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  const handleUpdateMission = async (): Promise<void> => {
    setError(null);
    setSuccess(false);



    setIsLoading(true);

    try {
      const apiData: FormattedAPIData = formatMissionDataForAPI(missionData);
      const response: APIResponse = await updateMissionAPI(apiData);

      setSuccess(true);
      console.log('Mission created successfully:', response);

      // Optional: Reset form or close modal after success
      // setTimeout(() => {
      //   handleCloseNewMission();
      // }, 2000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create mission. Please try again.';
      setError(errorMessage);
      console.error('Failed to create mission:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMission = async (id: any) => {

    try {
      const response: Response = await fetch(`${API_BASE_URL}/quests/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(missionData),
      })
      console.log(response)
      fetchAllQuests()
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  const handleDeleteRole = async (id: any) => {

    try {
      const response: Response = await fetch(`${API_BASE_URL}/rbac/roles/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(missionData),
      })
      console.log(response)
      getAllRoles()
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  return (
    <div className="relative">
      {/* Main Content */}
      <div className={`p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 bg-[#0a0a0a] min-h-screen transition-all duration-300 ${showGroupAdminModal ? 'blur-sm' : ''}`}>
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-white text-2xl sm:text-3xl lg:text-[42px] tracking-[-0.5px] leading-tight lg:leading-[52px] font-['Rajdhani',Helvetica] font-bold mb-3">
            Group & Roles
          </h1>
          <div className="flex items-center gap-2 text-[#30bdee] text-base sm:text-lg underline cursor-pointer hover:text-[#65cbff] transition-colors">
            <span>Join & Manage Groups, Handle Applications & Assign Roles</span>
          </div>
        </div>

        {/* Search and Create */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 lg:mb-8">
          <div className="flex-1 relative max-w-full sm:max-w-md">
            <Input
              className="h-10 sm:h-12 bg-[#1a1a1a] border-[#333333] rounded-lg pl-10 sm:pl-12 pr-4 font-['Rajdhani',Helvetica] font-medium text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#222222] transition-all text-sm sm:text-base"
              placeholder="Search Group"
            />
            <SearchIcon className="absolute w-4 h-4 sm:w-5 sm:h-5 top-3 sm:top-3.5 left-3 sm:left-4 text-[#ffffffb2]" />
          </div>
          <Button className="h-10 sm:h-12 px-4 sm:px-6 bg-transparent border border-[#00cfff] text-[#00cfff] hover:bg-[#00cfff]/10 rounded-lg font-semibold transition-colors">
            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Create new Group
          </Button>
        </div>

        {/* Available Groups Section */}
        <div className="space-y-4 lg:space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BellIcon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              <h2 className="text-white text-xl sm:text-2xl font-bold font-['Rajdhani',Helvetica]">
                Available Groups
              </h2>
            </div>
            <Link to="/groups/all">
              <Button variant="ghost" className="text-[#30bdee] hover:text-white text-sm sm:text-base">
                View all Groups
              </Button>
            </Link>
          </div>

          {/* Groups Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {/* XP Seeker */}
            <Card className="bg-[#1a1a1a] border-[#333333] hover:bg-[#222222] transition-all duration-300 hover:border-[#30bdee]/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
                    <span className="text-xl sm:text-2xl">👤</span>
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg">XP Seeker</h3>
                </div>

                <p className="text-[#ffffffb2] text-sm mb-4 leading-relaxed">
                  Complete missions, gain XP, and level up together daily.
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#30bdee] font-semibold text-sm">142 Members</span>
                    <span className="text-[#30bdee] font-semibold text-sm">+10% XP Boost</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-[#ffffff12] text-[#ffffffb2] text-xs rounded">#XP</span>
                    <span className="px-2 py-1 bg-[#ffffff12] text-[#ffffffb2] text-xs rounded">#Missions</span>
                    <span className="px-2 py-1 bg-[#ffffff12] text-[#ffffffb2] text-xs rounded">#LevelUp</span>
                    <span className="px-2 py-1 bg-[#ffffff12] text-[#ffffffb2] text-xs rounded">#Leaderboard</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleJoinGroup(availableGroups[0])}
                  className="w-full bg-[#30bdee] hover:bg-[#2aa3d1] text-white rounded-lg font-medium text-sm sm:text-base"
                >
                  Join Group
                </Button>
              </CardContent>
            </Card>

            {/* Social Sparks */}
            <Card className="bg-[#1a1a1a] border-[#333333] hover:bg-[#222222] transition-all duration-300 hover:border-[#30bdee]/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
                    <span className="text-xl sm:text-2xl">🥷</span>
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg">Social Sparks</h3>
                </div>

                <p className="text-[#ffffffb2] text-sm mb-4 leading-relaxed">
                  Sparking fun with games and community!
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#30bdee] font-semibold text-sm">170 Members</span>
                    <span className="text-[#30bdee] font-semibold text-sm">+30% XP Boost</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-[#ffffff12] text-[#ffffffb2] text-xs rounded">#Social</span>
                    <span className="px-2 py-1 bg-[#ffffff12] text-[#ffffffb2] text-xs rounded">#FunGames</span>
                    <span className="px-2 py-1 bg-[#ffffff12] text-[#ffffffb2] text-xs rounded">#SocialGaming</span>
                    <span className="px-2 py-1 bg-[#ffffff12] text-[#ffffffb2] text-xs rounded">#SocialGaming</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleJoinGroup(availableGroups[1])}
                  className="w-full bg-[#30bdee] hover:bg-[#2aa3d1] text-white rounded-lg font-medium text-sm sm:text-base"
                >
                  Join Group
                </Button>
              </CardContent>
            </Card>

            {/* Elite Circle */}
            <Card className="bg-[#1a1a1a] border-[#333333] hover:bg-[#222222] transition-all duration-300 hover:border-[#30bdee]/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
                    <span className="text-xl sm:text-2xl">💀</span>
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg">Elite Circle</h3>
                </div>

                <p className="text-[#ffffffb2] text-sm mb-2 leading-relaxed">
                  Master new skills, share knowledge & grow as a team
                </p>

                <div className="mb-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                    Workshop Leader
                  </span>
                </div>

                <p className="text-[#ffffffb2] text-sm mb-4 leading-relaxed">
                  Building hands-on learning, one session at a time
                </p>

                <Button
                  onClick={() => handleManageGroup(availableGroups[2])}
                  className="w-full bg-[#30bdee] hover:bg-[#2aa3d1] text-white rounded-lg font-medium text-sm sm:text-base"
                >
                  Manage Group
                </Button>
              </CardContent>
            </Card>

            {/* Level Up League */}
            <Card className="bg-[#1a1a1a] border-[#333333] hover:bg-[#222222] transition-all duration-300 hover:border-[#30bdee]/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
                    <span className="text-xl sm:text-2xl">💀</span>
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg">Level Up League</h3>
                </div>

                <p className="text-[#ffffffb2] text-sm mb-2 leading-relaxed">
                  Gaming hub for challenges, tournaments, and fun.
                </p>

                <div className="mb-4">
                  <span className="px-3 py-1 bg-yellow-600 text-white text-sm font-medium rounded-full">
                    BOT
                  </span>
                </div>

                <p className="text-[#ffffffb2] text-sm mb-4 leading-relaxed">
                  Manage matches, get alerts, and connect with players.
                </p>

                <Button className="w-full bg-[#30bdee] hover:bg-[#2aa3d1] text-white rounded-lg font-medium text-sm sm:text-base">
                  View Group
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section - My Groups and Role Management */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* My Groups - Updated to match screenshot */}
          <Card className="bg-[#1a1a1a] border-[#333333]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white font-['Rajdhani',Helvetica] font-bold text-lg sm:text-xl">
                  My Groups
                </CardTitle>
                <Button variant="ghost" className="text-[#30bdee] hover:text-white text-sm">
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Elite Circle */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl sm:text-2xl">💀</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-base sm:text-lg mb-1 truncate">Elite Circle</h3>
                    <p className="text-[#ffffffb2] text-sm">Workshop Leader</p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <Button className="flex-1 bg-[#ffffff12] hover:bg-[#ffffff1a] text-[#ffffffb2] hover:text-white border-0 rounded-lg text-sm">
                    Leave Group
                  </Button>
                  <Button
                    onClick={() => handleManageGroup(myGroups[0])}
                    className="flex-1 bg-[#30bdee] hover:bg-[#2aa3d1] text-white rounded-lg text-sm"
                  >
                    Manage Group
                  </Button>
                </div>
              </div>

              {/* XP Force */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl sm:text-2xl">⚡</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-base sm:text-lg mb-1 truncate">XP Force</h3>
                    <p className="text-[#ffffffb2] text-sm">Content Creator</p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <Button className="flex-1 bg-[#ffffff12] hover:bg-[#ffffff1a] text-[#ffffffb2] hover:text-white border-0 rounded-lg text-sm">
                    Leave Group
                  </Button>
                  <Button
                    onClick={() => handleManageGroup(myGroups[1])}
                    className="flex-1 bg-[#30bdee] hover:bg-[#2aa3d1] text-white rounded-lg text-sm"
                  >
                    Manage Group
                  </Button>
                </div>
              </div>

              {/* The Roundtable */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl sm:text-2xl">🎯</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-base sm:text-lg mb-1 truncate">The Roundtable</h3>
                    <p className="text-[#ffffffb2] text-sm">Tournament Organizer</p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <Button className="flex-1 bg-[#ffffff12] hover:bg-[#ffffff1a] text-[#ffffffb2] hover:text-white border-0 rounded-lg text-sm">
                    Leave Group
                  </Button>
                  <Button
                    onClick={() => handleManageGroup(myGroups[2])}
                    className="flex-1 bg-[#30bdee] hover:bg-[#2aa3d1] text-white rounded-lg text-sm"
                  >
                    Manage Group
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role Management */}
          <Card className="bg-[#1a1a1a] border-[#333333] xl:col-span-2">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle className="text-white font-['Rajdhani',Helvetica] font-bold text-lg sm:text-xl">
                  Role Management
                </CardTitle>
                <Button
                  className="bg-transparent border border-[#00cfff] text-[#00cfff] hover:bg-[#00cfff]/10 px-4 py-2 rounded-lg transition-colors text-sm"
                  onClick={openAddRolePopup}
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  New Role
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="text-center text-white py-10 text-sm">Loading...</div>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden lg:block">
                    <div className="min-w-[780px]">
                      <div className="grid grid-cols-5 gap-4 p-3 bg-[#ffffff06] rounded-lg mb-4 text-[#ffffffb2] text-sm font-medium">
                        <div className="min-w-[160px]">User</div>
                        <div className="min-w-[200px]">Roles</div>
                        <div className="min-w-[200px]">Permissions</div>
                        <div className="min-w-[100px]">Status</div>
                        <div className="min-w-[120px]">Actions</div>
                      </div>

                      <div className="space-y-2">
                        {users.map((user: User) => (
                          <div
                            key={user.id}
                            className="grid grid-cols-5 gap-4 p-3 bg-[#ffffff03] rounded-lg hover:bg-[#ffffff06] transition-colors items-center"
                          >
                            {/* User */}
                            <div className="flex items-center gap-3 min-w-[160px]">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-xs">
                                  {user.name?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="min-w-0">
                                <div className="text-white text-sm truncate">{user.name}</div>
                              </div>
                            </div>

                            {/* Roles */}
                            <div className="text-[#ffffffb2] text-sm min-w-[200px] truncate">
                              {Array.isArray(user.roles)
                                ? user.roles.map((role: Role) => role.name).join(', ')
                                : 'No roles'}
                            </div>

                            {/* Permissions */}
                            <div className="text-[#ffffffb2] text-sm min-w-[200px] truncate">
                              {Array.isArray(user.permissions)
                                ? user.permissions.map((permission: Permission) => permission.name).join(', ')
                                : 'No permissions'}
                            </div>

                            {/* Status */}
                            <div className="min-w-[100px]">
                              <span className="px-2 py-1 rounded text-xs font-medium bg-green-600 text-white">
                                Active
                              </span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 min-w-[120px]">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-[#ffffffb2] hover:text-white p-1"
                                onClick={() => openEditPermissionsPopup(user.id)}
                                title="Edit Permissions"
                              >
                                <EditIcon className="w-4 h-4" />
                              </Button>
                              <Button
                                onClick={() => {
                                  // Handle delete user
                                }}
                                size="sm"
                                variant="ghost"
                                className="text-[#ffffffb2] hover:text-red-400 p-1"
                                title="Delete User"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Card Layout */}
                  <div className="lg:hidden space-y-2">
                    {users.map((user: User) => (
                      <div
                        key={user.id}
                        className="p-4 bg-[#ffffff03] rounded-lg hover:bg-[#ffffff06] transition-colors"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xs">
                                  {user.name?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span className="text-white text-sm font-medium">{user.name}</span>
                            </div>
                            <span className="px-2 py-1 rounded text-xs font-medium bg-green-600 text-white">
                              Active
                            </span>
                          </div>

                          <div className="space-y-2">
                            <div className="text-[#ffffffb2] text-sm">
                              <span className="font-medium">Roles: </span>
                              {Array.isArray(user.roles)
                                ? user.roles.map((role: Role) => role.name).join(', ')
                                : 'None'}
                            </div>
                            <div className="text-[#ffffffb2] text-sm">
                              <span className="font-medium">Permissions: </span>
                              {Array.isArray(user.permissions)
                                ? user.permissions.map((permission: Permission) => permission.name).join(', ')
                                : 'None'}
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-[#ffffffb2] hover:text-white p-2"
                              onClick={() => openEditPermissionsPopup(user.id)}
                            >
                              <EditIcon className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={() => {
                                // Handle delete user
                              }}
                              size="sm"
                              variant="ghost"
                              className="text-[#ffffffb2] hover:text-red-400 p-2"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>


        </div>
      </div>

      {/* add role popup */}

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="rounded-2xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto transition-all duration-300 transform bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-black/10 dark:shadow-black/50">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
              {getPopupTitle()}
            </h2>

            <div className="space-y-4">
              {/* Add Role Fields */}
              {popupMode === 'addRole' && (
                <>
                  <input
                    name="name"
                    placeholder="Role Name"
                    className="w-full border rounded-xl p-3 transition-all duration-200 focus:ring-2 focus:ring-[#00cfff]/20 focus:border-[#00cfff] outline-none bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <textarea
                    name="description"
                    placeholder="Role Description"
                    className="w-full border rounded-xl p-3 transition-all duration-200 resize-none focus:ring-2 focus:ring-[#00cfff]/20 focus:border-[#00cfff] outline-none bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    value={formData.description}
                    onChange={handleChange}
                  />
                  <input
                    name="level"
                    type="number"
                    placeholder="Role Level"
                    className="w-full border rounded-xl p-3 transition-all duration-200 focus:ring-2 focus:ring-[#00cfff]/20 focus:border-[#00cfff] outline-none bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    value={formData.level}
                    onChange={handleChange}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Permissions
                    </label>
                    <div className="space-y-2 max-h-60 overflow-y-auto border rounded-xl p-3 bg-gray-50 dark:bg-gray-800">
                      {permissions.map((permission) => (
                        <label key={permission.id} className="flex items-start space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={assignPermissionData.permissions.includes(permission.id)}
                            onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                            className="rounded border-gray-300 text-[#00cfff] focus:ring-[#00cfff] mt-1"
                          />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-white block">
                              {permission.name}
                            </span>
                            {permission.description && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {permission.description}
                              </span>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Edit Permissions Fields (Assign Roles to User) */}
              {popupMode === 'editPermissions' && (
                <>
                  {/* User Display */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      User
                    </label>
                    <div className="w-full border rounded-xl p-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                      <span className="text-gray-900 dark:text-white">
                        {users.find(u => u.id === selectedUserId)?.name || 'Unknown User'}
                      </span>
                    </div>
                  </div>

                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Roles
                    </label>
                    <div className="space-y-2 max-h-60 overflow-y-auto border rounded-xl p-3 bg-gray-50 dark:bg-gray-800">
                      {roles.map((role) => (
                        <label key={role.id} className="flex items-start space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={assignRoleData.roleIds.includes(role.id)}
                            onChange={(e) => handleRoleChange(role.id, e.target.checked)}
                            className="rounded border-gray-300 text-[#00cfff] focus:ring-[#00cfff] mt-1"
                          />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-white block">
                              {role.name}
                            </span>
                            {role.description && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {role.description}
                              </span>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                className="px-6 py-2.5 rounded-xl font-medium transition-all duration-200 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2.5 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-[#00cfff] to-[#0099cc] text-white hover:from-[#00b8e6] hover:to-[#0088bb] shadow-lg shadow-[#00cfff]/25 hover:shadow-[#00cfff]/35"
                onClick={handlePopupSubmit}
              >
                {getSubmitButtonText()}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Group Admin Modal */}
      {showGroupAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseModal}
          />

          {/* Modal - Full Screen Group Admin */}
          <div className="relative bg-[#0a0a0a] w-full h-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col rounded-2xl border border-[#333333]">
            {/* Header */}
            <div className="bg-[#111111] border-b border-[#333333] p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-[#ffffffb2] text-sm">Groups / Manage Group</span>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleCloseModal}
                  className="text-[#ffffffb2] hover:text-white p-2"
                >
                  <XIcon className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-white text-2xl sm:text-3xl font-bold">Group Admin</h1>
                  <p className="text-[#ffffffb2] text-sm mt-2">Join & Manage Groups, Handle Applications & Assign Roles.</p>
                </div>
                <Button className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white px-4 sm:px-6 py-2 rounded-lg w-full sm:w-auto">
                  Edit Group
                </Button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 lg:space-y-8">
              {/* Group Info Section */}
              <div className="bg-[#111111] border border-[#30bdee] rounded-2xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl sm:text-3xl">{groupAdminData.groupInfo.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
                      <h2 className="text-white text-xl sm:text-2xl font-bold">{groupAdminData.groupInfo.name}</h2>
                      <span className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full">
                        {groupAdminData.groupInfo.status}
                      </span>
                    </div>
                    <p className="text-[#ffffffb2] text-sm leading-relaxed mb-4">
                      {groupAdminData.groupInfo.description}
                    </p>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                      <div>
                        <p className="text-[#ffffffb2] text-sm">Created</p>
                        <p className="text-white font-bold text-sm sm:text-base">{groupAdminData.groupInfo.created}</p>
                      </div>
                      <div>
                        <p className="text-[#ffffffb2] text-sm">Members</p>
                        <p className="text-white font-bold text-sm sm:text-base">{groupAdminData.groupInfo.members}</p>
                      </div>
                      <div>
                        <p className="text-[#ffffffb2] text-sm">XP Earned</p>
                        <p className="text-white font-bold text-sm sm:text-base">{groupAdminData.groupInfo.xpEarned}</p>
                      </div>
                      <div>
                        <p className="text-[#ffffffb2] text-sm">XP Boost</p>
                        <p className="text-white font-bold text-sm sm:text-base">{groupAdminData.groupInfo.xpBoost}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#30bdee] text-white text-sm rounded-full">#Game</span>
                  <span className="px-3 py-1 bg-[#30bdee] text-white text-sm rounded-full">#Community</span>
                  <span className="px-3 py-1 bg-[#30bdee] text-white text-sm rounded-full">#Tournaments</span>
                  <span className="px-3 py-1 bg-[#30bdee] text-white text-sm rounded-full">#XP</span>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                {/* Left Column */}
                <div className="space-y-6 lg:space-y-8">
                  {/* Pending Applications */}
                  <div className="bg-[#111111] border border-[#333333] rounded-2xl p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-white text-lg sm:text-xl font-bold">Pending Applications</h3>
                      <Button variant="ghost" className="text-[#ffffffb2] hover:text-white">
                        <SettingsIcon className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {groupAdminData.pendingApplications.map((application) => (
                        <div key={application.id} className="p-3 sm:p-4 bg-[#ffffff06] rounded-lg">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${application.color} rounded-full flex items-center justify-center`}>
                              <span className="text-white font-bold text-xs sm:text-sm">{application.avatar}</span>
                            </div>
                            <span className="text-white font-semibold text-sm sm:text-base">{application.user}</span>
                          </div>
                          <p className="text-[#ffffffb2] text-sm mb-4 leading-relaxed">{application.message}</p>
                          <div className="flex gap-2 sm:gap-3">
                            <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-400/10 px-3 sm:px-4 py-2 rounded-lg text-sm">
                              Reject
                            </Button>
                            <Button size="sm" className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white px-3 sm:px-4 py-2 rounded-lg text-sm">
                              Approve
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Role Management */}
                  <div className="bg-[#111111] border border-[#333333] rounded-2xl p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                      <h3 className="text-white text-lg sm:text-xl font-bold">Role Management</h3>
                      <Button className="bg-transparent border border-[#00cfff] text-[#00cfff] hover:bg-[#00cfff]/10 px-3 sm:px-4 py-2 rounded-lg text-sm transition-colors w-full sm:w-auto"
                        onClick={() => {
                          setShowGroupAdminModal(!showGroupAdminModal)
                          openAddRolePopup()
                        }}
                      >
                        <PlusIcon className="w-4 h-4 mr-2" />
                        New Role
                      </Button>
                    </div>

                    {/* Table Header - Hidden on mobile */}
                    <div className="hidden lg:grid grid-cols-5 gap-2 p-3 bg-[#ffffff06] rounded-lg mb-4 text-[#ffffffb2] text-sm font-medium">
                      <div>User</div>
                      <div>Role</div>
                      <div>Permissions</div>
                      <div>Status</div>
                      <div>Action</div>

                    </div>


                    {/* Table Rows */}
                    {roles.map((role: any) => (
                      <div
                        key={role.id}
                        className="lg:grid lg:grid-cols-5 lg:gap-2 p-3 bg-[#ffffff03] rounded-lg hover:bg-[#ffffff06] transition-colors lg:items-center"
                      >
                        {/* Mobile Card Layout */}
                        <div className="lg:hidden space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xs">{role.name.charAt(0)}</span>
                              </div>
                              <span className="text-white text-sm">{role?.name}</span>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${role.isActive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                              {role.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">{role.name}</p>
                            <p className="text-[#ffffffb2] text-xs">
                              {role.permissions.length > 0 ? role.permissions.join(', ') : 'None'}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="text-[#ffffffb2] hover:text-white p-1">
                              <EditIcon className="w-3 h-3" />
                            </Button>
                            <Button
                              onClick={() => {
                                handleDeleteRole(role.id)
                              }}
                              size="sm"
                              variant="ghost"
                              className="text-[#ffffffb2] hover:text-red-400 p-1"
                            >
                              <TrashIcon className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Desktop Grid Layout */}
                        <div className="hidden lg:contents">
                          {/* User */}
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-xs">{role.name.charAt(0)}</span>
                            </div>
                            <span className="text-white text-xs">Admin</span>
                          </div>

                          {/* Role */}
                          <div className="text-white text-xs font-medium">{role.name}</div>

                          {/* Permissions */}
                          <div className="text-[#ffffffb2] text-xs">
                            {role?.permissions.length > 0 ? role?.permissions.join(', ') : 'None'}
                          </div>

                          {/* Status */}
                          <div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${role.isActive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                              {role.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="text-[#ffffffb2] hover:text-white p-1">
                              <EditIcon className="w-3 h-3" />
                            </Button>
                            <Button
                              onClick={() => {
                                handleDeleteRole(role.id)
                              }}
                              size="sm"
                              variant="ghost"
                              className="text-[#ffffffb2] hover:text-red-400 p-1"
                            >
                              <TrashIcon className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}


                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6 lg:space-y-8">
                  {/* Group Mission Snapshot */}
                  <div className="bg-[#111111] border border-[#333333] rounded-2xl p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                      <h3 className="text-white text-lg sm:text-xl font-bold">Group Mission snapshot</h3>
                      <Button className="bg-transparent border border-[#00cfff] text-[#00cfff] hover:bg-[#00cfff]/10 px-3 sm:px-4 py-2 rounded-lg text-sm transition-colors w-full sm:w-auto" onClick={() => {
                        navigate('/missions')
                      }}>
                        <PlusIcon className="w-4 h-4 mr-2" />
                        New Mission
                      </Button>
                    </div>

                    {/* Mission Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
                      <div className="text-center">
                        <p className="text-[#30bdee] text-sm font-medium">All Missions</p>
                        <p className="text-white text-lg font-bold">4</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[#30bdee] text-sm font-medium">Active (01)</p>
                        <p className="text-white text-lg font-bold">1</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[#30bdee] text-sm font-medium">In Progress (02)</p>
                        <p className="text-white text-lg font-bold">2</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[#30bdee] text-sm font-medium">Completed (01)</p>
                        <p className="text-white text-lg font-bold">1</p>
                      </div>
                    </div>

                    {/* Missions Table Header - Hidden on mobile */}
                    <div className="hidden lg:grid grid-cols-5 gap-2 p-3 bg-[#ffffff06] rounded-lg mb-4 text-[#ffffffb2] text-sm font-medium">
                      <div>Missions</div>
                      <div>XP Boost</div>
                      <div>Coins</div>
                      <div>Status</div>
                      <div>Action</div>
                    </div>

                    {/* Missions List */}
                    <div className="space-y-2">
                      {quests.map((mission) => (
                        <div
                          key={mission.id}
                          className="lg:grid lg:grid-cols-5 lg:gap-2 p-3 bg-[#ffffff03] rounded-lg hover:bg-[#ffffff06] transition-colors lg:items-center"
                        >
                          {/* Mobile Card Layout */}
                          <div className="lg:hidden space-y-2">
                            <div className="flex items-center justify-between">
                              <p className="text-white text-sm font-medium">{mission.title}</p>
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${mission.isActive
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-600 text-white"
                                  }`}
                              >
                                {mission.isActive ? "Active" : "Inactive"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-yellow-400 text-sm font-bold">
                                  {mission.xpRewards}
                                </span>
                                <div className="flex items-center gap-1">
                                  <div className="w-3 h-3 bg-[#30bdee] rounded-full" />
                                  <span className="text-white text-sm">{mission.coinsRewards}</span>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-[#ffffffb2] hover:text-white p-1"
                                  onClick={() => handleEditMission(mission)}
                                >
                                  <EditIcon className="w-3 h-3" />
                                </Button>
                                <Button
                                  onClick={() => { }}
                                  size="sm"
                                  variant="ghost"
                                  className="text-[#ffffffb2] hover:text-red-400 p-1"
                                >
                                  <TrashIcon className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Desktop Grid Layout */}
                          <div className="hidden lg:contents">
                            <div className="text-white text-sm">{mission.title}</div>
                            <div className="text-yellow-400 text-sm font-bold">
                              {mission.xpRewards}
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-[#30bdee] rounded-full" />
                              <span className="text-white text-sm">{mission.coinsRewards}</span>
                            </div>
                            <div>
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${mission.isActive
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-600 text-white"
                                  }`}
                              >
                                {mission.isActive ? "Active" : "Inactive"}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-[#ffffffb2] hover:text-white p-1"
                                onClick={() => {
                                  console.log("i am working");
                                  handleEditMission(mission)
                                }}
                              >
                                <EditIcon className="w-3 h-3" />
                              </Button>
                              <Button
                                onClick={() => { handleDeleteMission(mission?.id) }}
                                size="sm"
                                variant="ghost"
                                className="text-[#ffffffb2] hover:text-red-400 p-1"
                              >
                                <TrashIcon className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Activity Log */}
                  <div className="bg-[#111111] border border-[#333333] rounded-2xl p-4 sm:p-6">
                    <h3 className="text-white text-lg sm:text-xl font-bold mb-6">Activity Log</h3>

                    <div className="space-y-4">
                      {groupAdminData.activityLog.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3 p-3 bg-[#ffffff06] rounded-lg hover:bg-[#ffffff08] transition-colors">
                          <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br ${activity.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                            <span className="text-white font-bold text-xs">{activity.avatar}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white font-semibold text-sm">{activity.user}</span>
                            </div>
                            <p className="text-[#ffffffb2] text-sm mb-1 break-words">{activity.action}</p>
                            <span className="text-[#ffffffb2] text-xs">{activity.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="absolute top-0 bg-black/70 flex justify-center items-start overflow-y-auto w-full">
        {
          showNewMissionModal && (
            <div className="p-4 sm:p-6 lg:p-8 bg-[#0a0a0a] min-h-screen overflow-y-auto w-full">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 lg:mb-8 gap-4">
                <div>
                  <h1 className="text-white text-2xl sm:text-3xl lg:text-[32px] tracking-[-0.32px] leading-tight lg:leading-[51.2px] font-['Rajdhani',Helvetica] font-semibold mb-2">
                    Edit Mission
                  </h1>
                </div>
                <Button
                  onClick={handleCloseNewMission}
                  variant="ghost"
                  className="text-[#ffffffb2] hover:text-white p-2"
                >
                  <XIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </div>

              {/* Error and Success Messages */}
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500 rounded-lg">
                  <p className="text-green-400 text-sm">Mission created successfully! 🎉</p>
                </div>
              )}

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                {/* Left Column - Form */}
                <div className="xl:col-span-2 space-y-6 lg:space-y-8">
                  {/* Mission Title */}
                  <div>
                    <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-3">
                      Mission Title <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={missionData.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMissionData({ ...missionData, title: e.target.value })}
                        className={`h-10 sm:h-12 bg-[#1a1a1a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#222222] transition-all text-sm sm:text-base pr-10 ${!missionData.title ? 'border-red-400/50' : ''
                          }`}
                        placeholder="Enter mission title..."
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffffffb2]">
                        🚀
                      </div>
                    </div>
                  </div>

                  {/* Upload Banner */}
                  <div>
                    <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-3">
                      Upload Banner (Optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // For now, just store the file name - in production you'd upload and get an ID
                          console.log('Banner file selected:', file.name);
                          // You would implement actual file upload here and get back an ID
                          // setMissionData({ ...missionData, banner: [uploadedFileId] });
                        }
                      }}
                      className="hidden"
                      id="banner-upload"
                    />
                    <label
                      htmlFor="banner-upload"
                      className="border-2 border-dashed border-[#333333] rounded-lg p-6 sm:p-8 text-center hover:border-[#30bdee] transition-colors cursor-pointer block"
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#333333] rounded-lg flex items-center justify-center mx-auto mb-4">
                        <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#ffffffb2]" />
                      </div>
                      <p className="text-[#ffffffb2] text-xs sm:text-sm mb-2">Click to upload or drag and drop</p>
                      <p className="text-[#ffffffb2] text-xs">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                      {missionData.banner && missionData.banner.length > 0 && (
                        <p className="text-green-400 text-xs mt-2">✓ Banner uploaded</p>
                      )}
                    </label>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-3">
                      Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={missionData.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMissionData({ ...missionData, description: e.target.value })}
                      className={`w-full h-20 sm:h-24 bg-[#1a1a1a] border border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#222222] transition-all text-sm sm:text-base p-3 sm:p-4 resize-none ${!missionData.description ? 'border-red-400/50' : ''
                        }`}
                      placeholder="Add mission description..."
                    />
                  </div>

                  {/* Mission Category and Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-3">
                        Mission Category
                      </label>
                      <div className="relative">
                        <Button
                          onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                          variant="outline"
                          className="w-full h-10 sm:h-12 bg-[#1a1a1a] border-[#333333] rounded-lg text-white hover:bg-[#222222] hover:border-[#30bdee] transition-all justify-between text-sm sm:text-base"
                        >
                          <span>{missionData.category}</span>
                          <ChevronDownIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>

                        {/* Category Dropdown */}
                        {showCategoryDropdown && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-[#333333] rounded-lg shadow-2xl z-50 overflow-hidden">
                            {missionCategories.map((category: MissionCategory) => (
                              <button
                                key={category.id}
                                onClick={() => handleCategorySelect(category.name)}
                                className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-[#333333] transition-colors text-sm sm:text-base ${category.name === missionData.category ? 'bg-[#30bdee] text-white' : 'text-[#ffffffb2] hover:text-white'
                                  }`}
                              >
                                {category.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-3">
                        Mission Type
                      </label>
                      <Select value={missionData.type} onValueChange={(value: string) => setMissionData({ ...missionData, type: value })}>
                        <SelectTrigger className="h-10 sm:h-12 bg-[#1a1a1a] border-[#333333] rounded-lg text-white hover:bg-[#222222] hover:border-[#30bdee] transition-all text-sm sm:text-base">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-[#333333]">
                          <SelectItem value="Step by Step" className="text-white hover:bg-[#333333]">Step by Step</SelectItem>
                          <SelectItem value="Single Task" className="text-white hover:bg-[#333333]">Single Task</SelectItem>
                          <SelectItem value="Daily Challenge" className="text-white hover:bg-[#333333]">Daily Challenge</SelectItem>
                          <SelectItem value="Weekly Quest" className="text-white hover:bg-[#333333]">Weekly Quest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* XP and Coins Rewards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-3">
                        XP Rewards 🏆
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          value={missionData.xpRewards}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMissionData({ ...missionData, xpRewards: e.target.value })}
                          className="h-10 sm:h-12 bg-[#1a1a1a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#222222] transition-all text-sm sm:text-base pr-12"
                          placeholder="0"
                          min="0"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400 font-bold text-xs sm:text-sm">
                          +XP
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-3">
                        Coins Rewards 🪙
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          value={missionData.coinsRewards}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMissionData({ ...missionData, coinsRewards: e.target.value })}
                          className="h-10 sm:h-12 bg-[#1a1a1a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#222222] transition-all text-sm sm:text-base pl-12"
                          placeholder="0"
                          min="0"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 bg-[#30bdee] rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Unlock Conditions and Submission Deadline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-3">
                        Unlock Conditions
                      </label>
                      <Select value={missionData.unlockConditions} onValueChange={(value: string) => setMissionData({ ...missionData, unlockConditions: value })}>
                        <SelectTrigger className="h-10 sm:h-12 bg-[#1a1a1a] border-[#333333] rounded-lg text-white hover:bg-[#222222] hover:border-[#30bdee] transition-all text-sm sm:text-base">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-[#333333]">
                          <SelectItem value="Previous Mission Completion" className="text-white hover:bg-[#333333]">Previous Mission Completion</SelectItem>
                          <SelectItem value="Level Requirement" className="text-white hover:bg-[#333333]">Level Requirement</SelectItem>
                          <SelectItem value="Group Membership" className="text-white hover:bg-[#333333]">Group Membership</SelectItem>
                          <SelectItem value="No Requirements" className="text-white hover:bg-[#333333]">No Requirements</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-3">
                        Submission Deadline
                      </label>
                      <Select value={missionData.submissionDeadline} onValueChange={(value: string) => setMissionData({ ...missionData, submissionDeadline: value })}>
                        <SelectTrigger className="h-10 sm:h-12 bg-[#1a1a1a] border-[#333333] rounded-lg text-white hover:bg-[#222222] hover:border-[#30bdee] transition-all text-sm sm:text-base">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-[#333333]">
                          <SelectItem value="1 Week" className="text-white hover:bg-[#333333]">1 Week</SelectItem>
                          <SelectItem value="2 Weeks" className="text-white hover:bg-[#333333]">2 Weeks</SelectItem>
                          <SelectItem value="1 Month" className="text-white hover:bg-[#333333]">1 Month</SelectItem>
                          <SelectItem value="Custom" className="text-white hover:bg-[#333333]">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Start Date, End Date, and Visibility */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div>
                      <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-3">
                        Start Date <span className="text-red-400">*</span>
                      </label>
                      <Input
                        type="date"
                        value={missionData.startDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMissionData({ ...missionData, startDate: e.target.value })}
                        className={`h-10 sm:h-12 bg-[#1a1a1a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#222222] transition-all text-sm sm:text-base ${!missionData.startDate ? 'border-red-400/50' : ''
                          }`}
                      />
                    </div>

                    <div>
                      <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-3">
                        End Date <span className="text-red-400">*</span>
                      </label>
                      <Input
                        type="date"
                        value={missionData.endDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMissionData({ ...missionData, endDate: e.target.value })}
                        className={`h-10 sm:h-12 bg-[#1a1a1a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#222222] transition-all text-sm sm:text-base ${!missionData.endDate ? 'border-red-400/50' : ''
                          }`}
                      />
                    </div>

                    <div>
                      <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-3">
                        Visibility
                      </label>
                      <Select value={missionData.visibility} onValueChange={(value: string) => setMissionData({ ...missionData, visibility: value })}>
                        <SelectTrigger className="h-10 sm:h-12 bg-[#1a1a1a] border-[#333333] rounded-lg text-white hover:bg-[#222222] hover:border-[#30bdee] transition-all text-sm sm:text-base">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-[#333333]">
                          <SelectItem value="Public" className="text-white hover:bg-[#333333]">Public</SelectItem>
                          <SelectItem value="Private" className="text-white hover:bg-[#333333]">Private</SelectItem>
                          <SelectItem value="Group Only" className="text-white hover:bg-[#333333]">Group Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Mission Steps */}
                  <div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                      <h3 className="text-white text-lg sm:text-xl font-bold">Mission Steps</h3>
                      <Button
                        onClick={handleAddStep}
                        className="bg-transparent border border-[#00cfff] text-[#00cfff] hover:bg-[#00cfff]/10 px-3 sm:px-4 py-2 rounded-lg text-sm transition-colors w-full sm:w-auto"
                      >
                        <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Add Step
                      </Button>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      {missionData.steps.map((step: MissionStep, index: number) => (
                        <div key={step.id} className="bg-[#1a1a1a] border border-[#333333] rounded-lg p-4 sm:p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-[#30bdee] text-base sm:text-lg font-bold">Step {index + 1}</h4>
                            {missionData.steps.length > 1 && (
                              <Button
                                onClick={() => handleRemoveStep(step.id)}
                                variant="ghost"
                                className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 text-sm"
                              >
                                Remove
                              </Button>
                            )}
                          </div>

                          <div className="space-y-3 sm:space-y-4">
                            {/* Step Title */}
                            <div>
                              <label className="text-yellow-400 text-xs sm:text-sm block mb-2 font-medium">
                                Step Title <span className="text-red-400">*</span>
                              </label>
                              <Input
                                type="text"
                                value={step.title}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateStep(step.id, 'title', e.target.value)}
                                className={`h-8 sm:h-10 bg-[#0a0a0a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all text-xs sm:text-sm ${!step.title ? 'border-red-400/50' : ''
                                  }`}
                                placeholder="Enter step title..."
                              />
                            </div>

                            {/* XP and Coins Reward */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                              <div>
                                <label className="text-yellow-400 text-xs sm:text-sm block mb-2 font-medium">
                                  XP Reward
                                </label>
                                <div className="relative">
                                  <Input
                                    type="number"
                                    value={step.xpReward}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateStep(step.id, 'xpReward', e.target.value)}
                                    className="h-8 sm:h-10 bg-[#0a0a0a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all text-xs sm:text-sm pr-10"
                                    placeholder="0"
                                    min="0"
                                  />
                                  <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-yellow-400 text-xs font-bold">
                                    +XP
                                  </div>
                                </div>
                              </div>

                              <div>
                                <label className="text-yellow-400 text-xs sm:text-sm block mb-2 font-medium">
                                  Coins Rewards 🪙
                                </label>
                                <div className="relative">
                                  <Input
                                    type="number"
                                    value={step.coinsReward}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateStep(step.id, 'coinsReward', e.target.value)}
                                    className="h-8 sm:h-10 bg-[#0a0a0a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all text-xs sm:text-sm pl-8 sm:pl-10"
                                    placeholder="0"
                                    min="0"
                                  />
                                  <div className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-[#30bdee] rounded-full" />
                                </div>
                              </div>
                            </div>

                            {/* Description */}
                            <div>
                              <label className="text-yellow-400 text-xs sm:text-sm block mb-2 font-medium">
                                Description <span className="text-red-400">*</span>
                              </label>
                              <textarea
                                value={step.description}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateStep(step.id, 'description', e.target.value)}
                                className={`w-full h-16 sm:h-20 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all text-xs sm:text-sm p-2 sm:p-3 resize-none ${!step.description ? 'border-red-400/50' : ''
                                  }`}
                                placeholder="Add step description..."
                              />
                            </div>

                            {/* Reward Type */}
                            <div>
                              <label className="text-yellow-400 text-xs sm:text-sm block mb-2 font-medium">
                                Reward Type
                              </label>
                              <Select value={step.rewardType} onValueChange={(value: string) => updateStep(step.id, 'rewardType', value)}>
                                <SelectTrigger className="h-8 sm:h-10 bg-[#0a0a0a] border-[#333333] rounded-lg text-white hover:bg-[#111111] hover:border-[#30bdee] transition-all text-xs sm:text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a1a1a] border-[#333333]">
                                  <SelectItem value="Screenshot Upload" className="text-white hover:bg-[#333333]">Screenshot Upload</SelectItem>
                                  <SelectItem value="Text Response" className="text-white hover:bg-[#333333]">Text Response</SelectItem>
                                  <SelectItem value="File Upload" className="text-white hover:bg-[#333333]">File Upload</SelectItem>
                                  <SelectItem value="Auto Verification" className="text-white hover:bg-[#333333]">Auto Verification</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Preview */}
                <div className="xl:col-span-1">
                  <div className="bg-[#1a1a1a] border border-[#333333] rounded-lg p-4 sm:p-6 sticky top-8">
                    <h3 className="text-white text-base sm:text-lg font-bold mb-4">Preview</h3>

                    {/* Discord-style preview */}
                    <div className="bg-[#36393f] rounded-lg p-3 sm:p-4 mb-4">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#5865f2] rounded-full flex items-center justify-center">
                          <span className="text-white text-xs sm:text-sm">🤖</span>
                        </div>
                        <div>
                          <span className="text-white font-semibold text-xs sm:text-sm">Mission Bot</span>
                          <span className="text-[#b9bbbe] text-xs ml-2">BOT</span>
                        </div>
                      </div>

                      <div className="bg-[#2f3136] rounded p-2 sm:p-3 mb-3">
                        <p className="text-[#dcddde] text-xs sm:text-sm leading-relaxed">
                          🚀 {missionData.title || 'New Mission'}
                        </p>
                        <p className="text-[#b9bbbe] text-xs mt-2">
                          {missionData.description || 'Mission description will appear here...'}
                        </p>
                      </div>

                      <div className="text-[#b9bbbe] text-xs">
                        Status: <span className="text-[#00d166]">Draft</span>
                      </div>
                    </div>

                    {/* Mission Details */}
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[#ffffffb2] text-xs sm:text-sm">
                          Category: <span className="text-[#30bdee]">{missionData.category}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[#ffffffb2] text-xs sm:text-sm">
                          Type: <span className="text-[#30bdee]">{missionData.type}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[#ffffffb2] text-xs sm:text-sm">
                          Visibility: <span className="text-[#30bdee]">{missionData.visibility}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[#ffffffb2] text-xs sm:text-sm">
                          Total Rewards: <span className="text-yellow-400">+{missionData.xpRewards || '0'} XP</span>
                          {missionData.coinsRewards && parseInt(missionData.coinsRewards) > 0 && (
                            <span className="text-yellow-400">, +{missionData.coinsRewards} Coins</span>
                          )}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[#ffffffb2] text-xs sm:text-sm">
                          Deadline: <span className="text-[#30bdee]">{missionData.submissionDeadline}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[#ffffffb2] text-xs sm:text-sm">
                          Unlock: <span className="text-[#30bdee]">{missionData.unlockConditions}</span>
                        </span>
                      </div>

                      <div className="pt-2 border-t border-[#333333]">
                        <span className="text-[#ffffffb2] text-xs sm:text-sm block mb-2">Steps ({missionData.steps.length}):</span>
                        {missionData.steps.map((step: MissionStep, index: number) => (
                          <div key={step.id} className="flex items-center justify-between text-xs mb-1">
                            <span className="text-yellow-400">#{index + 1} {step.title || 'Untitled Step'}</span>
                            <div className="flex gap-2">
                              {step.xpReward && (
                                <span className="text-yellow-400">+{step.xpReward} XP</span>
                              )}
                              {step.coinsReward && (
                                <span className="text-yellow-400">+{step.coinsReward} Coins</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {missionData.banner && missionData.banner.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-[#ffffffb2] text-xs sm:text-sm">
                            Banner: <span className="text-green-400">✓ Uploaded</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mt-6 lg:mt-8 pt-4 sm:pt-6 border-t border-[#333333] gap-4">
                <div className="flex gap-3">
                  <Button
                    onClick={handleCloseNewMission}
                    disabled={isLoading}
                    className="bg-[#333333] hover:bg-[#444444] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Back To Missions
                  </Button>

                  <Button
                    onClick={resetForm}
                    disabled={isLoading}
                    variant="outline"
                    className="border-[#333333] text-[#ffffffb2] hover:bg-[#333333] hover:text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reset Form
                  </Button>
                </div>

                <Button
                  onClick={() => { handleUpdateMission() }}
                  disabled={isLoading}
                  className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    'Update Mission'
                  )}
                </Button>
              </div>
            </div>
          )
        }


      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title={getDeleteModalContent().title}
        description={getDeleteModalContent().description}
        itemName={deleteItem?.name}
        isLoading={isDeleting}
      />
    </div>
  );
};