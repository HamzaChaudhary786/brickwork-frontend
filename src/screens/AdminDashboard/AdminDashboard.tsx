import { UsersIcon, ShoppingBagIcon, TrendingUpIcon, DollarSignIcon, SearchIcon, FilterIcon, MoreHorizontalIcon, CheckIcon, XIcon, EyeIcon, PlusIcon, EditIcon, TrashIcon, InfoIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ApproveModal, RejectModal } from "../../components/ui/approve-reject-modals";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { DeleteConfirmationModal } from "../../components/ui/delete-confirmation-modal";
import { getPendingMissionRequest, PendingMission } from "../../apis/getMissionPendingRequest";
import { approveMissionRequest } from "../../apis/approvedMissionRequest";
import { rejectMissionRequest } from "../../apis/rejectMissionRequest";

export const AdminDashboard = (): JSX.Element => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{
    type: string;
    name: string;
    id: number;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPlayerInfoModal, setShowPlayerInfoModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showAddParticipantsModal, setShowAddParticipantsModal] = useState(false);
  const [showAddBadgesModal, setShowAddBadgesModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [newRole, setNewRole] = useState({
    discordRole: 'Mission Reviewers',
    interval: 'Daily',
    xpReward: '+25',
    coinsReward: '00',
    enableStatus: true
  });
  const [selectedMission, setSelectedMission] = useState('Join Your First Group');
  const [selectedBadge, setSelectedBadge] = useState('Welcome Aboard');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [selectedBadgeUsers, setSelectedBadgeUsers] = useState<string[]>([]);


  const [missionsRequest, setMissionsRequest] = useState<PendingMission[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await getPendingMissionRequest();
        setMissionsRequest(response.result);
      } catch (err: any) {
        setError(err.message || "Failed to load missions");
      }
    };

    fetchMissions();
  }, []);

  console.log(missionsRequest, "this is my missionRequest");


  // Sample users data for participants and badges
  const sampleUsers = [
    { id: '1', name: 'SandGamer #5678', role: 'Member', avatar: 'SG' },
    { id: '2', name: 'AlliGamer1234', role: 'Subscriber', avatar: 'AG' },
    { id: '3', name: 'PixelArtist#3456', role: 'Mission Reviewer', avatar: 'PA' },
    { id: '4', name: 'CodeNinja#9012', role: 'Event Organizer', avatar: 'CN' },
    { id: '5', name: 'Johny #5678', role: 'Streamer', avatar: 'JH' }
  ];

  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      icon: UsersIcon,
      color: "text-[#30bdee]",
      bgColor: "bg-[#30bdee]/10",
      change: "+12%",
      changeColor: "text-green-400"
    },
    {
      title: "Total Sales",
      value: "$45,231",
      icon: DollarSignIcon,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      change: "+8%",
      changeColor: "text-green-400"
    },
    {
      title: "Orders",
      value: "1,234",
      icon: ShoppingBagIcon,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      change: "+15%",
      changeColor: "text-green-400"
    },
    {
      title: "Revenue",
      value: "$12,847",
      icon: TrendingUpIcon,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      change: "+5%",
      changeColor: "text-green-400"
    },
  ];

  const missions = [
    {
      id: 1,
      user: "Ali",
      userId: "#123",
      avatar: "A1",
      mission: "Submit Bug Report",
      date: "Jul 01 2025",
      status: "pending",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      user: "CodeNinja",
      userId: "#4902",
      avatar: "CN",
      mission: "Link Your Steam Account",
      date: "Jul 01 2025",
      status: "pending",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      user: "SandGamer",
      userId: "#5678",
      avatar: "SG",
      mission: "Invite Three Friends From Discord",
      date: "Jul 01 2025",
      status: "pending",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      user: "PixelArtist",
      userId: "#3456",
      avatar: "PA",
      mission: "Welcome: Complete Onboarding",
      date: "Jul 01 2025",
      status: "pending",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const boostedRoles = [
    {
      id: 1,
      role: "Subscriber",
      coins: "+5",
      xpReward: "+300XP",
      interval: "Daily",
      status: true,
      color: "bg-green-500"
    },
    {
      id: 2,
      role: "VIP",
      coins: "+15",
      xpReward: "+500XP",
      interval: "Weekly",
      status: false,
      color: "bg-yellow-500"
    },
    {
      id: 3,
      role: "Moderator",
      coins: "+5",
      xpReward: "+400XP",
      interval: "3 Days",
      status: true,
      color: "bg-blue-500"
    },
    {
      id: 4,
      role: "Contributor",
      coins: "+15",
      xpReward: "+200XP",
      interval: "Monthly",
      status: false,
      color: "bg-purple-500"
    },
    {
      id: 5,
      role: "Event Organizer",
      coins: "+15",
      xpReward: "+400XP",
      interval: "Monthly",
      status: false,
      color: "bg-orange-500"
    }
  ];

  const awardedMissions = [
    { id: 1, mission: "Welcome Aboard Badge", assignedUser: "04", date: "June 01 2025" },
    { id: 2, mission: "Submit Bug Report", assignedUser: "02", date: "June 28 2025" },
    { id: 3, mission: "Link Your Steam Account", assignedUser: "12", date: "June 28 2025" },
    { id: 4, mission: "Invite Three Friends From Discord", assignedUser: "14", date: "June 28 2025" },
    { id: 5, mission: "Welcome Complete Onboarding", assignedUser: "10", date: "June 28 2025" },
    { id: 6, mission: "Welcome Complete Onboarding", assignedUser: "10", date: "June 28 2025" }
  ];

  const assignedBadges = [
    { id: 1, badgeName: "Social Butterfly", assignedUser: "04", date: "June 01 2025", icon: "🦋" },
    { id: 2, badgeName: "Welcome Aboard", assignedUser: "02", date: "June 28 2025", icon: "🌟" },
    { id: 3, badgeName: "Event Champion", assignedUser: "12", date: "June 28 2025", icon: "🏆" },
    { id: 4, badgeName: "Champion's Crest", assignedUser: "14", date: "June 28 2025", icon: "👑" },
    { id: 5, badgeName: "Social Butterfly", assignedUser: "10", date: "June 28 2025", icon: "🦋" },
    { id: 6, badgeName: "Game Champion", assignedUser: "10", date: "June 28 2025", icon: "🎮" }
  ];

  const pendingApplications = [
    {
      id: 1,
      user: "Gamer 123",
      avatar: "G1",
      message: "I'm an active streamer, happy to help!",
      color: "from-blue-500 to-blue-600",
      playerInfo: {
        joinDate: "March 15, 2024",
        level: 8,
        xp: "2,450 XP",
        gamesPlayed: 156,
        winRate: "68%",
        discordId: "Gamer123#4567",
        steamConnected: true,
        lastActive: "2 hours ago"
      }
    },
    {
      id: 2,
      user: "QuestMaster#3344",
      avatar: "QM",
      message: "Experienced moderator - here to support the team",
      color: "from-green-500 to-green-600",
      playerInfo: {
        joinDate: "January 8, 2024",
        level: 15,
        xp: "8,920 XP",
        gamesPlayed: 342,
        winRate: "74%",
        discordId: "QuestMaster#3344",
        steamConnected: true,
        lastActive: "1 hour ago"
      }
    },
    {
      id: 3,
      user: "SkyRider#7788",
      avatar: "SR",
      message: "Ready to test new missions and report bugs helping improve it to customers",
      color: "from-purple-500 to-purple-600",
      playerInfo: {
        joinDate: "February 22, 2024",
        level: 12,
        xp: "5,680 XP",
        gamesPlayed: 198,
        winRate: "71%",
        discordId: "SkyRider#7788",
        steamConnected: false,
        lastActive: "30 minutes ago"
      }
    }
  ];

  const activityLog = [
    {
      id: 1,
      user: "SandGamer #5678",
      avatar: "SG",
      action: "Changed The Group Description",
      time: "Jul 01, 09:45 AM",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      user: "Tournament Bot",
      avatar: "TB",
      action: "Toggled Tournament Mode: ON",
      time: "Jun 14, 10:05 AM",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 3,
      user: "QuestMaster#3344",
      avatar: "QM",
      action: "Posted A New Announcement: 'Weekly Raid Signup Open'",
      time: "Jun 12, 02:45 PM",
      color: "from-green-500 to-green-600"
    },
    {
      id: 4,
      user: "SkyRider#7788",
      avatar: "SR",
      action: "Approved \"GameGuild#7821\" Join Request",
      time: "Jun 11, 04:15 PM",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 5,
      user: "AirForce#934",
      avatar: "AF",
      action: "Removed \"NooMaster#9901\"",
      time: "Jun 12, 08:30 AM",
      color: "from-red-500 to-red-600"
    },
    {
      id: 6,
      user: "QuestMaster#3344",
      avatar: "QM",
      action: "Removed \"NooMaster#9901\"",
      time: "Jun 10, 08:00 AM",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

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

  const handleShowPlayerInfo = (player: any) => {
    setSelectedPlayer(player);
    setShowPlayerInfoModal(true);
  };

  const handleClosePlayerInfo = () => {
    setShowPlayerInfoModal(false);
    setSelectedPlayer(null);
  };

  const handleApproveClick = (applicant?: any) => {
    setSelectedApplicant(applicant);
    setShowApproveModal(true);
  };

  const handleRejectClick = (applicant?: any) => {
    setSelectedApplicant(applicant);
    setShowRejectModal(true);
  };

  const handleApproveConfirm = async () => {
    setIsApproving(true);

    // Simulate approval process
    setTimeout(() => {
      console.log('Approving applicant:', selectedApplicant?.name || 'selected applicant');
      setIsApproving(false);
      setShowApproveModal(false);
      setSelectedApplicant(null);
      // Here you would typically update the application status in your data
    }, 2000);
  };

  const handleRejectConfirm = async () => {
    setIsRejecting(true);

    // Simulate rejection process
    setTimeout(() => {
      console.log('Rejecting applicant:', selectedApplicant?.name || 'selected applicant');
      setIsRejecting(false);
      setShowRejectModal(false);
      setSelectedApplicant(null);
      // Here you would typically update the application status in your data
    }, 2000);
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
      case "badge":
        return {
          title: "Delete Badge",
          description: "Are you sure you want to delete this badge? This will remove it from all users who have earned it."
        };
      case "application":
        return {
          title: "Delete Application",
          description: "Are you sure you want to delete this application? The user will not be notified of this action."
        };
      default:
        return {
          title: "Delete Item",
          description: "Are you sure you want to delete this item? This action cannot be undone."
        };
    }
  };


  const handleApprove = async (missionId: string) => {
    const response = await approveMissionRequest(missionId);

    if (response.success) {
      console.log('Request approved successfully:', response.result);
    } else {
      console.error('Failed to approve request:', response.message);
    }
  };

  const handleReject = async (missionId: string) => {
    const response = await rejectMissionRequest(missionId);

    if (response.success) {
      console.log('Request rejected successfully:', response.result);
      // Show success message or refresh list
    } else {
      console.error('Failed to reject request:', response.message);
      // Show error message
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 bg-[#0a0a0a] min-h-screen">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-white text-2xl sm:text-3xl lg:text-[42px] tracking-[-0.5px] leading-tight lg:leading-[52px] font-['Rajdhani',Helvetica] font-bold mb-3">
          Admin Dashboard
        </h1>
        <p className="font-['Rajdhani',Helvetica] font-medium text-[#ffffffb2] text-base sm:text-lg tracking-[-0.2px] leading-relaxed lg:leading-[28px]">
          Centralize Control, Streamline Rewards, And Empower Your Community
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Input
          className="h-12 bg-[#1a1a1a] border-[#333333] rounded-lg pl-12 pr-4 font-['Rajdhani',Helvetica] font-medium text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#222222] transition-all text-base"
          placeholder="Search Users/Missions/Groups/Roles"
        />
        <SearchIcon className="absolute w-5 h-5 top-3.5 left-4 text-[#ffffffb2]" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-[#111111] border-[#333333]">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 lg:w-12 lg:h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.color}`} />
                </div>
                <span className={`text-sm font-medium ${stat.changeColor}`}>{stat.change}</span>
              </div>
              <div>
                <p className="text-[#ffffffb2] text-sm mb-1">{stat.title}</p>
                <p className="text-white text-xl lg:text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Column */}
        <div className="space-y-6 lg:space-y-8">
          {/* Missions Table */}
          <Card className="bg-[#111111] border-[#333333]">
            <CardHeader>
              <CardTitle className="text-white font-['Rajdhani',Helvetica] font-bold text-xl">
                Missions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Table Header - Fixed column distribution */}
              <div className="hidden lg:grid grid-cols-12 gap-3 p-3 bg-[#ffffff06] rounded-lg mb-4 text-[#ffffffb2] text-sm font-medium">
                <div className="col-span-3">User</div>
                <div className="col-span-4">Missions</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-3">Action</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-2">
                {missionsRequest.map((mission: any) => {
                  const avatar = mission.user.name?.charAt(0).toUpperCase() || "?";
                  const color = "from-blue-500 to-cyan-500"; // or make dynamic per user
                  const date = new Date().toLocaleDateString(); // Replace with actual date if available

                  return (
                    <div
                      key={mission.id}
                      className="lg:grid lg:grid-cols-12 lg:gap-3 p-3 bg-[#ffffff03] rounded-lg hover:bg-[#ffffff06] transition-colors lg:items-center"
                    >
                      {/* Mobile Layout */}
                      <div className="lg:hidden space-y-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 bg-gradient-to-br ${color} rounded-full flex items-center justify-center`}
                          >
                            <span className="text-white font-bold text-xs">{avatar}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium text-sm">{mission.user.name}</span>
                              <span className="text-[#ffffffb2] text-xs">{mission.user.id}</span>
                            </div>
                            <p className="text-[#ffffffb2] text-xs">{date}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-white text-sm">{mission.quest.title}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="flex-1 text-red-400 hover:text-red-300 hover:bg-red-400/10 text-xs"
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 bg-[#30bdee] hover:bg-[#2aa3d1] text-white text-xs"
                          >
                            Approve
                          </Button>
                        </div>
                      </div>

                      {/* Desktop Grid Layout */}
                      <div className="hidden lg:contents">
                        {/* User */}
                        <div className="col-span-3 flex items-center gap-2">
                          <div
                            className={`w-8 h-8 bg-gradient-to-br ${color} rounded-full flex items-center justify-center flex-shrink-0`}
                          >
                            <span className="text-white font-bold text-xs">{avatar}</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1">
                              <span className="text-white text-sm font-medium truncate">
                                {mission.user.name}
                              </span>
                              {/* <span className="text-[#ffffffb2] text-xs flex-shrink-0">
                                {mission.user.id}
                              </span> */}
                            </div>
                          </div>
                        </div>

                        {/* Mission */}
                        <div className="col-span-4 text-white text-sm pr-2">
                          {mission.quest.title}
                        </div>

                        {/* Date */}
                        <div className="col-span-2 text-[#ffffffb2] text-sm">{date}</div>

                        {/* Actions */}
                        <div className="col-span-3 flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"

                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10 px-2 py-1 rounded text-xs flex-1 min-w-0"
                            onClick={() => {
                              handleReject(mission.id)
                            }}
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"

                            className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white px-2 py-1 rounded text-xs flex-1 min-w-0"
                            onClick={() => {
                              handleApprove(mission.id)
                            }}
                          >
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* View All Button */}
              <div className="mt-4 text-center">
                <Button variant="ghost" className="text-[#30bdee] text-sm">
                  View All Missions
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Awarded Missions */}
          <Card className="bg-[#111111] border-[#333333]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white font-['Rajdhani',Helvetica] font-bold text-xl">
                  Awarded Missions
                </CardTitle>
                <Button className="bg-transparent border border-[#00cfff] text-[#00cfff] hover:bg-[#00cfff]/10 px-4 py-2 rounded-lg text-sm">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  <span onClick={() => setShowAddParticipantsModal(true)}>Add Participants</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Table Header - Fixed column distribution */}
              <div className="hidden lg:grid grid-cols-12 gap-3 p-3 bg-[#ffffff06] rounded-lg mb-4 text-[#ffffffb2] text-sm font-medium">
                <div className="col-span-5">Mission</div>
                <div className="col-span-2">Assigned User</div>
                <div className="col-span-5">Date & Action</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {awardedMissions.map((mission, index) => (
                  <div key={index} className="lg:grid lg:grid-cols-12 lg:gap-3 p-3 bg-[#ffffff03] rounded-lg hover:bg-[#ffffff06] transition-colors lg:items-center">
                    {/* Mobile Layout */}
                    <div className="lg:hidden space-y-2">
                      <div className="text-white text-sm font-medium">{mission.mission}</div>
                      <div className="flex justify-between">
                        <span className="text-[#ffffffb2] text-xs">User: {mission.assignedUser}</span>
                        <span className="text-[#ffffffb2] text-xs">{mission.date}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button className="bg-[#30bdee] text-white px-3 py-1 rounded text-xs flex-shrink-0 whitespace-nowrap hover:bg-[#30bdee] hover:text-white">
                          View Participants
                        </Button>
                        <Button
                          onClick={() => handleDeleteClick("mission", mission.mission, mission.id)}
                          size="sm"
                          variant="ghost"
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Desktop Layout - Fixed spacing */}
                    <div className="hidden lg:contents">
                      <div className="col-span-5 text-white text-sm pr-2">{mission.mission}</div>
                      <div className="col-span-2 text-[#ffffffb2] text-sm text-center">{mission.assignedUser}</div>
                      <div className="col-span-5 flex items-center justify-between gap-3">
                        <span className="text-[#ffffffb2] text-sm flex-shrink-0">{mission.date}</span>
                        <div className="flex gap-1">
                          <Button className="bg-[#30bdee] text-white px-3 py-1 rounded text-xs flex-shrink-0 whitespace-nowrap hover:bg-[#30bdee] hover:text-white">
                            View Participants
                          </Button>
                          <Button
                            onClick={() => handleDeleteClick("mission", mission.mission, mission.id)}
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-1"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              <div className="mt-4 text-center">
                <Button variant="ghost" className="text-[#30bdee] text-sm">
                  View All Awarded Missions
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pending Applications */}
          <Card className="bg-[#111111] border-[#333333]">
            <CardHeader>
              <CardTitle className="text-white font-['Rajdhani',Helvetica] font-bold text-xl">
                Pending Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingApplications.map((application) => (
                <div key={application.id} className="p-4 bg-[#ffffff06] rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${application.color} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">{application.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-white font-semibold">{application.user}</span>
                    </div>
                    <Button
                      onClick={() => handleShowPlayerInfo(application)}
                      size="sm"
                      variant="ghost"
                      className="text-[#30bdee] hover:text-white hover:bg-[#30bdee]/20 p-2"
                      title="View Player Info"
                    >
                      <InfoIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-[#ffffffb2] text-sm mb-4 leading-relaxed">{application.message}</p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleRejectClick(application)}
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10 px-4 py-2 rounded-lg"
                    >
                      Reject
                    </Button>
                    <Button onClick={() => handleApproveClick(application)}
                      size="sm"
                      className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white px-4 py-2 rounded-lg">
                      Approve
                    </Button>
                  </div>
                </div>
              ))}

              {/* View All Button */}
              <div className="text-center pt-2">
                <Button variant="ghost" className="text-[#30bdee] text-sm">
                  View All Applications
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6 lg:space-y-8">
          {/* Boosted Roles */}
          <Card className="bg-[#111111] border-[#333333]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white font-['Rajdhani',Helvetica] font-bold text-xl">
                  Boosted Roles
                </CardTitle>
                <Button className="bg-transparent border border-[#00cfff] text-[#00cfff] hover:bg-[#00cfff]/10 px-4 py-2 rounded-lg text-sm">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  <span onClick={() => setShowAddRoleModal(true)}>Add Role Reward</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Table Header - Optimized for smaller space */}
              <div className="hidden lg:grid grid-cols-12 gap-2 p-3 bg-[#ffffff06] rounded-lg mb-4 text-[#ffffffb2] text-sm font-medium">
                <div className="col-span-3">Discord Role</div>
                <div className="col-span-1">Coin</div>
                <div className="col-span-2">XP Reward</div>
                <div className="col-span-2">Interval</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Action</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-2">
                {boostedRoles.map((role) => (
                  <div key={role.id} className="lg:grid lg:grid-cols-12 lg:gap-2 p-3 bg-[#ffffff03] rounded-lg hover:bg-[#ffffff06] transition-colors lg:items-center">
                    {/* Mobile Layout */}
                    <div className="lg:hidden space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 ${role.color} rounded-full`} />
                          <span className="text-white text-sm font-medium">{role.role}</span>
                        </div>
                        <div className={`w-6 h-3 rounded-full ${role.status ? 'bg-green-500' : 'bg-gray-500'} relative`}>
                          <div className={`w-3 h-3 bg-white rounded-full absolute top-0 transition-transform ${role.status ? 'translate-x-3' : 'translate-x-0'}`} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#ffffffb2]">{role.coins} • {role.xpReward}</span>
                        <span className="text-[#ffffffb2]">{role.interval}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="text-[#ffffffb2] hover:text-white p-1">
                          <EditIcon className="w-3 h-3" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteClick("role", role.role, role.id)}
                          size="sm"
                          variant="ghost"
                          className="text-[#ffffffb2] hover:text-red-400 p-1"
                        >
                          <TrashIcon className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Desktop Layout - Optimized column spans */}
                    <div className="hidden lg:contents">
                      <div className="col-span-3 flex items-center gap-2">
                        <div className={`w-3 h-3 ${role.color} rounded-full flex-shrink-0`} />
                        <span className="text-white text-sm truncate">{role.role}</span>
                      </div>
                      <div className="col-span-1 text-[#ffffffb2] text-sm">{role.coins}</div>
                      <div className="col-span-2 text-[#ffffffb2] text-sm">{role.xpReward}</div>
                      <div className="col-span-2 text-[#ffffffb2] text-sm">{role.interval}</div>
                      <div className="col-span-2">
                        <div className={`w-6 h-3 rounded-full ${role.status ? 'bg-green-500' : 'bg-gray-500'} relative`}>
                          <div className={`w-3 h-3 bg-white rounded-full absolute top-0 transition-transform ${role.status ? 'translate-x-3' : 'translate-x-0'}`} />
                        </div>
                      </div>
                      <div className="col-span-2 flex gap-1">
                        <Button size="sm" variant="ghost" className="text-[#ffffffb2] hover:text-white p-1">
                          <EditIcon className="w-3 h-3" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteClick("role", role.role, role.id)}
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

              {/* View All Button */}
              <div className="mt-4 text-center">
                <Button variant="ghost" className="text-[#30bdee] text-sm">
                  View All Roles
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Assigned Badges */}
          <Card className="bg-[#111111] border-[#333333]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white font-['Rajdhani',Helvetica] font-bold text-xl">
                  Assigned Badges
                </CardTitle>
                <Button className="bg-transparent border border-[#00cfff] text-[#00cfff] hover:bg-[#00cfff]/10 px-4 py-2 rounded-lg text-sm">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  <span onClick={() => setShowAddBadgesModal(true)}>Add Badges</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Table Header - Fixed column distribution */}
              <div className="hidden lg:grid grid-cols-12 gap-3 p-3 bg-[#ffffff06] rounded-lg mb-4 text-[#ffffffb2] text-sm font-medium">
                <div className="col-span-5">Badge Name</div>
                <div className="col-span-2">Assigned User</div>
                <div className="col-span-5">Date & Action</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {assignedBadges.map((badge, index) => (
                  <div key={index} className="lg:grid lg:grid-cols-12 lg:gap-3 p-3 bg-[#ffffff03] rounded-lg hover:bg-[#ffffff06] transition-colors lg:items-center">
                    {/* Mobile Layout */}
                    <div className="lg:hidden space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{badge.icon}</span>
                        <span className="text-white text-sm font-medium">{badge.badgeName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#ffffffb2] text-xs">User: {badge.assignedUser}</span>
                        <span className="text-[#ffffffb2] text-xs">{badge.date}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-[#30bdee] text-white text-xs">
                          View Participants
                        </Button>
                        <Button
                          onClick={() => handleDeleteClick("badge", badge.badgeName, badge.id)}
                          size="sm"
                          variant="ghost"
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Desktop Layout - Fixed spacing */}
                    <div className="hidden lg:contents">
                      <div className="col-span-5 flex items-center gap-2 pr-2">
                        <span className="text-lg flex-shrink-0">{badge.icon}</span>
                        <span className="text-white text-sm truncate">{badge.badgeName}</span>
                      </div>
                      <div className="col-span-2 text-[#ffffffb2] text-sm text-center">{badge.assignedUser}</div>
                      <div className="col-span-5 flex items-center justify-between gap-3">
                        <span className="text-[#ffffffb2] text-sm flex-shrink-0">{badge.date}</span>
                        <div className="flex gap-1">
                          <Button className="bg-[#30bdee] text-white px-3 py-1 rounded text-xs flex-shrink-0 whitespace-nowrap">
                            View Participants
                          </Button>
                          <Button
                            onClick={() => handleDeleteClick("badge", badge.badgeName, badge.id)}
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-1"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              <div className="mt-4 text-center">
                <Button variant="ghost" className="text-[#30bdee] text-sm">
                  View All Badges
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Activity Log */}
          <Card className="bg-[#111111] border-[#333333]">
            <CardHeader>
              <CardTitle className="text-white font-['Rajdhani',Helvetica] font-bold text-xl">
                Activity Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {activityLog.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-[#ffffff06] rounded-lg hover:bg-[#ffffff08] transition-colors">
                    <div className={`w-8 h-8 bg-gradient-to-br ${activity.color} rounded-full flex items-center justify-center flex-shrink-0`}>
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

              {/* View All Button */}
              <div className="mt-4 text-center">
                <Button variant="ghost" className="text-[#30bdee] text-sm">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Player Info Modal */}
      {showPlayerInfoModal && selectedPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClosePlayerInfo}
          />

          {/* Modal */}
          <div className="relative bg-[#111111] w-full max-w-md rounded-2xl border border-[#333333] p-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-bold">Player Information</h3>
              <Button
                variant="ghost"
                onClick={handleClosePlayerInfo}
                className="text-[#ffffffb2] hover:text-white p-2"
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </div>

            {/* Player Avatar and Name */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 bg-gradient-to-br ${selectedPlayer.color} rounded-full flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">{selectedPlayer.avatar}</span>
              </div>
              <div>
                <h4 className="text-white text-lg font-semibold">{selectedPlayer.user}</h4>
                <p className="text-[#ffffffb2] text-sm">{selectedPlayer.playerInfo.discordId}</p>
              </div>
            </div>

            {/* Player Stats */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#ffffff06] p-3 rounded-lg">
                  <p className="text-[#ffffffb2] text-xs mb-1">Level</p>
                  <p className="text-white text-lg font-bold">{selectedPlayer.playerInfo.level}</p>
                </div>
                <div className="bg-[#ffffff06] p-3 rounded-lg">
                  <p className="text-[#ffffffb2] text-xs mb-1">XP Earned</p>
                  <p className="text-white text-lg font-bold">{selectedPlayer.playerInfo.xp}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#ffffff06] p-3 rounded-lg">
                  <p className="text-[#ffffffb2] text-xs mb-1">Games Played</p>
                  <p className="text-white text-lg font-bold">{selectedPlayer.playerInfo.gamesPlayed}</p>
                </div>
                <div className="bg-[#ffffff06] p-3 rounded-lg">
                  <p className="text-[#ffffffb2] text-xs mb-1">Win Rate</p>
                  <p className="text-white text-lg font-bold">{selectedPlayer.playerInfo.winRate}</p>
                </div>
              </div>

              <div className="bg-[#ffffff06] p-3 rounded-lg">
                <p className="text-[#ffffffb2] text-xs mb-1">Join Date</p>
                <p className="text-white text-sm">{selectedPlayer.playerInfo.joinDate}</p>
              </div>

              <div className="bg-[#ffffff06] p-3 rounded-lg">
                <p className="text-[#ffffffb2] text-xs mb-1">Last Active</p>
                <p className="text-white text-sm">{selectedPlayer.playerInfo.lastActive}</p>
              </div>

              <div className="bg-[#ffffff06] p-3 rounded-lg">
                <p className="text-[#ffffffb2] text-xs mb-2">Steam Account</p>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${selectedPlayer.playerInfo.steamConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-white text-sm">
                    {selectedPlayer.playerInfo.steamConnected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>
              </div>

              {/* Application Message */}
              <div className="bg-[#ffffff06] p-3 rounded-lg">
                <p className="text-[#ffffffb2] text-xs mb-2">Application Message</p>
                <p className="text-white text-sm leading-relaxed">{selectedPlayer.message}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => handleDeleteClick("application", selectedPlayer.user, selectedPlayer.id)}
                variant="outline"
                className="flex-1 border-red-400 text-red-400 hover:bg-red-400/10 rounded-lg"
              >
                Reject
              </Button>
              <Button
                className="flex-1 bg-[#30bdee] hover:bg-[#2aa3d1] text-white rounded-lg"
              >
                Approve
              </Button>
            </div>
          </div>
        </div>
      )}

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

      {/* Add Role Reward Modal */}
      {showAddRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAddRoleModal(false)}
          />

          <div className="relative bg-[#111111] w-full max-w-md rounded-2xl border border-[#333333] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-bold">Add Role Reward</h3>
              <Button
                variant="ghost"
                onClick={() => setShowAddRoleModal(false)}
                className="text-[#ffffffb2] hover:text-white p-2"
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[#ffffffb2] text-sm block mb-2">Select Discord Role</label>
                <Select value={newRole.discordRole} onValueChange={(value) => setNewRole({ ...newRole, discordRole: value })}>
                  <SelectTrigger className="bg-[#0a0a0a] border-[#333333] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111] border-[#333333]">
                    <SelectItem value="Mission Reviewers" className="text-white hover:bg-[#333333]">Mission Reviewers</SelectItem>
                    <SelectItem value="Event Organizer" className="text-white hover:bg-[#333333]">Event Organizer</SelectItem>
                    <SelectItem value="Moderator" className="text-white hover:bg-[#333333]">Moderator</SelectItem>
                    <SelectItem value="VIP" className="text-white hover:bg-[#333333]">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-[#ffffffb2] text-sm block mb-2">Set Interval</label>
                <Select value={newRole.interval} onValueChange={(value) => setNewRole({ ...newRole, interval: value })}>
                  <SelectTrigger className="bg-[#0a0a0a] border-[#333333] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111] border-[#333333]">
                    <SelectItem value="Daily" className="text-white hover:bg-[#333333]">Daily</SelectItem>
                    <SelectItem value="Weekly" className="text-white hover:bg-[#333333]">Weekly</SelectItem>
                    <SelectItem value="Monthly" className="text-white hover:bg-[#333333]">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#ffffffb2] text-sm block mb-2">XP Reward</label>
                  <Input
                    value={newRole.xpReward}
                    onChange={(e) => setNewRole({ ...newRole, xpReward: e.target.value })}
                    className="bg-[#0a0a0a] border-[#333333] text-white"
                    placeholder="+25"
                  />
                </div>
                <div>
                  <label className="text-[#ffffffb2] text-sm block mb-2">Coins Reward</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full" />
                    <Input
                      value={newRole.coinsReward}
                      onChange={(e) => setNewRole({ ...newRole, coinsReward: e.target.value })}
                      className="bg-[#0a0a0a] border-[#333333] text-white pl-10"
                      placeholder="00"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-[#ffffffb2] text-sm">Enable Status</label>
                <div
                  className={`w-12 h-6 rounded-full cursor-pointer transition-colors ${newRole.enableStatus ? 'bg-[#30bdee]' : 'bg-gray-600'}`}
                  onClick={() => setNewRole({ ...newRole, enableStatus: !newRole.enableStatus })}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-transform ${newRole.enableStatus ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setShowAddRoleModal(false)}
                variant="outline"
                className="flex-1 border-[#333333] text-[#ffffffb2] hover:text-white hover:bg-[#ffffff12]"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log('Adding role:', newRole);
                  setShowAddRoleModal(false);
                }}
                className="flex-1 bg-[#30bdee] hover:bg-[#2aa3d1] text-white"
              >
                Add Role
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Participants Modal */}
      {showAddParticipantsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAddParticipantsModal(false)}
          />

          <div className="relative bg-[#111111] w-full max-w-md rounded-2xl border border-[#333333] p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-bold">Add Participants</h3>
              <Button
                variant="ghost"
                onClick={() => setShowAddParticipantsModal(false)}
                className="text-[#ffffffb2] hover:text-white p-2"
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[#ffffffb2] text-sm block mb-2">Select Mission</label>
                <Select value={selectedMission} onValueChange={setSelectedMission}>
                  <SelectTrigger className="bg-[#0a0a0a] border-[#333333] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111] border-[#333333]">
                    <SelectItem value="Join Your First Group" className="text-white hover:bg-[#333333]">Join Your First Group</SelectItem>
                    <SelectItem value="Complete Daily Login" className="text-white hover:bg-[#333333]">Complete Daily Login</SelectItem>
                    <SelectItem value="Submit Bug Report" className="text-white hover:bg-[#333333]">Submit Bug Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-[#ffffffb2] text-sm block mb-2">Select Participants</label>

                <div className="relative mb-3">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#ffffffb2]" />
                  <Input
                    placeholder="Search"
                    className="bg-[#0a0a0a] border-[#333333] text-white pl-10"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Select defaultValue="role">
                      <SelectTrigger className="bg-transparent border-none text-[#ffffffb2] text-sm w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111111] border-[#333333]">
                        <SelectItem value="role" className="text-white">By Role</SelectItem>
                        <SelectItem value="name" className="text-white">By Name</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-between mb-3">
                  <Button
                    variant="ghost"
                    className="text-[#30bdee] hover:text-white text-sm"
                    onClick={() => setSelectedParticipants(sampleUsers.map(u => u.id))}
                  >
                    Select All
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-[#ffffffb2] hover:text-white text-sm"
                    onClick={() => setSelectedParticipants([])}
                  >
                    Clear All
                  </Button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {sampleUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-2 bg-[#ffffff06] rounded-lg">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedParticipants.includes(user.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedParticipants([...selectedParticipants, user.id]);
                            } else {
                              setSelectedParticipants(selectedParticipants.filter(id => id !== user.id));
                            }
                          }}
                          className="text-[#30bdee]"
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">{user.avatar}</span>
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{user.name}</p>
                        </div>
                      </div>
                      <span className="text-[#ffffffb2] text-xs">{user.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setShowAddParticipantsModal(false)}
                variant="outline"
                className="flex-1 border-[#333333] text-[#ffffffb2] hover:text-white hover:bg-[#ffffff12]"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log('Adding participants:', selectedParticipants, 'to mission:', selectedMission);
                  setShowAddParticipantsModal(false);
                }}
                className="flex-1 bg-[#30bdee] hover:bg-[#2aa3d1] text-white"
              >
                Mark Completed
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Badges Modal */}
      {showAddBadgesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAddBadgesModal(false)}
          />

          <div className="relative bg-[#111111] w-full max-w-md rounded-2xl border border-[#333333] p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-bold">Add Badges</h3>
              <Button
                variant="ghost"
                onClick={() => setShowAddBadgesModal(false)}
                className="text-[#ffffffb2] hover:text-white p-2"
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[#ffffffb2] text-sm block mb-2">Select Badges</label>
                <Select value={selectedBadge} onValueChange={setSelectedBadge}>
                  <SelectTrigger className="bg-[#0a0a0a] border-[#333333] text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111] border-[#333333]">
                    <SelectItem value="Welcome Aboard" className="text-white hover:bg-[#333333]">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        Welcome Aboard
                      </div>
                    </SelectItem>
                    <SelectItem value="Social Butterfly" className="text-white hover:bg-[#333333]">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">🦋</span>
                        </div>
                        Social Butterfly
                      </div>
                    </SelectItem>
                    <SelectItem value="Event Champion" className="text-white hover:bg-[#333333]">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">🏆</span>
                        </div>
                        Event Champion
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-[#ffffffb2] text-sm block mb-2">Select Players</label>

                <div className="relative mb-3">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#ffffffb2]" />
                  <Input
                    placeholder="Search User"
                    className="bg-[#0a0a0a] border-[#333333] text-white pl-10"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Select defaultValue="role">
                      <SelectTrigger className="bg-transparent border-none text-[#ffffffb2] text-sm w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111111] border-[#333333]">
                        <SelectItem value="role" className="text-white">By Role</SelectItem>
                        <SelectItem value="name" className="text-white">By Name</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-between mb-3">
                  <Button
                    variant="ghost"
                    className="text-[#30bdee] hover:text-white text-sm"
                    onClick={() => setSelectedBadgeUsers(sampleUsers.map(u => u.id))}
                  >
                    Select All
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-[#ffffffb2] hover:text-white text-sm"
                    onClick={() => setSelectedBadgeUsers([])}
                  >
                    Clear All
                  </Button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {sampleUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-2 bg-[#ffffff06] rounded-lg">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedBadgeUsers.includes(user.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedBadgeUsers([...selectedBadgeUsers, user.id]);
                            } else {
                              setSelectedBadgeUsers(selectedBadgeUsers.filter(id => id !== user.id));
                            }
                          }}
                          className="text-[#30bdee]"
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">{user.avatar}</span>
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{user.name}</p>
                        </div>
                      </div>
                      <span className="text-[#ffffffb2] text-xs">{user.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setShowAddBadgesModal(false)}
                variant="outline"
                className="flex-1 border-[#333333] text-[#ffffffb2] hover:text-white hover:bg-[#ffffff12]"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log('Assigning badge:', selectedBadge, 'to users:', selectedBadgeUsers);
                  setShowAddBadgesModal(false);
                }}
                className="flex-1 bg-[#30bdee] hover:bg-[#2aa3d1] text-white"
              >
                Assign Badge
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      <ApproveModal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        onConfirm={handleApproveConfirm}
        applicantName={selectedApplicant?.name || "selected applicants"}
        isLoading={isApproving}
      />

      {/* Reject Modal */}
      <RejectModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleRejectConfirm}
        applicantName={selectedApplicant?.name || "selected applicants"}
        isLoading={isRejecting}
      />
    </div>
  );
};