import { UsersIcon, PlusIcon, SearchIcon, BellIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export const AllGroups = (): JSX.Element => {
  const allGroups = [
    // Row 1
    {
      id: 1,
      name: "XP Seeker",
      description: "Complete missions, gain XP, and level up together daily.",
      members: 142,
      xpBoost: "+10% XP Boost",
      tags: ["#XP", "#Missions", "#LevelUp", "#Leaderboard"],
      avatar: "👤",
      action: "Join Group"
    },
    {
      id: 2,
      name: "Social Sparks",
      description: "Sparking fun with games and community!",
      members: 170,
      xpBoost: "+30% XP Boost",
      tags: ["#Social", "#FunGames", "#SocialGaming", "#levelup"],
      avatar: "🥷",
      action: "Join Group"
    },
    {
      id: 3,
      name: "Elite Circle",
      description: "Master new skills, share knowledge & grow as a team",
      members: 0,
      role: "Workshop Leader",
      description2: "Building hands-on learning, one session at a time",
      avatar: "💀",
      action: "Manage Group"
    },
    {
      id: 4,
      name: "Level Up League",
      description: "Gaming hub for challenges, tournaments, and fun.",
      members: 0,
      role: "BOT",
      description2: "Manage matches, get alerts, and connect with players.",
      avatar: "💀",
      action: "View Group"
    },
    // Row 2
    {
      id: 5,
      name: "XP Seeker",
      description: "Complete missions, gain XP, and level up together daily.",
      members: 142,
      xpBoost: "+10% XP Boost",
      tags: ["#XP", "#Missions", "#LevelUp", "#Leaderboard"],
      avatar: "👤",
      action: "Join Group"
    },
    {
      id: 6,
      name: "Social Sparks",
      description: "Sparking fun with games and community!",
      members: 170,
      xpBoost: "+30% XP Boost",
      tags: ["#Social", "#FunGames", "#SocialGaming", "#levelup"],
      avatar: "🥷",
      action: "Join Group"
    },
    {
      id: 7,
      name: "Elite Circle",
      description: "Master new skills, share knowledge & grow as a team",
      members: 0,
      role: "Workshop Leader",
      description2: "Building hands-on learning, one session at a time",
      avatar: "💀",
      action: "Manage Group"
    },
    {
      id: 8,
      name: "Level Up League",
      description: "Gaming hub for challenges, tournaments, and fun.",
      members: 0,
      role: "BOT",
      description2: "Manage matches, get alerts, and connect with players.",
      avatar: "💀",
      action: "View Group"
    },
    // Row 3
    {
      id: 9,
      name: "XP Seeker",
      description: "Complete missions, gain XP, and level up together daily.",
      members: 142,
      xpBoost: "+10% XP Boost",
      tags: ["#XP", "#Missions", "#LevelUp", "#Leaderboard"],
      avatar: "👤",
      action: "Join Group"
    },
    {
      id: 10,
      name: "Social Sparks",
      description: "Sparking fun with games and community!",
      members: 170,
      xpBoost: "+30% XP Boost",
      tags: ["#Social", "#FunGames", "#SocialGaming", "#levelup"],
      avatar: "🥷",
      action: "Join Group"
    },
    {
      id: 11,
      name: "Elite Circle",
      description: "Master new skills, share knowledge & grow as a team",
      members: 0,
      role: "Workshop Leader",
      description2: "Building hands-on learning, one session at a time",
      avatar: "💀",
      action: "Manage Group"
    },
    {
      id: 12,
      name: "Level Up League",
      description: "Gaming hub for challenges, tournaments, and fun.",
      members: 0,
      role: "BOT",
      description2: "Manage matches, get alerts, and connect with players.",
      avatar: "💀",
      action: "View Group"
    }
  ];

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

  return (
    <div className="p-8 space-y-8 bg-[#0a0a0a] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white text-[42px] tracking-[-0.5px] leading-[52px] font-['Rajdhani',Helvetica] font-bold mb-3">
          Groups
        </h1>
        <div className="text-[#30bdee] text-lg underline cursor-pointer hover:text-[#65cbff] transition-colors">
          Find A Group To Galley
        </div>
      </div>

      {/* Search and Create */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex-1 relative max-w-md">
          <Input
            className="h-12 bg-[#1a1a1a] border-[#333333] rounded-lg pl-12 pr-4 font-['Rajdhani',Helvetica] font-medium text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#222222] transition-all text-base"
            placeholder="Search Group"
          />
          <SearchIcon className="absolute w-5 h-5 top-3.5 left-4 text-[#ffffffb2]" />
        </div>
        <Button className="h-12 px-6 bg-transparent border border-[#00cfff] text-[#00cfff] hover:bg-[#00cfff]/10 rounded-lg font-semibold transition-colors">
          <PlusIcon className="w-5 h-5 mr-2" />
          Create new Group
        </Button>
      </div>

      {/* Available Groups Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <BellIcon className="w-6 h-6 text-yellow-400" />
          <h2 className="text-white text-2xl font-bold font-['Rajdhani',Helvetica]">
            Available Groups
          </h2>
        </div>
        
        {/* Groups Grid - Perfect button alignment with fixed heights and consistent button positioning */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {allGroups.map((group) => (
            <Card key={group.id} className="bg-[#1a1a1a] border-[#333333] hover:bg-[#222222] transition-all duration-300 hover:border-[#30bdee]/50 h-[460px] flex flex-col">
              <CardContent className="p-6 h-full flex flex-col">
                {/* Header - Fixed height (60px total with margin) */}
                <div className="flex items-center gap-3 mb-4 h-12 flex-shrink-0">
                  <div className="w-12 h-12 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{group.avatar}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg line-clamp-1">{group.name}</h3>
                </div>
                
                {/* Description - Fixed height (64px total with margin) */}
                <div className="mb-4 h-12 flex-shrink-0">
                  <p className="text-[#ffffffb2] text-sm leading-relaxed line-clamp-2">
                    {group.description}
                  </p>
                </div>
                
                {/* Content Area - Fixed height to ensure consistent button positioning */}
                <div className="flex-1 mb-6 min-h-0 flex flex-col">
                  {/* Show members and XP boost for regular groups */}
                  {group.members > 0 && (
                    <div className="h-full flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[#30bdee] font-semibold">{group.members} Members</span>
                        <span className="text-[#30bdee] font-semibold">{group.xpBoost}</span>
                      </div>
                      
                      {/* Tags container with fixed height */}
                      <div className="flex-1 flex items-end">
                        <div className="flex flex-wrap gap-1 w-full">
                          {group.tags?.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-[#ffffff12] text-[#ffffffb2] text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Show role badge and description for special groups */}
                  {group.role && (
                    <div className="h-full flex flex-col">
                      <div className="mb-3">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                          group.role === 'Workshop Leader' ? 'bg-blue-600 text-white' :
                          group.role === 'BOT' ? 'bg-yellow-600 text-white' :
                          'bg-gray-600 text-white'
                        }`}>
                          {group.role}
                        </span>
                      </div>
                      
                      {/* Description with flexible height */}
                      <div className="flex-1">
                        <p className="text-[#ffffffb2] text-sm leading-relaxed">
                          {group.description2}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Button - Fixed at bottom with consistent positioning (24px from bottom) */}
                <div className="flex-shrink-0 h-10 mb-0">
                  <Button className={`w-full rounded-lg font-medium h-10 ${getButtonColor(group.action)}`}>
                    {group.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-[#1a1a1a] rounded-2xl border border-[#333333] p-6">
        <div className="flex justify-between items-center">
          {/* Entries display section */}
          <div className="flex items-center gap-3">
            <span className="font-['Rajdhani',Helvetica] font-semibold text-base text-white">
              Showing
            </span>

            <Select defaultValue="13">
              <SelectTrigger className="h-10 px-4 py-2 bg-[#ffffff08] border-[#ffffff12] rounded-xl text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all min-w-[80px]">
                <SelectValue className="font-['Rajdhani',Helvetica] font-semibold text-white" />
              </SelectTrigger>
              <SelectContent className="bg-[#111111] border-[#ffffff12]">
                <SelectItem value="10" className="text-white hover:bg-[#ffffff12]">10</SelectItem>
                <SelectItem value="13" className="text-white hover:bg-[#ffffff12]">13</SelectItem>
                <SelectItem value="20" className="text-white hover:bg-[#ffffff12]">20</SelectItem>
                <SelectItem value="50" className="text-white hover:bg-[#ffffff12]">50</SelectItem>
              </SelectContent>
            </Select>

            <span className="font-['Rajdhani',Helvetica] font-semibold text-base text-white">
              Entries of <span className="text-[#30bdee] font-bold">430</span>
            </span>
          </div>

          {/* Pagination controls */}
          <Pagination>
            <PaginationContent className="flex items-center justify-center gap-2">
              <PaginationItem>
                <PaginationPrevious className="px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all" />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  className="px-4 py-2 rounded-xl font-['Rajdhani',Helvetica] font-bold text-base transition-all bg-[#30bdee] text-white shadow-lg shadow-[#30bdee]/25"
                  isActive={true}
                >
                  1
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink className="px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl font-['Rajdhani',Helvetica] font-bold text-base text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all">
                  2
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink className="px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl font-['Rajdhani',Helvetica] font-bold text-base text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all">
                  3
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationEllipsis className="px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl text-white" />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink className="px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl font-['Rajdhani',Helvetica] font-bold text-base text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all">
                  20
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext className="px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};