import { UsersIcon, ShoppingBagIcon, TrendingUpIcon, DollarSignIcon, SearchIcon, FilterIcon, MoreHorizontalIcon, CheckIcon, XIcon, EyeIcon, PlusIcon, EditIcon, TrashIcon, InfoIcon, Plus, Edit, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { DeleteConfirmationModal } from "../../components/ui/delete-confirmation-modal";
import { useAbility } from "../../casl/AbilityContext";
import { fetchAllUsers } from "../../apis/getAllUsers";
import { addRole, RoleData } from "../../apis/addRoles";


interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export const AdminDashboard = (): JSX.Element => {
  const ability = useAbility();
  const [users, setUsers] = useState<User[]>([]); // ✅
  const [formData, setFormData] = useState<RoleData>({
    name: '',
    description: '',
    discordRoleId: '',
    color: 0,
    level: 0,
    isActive: true,
  });

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const getUsersData = async () => {
      let data = await fetchAllUsers()
      setUsers(data.result)
    }
    getUsersData()
  }, [])


  console.log(users, "my all users");


  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{
    type: string;
    name: string;
    id: number;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPlayerInfoModal, setShowPlayerInfoModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

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


  if (!ability.can('manage', 'all')) {
    return <div className="flex items-center justify-center h-screen text-white font-bold text-xl"
    >Admin access only</div>;
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };


  const handleSubmit = async () => {
    const res = await addRole(formData);
    if (res.success) {
      // toast.success('Role added successfully!');
      setIsOpen(!isOpen)
    } else {
      // toast.error(res.message || 'Failed to add role');
    }
  };



  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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

      <div>
        <Card className="bg-[#111111] border-[#333333]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white font-['Rajdhani',Helvetica] font-bold text-xl">
                Users
              </CardTitle>
              <Button
                className="bg-transparent border border-[#00cfff] text-[#00cfff] hover:bg-[#00cfff]/10 px-4 py-2 rounded-lg text-sm"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Role
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Table Header - Desktop */}
            <div className="hidden lg:grid grid-cols-12 gap-2 p-3 bg-[#ffffff06] rounded-lg mb-4 text-[#ffffffb2] text-sm font-medium">
              <div className="col-span-3">User</div>
              <div className="col-span-2">Username</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-2">Created</div>
              <div className="col-span-1">Verified</div>
              <div className="col-span-1">Actions</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-2">
              {users?.map((user: any) => (
                <div key={user.id} className="lg:grid lg:grid-cols-12 lg:gap-2 p-3 bg-[#ffffff03] rounded-lg hover:bg-[#ffffff06] transition-colors lg:items-center">
                  {/* Mobile Layout */}
                  <div className="lg:hidden space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="text-white text-sm font-medium">{user.name}</div>
                          <div className="text-[#ffffffb2] text-xs">@{user.username}</div>
                        </div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${user.emailVerified ? 'bg-green-500' : 'bg-red-500'}`} />
                    </div>
                    <div className="text-[#ffffffb2] text-xs">
                      <div>{user.email}</div>
                      <div className="mt-1">Joined {formatDate(user.createdAt)}</div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="text-[#ffffffb2] hover:text-white p-1">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick("user", user.name, user.id)}
                        size="sm"
                        variant="ghost"
                        className="text-[#ffffffb2] hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:contents">
                    <div className="col-span-3 flex items-center gap-3">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-white text-sm font-medium truncate">{user.name}</div>
                        <div className="text-[#ffffffb2] text-xs truncate">ID: {user.id.slice(0, 8)}...</div>
                      </div>
                    </div>
                    <div className="col-span-2 text-[#ffffffb2] text-sm">@{user.username}</div>
                    <div className="col-span-3 text-[#ffffffb2] text-sm truncate">{user.email}</div>
                    <div className="col-span-2 text-[#ffffffb2] text-sm">{formatDate(user.createdAt)}</div>
                    <div className="col-span-1">
                      <div className={`w-2 h-2 rounded-full ${user.emailVerified ? 'bg-green-500' : 'bg-red-500'}`} />
                    </div>
                    <div className="col-span-1 flex gap-1">
                      <Button size="sm" variant="ghost" className="text-[#ffffffb2] hover:text-white p-1">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick("user", user.name, user.id)}
                        size="sm"
                        variant="ghost"
                        className="text-[#ffffffb2] hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-4 text-center">
              <Button variant="ghost" className="text-[#30bdee] text-sm">
                View All Users
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        {
          isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
              <div className="
        rounded-2xl shadow-2xl p-6 w-full max-w-md transition-all duration-300 transform
        bg-white dark:bg-gray-900 
        border border-gray-200 dark:border-gray-700 
        shadow-black/10 dark:shadow-black/50
      ">
                <h2 className="
          text-xl font-bold mb-6
          text-gray-900 dark:text-white
        ">
                  Add New Role
                </h2>

                <div className="space-y-4">
                  <input
                    name="name"
                    placeholder="Name"
                    className="
              w-full border rounded-xl p-3 transition-all duration-200
              focus:ring-2 focus:ring-[#00cfff]/20 focus:border-[#00cfff] outline-none
              bg-white dark:bg-gray-800 
              border-gray-300 dark:border-gray-600 
              text-gray-900 dark:text-white 
              placeholder-gray-500 dark:placeholder-gray-400
            "
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    className="
              w-full border rounded-xl p-3 transition-all duration-200 resize-none
              focus:ring-2 focus:ring-[#00cfff]/20 focus:border-[#00cfff] outline-none
              bg-white dark:bg-gray-800 
              border-gray-300 dark:border-gray-600 
              text-gray-900 dark:text-white 
              placeholder-gray-500 dark:placeholder-gray-400
            "
                    value={formData.description}
                    onChange={handleChange}
                  />
                  <input
                    name="discordRoleId"
                    placeholder="Discord Role ID"
                    className="
              w-full border rounded-xl p-3 transition-all duration-200
              focus:ring-2 focus:ring-[#00cfff]/20 focus:border-[#00cfff] outline-none
              bg-white dark:bg-gray-800 
              border-gray-300 dark:border-gray-600 
              text-gray-900 dark:text-white 
              placeholder-gray-500 dark:placeholder-gray-400
            "
                    value={formData.discordRoleId}
                    onChange={handleChange}
                  />
                  <input
                    name="color"
                    type="number"
                    placeholder="Color"
                    className="
              w-full border rounded-xl p-3 transition-all duration-200
              focus:ring-2 focus:ring-[#00cfff]/20 focus:border-[#00cfff] outline-none
              bg-white dark:bg-gray-800 
              border-gray-300 dark:border-gray-600 
              text-gray-900 dark:text-white 
              placeholder-gray-500 dark:placeholder-gray-400
            "
                    value={formData.color}
                    onChange={handleChange}
                  />
                  <input
                    name="level"
                    type="number"
                    placeholder="Level"
                    className="
              w-full border rounded-xl p-3 transition-all duration-200
              focus:ring-2 focus:ring-[#00cfff]/20 focus:border-[#00cfff] outline-none
              bg-white dark:bg-gray-800 
              border-gray-300 dark:border-gray-600 
              text-gray-900 dark:text-white 
              placeholder-gray-500 dark:placeholder-gray-400
            "
                    value={formData.level}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-end mt-6 space-x-3">
                  <button
                    className="
              px-6 py-2.5 rounded-xl font-medium transition-all duration-200
              bg-gray-100 dark:bg-gray-700 
              text-gray-700 dark:text-gray-200 
              hover:bg-gray-200 dark:hover:bg-gray-600 
              border border-gray-300 dark:border-gray-600
            "
                    onClick={() => {
                      setIsOpen(!isOpen)
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="
              px-6 py-2.5 rounded-xl font-medium transition-all duration-200
              bg-gradient-to-r from-[#00cfff] to-[#0099cc] text-white
              hover:from-[#00b8e6] hover:to-[#0088bb]
              shadow-lg shadow-[#00cfff]/25 hover:shadow-[#00cfff]/35
            "
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )
        }
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
                {missions.map((mission) => (
                  <div key={mission.id} className="lg:grid lg:grid-cols-12 lg:gap-3 p-3 bg-[#ffffff03] rounded-lg hover:bg-[#ffffff06] transition-colors lg:items-center">
                    {/* Mobile Card Layout */}
                    <div className="lg:hidden space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 bg-gradient-to-br ${mission.color} rounded-full flex items-center justify-center`}>
                          <span className="text-white font-bold text-xs">{mission.avatar}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium text-sm">{mission.user}</span>
                            <span className="text-[#ffffffb2] text-xs">{mission.userId}</span>
                          </div>
                          <p className="text-[#ffffffb2] text-xs">{mission.date}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-white text-sm">{mission.mission}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="flex-1 text-red-400 hover:text-red-300 hover:bg-red-400/10 text-xs">
                          Reject
                        </Button>
                        <Button size="sm" className="flex-1 bg-[#30bdee] hover:bg-[#2aa3d1] text-white text-xs">
                          Approve
                        </Button>
                      </div>
                    </div>

                    {/* Desktop Grid Layout - Fixed spacing */}
                    <div className="hidden lg:contents">
                      {/* User - 3 columns */}
                      <div className="col-span-3 flex items-center gap-2">
                        <div className={`w-8 h-8 bg-gradient-to-br ${mission.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <span className="text-white font-bold text-xs">{mission.avatar}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            <span className="text-white text-sm font-medium truncate">{mission.user}</span>
                            <span className="text-[#ffffffb2] text-xs flex-shrink-0">{mission.userId}</span>
                          </div>
                        </div>
                      </div>

                      {/* Mission - 4 columns */}
                      <div className="col-span-4 text-white text-sm pr-2">{mission.mission}</div>

                      {/* Date - 2 columns */}
                      <div className="col-span-2 text-[#ffffffb2] text-sm">{mission.date}</div>

                      {/* Actions - 3 columns */}
                      <div className="col-span-3 flex gap-1">
                        <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-400/10 px-2 py-1 rounded text-xs flex-1 min-w-0">
                          Reject
                        </Button>
                        <Button size="sm" className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white px-2 py-1 rounded text-xs flex-1 min-w-0">
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
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
                  Add Participants
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
                      onClick={() => handleDeleteClick("application", application.user, application.id)}
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10 px-4 py-2 rounded-lg"
                    >
                      Reject
                    </Button>
                    <Button size="sm" className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white px-4 py-2 rounded-lg">
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
                  Add Role Reward
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
                  Add Badges
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
    </div>
  );
};