import { SearchIcon, FilterIcon, MoreHorizontalIcon, CheckIcon, XIcon, ChevronDownIcon, ChevronUpIcon, PlusIcon, EyeIcon } from "lucide-react";
import React, { useState } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";

export const RecruiterDashboard = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [showActionPopup, setShowActionPopup] = useState(false);
  const [actionPopupPosition, setActionPopupPosition] = useState({ x: 0, y: 0 });
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    agreements: false,
    questions: false,
  });
  const [showSendMessageModal, setShowSendMessageModal] = useState(false);
  const [messageForm, setMessageForm] = useState({
    recipientName: '',
    discordId: '',
    message: ''
  });
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  // Statistics data matching the screenshot
  const stats = [
    {
      title: "Total Applications",
      value: "248",
      percentage: 100,
      color: "text-[#30bdee]",
      bgColor: "bg-[#30bdee]"
    },
    {
      title: "Pending",
      value: "67",
      percentage: 27,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400"
    },
    {
      title: "Approved",
      value: "153",
      percentage: 61,
      color: "text-green-400",
      bgColor: "bg-green-400"
    },
    {
      title: "Rejected",
      value: "28",
      percentage: 12,
      color: "text-red-400",
      bgColor: "bg-red-400"
    }
  ];

  // Applications data with detailed player information
  const applications = [
    {
      id: 1,
      name: "Ali #123",
      discordId: "Shadowhunter#8020",
      date: "Jul 01 2025",
      appliedGroup: "Recruit Training Corps",
      status: "Pending",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2",
      playerDetails: {
        discordUsername: "Shadowhunter#8020",
        joinDate: "Jul 01 2025",
        basicInfo: {
          discordUsername: "Shadowhunter#8020",
          inGameUsername: "ShadowHunter",
          realName: "Ali Hassan"
        },
        gameInfo: {
          steamId: "76561198962847301",
          platform: "PC",
          storageId: "Fhz2Yz5-6Fh-4h5z-N3D-xTh0zd4nF",
          playTime: "1,234 hrs",
          rank: "Gold III",
          gameAwakening: "SandWalker#4491"
        },
        questions: [
          { question: "Why Did You Want", answer: "I want to improve my skills and be part of a competitive team" },
          { question: "1-5 Hours", answer: "3-4 hours daily" },
          { question: "Summoned Us Through", answer: "Discord community recommendations" },
          { question: "Drawn To Us By", answer: "Your reputation for excellence and teamwork" },
          { question: "Sense Of Interest", answer: "Competitive gaming and skill development" },
          { question: "Familiarity In Unnamed (Staff Sub Interest)", answer: "Familiar with community guidelines and values" },
          { question: "Envision In Unnamed (Staff Sub Interest)", answer: "Contributing to team success and helping new members" },
          { question: "Handles Conflict By", answer: "Open communication and finding common ground" },
          { question: "Exclusivity Agreement", answer: "Yes, I agree to exclusive membership" }
        ],
        agreements: {
          inGameAgreement: true,
          rulesAgreement: true,
          communityAgreement: true,
          confidentialityAgreement: true
        }
      }
    },
    {
      id: 2,
      name: "CodeNinja #9012",
      discordId: "PixelKnight#8492",
      date: "June 29 2025",
      appliedGroup: "PvP Vanguard",
      status: "Approved",
      avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2",
      playerDetails: {
        discordUsername: "PixelKnight#8492",
        joinDate: "June 29 2025",
        basicInfo: {
          discordUsername: "PixelKnight#8492",
          inGameUsername: "CodeNinja",
          realName: "Marcus Chen"
        },
        gameInfo: {
          steamId: "76561198847392156",
          platform: "PC",
          storageId: "Gh3Kz8-7Gh-5k8z-M4E-yUi9ze5nG",
          playTime: "2,156 hrs",
          rank: "Platinum I",
          gameAwakening: "CodeMaster#7821"
        },
        questions: [
          { question: "Why Did You Want", answer: "Looking for competitive PvP experience" },
          { question: "1-5 Hours", answer: "4-5 hours daily" },
          { question: "Summoned Us Through", answer: "Friend recommendation" },
          { question: "Drawn To Us By", answer: "Strong PvP reputation" },
          { question: "Sense Of Interest", answer: "Competitive tournaments and rankings" },
          { question: "Familiarity In Unnamed (Staff Sub Interest)", answer: "Well versed in community standards" },
          { question: "Envision In Unnamed (Staff Sub Interest)", answer: "Leading PvP training sessions" },
          { question: "Handles Conflict By", answer: "Mediation and fair discussion" },
          { question: "Exclusivity Agreement", answer: "Fully committed to exclusive membership" }
        ],
        agreements: {
          inGameAgreement: true,
          rulesAgreement: true,
          communityAgreement: true,
          confidentialityAgreement: true
        }
      }
    },
    {
      id: 3,
      name: "SandGamer #5678",
      discordId: "DragonSlayer#8571",
      date: "June 24 2025",
      appliedGroup: "Unnamed Member",
      status: "Approved",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2",
      playerDetails: {
        discordUsername: "DragonSlayer#8571",
        joinDate: "June 24 2025",
        basicInfo: {
          discordUsername: "DragonSlayer#8571",
          inGameUsername: "SandGamer",
          realName: "Sarah Johnson"
        },
        gameInfo: {
          steamId: "76561198734829471",
          platform: "PC",
          storageId: "Jk5Mz9-8Jk-6m9z-P5F-zVj0af6nH",
          playTime: "987 hrs",
          rank: "Silver II",
          gameAwakening: "DragonMaster#5634"
        },
        questions: [
          { question: "Why Did You Want", answer: "Seeking a supportive gaming community" },
          { question: "1-5 Hours", answer: "2-3 hours daily" },
          { question: "Summoned Us Through", answer: "Social media discovery" },
          { question: "Drawn To Us By", answer: "Inclusive community culture" },
          { question: "Sense Of Interest", answer: "Casual gaming and friendship" },
          { question: "Familiarity In Unnamed (Staff Sub Interest)", answer: "Basic understanding of community rules" },
          { question: "Envision In Unnamed (Staff Sub Interest)", answer: "Supporting new players and organizing events" },
          { question: "Handles Conflict By", answer: "Calm discussion and compromise" },
          { question: "Exclusivity Agreement", answer: "Yes, committed to community values" }
        ],
        agreements: {
          inGameAgreement: true,
          rulesAgreement: true,
          communityAgreement: true,
          confidentialityAgreement: false
        }
      }
    },
    {
      id: 4,
      name: "PixelArtist #3456",
      discordId: "NovaStrike#9045",
      date: "June 08 2025",
      appliedGroup: "Unnamed Member",
      status: "Rejected",
      avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2",
      playerDetails: {
        discordUsername: "NovaStrike#9045",
        joinDate: "June 08 2025",
        basicInfo: {
          discordUsername: "NovaStrike#9045",
          inGameUsername: "PixelArtist",
          realName: "Alex Rivera"
        },
        gameInfo: {
          steamId: "76561198623947582",
          platform: "PC",
          storageId: "Lm6Nz0-9Lm-7n0z-Q6G-aWk1bg7nI",
          playTime: "456 hrs",
          rank: "Bronze I",
          gameAwakening: "ArtMaster#3421"
        },
        questions: [
          { question: "Why Did You Want", answer: "Interest in creative gaming projects" },
          { question: "1-5 Hours", answer: "1-2 hours daily" },
          { question: "Summoned Us Through", answer: "Gaming forum post" },
          { question: "Drawn To Us By", answer: "Creative opportunities" },
          { question: "Sense Of Interest", answer: "Art and design in gaming" },
          { question: "Familiarity In Unnamed (Staff Sub Interest)", answer: "Limited knowledge of community" },
          { question: "Envision In Unnamed (Staff Sub Interest)", answer: "Creating visual content" },
          { question: "Handles Conflict By", answer: "Avoiding confrontation" },
          { question: "Exclusivity Agreement", answer: "Uncertain about commitment level" }
        ],
        agreements: {
          inGameAgreement: false,
          rulesAgreement: true,
          communityAgreement: false,
          confidentialityAgreement: false
        }
      }
    },
    {
      id: 5,
      name: "ZenWave #7890",
      discordId: "MysticForce#2847",
      date: "June 20 2025",
      appliedGroup: "Elite Squad",
      status: "Pending",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2",
      playerDetails: {
        discordUsername: "MysticForce#2847",
        joinDate: "June 20 2025",
        basicInfo: {
          discordUsername: "MysticForce#2847",
          inGameUsername: "ZenWave",
          realName: "Emma Thompson"
        },
        gameInfo: {
          steamId: "76561198512836947",
          platform: "PC",
          storageId: "Nm7Oz1-0Nm-8o1z-R7H-bXl2ch8nJ",
          playTime: "3,421 hrs",
          rank: "Diamond II",
          gameAwakening: "ZenMaster#9876"
        },
        questions: [
          { question: "Why Did You Want", answer: "Seeking elite-level competitive play" },
          { question: "1-5 Hours", answer: "5+ hours daily" },
          { question: "Summoned Us Through", answer: "Tournament circuit recommendations" },
          { question: "Drawn To Us By", answer: "Elite competitive reputation" },
          { question: "Sense Of Interest", answer: "Professional esports development" },
          { question: "Familiarity In Unnamed (Staff Sub Interest)", answer: "Extensive knowledge of competitive scene" },
          { question: "Envision In Unnamed (Staff Sub Interest)", answer: "Leading tournament teams and strategy development" },
          { question: "Handles Conflict By", answer: "Strategic analysis and team-focused solutions" },
          { question: "Exclusivity Agreement", answer: "100% committed to elite performance" }
        ],
        agreements: {
          inGameAgreement: true,
          rulesAgreement: true,
          communityAgreement: true,
          confidentialityAgreement: true
        }
      }
    },
    {
      id: 6,
      name: "TechWizard #4567",
      discordId: "CyberKnight#5739",
      date: "June 15 2025",
      appliedGroup: "Tech Support",
      status: "Approved",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2",
      playerDetails: {
        discordUsername: "CyberKnight#5739",
        joinDate: "June 15 2025",
        basicInfo: {
          discordUsername: "CyberKnight#5739",
          inGameUsername: "TechWizard",
          realName: "David Kim"
        },
        gameInfo: {
          steamId: "76561198401725863",
          platform: "PC",
          storageId: "Op8Pz2-1Op-9p2z-S8I-cYm3di9nK",
          playTime: "1,876 hrs",
          rank: "Gold I",
          gameAwakening: "TechGuru#1234"
        },
        questions: [
          { question: "Why Did You Want", answer: "Passionate about helping others with technical issues" },
          { question: "1-5 Hours", answer: "3-4 hours daily" },
          { question: "Summoned Us Through", answer: "Tech community forums" },
          { question: "Drawn To Us By", answer: "Need for technical expertise" },
          { question: "Sense Of Interest", answer: "Problem solving and community support" },
          { question: "Familiarity In Unnamed (Staff Sub Interest)", answer: "Strong technical background" },
          { question: "Envision In Unnamed (Staff Sub Interest)", answer: "Managing technical infrastructure and user support" },
          { question: "Handles Conflict By", answer: "Logical problem-solving approach" },
          { question: "Exclusivity Agreement", answer: "Dedicated to technical excellence" }
        ],
        agreements: {
          inGameAgreement: true,
          rulesAgreement: true,
          communityAgreement: true,
          confidentialityAgreement: true
        }
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'Approved':
        return 'text-green-400 bg-green-400/20';
      case 'Rejected':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const handleActionDotsClick = (event: React.MouseEvent, player: any) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setActionPopupPosition({
      x: rect.left - 120, // Position popup to the left of the dots
      y: rect.top + rect.height / 2 - 50 // Center vertically
    });
    setSelectedPlayer(player);
    setShowActionPopup(true);
  };

  const handleAvatarClick = (player: any) => {
    setSelectedPlayer(player);
    setShowPlayerModal(true);
  };

  const handleViewDetails = (player: any) => {
    setSelectedPlayer(player);
    setShowPlayerModal(true);
  };

  const handleApproveSelected = () => {
    console.log('Approving player:', selectedPlayer?.name);
    setShowActionPopup(false);
    // Add approval logic here
  };

  const handleRejectSelected = () => {
    console.log('Rejecting player:', selectedPlayer?.name);
    setShowActionPopup(false);
    // Add rejection logic here
  };

  const handleApproveConfirm = async () => {
    if (!selectedPlayer) return;
    
    setIsApproving(true);
    
    // Simulate approval process
    setTimeout(() => {
      console.log('Approving player:', selectedPlayer.name);
      setIsApproving(false);
      setShowApproveModal(false);
      setSelectedPlayer(null);
      // Here you would typically update the application status in your data
    }, 2000);
  };

  const handleRejectConfirm = async () => {
    if (!selectedPlayer) return;
    
    setIsRejecting(true);
    
    // Simulate rejection process
    setTimeout(() => {
      console.log('Rejecting player:', selectedPlayer.name);
      setIsRejecting(false);
      setShowRejectModal(false);
      setSelectedPlayer(null);
      // Here you would typically update the application status in your data
    }, 2000);
  };

  const handleCloseModal = () => {
    setShowPlayerModal(false);
    setSelectedPlayer(null);
  };

  const handleCloseActionPopup = () => {
    setShowActionPopup(false);
    setSelectedPlayer(null);
  };

  const handleSendMessage = () => {
    if (selectedPlayer) {
      setMessageForm({
        recipientName: selectedPlayer.playerDetails.basicInfo.realName,
        discordId: selectedPlayer.playerDetails.discordUsername,
        message: 'Hi! Thanks For Your Application, Can You Tell Us More About Your Past Experience In Team Events?'
      });
      setShowSendMessageModal(true);
      setShowPlayerModal(false);
    }
  };

  const handleCloseSendMessageModal = () => {
    setShowSendMessageModal(false);
    setMessageForm({
      recipientName: '',
      discordId: '',
      message: ''
    });
  };

  const handleSendMessageSubmit = () => {
    console.log('Sending message:', messageForm);
    // Add message sending logic here
    handleCloseSendMessageModal();
  };
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Close popup when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showActionPopup) {
        setShowActionPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showActionPopup]);

  const CircularProgress = ({ percentage, color }: { percentage: number; color: string }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#333333"
            strokeWidth="8"
            fill="transparent"
            className="opacity-20"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={`${color} transition-all duration-1000 ease-out`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-[#ffffffb2]">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 bg-[#0a0a0a] min-h-screen relative">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-white text-2xl sm:text-3xl lg:text-[32px] tracking-[-0.32px] leading-tight lg:leading-[51.2px] font-['Rajdhani',Helvetica] font-semibold mb-2">
          Application Review
        </h1>
        <p className="font-['Rajdhani',Helvetica] font-medium text-[#ffffffb2] text-sm sm:text-base tracking-[-0.16px] leading-relaxed lg:leading-[25.6px]">
          Review, Evaluate And Approve New Member Applications With Ease.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-12 bg-[#1a1a1a] border-[#333333] rounded-lg pl-12 pr-4 font-['Rajdhani',Helvetica] font-medium text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#222222] transition-all text-base"
          placeholder="Search by name, username, or Discord ID"
        />
        <SearchIcon className="absolute w-5 h-5 top-3.5 left-4 text-[#ffffffb2]" />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-[#111111] border-[#333333]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#ffffffb2] text-sm mb-2">{stat.title}</p>
                  <p className="text-white text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-[#ffffffb2] text-xs">Total</p>
                </div>
                <CircularProgress percentage={stat.percentage} color={stat.color} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending Applications Table */}
      <Card className="bg-[#111111] border-[#333333]">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-white font-['Rajdhani',Helvetica] font-bold text-xl">
              Pending Applications
            </CardTitle>
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-[#ffffffb2] hover:text-white text-sm">
                Select All
              </Button>
              <Button variant="ghost" className="text-[#ffffffb2] hover:text-white text-sm">
                Filter by
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Desktop Table Header */}
          <div className="hidden lg:grid grid-cols-12 gap-4 p-4 bg-[#ffffff06] rounded-lg mb-4 text-[#ffffffb2] text-sm font-medium">
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Discord ID</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2">Applied Group</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Action</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-2">
            {applications.map((application) => (
              <div key={application.id} className="lg:grid lg:grid-cols-12 lg:gap-4 p-4 bg-[#ffffff03] rounded-lg hover:bg-[#ffffff06] transition-colors lg:items-center">
                {/* Mobile Card Layout */}
                <div className="lg:hidden space-y-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={application.avatar} 
                      alt={application.name}
                      className="w-10 h-10 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-[#30bdee] transition-all"
                      onClick={() => handleAvatarClick(application)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-medium text-sm">{application.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {application.status}
                        </span>
                      </div>
                      <p className="text-[#ffffffb2] text-xs">{application.discordId}</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#ffffffb2]">Date: {application.date}</span>
                    <span className="text-[#ffffffb2]">Group: {application.appliedGroup}</span>
                  </div>
                  <div className="flex gap-2">
                    {application.status === 'Pending' && (
                      <>
                        <Button size="sm" variant="ghost" className="flex-1 text-red-400 hover:text-red-300 hover:bg-red-400/10 text-xs">
                          <XIcon className="w-3 h-3 mr-1" />
                          Reject
                        </Button>
                        <Button size="sm" className="flex-1 bg-[#30bdee] hover:bg-[#2aa3d1] text-white text-xs">
                          <CheckIcon className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                      </>
                    )}
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-[#ffffffb2] hover:text-white p-2"
                      onClick={(e) => handleActionDotsClick(e, application)}
                    >
                      <MoreHorizontalIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Desktop Grid Layout */}
                <div className="hidden lg:contents">
                  {/* Name */}
                  <div className="col-span-3 flex items-center gap-3">
                    <img 
                      src={application.avatar} 
                      alt={application.name}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-[#30bdee] transition-all"
                      onClick={() => handleAvatarClick(application)}
                    />
                    <span className="text-white text-sm font-medium">{application.name}</span>
                  </div>

                  {/* Discord ID */}
                  <div className="col-span-2 text-[#ffffffb2] text-sm">{application.discordId}</div>

                  {/* Date */}
                  <div className="col-span-2 text-[#ffffffb2] text-sm">{application.date}</div>

                  {/* Applied Group */}
                  <div className="col-span-2 text-white text-sm">{application.appliedGroup}</div>

                  {/* Status */}
                  <div className="col-span-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex items-center justify-center">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-[#ffffffb2] hover:text-white p-2"
                      onClick={(e) => handleActionDotsClick(e, application)}
                    >
                      <MoreHorizontalIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[#ffffffb2] text-sm">Showing</span>
              <Select defaultValue="15">
                <SelectTrigger className="h-8 px-3 py-2 bg-[#ffffff08] border-[#ffffff12] rounded-xl text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all min-w-[60px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#111111] border-[#ffffff12]">
                  <SelectItem value="10" className="text-white hover:bg-[#ffffff12]">10</SelectItem>
                  <SelectItem value="15" className="text-white hover:bg-[#ffffff12]">15</SelectItem>
                  <SelectItem value="20" className="text-white hover:bg-[#ffffff12]">20</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-[#ffffffb2] text-sm">Entries of <span className="text-[#30bdee] font-bold">450</span></span>
            </div>

            <Pagination>
              <PaginationContent className="flex items-center justify-center gap-2">
                <PaginationItem>
                  <PaginationPrevious className="px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    className="px-4 py-2 rounded-xl font-bold text-base transition-all bg-[#30bdee] text-white shadow-lg shadow-[#30bdee]/25"
                    isActive={true}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl font-bold text-base text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all">
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl font-bold text-base text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all">
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <span className="px-4 py-2 text-white">...</span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl font-bold text-base text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all">
                    30
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext className="px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      {/* Action Popup */}
      {showActionPopup && selectedPlayer && (
        <div 
          className="fixed z-50 bg-[#2a2a2a] border border-[#444444] rounded-lg shadow-lg py-2 min-w-[140px]"
          style={{
            left: `${actionPopupPosition.x}px`,
            top: `${actionPopupPosition.y}px`,
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => handleViewDetails(selectedPlayer!)}
            className="w-full px-4 py-2 text-left text-white hover:bg-[#3a3a3a] transition-colors flex items-center gap-2 text-sm"
          >
            <EyeIcon className="w-4 h-4" />
            View Details
          </button>
          
          {selectedPlayer.status === 'Pending' && (
            <>
              <button
                onClick={() => setShowApproveModal(true)}
                className="w-full px-4 py-2 text-left text-green-400 hover:bg-[#3a3a3a] transition-colors flex items-center gap-2 text-sm"
              >
                <CheckIcon className="w-4 h-4" />
                Approve Selected
              </button>
              <button
                onClick={() => setShowRejectModal(true)}
                className="w-full px-4 py-2 text-left text-red-400 hover:bg-[#3a3a3a] transition-colors flex items-center gap-2 text-sm"
              >
                <XIcon className="w-4 h-4" />
                Reject Selected
              </button>
            </>
          )}
        </div>
      )}

      {/* Player Details Modal */}
      {showPlayerModal && selectedPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseModal}
          />
          
          {/* Modal */}
          <div className="relative bg-[#111111] w-full max-w-md rounded-2xl border border-[#333333] max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#333333]">
              <h3 className="text-white text-lg font-bold">Application Details</h3>
              <Button
                variant="ghost"
                onClick={handleCloseModal}
                className="text-[#ffffffb2] hover:text-white p-2"
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Player Header */}
              <div className="p-4 border-b border-[#333333]">
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={selectedPlayer.avatar} 
                    alt={selectedPlayer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-white text-lg font-semibold">{selectedPlayer.playerDetails.basicInfo.realName}</h4>
                    <p className="text-[#ffffffb2] text-sm">{selectedPlayer.playerDetails.discordUsername}</p>
                  </div>
                  <div className="ml-auto">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPlayer.status)}`}>
                      {selectedPlayer.status}
                    </span>
                  </div>
                </div>
                <p className="text-[#ffffffb2] text-sm">Join at Submission: {selectedPlayer.playerDetails.joinDate}</p>
              </div>

              {/* Basic Information */}
              <div className="p-4 border-b border-[#333333]">
                <h5 className="text-white font-semibold mb-3">Basic Information</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#ffffffb2]">Discord Username:</span>
                    <span className="text-white">{selectedPlayer.playerDetails.basicInfo.discordUsername}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#ffffffb2]">In-Game Username:</span>
                    <span className="text-white">{selectedPlayer.playerDetails.basicInfo.inGameUsername}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#ffffffb2]">Real Name:</span>
                    <span className="text-white">{selectedPlayer.playerDetails.basicInfo.realName}</span>
                  </div>
                </div>
              </div>

              {/* Agreements Section */}
              <div className="border-b border-[#333333]">
                <button
                  onClick={() => toggleSection('agreements')}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-[#ffffff06] transition-colors"
                >
                  <h5 className="text-white font-semibold">Agreements</h5>
                  {expandedSections.agreements ? (
                    <ChevronUpIcon className="w-5 h-5 text-[#ffffffb2]" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-[#ffffffb2]" />
                  )}
                </button>
                {expandedSections.agreements && (
                  <div className="px-4 pb-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[#ffffffb2] text-sm">In-Game Agreement</span>
                      <div className={`w-4 h-4 rounded ${selectedPlayer.playerDetails.agreements.inGameAgreement ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center`}>
                        {selectedPlayer.playerDetails.agreements.inGameAgreement ? (
                          <CheckIcon className="w-3 h-3 text-white" />
                        ) : (
                          <XIcon className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#ffffffb2] text-sm">Rules Agreement</span>
                      <div className={`w-4 h-4 rounded ${selectedPlayer.playerDetails.agreements.rulesAgreement ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center`}>
                        {selectedPlayer.playerDetails.agreements.rulesAgreement ? (
                          <CheckIcon className="w-3 h-3 text-white" />
                        ) : (
                          <XIcon className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#ffffffb2] text-sm">Community Agreement</span>
                      <div className={`w-4 h-4 rounded ${selectedPlayer.playerDetails.agreements.communityAgreement ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center`}>
                        {selectedPlayer.playerDetails.agreements.communityAgreement ? (
                          <CheckIcon className="w-3 h-3 text-white" />
                        ) : (
                          <XIcon className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#ffffffb2] text-sm">Confidentiality Agreement</span>
                      <div className={`w-4 h-4 rounded ${selectedPlayer.playerDetails.agreements.confidentialityAgreement ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center`}>
                        {selectedPlayer.playerDetails.agreements.confidentialityAgreement ? (
                          <CheckIcon className="w-3 h-3 text-white" />
                        ) : (
                          <XIcon className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Game IDs & Platform Info */}
              <div className="p-4 border-b border-[#333333]">
                <h5 className="text-white font-semibold mb-3">Game IDs & Platform Info</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#ffffffb2]">Steam ID:</span>
                    <span className="text-white font-mono text-xs">{selectedPlayer.playerDetails.gameInfo.steamId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#ffffffb2]">Platform:</span>
                    <span className="text-white">{selectedPlayer.playerDetails.gameInfo.platform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#ffffffb2]">Storage ID:</span>
                    <span className="text-white font-mono text-xs">{selectedPlayer.playerDetails.gameInfo.storageId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#ffffffb2]">Play Time:</span>
                    <span className="text-white">{selectedPlayer.playerDetails.gameInfo.playTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#ffffffb2]">Rank:</span>
                    <span className="text-white">{selectedPlayer.playerDetails.gameInfo.rank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#ffffffb2]">Game Awakening ID:</span>
                    <span className="text-white">{selectedPlayer.playerDetails.gameInfo.gameAwakening}</span>
                  </div>
                </div>
              </div>

              {/* Questions and Answers Section */}
              <div className="border-b border-[#333333]">
                <button
                  onClick={() => toggleSection('questions')}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-[#ffffff06] transition-colors"
                >
                  <h5 className="text-white font-semibold">Questions and Answers</h5>
                  {expandedSections.questions ? (
                    <ChevronUpIcon className="w-5 h-5 text-[#ffffffb2]" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-[#ffffffb2]" />
                  )}
                </button>
                {expandedSections.questions && (
                  <div className="px-4 pb-4 space-y-4">
                    {selectedPlayer.playerDetails.questions.map((qa: any, index: number) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <PlusIcon className="w-4 h-4 text-[#30bdee] flex-shrink-0" />
                          <span className="text-[#ffffffb2] text-sm font-medium">{qa.question}</span>
                        </div>
                        <p className="text-white text-sm ml-6 leading-relaxed">{qa.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t border-[#333333] space-y-3">
              <Button 
                onClick={handleSendMessage}
                className="w-full bg-[#30bdee] hover:bg-[#2aa3d1] text-white rounded-lg"
              >
                Send Message To Applicant
              </Button>
              <div className="flex gap-3">
                <Button className="flex-1 bg-[#30bdee] hover:bg-[#2aa3d1] text-white rounded-lg">
                  Approve With Reason
                </Button>
                <Button variant="outline" className="flex-1 border-red-400 text-red-400 hover:bg-red-400/10 rounded-lg">
                  Reject With Reason
                </Button>
              </div>
              <Button variant="outline" className="w-full border-[#333333] text-[#ffffffb2] hover:text-white hover:bg-[#ffffff12] rounded-lg">
                Add To Group
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Send Message Modal */}
      {showSendMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseSendMessageModal}
          />
          
          {/* Modal */}
          <div className="relative bg-[#111111] w-full max-w-lg rounded-2xl border border-[#333333] p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-bold">Send Message</h3>
              <Button
                variant="ghost"
                onClick={handleCloseSendMessageModal}
                className="text-[#ffffffb2] hover:text-white p-2"
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Recipient Name */}
              <div>
                <label className="text-[#ffffffb2] text-sm block mb-2">Recipient Name</label>
                <Input
                  type="text"
                  value={messageForm.recipientName}
                  onChange={(e) => setMessageForm({ ...messageForm, recipientName: e.target.value })}
                  className="h-12 bg-[#0a0a0a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all"
                  placeholder="Enter recipient name"
                />
              </div>

              {/* Discord ID */}
              <div>
                <label className="text-[#ffffffb2] text-sm block mb-2">Discord ID</label>
                <Input
                  type="text"
                  value={messageForm.discordId}
                  onChange={(e) => setMessageForm({ ...messageForm, discordId: e.target.value })}
                  className="h-12 bg-[#0a0a0a] border-[#333333] rounded-lg text-[#30bdee] placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all"
                  placeholder="Discord ID"
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-[#ffffffb2] text-sm block mb-2">Add Message</label>
                <textarea
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                  className="w-full h-32 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all p-3 resize-none"
                  placeholder="Enter your message..."
                />
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleCloseSendMessageModal}
                variant="outline"
                className="flex-1 border-[#333333] text-[#ffffffb2] hover:text-white hover:bg-[#ffffff12] rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendMessageSubmit}
                className="flex-1 bg-[#30bdee] hover:bg-[#2aa3d1] text-white rounded-lg"
              >
                Send Message
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
        applicantName={selectedPlayer?.playerDetails?.basicInfo?.realName || selectedPlayer?.name}
        isLoading={isApproving}
      />

      {/* Reject Modal */}
      <RejectModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleRejectConfirm}
        applicantName={selectedPlayer?.playerDetails?.basicInfo?.realName || selectedPlayer?.name}
        isLoading={isRejecting}
      />
    </div>
  );
};