import { ClockIcon, CheckCircleIcon, StarIcon, CoinsIcon, PlusIcon, SearchIcon, FilterIcon, TrophyIcon, ZapIcon, TargetIcon, UserIcon, CalendarIcon, AwardIcon, XIcon, ChevronDownIcon, ImageIcon, UploadIcon } from "lucide-react";
import React, { useState } from "react";
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

export const Missions = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("all");
  const [showNewMissionModal, setShowNewMissionModal] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSubmitMissionModal, setShowSubmitMissionModal] = useState(false);
  const [selectedMission, setSelectedMission] = useState<any>(null);

  // New Mission Form Data
  const [missionData, setMissionData] = useState({
    title: "Welcome Aboard Complete Your Onboarding 🚀",
    description: "Get To Know Profile, Join The Conversation, And Link Your Account To Unlock All Epic Badges, And Join Full Community Access.",
    category: "Onboarding",
    type: "Step by Step",
    xpRewards: "40",
    coinsRewards: "00",
    unlockConditions: "Previous Mission Completion",
    submissionDeadline: "Default / Secret Group",
    startDate: "04 April 2025",
    endDate: "30 April 2025",
    visibility: "Public",
    steps: [
      {
        id: 1,
        title: "Complete Your Profile",
        xpReward: "15",
        coinsReward: "00",
        description: "Add a profile picture, Username, and a short bio so others can Recognize You."
      },
      {
        id: 2,
        title: "Step 2",
        xpReward: "",
        coinsReward: "",
        description: "",
        rewardType: "Screenshot Upload"
      }
    ]
  });

  // Mission Categories
  const missionCategories = [
    { id: "squad", name: "Squad", active: false },
    { id: "onboarding", name: "Onboarding", active: true },
    { id: "streaks", name: "Streaks", active: false },
    { id: "achievements", name: "Achievements", active: false },
    { id: "quests", name: "Quests", active: false },
    { id: "category", name: "Category", active: false }
  ];

  // User XP data - moved from Dashboard
  const userXP = {
    current: 12400,
    level: 8,
    nextLevel: 9,
    xpToNext: 1450,
    totalToNext: 14000
  };

  // Achievements data
  const achievements = [
    {
      id: 1,
      name: "First Joiner",
      xp: "+200XP",
      icon: "👤",
      color: "from-orange-500 to-orange-600",
      unlocked: true
    },
    {
      id: 2,
      name: "Streak Keeper",
      xp: "+200XP",
      icon: "🔥",
      color: "from-green-500 to-green-600",
      unlocked: true
    },
    {
      id: 3,
      name: "Mission Hunter",
      xp: "+500XP",
      icon: "🎯",
      color: "from-yellow-500 to-yellow-600",
      unlocked: true
    },
    {
      id: 4,
      name: "Social Starter",
      xp: "+700XP",
      icon: "👥",
      color: "from-gray-500 to-gray-600",
      unlocked: false
    }
  ];

  // Missions data - Updated to have one mission with all steps completed
  const missions = [
    {
      id: 1,
      title: "Join your first group",
      xp: "+100 XP",
      coins: 95,
      status: "Completed",
      icon: "👥",
      color: "from-blue-500 to-blue-600",
      steps: [
        { id: 1, title: "Find a group", completed: true },
        { id: 2, title: "Send join request", completed: true },
        { id: 3, title: "Get accepted", completed: true }
      ]
    },
    {
      id: 2,
      title: "Participate in an event",
      xp: "+50 XP",
      coins: 0,
      status: "In Progress",
      progress: 5,
      maxProgress: 5,
      icon: "🎪",
      color: "from-purple-500 to-purple-600",
      steps: [
        { id: 1, title: "Register for event", completed: true },
        { id: 2, title: "Attend event", completed: true },
        { id: 3, title: "Complete event tasks", completed: true },
        { id: 4, title: "Submit feedback", completed: true },
        { id: 5, title: "Share experience", completed: true }
      ]
    },
    {
      id: 3,
      title: "Post your first message",
      xp: "+50 XP",
      coins: 150,
      status: "Completed",
      icon: "💬",
      color: "from-green-500 to-green-600",
      steps: [
        { id: 1, title: "Join a channel", completed: true },
        { id: 2, title: "Write message", completed: true },
        { id: 3, title: "Post message", completed: true }
      ]
    },
    {
      id: 4,
      title: "Quest completed",
      xp: "+150 XP",
      coins: 30,
      status: "Completed",
      icon: "⚔️",
      color: "from-orange-500 to-orange-600",
      steps: [
        { id: 1, title: "Accept quest", completed: true },
        { id: 2, title: "Complete objectives", completed: true }
      ]
    },
    {
      id: 5,
      title: "Invite a friend",
      xp: "+60 XP",
      coins: 0,
      status: "Available",
      icon: "👋",
      color: "from-pink-500 to-pink-600",
      steps: [
        { id: 1, title: "Generate invite link", completed: false },
        { id: 2, title: "Send to friend", completed: false },
        { id: 3, title: "Friend joins", completed: false }
      ]
    },
    {
      id: 6,
      title: "Daily Login Streak",
      xp: "+70 XP",
      coins: 0,
      status: "Available",
      icon: "📅",
      color: "from-cyan-500 to-cyan-600",
      steps: [
        { id: 1, title: "Login day 1", completed: false },
        { id: 2, title: "Login day 2", completed: false },
        { id: 3, title: "Login day 3", completed: false }
      ]
    }
  ];

  // XP History data
  const xpHistory = [
    {
      id: 1,
      action: "Earned 200 XP For Completing 'Complete Your Profile'",
      time: "2 Days Ago",
      xp: "+200 XP",
      icon: "✅"
    },
    {
      id: 2,
      action: "Joined A Group (+50 XP)",
      time: "3 Days Ago",
      xp: "+50 XP",
      icon: "👥"
    },
    {
      id: 3,
      action: "Earned 150 XP For Unlocked Badge: Consistent Climber",
      time: "5 Days Ago",
      xp: "+150 XP",
      icon: "🏆"
    },
    {
      id: 4,
      action: "Progress Milestone: 'Reached Level 8!' (+200 XP)",
      time: "5 Days Ago",
      xp: "+200 XP",
      icon: "⭐"
    },
    {
      id: 5,
      action: "Daily Login Streak: '3 Days In A Row' (+45 XP)",
      time: "6 Days Ago",
      xp: "+45 XP",
      icon: "🔥"
    }
  ];

  // Upcoming missions
  const upcomingMissions = [
    {
      id: 1,
      title: "Invite A Friend And Earn",
      xp: "+150 XP",
      description: "Instantly!"
    },
    {
      id: 2,
      title: "Daily Login Streak: 4 Days",
      xp: "+50 XP",
      description: "Keep It Going For"
    }
  ];

  // Available missions for submit screen
  const availableMissions = [
    {
      id: 1,
      title: "Welcome, Let's Get Started",
      subtitle: "Complete Your Onboarding",
      xp: "+25 XP",
      coins: 12,
      image: "🚀",
      bgColor: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Link Your Steam Account",
      subtitle: "Survey",
      xp: "+25 XP",
      coins: 12,
      image: "🎮",
      bgColor: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: "Complete The Feedback",
      subtitle: "Survey",
      xp: "+25 XP",
      coins: 12,
      image: "📝",
      bgColor: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: "Weekly Challenge Top",
      subtitle: "Score",
      xp: "+25 XP",
      coins: 12,
      image: "🏆",
      bgColor: "from-orange-500 to-orange-600"
    }
  ];

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

  const filteredMissions = missions.filter(mission => {
    if (activeTab === "all") return true;
    if (activeTab === "completed") return mission.status === "Completed";
    if (activeTab === "in-progress") return mission.status === "In Progress";
    return true;
  });

  const handleNewMission = () => {
    setShowNewMissionModal(true);
  };

  const handleCloseNewMission = () => {
    setShowNewMissionModal(false);
  };

  const handleCreateMission = () => {
    console.log("Creating mission:", missionData);
    setShowNewMissionModal(false);
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

  const handleAddStep = () => {
    const newStep = {
      id: missionData.steps.length + 1,
      title: `Step ${missionData.steps.length + 1}`,
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

  const handleRemoveStep = (stepId: number) => {
    setMissionData({
      ...missionData,
      steps: missionData.steps.filter(step => step.id !== stepId)
    });
  };

  const updateStep = (stepId: number, field: string, value: string) => {
    setMissionData({
      ...missionData,
      steps: missionData.steps.map(step => 
        step.id === stepId ? { ...step, [field]: value } : step
      )
    });
  };

  const handleCategorySelect = (category: string) => {
    setMissionData({ ...missionData, category });
    setShowCategoryDropdown(false);
  };

  // If Submit Mission modal is open, show it instead of the main content
  if (showSubmitMissionModal && selectedMission) {
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
              <div className={`w-12 h-12 bg-gradient-to-br ${selectedMission.color} rounded-xl flex items-center justify-center`}>
                <span className="text-white text-xl">{selectedMission.icon}</span>
              </div>
              <div>
                <h2 className="text-white text-lg sm:text-xl font-bold">{selectedMission.title}</h2>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-yellow-400 font-bold">{selectedMission.xp}</span>
                  {selectedMission.coins > 0 && (
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-[#30bdee] rounded-full" />
                      <span className="text-white font-medium">{selectedMission.coins}</span>
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

          {/* Available Missions Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-bold">Available Missions</h3>
              <Button variant="ghost" className="text-[#30bdee] hover:text-white text-sm">
                View all
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {availableMissions.map((mission) => (
                <div key={mission.id} className="bg-[#1a1a1a] border border-[#333333] rounded-xl overflow-hidden hover:border-[#30bdee] transition-all duration-300">
                  {/* Mission Image */}
                  <div className="aspect-square bg-[#2a2a2a] flex items-center justify-center relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${mission.bgColor} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <span className="text-white text-2xl">{mission.image}</span>
                    </div>
                  </div>

                  {/* Mission Content */}
                  <div className="p-4">
                    <h4 className="text-white font-bold text-sm mb-1">{mission.title}</h4>
                    <p className="text-[#ffffffb2] text-xs mb-3">{mission.subtitle}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-yellow-400 font-bold text-sm">{mission.xp}</span>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-[#30bdee] rounded-full" />
                        <span className="text-white text-sm">{mission.coins}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-[#30bdee] hover:bg-[#2aa3d1] text-white rounded-lg text-sm">
                      Start Mission
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-[#1a1a1a] border border-[#333333] rounded-2xl p-4 sm:p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#333333] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UploadIcon className="w-8 h-8 text-[#ffffffb2]" />
              </div>
              <h3 className="text-white text-lg font-bold mb-2">Upload a Screenshot or drag and drop a file</h3>
              <p className="text-[#ffffffb2] text-sm mb-6">PNG and JPG files are allowed</p>
              <Button className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white px-6 py-2 rounded-lg">
                Upload
              </Button>
            </div>
          </div>

          {/* Add Note Section */}
          <div className="bg-[#1a1a1a] border border-[#333333] rounded-2xl p-4 sm:p-6">
            <h3 className="text-white text-lg font-bold mb-4">Add Note</h3>
            <textarea
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
              onClick={handleFinalSubmit}
              className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold order-1 sm:order-2"
            >
              Submit Mission
            </Button>
          </div>
        </div>
      </div>
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

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Form */}
          <div className="xl:col-span-2 space-y-6 lg:space-y-8">
            {/* Mission Title */}
            <div>
              <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-3">
                Mission Title
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={missionData.title}
                  onChange={(e) => setMissionData({ ...missionData, title: e.target.value })}
                  className="h-10 sm:h-12 bg-[#1a1a1a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#222222] transition-all text-sm sm:text-base pr-10"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffffffb2]">
                  🚀
                </div>
              </div>
            </div>

            {/* Upload Image */}
            <div>
              <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-3">
                Upload Image (Optional)
              </label>
              <div className="border-2 border-dashed border-[#333333] rounded-lg p-6 sm:p-8 text-center hover:border-[#30bdee] transition-colors cursor-pointer">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#333333] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#ffffffb2]" />
                </div>
                <p className="text-[#ffffffb2] text-xs sm:text-sm mb-2">Click to upload or drag and drop</p>
                <p className="text-[#ffffffb2] text-xs">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-3">
                Description
              </label>
              <textarea
                value={missionData.description}
                onChange={(e) => setMissionData({ ...missionData, description: e.target.value })}
                className="w-full h-20 sm:h-24 bg-[#1a1a1a] border border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#222222] transition-all text-sm sm:text-base p-3 sm:p-4 resize-none"
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
                      {missionCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySelect(category.name)}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-[#333333] transition-colors text-sm sm:text-base ${
                            category.active ? 'bg-[#30bdee] text-white' : 'text-[#ffffffb2] hover:text-white'
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
                <Select value={missionData.type} onValueChange={(value) => setMissionData({ ...missionData, type: value })}>
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
                    type="text"
                    value={missionData.xpRewards}
                    onChange={(e) => setMissionData({ ...missionData, xpRewards: e.target.value })}
                    className="h-10 sm:h-12 bg-[#1a1a1a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#222222] transition-all text-sm sm:text-base pr-12"
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
                    type="text"
                    value={missionData.coinsRewards}
                    onChange={(e) => setMissionData({ ...missionData, coinsRewards: e.target.value })}
                    className="h-10 sm:h-12 bg-[#1a1a1a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#222222] transition-all text-sm sm:text-base pl-12"
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
                <Select value={missionData.unlockConditions} onValueChange={(value) => setMissionData({ ...missionData, unlockConditions: value })}>
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
                <Select value={missionData.submissionDeadline} onValueChange={(value) => setMissionData({ ...missionData, submissionDeadline: value })}>
                  <SelectTrigger className="h-10 sm:h-12 bg-[#1a1a1a] border-[#333333] rounded-lg text-white hover:bg-[#222222] hover:border-[#30bdee] transition-all text-sm sm:text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#333333]">
                    <SelectItem value="Default / Secret Group" className="text-white hover:bg-[#333333]">Default / Secret Group</SelectItem>
                    <SelectItem value="1 Week" className="text-white hover:bg-[#333333]">1 Week</SelectItem>
                    <SelectItem value="2 Weeks" className="text-white hover:bg-[#333333]">2 Weeks</SelectItem>
                    <SelectItem value="1 Month" className="text-white hover:bg-[#333333]">1 Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Start Date, End Date, and Visibility */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-3">
                  Start Date
                </label>
                <Input
                  type="text"
                  value={missionData.startDate}
                  onChange={(e) => setMissionData({ ...missionData, startDate: e.target.value })}
                  className="h-10 sm:h-12 bg-[#1a1a1a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#222222] transition-all text-sm sm:text-base"
                />
              </div>
              
              <div>
                <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-3">
                  End Date
                </label>
                <Input
                  type="text"
                  value={missionData.endDate}
                  onChange={(e) => setMissionData({ ...missionData, endDate: e.target.value })}
                  className="h-10 sm:h-12 bg-[#1a1a1a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#222222] transition-all text-sm sm:text-base"
                />
              </div>
              
              <div>
                <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-3">
                  Visibility
                </label>
                <Select value={missionData.visibility} onValueChange={(value) => setMissionData({ ...missionData, visibility: value })}>
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
                {missionData.steps.map((step, index) => (
                  <div key={step.id} className="bg-[#1a1a1a] border border-[#333333] rounded-lg p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-[#30bdee] text-base sm:text-lg font-bold">Step {index + 1}</h4>
                      {missionData.steps.length > 1 && (
                        <Button
                          onClick={() => handleRemoveStep(step.id)}
                          variant="ghost"
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 text-sm"
                        >
                          Remove All
                        </Button>
                      )}
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      {/* Mission Title */}
                      <div>
                        <label className="text-yellow-400 text-xs sm:text-sm block mb-2 font-medium">
                          Mission Title
                        </label>
                        <Input
                          type="text"
                          value={step.title}
                          onChange={(e) => updateStep(step.id, 'title', e.target.value)}
                          className="h-8 sm:h-10 bg-[#0a0a0a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all text-xs sm:text-sm"
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
                              type="text"
                              value={step.xpReward}
                              onChange={(e) => updateStep(step.id, 'xpReward', e.target.value)}
                              className="h-8 sm:h-10 bg-[#0a0a0a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all text-xs sm:text-sm pr-10"
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
                              type="text"
                              value={step.coinsReward}
                              onChange={(e) => updateStep(step.id, 'coinsReward', e.target.value)}
                              className="h-8 sm:h-10 bg-[#0a0a0a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all text-xs sm:text-sm pl-8 sm:pl-10"
                            />
                            <div className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-[#30bdee] rounded-full" />
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="text-yellow-400 text-xs sm:text-sm block mb-2 font-medium">
                          Description
                        </label>
                        <textarea
                          value={step.description}
                          onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                          className="w-full h-16 sm:h-20 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all text-xs sm:text-sm p-2 sm:p-3 resize-none"
                          placeholder="Add step description..."
                        />
                      </div>

                      {/* Proof Type */}
                      <div>
                        <label className="text-yellow-400 text-xs sm:text-sm block mb-2 font-medium">
                          Proof Type
                        </label>
                        <Select value={step.rewardType} onValueChange={(value) => updateStep(step.id, 'rewardType', value)}>
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
                    <span className="text-white font-semibold text-xs sm:text-sm">Welcome Aboard</span>
                    <span className="text-[#b9bbbe] text-xs ml-2">BOT</span>
                  </div>
                </div>
                
                <div className="bg-[#2f3136] rounded p-2 sm:p-3 mb-3">
                  <p className="text-[#dcddde] text-xs sm:text-sm leading-relaxed">
                    🚀 Welcome Aboard: Complete Your Onboarding 🚀
                  </p>
                  <p className="text-[#b9bbbe] text-xs mt-2">
                    Get To Your Profile, Join The Conversation, And Link Your Account To Unlock All Epic Badges, And Join Full Community Access.
                  </p>
                </div>

                <div className="text-[#b9bbbe] text-xs">
                  Status: <span className="text-[#00d166]">Active</span>
                </div>
              </div>

              {/* Mission Details */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[#ffffffb2] text-xs sm:text-sm">🚀 Welcome Aboard: Complete Your Onboarding 🚀</span>
                </div>
                
                <div className="text-[#ffffffb2] text-xs sm:text-sm">
                  Get To Your Profile, Join The Conversation, And Link Your Account To Unlock All Epic Badges, And Join Full Community Access.
                </div>

                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">Step 1</span>
                    <span className="text-[#ffffffb2]">•</span>
                    <span className="text-yellow-400">+40 XP</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">Step 2</span>
                    <span className="text-[#ffffffb2]">•</span>
                    <span className="text-yellow-400">+40 XP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mt-6 lg:mt-8 pt-4 sm:pt-6 border-t border-[#333333] gap-4">
          <Button
            onClick={handleCloseNewMission}
            className="bg-[#333333] hover:bg-[#444444] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold order-2 sm:order-1"
          >
            Back To Missions
          </Button>
          <Button
            onClick={handleCreateMission}
            className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold order-1 sm:order-2"
          >
            Create Mission
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
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
                  className="h-8 sm:h-10 px-3 sm:px-4 py-2 bg-[#0a0a0a] border border-[#333333] rounded-lg flex items-center gap-2 hover:bg-[#111111] hover:border-[#30bdee] transition-all text-[#ffffffb2] hover:text-white text-xs sm:text-sm"
                >
                  <span>Sort by</span>
                  <FilterIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>

            {/* Mission Tabs */}
            <div className="flex gap-4 sm:gap-6 border-b border-[#333333] overflow-x-auto">
              <button
                onClick={() => setActiveTab("all")}
                className={`pb-2 sm:pb-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === "all" 
                    ? "text-[#30bdee] border-b-2 border-[#30bdee]" 
                    : "text-[#ffffffb2] hover:text-white"
                }`}
              >
                All Missions
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`pb-2 sm:pb-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === "completed" 
                    ? "text-[#30bdee] border-b-2 border-[#30bdee]" 
                    : "text-[#ffffffb2] hover:text-white"
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setActiveTab("in-progress")}
                className={`pb-2 sm:pb-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === "in-progress" 
                    ? "text-[#30bdee] border-b-2 border-[#30bdee]" 
                    : "text-[#ffffffb2] hover:text-white"
                }`}
              >
                In Progress
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {/* New Mission Button */}
            <div className="mb-4 sm:mb-6">
              <Button 
                onClick={handleNewMission}
                className="w-full bg-transparent border border-[#00cfff] text-[#00cfff] hover:bg-[#00cfff]/10 rounded-lg h-10 sm:h-12 font-semibold transition-colors text-sm sm:text-base"
              >
                <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                New Mission
              </Button>
            </div>

            {/* Missions List - Scrollable */}
            <div className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto">
              {filteredMissions.map((mission) => (
                <div key={mission.id} className="p-3 sm:p-4 bg-[#ffffff06] rounded-lg hover:bg-[#ffffff08] transition-colors">
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Mission Icon */}
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${mission.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <span className="text-white text-base sm:text-xl">{mission.icon}</span>
                    </div>

                    {/* Mission Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
                        <h3 className="text-white font-semibold text-sm sm:text-lg truncate">{mission.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 font-bold text-xs sm:text-sm">{mission.xp}</span>
                          {mission.coins > 0 && (
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#30bdee] rounded-full" />
                              <span className="text-white text-xs sm:text-sm">{mission.coins}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar for In Progress missions */}
                      {mission.status === "In Progress" && mission.progress !== undefined && (
                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[#ffffffb2] text-xs sm:text-sm">Progress</span>
                            <span className="text-white text-xs sm:text-sm">Step {mission.progress} of {mission.maxProgress}</span>
                          </div>
                          <div className="w-full bg-[#333333] rounded-full h-1.5 sm:h-2">
                            <div 
                              className="bg-gradient-to-r from-[#30bdee] to-[#65cbff] h-1.5 sm:h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(mission.progress! / mission.maxProgress!) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(mission.status)}
                          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(mission.status)}`}>
                            {mission.status}
                          </span>
                        </div>
                        
                        {mission.status === "Available" && (
                          <Button className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-1 rounded-lg text-xs sm:text-sm">
                            Start
                          </Button>
                        )}
                        {mission.status === "In Progress" && (
                          <div className="flex gap-2">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1 rounded-lg text-xs sm:text-sm">
                              Continue
                            </Button>
                            <Button 
                              onClick={() => handleSubmitMission(mission)}
                              disabled={!areAllStepsCompleted(mission)}
                              className={`px-3 sm:px-4 py-1 rounded-lg text-xs sm:text-sm transition-all ${
                                areAllStepsCompleted(mission)
                                  ? 'bg-[#30bdee] hover:bg-[#2aa3d1] text-white'
                                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              Submit
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Column - XP History and Upcoming */}
        <div className="space-y-6 lg:space-y-8">
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