import { ClockIcon, CheckCircleIcon, StarIcon, CoinsIcon, PlusIcon, SearchIcon, FilterIcon, TrophyIcon, ZapIcon, TargetIcon, UserIcon, CalendarIcon, AwardIcon, XIcon, ChevronDownIcon, ImageIcon, UploadIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { achievements, availableMissions, missions, upcomingMissions, xpHistory } from "../../constant/MissionJson";
import { fetchUserMissions } from "../../apis/getMissionUser";
import { fetchAllQuests, Quest } from "../../apis/getAllQuest";
import { startMission } from "../../apis/startMission";
import { fetchAllUsers } from "../../apis/getAllUsers";
import { User } from "../Dashboard";
import { completeQuestStep } from "../../apis/submitMissionSteps";
import { completeQuest } from "../../apis/submitCompleteMission";




interface MissionData {
  title: string;
  description: string;
  banner: number[];
  category: string;
  type: string;
  xpRewards: string;
  coinsRewards: string;
  participants: string[]; // ✅ Changed from string to string[]
  unlockConditions: string;
  submissionDeadline: string;
  startDate: string;
  endDate: string;
  visibility: string;
  steps: MissionStep[];
}

// ✅ Fixed FormattedAPIData interface to include participants
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
  participants: string[]; // ✅ Added participants field
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

// ✅ Fixed MultiSelectProps interface
interface MultiSelectProps {
  users: User[];
  selectedIds: string[]; // ✅ Changed from string to string[]
  onChange: (selectedIds: string[]) => void; // ✅ Changed parameter type
  placeholder?: string;
  disabled?: boolean;
}

interface MissionStep {
  id: number;
  title: string;
  xpReward: string;
  coinsReward: string;
  description: string;
  rewardType: string;
}


// Replace the FormattedAPIData interface with this:


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

interface MultiSelectProps {
  users: User[];
  selectedIds: string;
  onChange: (selectedIds: string) => void;
  placeholder?: string;
  disabled?: boolean;
};
declare const DarkProfessionalMultiSelect: React.FC<{
  users: User[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  placeholder: string;
}>;




export const Missions = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("all");
  const [showSubmitMissionModal, setShowSubmitMissionModal] = useState(false);
  const [selectedMission, setSelectedMission] = useState<any>(null);

  // New Mission Form Data
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [showNewMissionModal, setShowNewMissionModal] = useState<boolean>();
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<boolean>(false);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  // ✅ Fixed initial state
  const [missionData, setMissionData] = useState<MissionData>({
    title: "",
    description: "",
    banner: [],
    category: "Onboarding",
    type: "Step by Step",
    xpRewards: "",
    coinsRewards: "",
    participants: [], // ✅ Changed from "" to []
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
  const [myMissionData, setMyMissionData] = useState<any>()


  const [selectedQuestStepId, setSelectedQuestStepId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [note, setNote] = useState("");

  // Add these handler functions

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file);
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };
  const handleCompleteStep = async () => {
    if (!selectedQuestStepId || !selectedFile) {
      alert("Please select a quest step and upload a file");
      return;
    }

    const questStepData = {
      questStepId: selectedQuestStepId,
      proof: selectedFile, // File object in binary form
    };

    try {
      const result = await completeQuestStep(questStepData);
      console.log("Mission submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting mission:", error);
    }
  };

  const filteredMissions = quests.filter(mission => {
    const userQuest = mission.UserQuest?.[0];
    const userQuestSteps = userQuest?.UserQuestSteps || [];
    const totalSteps = mission.QuestSteps?.length || 0;

    if (activeTab === "all") return true;

    if (activeTab === "pending") {
      // ✅ Show missions that are started but not fully completed
      return (
        mission.UserQuest.length > 0 &&
        userQuestSteps.length > 0 &&
        (
          userQuestSteps.length < totalSteps || // not all steps attempted
          userQuestSteps.some(step => !step.isCompleted) // some steps incomplete
        )
      );
    }

    if (activeTab === "completed") {
      // ✅ Show only missions where all quest steps are completed
      return (
        mission.UserQuest.length > 0 &&
        userQuestSteps.length === totalSteps &&
        totalSteps > 0 &&
        userQuestSteps.every(step => step.isCompleted)
      );
    }

    return true;
  });




  const handleCompleteQuest = async (id: any) => {
    const result = await completeQuest({ questId: id });

    if (result.success) {
      alert("Quest completed successfully:");
    } else {
      console.error("Quest completion failed:", result.message);
    }
  };

  useEffect(() => {
    console.log(myMissionData, "my mission data");

  }, [myMissionData])

  const handleParticipantsChange = (selectedIds: string[]) => {
    console.log('Participants selected:', selectedIds);

    setMissionData(prev => ({
      ...prev,
      participants: selectedIds
    }));
  };

  useEffect(() => {
    console.log('missionData.participants updated:', missionData.participants);
  }, [missionData.participants]);

  const handleStartMission = async (id: string) => {
    const response = await startMission(id);

    if (response.success && response.result) {
      console.log('🎯 Mission Started Successfully!');
      console.log('Title:', response.result.title);
      console.log('XP Reward:', response.result.xpReward);
      // ✅ You can now use `response.result` safely
    } else {
      console.error('❌ Failed to start mission:', response.message);
      // ✅ Show a toast, alert, or message to the user if needed
    }
  };




  useEffect(() => {
    const loadQuests = async () => {
      try {
        const response = await fetchAllQuests();
        setQuests(response.result);
      } catch (error) {
        console.error("Failed to load quests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuests();
  }, []);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data.result);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getUsersData();
  }, []);


  // Mission categories
  const [missionCategories] = useState<MissionCategory[]>([
    { id: 1, name: 'Onboarding', active: true },
    { id: 2, name: 'Social', active: false },
    { id: 3, name: 'Content', active: false },
    { id: 4, name: 'Engagement', active: false },
    { id: 5, name: 'Learning', active: false },
  ]);

  // Main mission data state with clean initial values

  // API configuration
  const API_BASE_URL: string = import.meta.env.VITE_API_URL || 'https://your-api-endpoint.com';
  const API_ENDPOINTS = {
    CREATE_MISSION: '/quests',
  } as const;

  // Validation function
  const validateMissionData = (data: MissionData): string[] => {
    const errors: string[] = [];

    if (!data.title.trim()) errors.push('Mission title is required');
    if (!data.description.trim()) errors.push('Mission description is required');
    if (!data.category) errors.push('Mission category is required');
    if (!data.type) errors.push('Mission type is required');
    if (!data.startDate) errors.push('Start date is required');
    if (!data.endDate) errors.push('End date is required');

    // Validate steps
    data.steps.forEach((step: MissionStep, index: number) => {
      if (!step.title.trim()) errors.push(`Step ${index + 1} title is required`);
      if (!step.description.trim()) errors.push(`Step ${index + 1} description is required`);
    });

    return errors;
  };

  // Format data for API
  const formatMissionDataForAPI = (data: MissionData): FormattedAPIData => {
    return {
      title: data.title.trim(),
      description: data.description.trim(),
      banner: data.banner || [],
      category: data.category,
      type: data.type,
      unlockConditions: data.unlockConditions,
      submissionDeadline: data.submissionDeadline,
      startDate: data.startDate,
      endDate: data.endDate,
      visibility: data.visibility,
      xpRewards: parseInt(data.xpRewards) || 0,
      coinsRewards: parseInt(data.coinsRewards) || 0,
      participants: data.participants, // ✅ Added participants field
      steps: data.steps.map((step: MissionStep) => ({
        title: step.title.trim(),
        description: step.description.trim(),
        xpReward: parseInt(step.xpReward) || 0,
        coinsReward: parseInt(step.coinsReward) || 0,
        isCompleted: false,
        rewardType: step.rewardType,
        proof: []
      }))
    };
  };
  // API call function
  const createMissionAPI = async (missionData: FormattedAPIData): Promise<APIResponse> => {
    try {
      const response: Response = await fetch(`${API_BASE_URL}/quests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(missionData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      // ✅ Now safely fetch all quests after success

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };


  // Event handlers
  const handleCreateMission = async (): Promise<void> => {
    setError(null);
    setSuccess(false);

    const validationErrors: string[] = validateMissionData(missionData);
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }

    setIsLoading(true);

    try {

      const apiData: FormattedAPIData = {
        ...formatMissionDataForAPI(missionData),
        participants: missionData.participants.join(',')  // 👈 Converts to "id1,id2,id3"
      };
      const response: APIResponse = await createMissionAPI(apiData);

      setSuccess(true);
      console.log('Mission created successfully:', response);

      const responseData = await fetchAllQuests();
      setQuests(responseData.result);

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
      banner: [],
      category: "Onboarding",
      type: "Step by Step",
      xpRewards: "",
      coinsRewards: "",
      participants: [], // ✅ Changed from "" to []
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
    setError(null);
    setSuccess(false);
  };

  // User XP data - moved from Dashboard
  const userXP = {
    current: 12400,
    level: 8,
    nextLevel: 9,
    xpToNext: 1450,
    totalToNext: 14000
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-600 text-white';
      case 'In Progress':
        return 'bg-blue-600 text-white';
      case 'Available':
        return 'bg-gray-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />;
      case 'In Progress':
        return <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />;
      case 'Available':
        return <StarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />;
      default:
        return <StarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />;
    }
  };

  // Check if all steps are completed for a mission
  const areAllStepsCompleted = (mission: any) => {
    return mission.steps && mission.steps.every((step: any) => step.completed);
  };



  const handleNewMission = () => {
    setShowNewMissionModal(true);
  };


  const handleSubmitMission = (mission: any) => {
    setSelectedMission(mission);
    setShowSubmitMissionModal(true);
  };

  const handleCloseSubmitMission = () => {
    setShowSubmitMissionModal(false);
    setSelectedMission(null);
  };

  const handleFinalSubmit = () => {
    console.log("Submitting mission:", selectedMission);
    setShowSubmitMissionModal(false);
    setSelectedMission(null);
  };



  const DarkProfessionalMultiSelect: React.FC<MultiSelectProps> = ({
    users,
    selectedIds, // Now expects string[]
    onChange,
    placeholder = "Select participants...",
    disabled = false
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // ✅ Fixed to work with string[] instead of string
    const selectedIdArray = selectedIds || [];

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleUserToggle = (userId: string) => {
      let newSelectedIds: string[];

      if (selectedIdArray.includes(userId)) {
        newSelectedIds = selectedIdArray.filter(id => id !== userId);
      } else {
        newSelectedIds = [...selectedIdArray, userId];
      }

      onChange(newSelectedIds); // ✅ Pass array directly
    };

    const removeUser = (userId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const newSelectedIds = selectedIdArray.filter(id => id !== userId);
      onChange(newSelectedIds); // ✅ Pass array directly
    };

    const clearAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange([]); // ✅ Pass empty array
    };

    const getSelectedUsers = () => {
      return users.filter((user: any) => selectedIdArray.includes(user.id));
    };

    return (
      <div className="relative w-full" ref={dropdownRef}>
        {/* Main Input Display */}
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
          min-h-[42px] w-full px-3 py-2 border border-[#333333] rounded-lg bg-[#1a1a1a]
          cursor-pointer transition-all duration-200 hover:border-[#30bdee]
          ${disabled ? 'bg-[#0a0a0a] cursor-not-allowed' : ''}
          ${isOpen ? 'border-[#30bdee] bg-[#222222]' : ''}
        `}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 flex items-center flex-wrap gap-1">
              {selectedIdArray.length === 0 ? (
                <span className="text-[#ffffffb2]">{placeholder}</span>
              ) : selectedIdArray.length === 1 ? (
                <span className="text-white">{getSelectedUsers()[0]?.name}</span>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {getSelectedUsers().slice(0, 2).map((user: any) => (
                    <span
                      key={user.id}
                      className="inline-flex items-center px-2 py-1 bg-[#30bdee]/20 text-[#30bdee] text-sm rounded-md"
                    >
                      {user.name}
                      <button
                        onClick={(e) => removeUser(user.id, e)}
                        className="ml-1 text-[#30bdee] hover:text-white"
                        type="button"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {selectedIdArray.length > 2 && (
                    <span className="px-2 py-1 bg-[#333333] text-[#ffffffb2] text-sm rounded-md">
                      +{selectedIdArray.length - 2} more
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 ml-2">
              {selectedIdArray.length > 0 && !disabled && (
                <button
                  onClick={clearAll}
                  className="text-[#ffffffb2] hover:text-white text-sm font-medium"
                  type="button"
                >
                  Clear
                </button>
              )}
              <svg
                className={`w-4 h-4 text-[#ffffffb2] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-[#1a1a1a] border border-[#333333] rounded-lg shadow-lg max-h-60 overflow-hidden">
            {/* Header */}
            <div className="px-3 py-2 bg-[#0a0a0a] border-b border-[#333333]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#ffffffb2]">
                  Select Participants ({selectedIdArray.length} selected)
                </span>
                {selectedIdArray.length > 0 && (
                  <button
                    onClick={(e) => clearAll(e)}
                    className="text-xs text-[#30bdee] hover:text-white"
                    type="button"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-48 overflow-y-auto">
              {users.length === 0 ? (
                <div className="px-3 py-4 text-center text-[#ffffffb2]">
                  No users available
                </div>
              ) : (
                users.map((user: any) => {
                  const isSelected = selectedIdArray.includes(user.id);
                  return (
                    <div
                      key={user.id}
                      onClick={() => handleUserToggle(user.id)}
                      className={`
                      flex items-center px-3 py-2 cursor-pointer transition-colors
                      hover:bg-[#333333] ${isSelected ? 'bg-[#30bdee]/10' : ''}
                    `}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => { }} // Handled by parent div
                          className="h-4 w-4 text-[#30bdee] focus:ring-[#30bdee] border-[#333333] rounded mr-3 bg-[#1a1a1a]"
                        />
                        <span className={`${isSelected ? 'font-medium text-[#30bdee]' : 'text-white'}`}>
                          {user.name}
                        </span>
                      </div>
                      {isSelected && (
                        <svg className="w-4 h-4 text-[#30bdee] ml-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    );
  };










  // If Submit Mission modal is open, show it instead of the main content
  if (showSubmitMissionModal) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-[#0a0a0a] min-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 lg:mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#ffffffb2] text-sm mb-2">
              <span>Missions</span>
              <span>/</span>
              <span className="text-white">Submit Mission</span>
            </div>
            <h1 className="text-white text-2xl sm:text-3xl lg:text-[32px] tracking-[-0.32px] leading-tight lg:leading-[51.2px] font-['Rajdhani',Helvetica] font-semibold">
              Submit Mission
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 lg:space-y-8">
          {/* Selected Mission Info */}
          <div className="bg-[#111111] border border-[#30bdee] rounded-2xl p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div>
                <h2 className="text-white text-lg sm:text-xl font-bold">{myMissionData?.title}</h2>
                <p className="text-[#ffffffb2] text-sm mt-1">{myMissionData?.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-yellow-400 font-bold">{myMissionData?.xpRewards} XP</span>
                  {myMissionData?.coinsRewards > 0 && (
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-[#30bdee] rounded-full" />
                      <span className="text-white font-medium">{myMissionData?.coinsRewards} Coins</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full">
                Status
              </span>
              <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                In Progress
              </span>
            </div>
          </div>

          {/* Quest Steps Selection */}
          <div className="bg-[#1a1a1a] border border-[#333333] rounded-2xl p-4 sm:p-6">
            <h3 className="text-white text-lg font-bold mb-4">Select Quest Step</h3>
            <select
              value={selectedQuestStepId}
              onChange={(e) => setSelectedQuestStepId(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#333333] rounded-lg text-white focus:border-[#30bdee] focus:bg-[#111111] transition-all text-sm p-3"
            >
              <option value="">Select a quest step...</option>
              {myMissionData?.UserQuest[0]?.UserQuestSteps?.map((step: any) => {

                const questStep = myMissionData.QuestSteps.find((item: any) => item.id == step.questStepId);

                return (
                  < option key={step.id} value={step.id} >
                    {questStep.title} - {questStep.xpReward} XP, {questStep.coinsReward} Coins
                  </option>
                )
              })}
            </select>

            {/* Show selected step details */}
            {selectedQuestStepId && (
              <div className="mt-4 p-3 bg-[#0a0a0a] border border-[#333333] rounded-lg">
                {(() => {
                  const selectedStep = myMissionData?.QuestSteps?.find((step: any) => step.id === selectedQuestStepId);
                  return selectedStep ? (
                    <div>
                      <h4 className="text-white font-medium mb-2">{selectedStep.title}</h4>
                      <p className="text-[#ffffffb2] text-sm mb-2">{selectedStep.description}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-yellow-400 text-sm font-bold">{selectedStep.xpReward} XP</span>
                        <span className="text-[#30bdee] text-sm font-bold">{selectedStep.coinsReward} Coins</span>
                        <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">
                          {selectedStep.rewardType}
                        </span>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            )}
          </div>

          {/* Upload Section */}
          <div className="bg-[#1a1a1a] border border-[#333333] rounded-2xl p-4 sm:p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#333333] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UploadIcon className="w-8 h-8 text-[#ffffffb2]" />
              </div>
              <h3 className="text-white text-lg font-bold mb-2">Upload a Screenshot or drag and drop a file</h3>
              <p className="text-[#ffffffb2] text-sm mb-6">PNG and JPG files are allowed</p>

              {selectedFile && (
                <div className="mb-4 p-3 bg-[#0a0a0a] border border-[#30bdee] rounded-lg">
                  <p className="text-white text-sm">Selected file: {selectedFile.name}</p>
                  <p className="text-[#ffffffb2] text-xs">Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              )}

              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />

              <button
                type="button"
                onClick={handleUploadClick}
                className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white px-6 py-2 rounded-lg cursor-pointer transition-colors"
              >
                Upload
              </button>
            </div>
          </div>
          {/* Add Note Section */}
          <div className="bg-[#1a1a1a] border border-[#333333] rounded-2xl p-4 sm:p-6">
            <h3 className="text-white text-lg font-bold mb-4">Add Note</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full h-24 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all text-sm p-3 resize-none"
              placeholder="Tell us how you completed this mission..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-4 border-t border-[#333333]">
            <Button
              onClick={handleCloseSubmitMission}
              className="bg-[#333333] hover:bg-[#444444] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold order-2 sm:order-1"
            >
              Back To Missions
            </Button>
            <Button
              onClick={handleCompleteStep}
              className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold order-1 sm:order-2"
            >
              Submit Mission
            </Button>
          </div>
        </div>
      </div >
    );
  }

  // If New Mission modal is open, show it instead of the main content
  if (showNewMissionModal) {


    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-[#0a0a0a] min-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 lg:mb-8 gap-4">
          <div>
            <h1 className="text-white text-2xl sm:text-3xl lg:text-[32px] tracking-[-0.32px] leading-tight lg:leading-[51.2px] font-['Rajdhani',Helvetica] font-semibold mb-2">
              Add New Mission
            </h1>
            <p className="text-[#ffffffb2] text-sm sm:text-base">
              Define Your New Quest And Share Requirement
            </p>
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

              <div>
                <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-3">
                  Participants
                </label>
                <DarkProfessionalMultiSelect
                  users={users}
                  selectedIds={missionData.participants} // Now passes string[]
                  onChange={handleParticipantsChange} // Now receives string[]
                  placeholder="Choose participants..."
                />
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
            onClick={handleCreateMission}
            disabled={isLoading}
            className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              'Create Mission'
            )}
          </Button>
        </div>
      </div>
    );
  }









  // Main Missions Screen
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 bg-[#0a0a0a] min-h-screen overflow-y-auto">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-white text-2xl sm:text-3xl lg:text-[42px] tracking-[-0.5px] leading-tight lg:leading-[52px] font-['Rajdhani',Helvetica] font-bold mb-3">
          Missions 🎯
        </h1>
        <p className="font-['Rajdhani',Helvetica] font-medium text-[#ffffffb2] text-base sm:text-lg tracking-[-0.2px] leading-relaxed lg:leading-[28px]">
          Complete missions to earn XP, unlock achievements, and level up your gaming experience
        </p>
      </div>

      {/* Top Section - XP Journey moved here from Dashboard */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
        {/* Your XP Journey - Matching screenshot style */}
        <Card className="bg-[#111111] border-[#333333] overflow-hidden">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <ZapIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#30bdee]" />
              <CardTitle className="text-white font-['Rajdhani',Helvetica] font-bold text-lg sm:text-xl">
                Your XP Journey
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            {/* Current XP and Level */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div>
                <p className="text-[#ffffffb2] text-xs sm:text-sm mb-2">Current XP</p>
                <p className="text-white text-2xl sm:text-3xl font-bold">{userXP.current.toLocaleString()} XP</p>
              </div>
              <div>
                <p className="text-[#ffffffb2] text-xs sm:text-sm mb-2">XP Level</p>
                <p className="text-white text-2xl sm:text-3xl font-bold">Level {userXP.level}</p>
              </div>
            </div>

            {/* Progress Bar - Updated to match screenshot with orange/yellow gradient */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[#ffffffb2] text-xs sm:text-sm">Progress to Level {userXP.nextLevel}</span>
                <span className="text-white text-xs sm:text-sm font-medium">{userXP.xpToNext} XP to Level {userXP.nextLevel}</span>
              </div>
              <div className="relative">
                <div className="w-full bg-[#333333] rounded-full h-2 sm:h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 sm:h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                    style={{ width: `${((userXP.totalToNext - userXP.xpToNext) / userXP.totalToNext) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Achievements */}
        <Card className="bg-[#111111] border-[#333333] overflow-hidden">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <TrophyIcon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                <CardTitle className="text-white font-['Rajdhani',Helvetica] font-bold text-lg sm:text-xl">
                  Your Achievements
                </CardTitle>
              </div>
              <Button className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm w-full sm:w-auto">
                Earn 700 more XP to unlock
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="text-center">
                  <div className={`relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${achievement.color} rounded-2xl flex items-center justify-center mb-2 sm:mb-3 mx-auto shadow-lg ${!achievement.unlocked ? 'opacity-50 grayscale' : ''}`}>
                    <span className="text-lg sm:text-2xl">{achievement.icon}</span>
                    {!achievement.unlocked && (
                      <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                        <span className="text-white text-lg sm:text-2xl">🔒</span>
                      </div>
                    )}
                  </div>
                  <h3 className={`font-semibold text-xs sm:text-sm mb-1 ${achievement.unlocked ? 'text-white' : 'text-[#ffffffb2]'}`}>
                    {achievement.name}
                  </h3>
                  <p className={`text-xs ${achievement.unlocked ? 'text-[#30bdee]' : 'text-[#ffffffb2]'}`}>
                    {achievement.xp}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
        {/* Main Content Grid */}
        <div className="flex-1">
          {/* Missions List */}
          <Card className="bg-[#111111] border-[#333333] overflow-hidden">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 gap-4">
                <CardTitle className="text-white font-['Rajdhani',Helvetica] font-bold text-lg sm:text-xl">
                  Missions List
                </CardTitle>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                  <div className="relative">
                    <Input
                      className="h-8 sm:h-10 bg-[#0a0a0a] border-[#333333] rounded-lg pl-8 sm:pl-10 pr-4 font-['Rajdhani',Helvetica] font-medium text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all text-xs sm:text-sm w-full sm:w-48"
                      placeholder="Search Item"
                    />
                    <SearchIcon className="absolute w-3 h-3 sm:w-4 sm:h-4 top-2.5 sm:top-3 left-2.5 sm:left-3 text-[#ffffffb2]" />
                  </div>
                  <Button
                    variant="ghost"
                    className="h-8 sm:h-10 px-3 sm:px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg flex items-center gap-2 hover:bg-[#111111] hover:border-[#30bdee] transition-all text-[#ffffffb2] hover:text-white text-xs sm:text-sm whitespace-nowrap"
                  >
                    <span>Sort by</span>
                    <FilterIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  </Button>
                </div>
              </div>


              <div className="flex gap-4 sm:gap-6 border-b border-[#333333] overflow-x-auto">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`pb-2 sm:pb-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === "all"
                    ? "text-[#30bdee] border-b-2 border-[#30bdee]"
                    : "text-[#ffffffb2] hover:text-white"
                    }`}
                >
                  All Missions
                </button>
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`pb-2 sm:pb-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === "pending"
                    ? "text-[#30bdee] border-b-2 border-[#30bdee]"
                    : "text-[#ffffffb2] hover:text-white"
                    }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setActiveTab("completed")}
                  className={`pb-2 sm:pb-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === "completed"
                    ? "text-[#30bdee] border-b-2 border-[#30bdee]"
                    : "text-[#ffffffb2] hover:text-white"
                    }`}
                >
                  Completed
                </button>
              </div>
            </CardHeader>

            <CardContent className="px-3 sm:px-6">
              <div className="space-y-6 lg:space-y-8">
                {/* Group Mission Snapshot */}
                <div className="bg-[#111111] border border-[#333333] rounded-2xl p-3 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
                    <h3 className="text-white text-base sm:text-lg lg:text-xl font-bold leading-tight">
                      Group Mission snapshot
                    </h3>
                    <Button
                      className="bg-transparent border border-[#00cfff] text-[#00cfff] hover:bg-[#00cfff]/10 px-3 sm:px-4 py-2 rounded-lg text-sm transition-colors w-full sm:w-auto flex-shrink-0"
                      onClick={handleNewMission}
                    >
                      <PlusIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="whitespace-nowrap">New Mission</span>
                    </Button>
                  </div>

                  {/* Missions Table Header - Hidden on mobile */}
                  <div className="hidden lg:grid grid-cols-5 gap-2 p-3 bg-[#ffffff06] rounded-lg mb-4 text-[#ffffffb2] text-sm font-medium">
                    <div className="truncate">Missions</div>
                    <div className="truncate">XP Boost</div>
                    <div className="truncate">Coins</div>
                    <div className="truncate">Status</div>
                    <div className="truncate">Action</div>
                  </div>

                  {/* Missions List with Scroll */}
                  <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-[#111111] scrollbar-thumb-[#333333] hover:scrollbar-thumb-[#30bdee] pr-2">
                    <div className="space-y-2">
                      {filteredMissions.map((mission: any) => (
                        <div
                          key={mission.id}
                          className="lg:grid lg:grid-cols-5 lg:gap-2 p-3 bg-[#ffffff03] rounded-lg hover:bg-[#ffffff06] transition-colors lg:items-center"
                        >
                          {/* Mobile Card Layout */}
                          <div className="lg:hidden space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-white text-sm font-medium leading-tight flex-1 min-w-0 break-words">
                                {mission.title}
                              </p>
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium flex-shrink-0 ${mission.isActive
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-600 text-white"
                                  }`}
                              >
                                {mission.isActive ? "Active" : "Inactive"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <span className="text-yellow-400 text-sm font-bold flex-shrink-0">
                                  {mission.xpRewards}
                                </span>
                                <div className="flex items-center gap-1 min-w-0">
                                  <div className="w-3 h-3 bg-[#30bdee] rounded-full flex-shrink-0" />
                                  <span className="text-white text-sm truncate">{mission.coinsRewards}</span>
                                </div>
                              </div>
                              <div className="flex gap-1 flex-shrink-0">
                                <div className="flex gap-1 flex-shrink-0">
                                  <div className="flex gap-1">
                                    {mission?.UserQuest?.length === 0 ? (
                                      // ✅ Show START if user has not started the mission
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="w-28 bg-blue-600 text-white text-sm font-medium rounded text-center justify-center"
                                        onClick={() => handleStartMission(mission.id)}
                                      >
                                        <span className="truncate block w-full">Start</span>
                                      </Button>
                                    ) : mission?.UserQuest[0]?.UserQuestSteps?.length === mission?.QuestSteps?.length &&
                                      mission.UserQuest[0].UserQuestSteps.every((step: any) => step.isCompleted) ? (
                                      // ✅ Show COMPLETE if all steps are completed
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="w-28 bg-green-600 text-white text-sm font-medium rounded text-center justify-center"
                                        onClick={() => { handleCompleteQuest(mission?.QuestSteps[0]?.questId) }}
                                      >
                                        <span className="truncate block w-full">Complete</span>
                                      </Button>
                                    ) : (
                                      // ✅ Show CONTINUE in all other cases
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="w-28 bg-orange-600 text-white text-sm font-medium rounded text-center justify-center"
                                        onClick={() => {
                                          setShowSubmitMissionModal(!showSubmitMissionModal);
                                          setMyMissionData(mission);
                                        }}
                                      >
                                        <span className="truncate block w-full">Continue</span>
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Desktop Grid Layout */}
                          <div className="hidden lg:contents">
                            <div className="text-white text-sm truncate pr-2" title={mission.title}>
                              {mission.title}
                            </div>
                            <div className="text-yellow-400 text-sm font-bold truncate">
                              {mission.xpRewards}
                            </div>
                            <div className="flex items-center gap-1 min-w-0">
                              <div className="w-3 h-3 bg-[#30bdee] rounded-full flex-shrink-0" />
                              <span className="text-white text-sm truncate">{mission.coinsRewards}</span>
                            </div>
                            <div>
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium inline-block ${mission.isActive
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-600 text-white"
                                  }`}
                              >
                                {mission.isActive ? "Active" : "Inactive"}
                              </span>
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                              <div className="flex gap-1 flex-shrink-0">
                                <div className="flex gap-1">
                                  {mission?.UserQuest?.length === 0 ? (
                                    // ✅ Show START if user has not started the mission
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="w-28 bg-blue-600 text-white text-sm font-medium rounded text-center justify-center"
                                      onClick={() => handleStartMission(mission.id)}
                                    >
                                      <span className="truncate block w-full">Start</span>
                                    </Button>
                                  ) : mission?.UserQuest[0]?.UserQuestSteps?.length === mission?.QuestSteps?.length &&
                                    mission.UserQuest[0].UserQuestSteps.every((step: any) => step.isCompleted) ? (
                                    // ✅ Show COMPLETE if all steps are completed
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="w-28 bg-green-600 text-white text-sm font-medium rounded text-center justify-center"
                                      onClick={() => { handleCompleteQuest(mission?.QuestSteps[0]?.questId) }}                                    >
                                      <span className="truncate block w-full">Complete</span>
                                    </Button>
                                  ) : (
                                    // ✅ Show CONTINUE in all other cases
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="w-28 bg-orange-600 text-white text-sm font-medium rounded text-center justify-center"
                                      onClick={() => {
                                        setShowSubmitMissionModal(!showSubmitMissionModal);
                                        setMyMissionData(mission);
                                      }}
                                    >
                                      <span className="truncate block w-full">Continue</span>
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Right Column - XP History and Upcoming */}
        <div className="flex-1 xl:w-80 space-y-6 lg:space-y-8">
          {/* XP History */}
          <Card className="bg-[#111111] border-[#333333] overflow-hidden">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white font-['Rajdhani',Helvetica] font-bold text-lg sm:text-xl">
                  XP History
                </CardTitle>
                <Button variant="ghost" className="text-[#30bdee] hover:text-white text-xs sm:text-sm">
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* XP History List - Scrollable */}
              <div className="space-y-3 sm:space-y-4 max-h-64 sm:max-h-80 overflow-y-auto">
                {xpHistory.map((entry) => (
                  <div key={entry.id} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-[#ffffff06] rounded-lg hover:bg-[#ffffff08] transition-colors">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#30bdee] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs sm:text-sm">{entry.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs sm:text-sm leading-relaxed mb-1 break-words">{entry.action}</p>
                      <span className="text-[#ffffffb2] text-xs">{entry.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Missions */}
          <Card className="bg-[#111111] border-[#333333] overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-white text-lg sm:text-xl font-bold mb-2">
                  You're <span className="text-[#30bdee]">200 XP</span> away from Level 9
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {upcomingMissions.map((mission) => (
                  <div key={mission.id} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-[#ffffff06] rounded-lg">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#30bdee] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs sm:text-sm">📋</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs sm:text-sm font-medium truncate">{mission.title}</p>
                      <p className="text-[#ffffffb2] text-xs">{mission.description}</p>
                    </div>
                    <span className="text-[#30bdee] font-bold text-xs sm:text-sm">{mission.xp}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
                <Button className="flex-1 bg-[#30bdee] hover:bg-[#2aa3d1] text-white rounded-lg text-sm">
                  Explore Missions
                </Button>
                <Button variant="outline" className="flex-1 border-[#333333] text-white bg-[#ffffff12] rounded-lg text-sm">
                  See All Badges
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

  );
};