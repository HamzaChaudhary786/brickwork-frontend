import { SearchIcon, BellIcon, UserIcon, CoinsIcon, ZapIcon, UsersIcon, TrophyIcon, StarIcon, CheckIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { MembershipApplication } from "../MembershipApplication";

export const PublicDashboard = (): JSX.Element => {
  const [showMembershipModal, setShowMembershipModal] = useState(false);

  // Stats data
  const stats = [
    {
      title: "Currency Coin",
      value: "0.000",
      icon: CoinsIcon,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      iconBg: "bg-yellow-400"
    },
    {
      title: "XP Earned",
      value: "0.000",
      icon: ZapIcon,
      color: "text-[#30bdee]",
      bgColor: "bg-[#30bdee]/10",
      iconBg: "bg-[#30bdee]"
    },
    {
      title: "My Groups",
      value: "0",
      subtitle: "Groups Joined",
      icon: UsersIcon,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      iconBg: "bg-purple-400"
    }
  ];

  // Active missions data
  const activeMissions = [
    {
      id: 1,
      title: "Join your first group",
      reward: "+300 XP",
      status: "Download",
      progress: 0,
      color: "bg-[#30bdee]"
    },
    {
      id: 2,
      title: "Participate in our poll",
      reward: "+50 XP",
      info: "Info",
      status: "UNLOCK",
      progress: 0,
      color: "bg-yellow-400"
    },
    {
      id: 3,
      title: "Post your first message",
      reward: "+50 XP",
      status: "UNLOCK",
      progress: 0,
      color: "bg-green-400"
    }
  ];

  // Marketplace items data
  const marketplaceItems = [
    {
      id: 1,
      name: "Viking Toy",
      price: "$24.00",
      coins: "170",
      rating: 4,
      image: "⚡",
      status: "UNLOCK",
      bgColor: "from-orange-600 to-orange-700"
    },
    {
      id: 2,
      name: "Black Armor",
      price: "$30.00",
      coins: "0",
      rating: 4,
      image: "🖤",
      status: "Buy Now",
      bgColor: "from-gray-800 to-black"
    },
    {
      id: 3,
      name: "Medieval Knight",
      price: "$24.00",
      coins: "170",
      rating: 4,
      image: "🛡️",
      status: "UNLOCK",
      bgColor: "from-orange-500 to-red-600"
    },
    {
      id: 4,
      name: "Golden Armored",
      price: "$32.00",
      coins: "170",
      rating: 4,
      image: "👑",
      status: "UNLOCK",
      bgColor: "from-yellow-600 to-yellow-700"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`w-3 h-3 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
      />
    ));
  };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 bg-[#0a0a0a] dark:bg-[#0a0a0a] light:bg-gray-50 min-h-screen transition-colors duration-300">
      {/* Welcome Section */}
      <div className="mb-6 lg:mb-8">
        <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] dark:from-[#1a1a1a] dark:to-[#2a2a2a] light:from-white light:to-gray-50 rounded-2xl p-4 sm:p-6 lg:p-8 border border-[#333333] dark:border-[#333333] light:border-gray-200 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
            <div>
              <h1 className="text-white dark:text-white light:text-gray-900 text-2xl sm:text-3xl font-bold mb-2 font-['Rajdhani',Helvetica] transition-colors duration-300">
                Welcome! Javier
              </h1>
              <p className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 text-sm sm:text-base transition-colors duration-300">
                You're Currently Browsing As Public User, Join Our Community To Unlock Full Access !
              </p>
            </div>
            <Button 
              onClick={() => setShowMembershipModal(true)}
              className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-[#30bdee]/25 transition-all duration-200 hover:scale-105 w-full sm:w-auto"
            >
              APPLY FOR MEMBERSHIP
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 lg:mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] dark:from-[#1a1a1a] dark:to-[#2a2a2a] light:from-white light:to-gray-50 border border-[#333333] dark:border-[#333333] light:border-gray-200 rounded-2xl p-4 sm:p-6 hover:from-[#222222] hover:to-[#333333] dark:hover:from-[#222222] dark:hover:to-[#333333] light:hover:from-gray-50 light:hover:to-gray-100 transition-all duration-200 hover:scale-105 hover:shadow-lg relative overflow-hidden">
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Icon */}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.iconBg} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              
              <div>
                <p className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 text-sm font-medium mb-1 transition-colors duration-300">{stat.title}</p>
                <p className="text-white dark:text-white light:text-gray-900 text-xl sm:text-2xl font-bold font-['Rajdhani',Helvetica] transition-colors duration-300">{stat.value}</p>
                {stat.subtitle && (
                  <p className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 text-xs transition-colors duration-300">{stat.subtitle}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Column */}
        <div className="space-y-6 lg:space-y-8">
          {/* Active Missions */}
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] dark:from-[#1a1a1a] dark:to-[#2a2a2a] light:from-white light:to-gray-50 border border-[#333333] dark:border-[#333333] light:border-gray-200 rounded-2xl p-4 sm:p-6 transition-colors duration-300">
            <h2 className="text-white dark:text-white light:text-gray-900 text-lg sm:text-xl lg:text-2xl font-bold font-['Rajdhani',Helvetica] mb-4 sm:mb-6 transition-colors duration-300">
              Active Missions
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {activeMissions.map((mission) => (
                <div key={mission.id} className="flex items-center justify-between p-3 sm:p-4 bg-[#ffffff06] dark:bg-[#ffffff06] light:bg-gray-100 rounded-xl hover:bg-[#ffffff08] dark:hover:bg-[#ffffff08] light:hover:bg-gray-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 ${mission.color} rounded-full`} />
                    <div>
                      <p className="text-white dark:text-white light:text-gray-900 font-medium text-sm sm:text-base transition-colors duration-300">{mission.title}</p>
                      <p className="text-yellow-400 text-xs sm:text-sm font-bold">{mission.reward}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {mission.info && (
                      <span className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 text-xs transition-colors duration-300">{mission.info}</span>
                    )}
                    <Button 
                      size="sm" 
                      className={`text-xs px-3 py-1 rounded ${
                        mission.status === 'Download' ? 'bg-[#30bdee] hover:bg-[#2aa3d1] text-white' :
                        'bg-[#ffffff12] dark:bg-[#ffffff12] light:bg-gray-200 text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 hover:bg-[#ffffff1a] dark:hover:bg-[#ffffff1a] light:hover:bg-gray-300'
                      }`}
                    >
                      {mission.status}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] dark:from-[#1a1a1a] dark:to-[#2a2a2a] light:from-white light:to-gray-50 border border-[#333333] dark:border-[#333333] light:border-gray-200 rounded-2xl p-4 sm:p-6 transition-colors duration-300">
            <h2 className="text-white dark:text-white light:text-gray-900 text-lg sm:text-xl lg:text-2xl font-bold font-['Rajdhani',Helvetica] mb-4 sm:mb-6 transition-colors duration-300">
              Recent Activity
            </h2>
            <div className="flex flex-col items-center justify-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#ffffff12] dark:bg-[#ffffff12] light:bg-gray-200 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                <BellIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-500 transition-colors duration-300" />
              </div>
              <h3 className="text-white dark:text-white light:text-gray-900 font-semibold text-base sm:text-lg mb-2 transition-colors duration-300">No activities yet</h3>
              <p className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 text-sm text-center transition-colors duration-300">
                Explore missions and groups to start earning XP and coins.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 lg:space-y-8">
          {/* Marketplace */}
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] dark:from-[#1a1a1a] dark:to-[#2a2a2a] light:from-white light:to-gray-50 border border-[#333333] dark:border-[#333333] light:border-gray-200 rounded-2xl p-4 sm:p-6 transition-colors duration-300">
            <h2 className="text-white dark:text-white light:text-gray-900 text-lg sm:text-xl lg:text-2xl font-bold font-['Rajdhani',Helvetica] mb-4 sm:mb-6 transition-colors duration-300">
              Marketplace
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {marketplaceItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 sm:p-4 bg-[#ffffff06] dark:bg-[#ffffff06] light:bg-gray-100 rounded-xl hover:bg-[#ffffff08] dark:hover:bg-[#ffffff08] light:hover:bg-gray-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${item.bgColor} rounded-lg flex items-center justify-center`}>
                      <span className="text-white text-lg sm:text-xl">{item.image}</span>
                    </div>
                    <div>
                      <h3 className="text-white dark:text-white light:text-gray-900 font-medium text-sm sm:text-base transition-colors duration-300">{item.name}</h3>
                      <div className="flex items-center gap-1 mb-1">
                        {renderStars(item.rating)}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#30bdee] font-bold text-sm">{item.price}</span>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-[#30bdee] rounded-full" />
                          <span className="text-white dark:text-white light:text-gray-900 text-xs transition-colors duration-300">{item.coins}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className={`text-xs px-3 py-1 rounded ${
                      item.status === 'Buy Now' ? 'bg-green-600 hover:bg-green-700 text-white' :
                      'bg-[#ffffff12] dark:bg-[#ffffff12] light:bg-gray-200 text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 hover:bg-[#ffffff1a] dark:hover:bg-[#ffffff1a] light:hover:bg-gray-300'
                    }`}
                  >
                    {item.status}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Unlocked */}
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] dark:from-[#1a1a1a] dark:to-[#2a2a2a] light:from-white light:to-gray-50 border border-[#333333] dark:border-[#333333] light:border-gray-200 rounded-2xl p-4 sm:p-6 transition-colors duration-300">
            <h2 className="text-white dark:text-white light:text-gray-900 text-lg sm:text-xl font-bold font-['Rajdhani',Helvetica] mb-4 transition-colors duration-300">
              Achievement Unlocked / New Recruit
            </h2>
            <p className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 text-sm mb-4 transition-colors duration-300">
              You've Earned Your First Badge: <span className="text-[#30bdee] font-semibold">Claim Now!</span>
            </p>
            
            {/* Badge Progress */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Badge Progress /</h3>
                  <p className="text-white text-sm">Welcome Aboard !</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-2 h-2 bg-[#ffffffb2] dark:bg-[#ffffffb2] light:bg-gray-400 rounded-full transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Membership Application Modal */}
      {showMembershipModal && (
        <MembershipApplication onClose={() => setShowMembershipModal(false)} />
      )}
    </>
  );
};