import { TrendingUpIcon, UsersIcon, ShoppingBagIcon, StarIcon, ZapIcon, TrophyIcon, CoinsIcon, TargetIcon, ArrowUpIcon, PlayIcon, WalletIcon, DollarSignIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { DashboardProps } from ".";
import { useAbility } from '../../casl/AbilityContext';

export const Dashboard = ({ user }: DashboardProps): JSX.Element => {
  const ability = useAbility();

  const stats = [
    {
      title: "XP Earned",
      value: "12,400",
      icon: ZapIcon,
      color: "text-[#30bdee]",
      bgColor: "bg-[#30bdee]/10",
      iconBg: "bg-[#30bdee]/20",
      borderColor: "border-[#30bdee]/30"
    },
    {
      title: "My Groups",
      value: "4",
      subtitle: "Active Groups",
      icon: UsersIcon,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      iconBg: "bg-purple-400/20",
      borderColor: "border-purple-400/30"
    },
  ];


  const recentActivity = [
    {
      type: "purchase",
      title: "Purchased Golden Armored Knight",
      time: "2 hours ago",
      icon: ShoppingBagIcon,
      iconColor: "text-[#30bdee]",
      iconBg: "bg-[#30bdee]/10"
    },
    {
      type: "achievement",
      title: "Unlocked 'Collector' Achievement",
      time: "5 hours ago",
      icon: TrophyIcon,
      iconColor: "text-yellow-400",
      iconBg: "bg-yellow-400/10"
    },
    {
      type: "mission",
      title: "Completed Daily Login Mission",
      time: "1 day ago",
      icon: TargetIcon,
      iconColor: "text-green-400",
      iconBg: "bg-green-400/10"
    },
    {
      type: "social",
      title: "Added 3 new friends",
      time: "2 days ago",
      icon: UsersIcon,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-400/10"
    },
  ];

  const missions = [
    {
      title: "Daily Login Streak",
      progress: 100,
      reward: "50 coins",
      icon: ZapIcon,
      color: "bg-green-400",
      status: "completed"
    },
    {
      title: "Purchase 3 Items",
      progress: 66,
      reward: "100 coins",
      icon: ShoppingBagIcon,
      color: "bg-[#30bdee]",
      status: "active"
    },
    {
      title: "Invite 5 Friends",
      progress: 40,
      reward: "200 coins",
      icon: UsersIcon,
      color: "bg-purple-400",
      status: "active"
    },
  ];

  // User level and XP data
  const userLevel = {
    current: 12,
    xp: 8450,
    xpToNext: 1550,
    totalToNext: 10000,
    percentage: (8450 / 10000) * 100
  };


  if (!ability.can('view', 'dashboard')) {
    return (
      <div
        className="flex items-center justify-center h-screen text-white font-bold text-xl"
      >
        You are not authorized to view the Dashboard.
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 bg-[#0a0a0a] dark:bg-[#0a0a0a] light:bg-gray-50 min-h-screen transition-colors duration-300">
      {/* Welcome Section with XP Bar - Updated to match screenshot */}
      <div className="mb-6 lg:mb-10">
        <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] dark:from-[#1a1a1a] dark:to-[#2a2a2a] light:from-white light:to-gray-50 rounded-2xl p-4 sm:p-6 lg:p-8 border border-[#333333] dark:border-[#333333] light:border-gray-200 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 lg:mb-6 gap-4">
            <div>
              <h1 className="text-white dark:text-white light:text-gray-900 text-2xl sm:text-3xl font-bold mb-2 font-['Rajdhani',Helvetica] transition-colors duration-300">
                Welcome Back! {user?.name}
              </h1>
            </div>
            <Button className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-[#30bdee]/25 transition-all duration-200 hover:scale-105 w-full sm:w-auto">
              EARN MORE XP
            </Button>
          </div>

          {/* XP Progress Bar - Matching screenshot style */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                <StarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-current" />
              </div>
              <div>
                <h3 className="text-white dark:text-white light:text-gray-900 text-lg sm:text-xl font-bold font-['Rajdhani',Helvetica] transition-colors duration-300">Level {userLevel.current}</h3>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="relative">
                <div className="w-full bg-[#333333] dark:bg-[#333333] light:bg-gray-300 rounded-full h-3 sm:h-4 overflow-hidden transition-colors duration-300">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 sm:h-4 rounded-full transition-all duration-1000 ease-out shadow-lg"
                    style={{ width: `${userLevel.percentage}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <span className="text-white dark:text-white light:text-gray-900 text-xs sm:text-sm font-medium transition-colors duration-300">
                  {userLevel.xp.toLocaleString()}/{userLevel.totalToNext.toLocaleString()} XP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Updated to match screenshot with same background color for all containers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Combined Wallet Balance and Currency Coin Container - Same background as Welcome container */}
        <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] dark:from-[#1a1a1a] dark:to-[#2a2a2a] light:from-white light:to-gray-50 border border-[#333333] dark:border-[#333333] light:border-gray-200 rounded-2xl p-4 sm:p-6 hover:from-[#222222] hover:to-[#333333] dark:hover:from-[#222222] dark:hover:to-[#333333] light:hover:from-gray-50 light:hover:to-gray-100 transition-all duration-200 hover:scale-105 hover:shadow-lg relative overflow-hidden">
          <div className="flex items-center">
            {/* Wallet Balance Section */}
            <div className="flex-1 flex items-center gap-3 sm:gap-4">
              {/* Green Dollar Icon with Border */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-green-400 rounded-xl flex items-center justify-center bg-green-400/10">
                <DollarSignIcon className="w-6 h-6 sm:w-7 sm:h-7 text-green-400" />
              </div>

              <div>
                <p className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 text-sm font-medium mb-1 transition-colors duration-300">Wallet Balance</p>
                <p className="text-white dark:text-white light:text-gray-900 text-xl sm:text-2xl font-bold font-['Rajdhani',Helvetica] transition-colors duration-300">$52.00</p>
              </div>
            </div>

            {/* Vertical Separator */}
            <div className="w-px h-12 sm:h-16 bg-[#555555] dark:bg-[#555555] light:bg-gray-300 mx-4 sm:mx-6 transition-colors duration-300" />

            {/* Currency Coin Section */}
            <div className="flex-1 flex items-center gap-3 sm:gap-4">
              {/* Yellow Coin Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm sm:text-base font-bold">C</span>
              </div>

              <div>
                <p className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 text-sm font-medium mb-1 transition-colors duration-300">Currency Coin</p>
                <p className="text-white dark:text-white light:text-gray-900 text-xl sm:text-2xl font-bold font-['Rajdhani',Helvetica] transition-colors duration-300">1,254</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side container for XP Earned and My Groups - Same background as Welcome container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Individual Stats Cards - Updated to use same background */}
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] dark:from-[#1a1a1a] dark:to-[#2a2a2a] light:from-white light:to-gray-50 border border-[#333333] dark:border-[#333333] light:border-gray-200 rounded-2xl p-4 sm:p-6 hover:from-[#222222] hover:to-[#333333] dark:hover:from-[#222222] dark:hover:to-[#333333] light:hover:from-gray-50 light:hover:to-gray-100 transition-all duration-200 hover:scale-105 hover:shadow-lg relative overflow-hidden">
              {/* Background Icon */}
              <div className={`absolute top-2 right-2 w-12 h-12 sm:w-16 sm:h-16 ${stat.iconBg} rounded-xl flex items-center justify-center opacity-20`}>
                <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`} />
              </div>

              {/* Main Icon */}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.iconBg} rounded-xl flex items-center justify-center mb-4 relative z-10`}>
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <p className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 text-sm font-medium mb-2 transition-colors duration-300">{stat.title}</p>
                <p className="text-white dark:text-white light:text-gray-900 text-2xl sm:text-3xl font-bold font-['Rajdhani',Helvetica] mb-1 transition-colors duration-300">{stat.value}</p>
                {stat.subtitle && (
                  <p className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 text-xs transition-colors duration-300">{stat.subtitle}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Recent Activity - Updated to use same background */}
        <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] dark:from-[#1a1a1a] dark:to-[#2a2a2a] light:from-white light:to-gray-50 border border-[#333333] dark:border-[#333333] light:border-gray-200 rounded-2xl p-4 sm:p-6 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center">
              <TrendingUpIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#30bdee] mr-2 sm:mr-3" />
              <h2 className="text-white dark:text-white light:text-gray-900 text-lg sm:text-xl lg:text-2xl font-bold font-['Rajdhani',Helvetica] transition-colors duration-300">
                Recent Activity
              </h2>
            </div>
            <Button variant="ghost" className="text-[#30bdee] hover:text-white text-sm">
              View all
            </Button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-[#ffffff06] dark:bg-[#ffffff06] light:bg-gray-100 rounded-xl hover:bg-[#ffffff08] dark:hover:bg-[#ffffff08] light:hover:bg-gray-200 transition-colors">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 ${activity.iconBg} rounded-lg flex items-center justify-center`}>
                  <activity.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${activity.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white dark:text-white light:text-gray-900 font-medium text-sm sm:text-base truncate transition-colors duration-300">{activity.title}</p>
                  <p className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 text-xs sm:text-sm transition-colors duration-300">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Missions - Updated to use same background */}
        <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] dark:from-[#1a1a1a] dark:to-[#2a2a2a] light:from-white light:to-gray-50 border border-[#333333] dark:border-[#333333] light:border-gray-200 rounded-2xl p-4 sm:p-6 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center">
              <TargetIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#30bdee] mr-2 sm:mr-3" />
              <h2 className="text-white dark:text-white light:text-gray-900 text-lg sm:text-xl lg:text-2xl font-bold font-['Rajdhani',Helvetica] transition-colors duration-300">
                Active Missions
              </h2>
            </div>
            <Button variant="ghost" className="text-[#30bdee] hover:text-white text-sm">
              View all
            </Button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {missions.map((mission, index) => (
              <div key={index} className="p-3 sm:p-4 bg-[#ffffff06] dark:bg-[#ffffff06] light:bg-gray-100 rounded-xl hover:bg-[#ffffff08] dark:hover:bg-[#ffffff08] light:hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 ${mission.color}/20 rounded-lg flex items-center justify-center`}>
                      <mission.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${mission.color.replace('bg-', 'text-')}`} />
                    </div>
                    <p className="text-white dark:text-white light:text-gray-900 font-semibold text-sm sm:text-base transition-colors duration-300">{mission.title}</p>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <CoinsIcon className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-xs sm:text-sm font-bold">{mission.reward}</span>
                  </div>
                </div>

                <div className="relative mb-2">
                  <div className="w-full bg-[#ffffff12] dark:bg-[#ffffff12] light:bg-gray-300 rounded-full h-2 sm:h-3 transition-colors duration-300">
                    <div
                      className={`${mission.color} h-2 sm:h-3 rounded-full transition-all duration-500 shadow-sm`}
                      style={{ width: `${mission.progress}%` }}
                    />
                  </div>
                  {mission.status === 'completed' && (
                    <div className="absolute right-2 top-0 bottom-0 flex items-center">
                      <StarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 text-xs sm:text-sm transition-colors duration-300">{mission.progress}% complete</p>
                  {mission.status === 'completed' ? (
                    <span className="text-green-400 text-xs sm:text-sm font-semibold">✓ Completed</span>
                  ) : (
                    <span className="text-[#30bdee] text-xs sm:text-sm font-semibold">In Progress</span>
                  )}
                </div>
              </div>
            ))}
            <Link to="/missions">
              <Button className="w-full bg-gradient-to-r from-[#30bdee] to-[#65cbff] hover:from-[#2aa3d1] hover:to-[#5bb8f0] text-white rounded-xl font-semibold shadow-lg shadow-[#30bdee]/25 transition-all duration-200 hover:scale-105">
                <TargetIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                View All Missions
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};