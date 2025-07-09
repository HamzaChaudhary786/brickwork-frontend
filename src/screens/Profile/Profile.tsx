import { EditIcon, MessageCircleIcon, UserMinusIcon } from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { DashboardProps } from "../Dashboard";
import { FormData } from ".";
import authClient from "../../config/authConfig";

export const Profile = ({ user }: DashboardProps): JSX.Element => {

  const [editProfile, setEditProfile] = useState<any>(false)

  const [formData, setFormData] = useState<FormData>({
    name: '',
    username: '',
    steamId: '',
    starCitizenId: ''
  });

  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleUpdate = async () => {
    try {
      await authClient.updateUser({
        name: formData.name,
        username: formData.username,
        steamId: formData.steamId,
        starCitizenId: formData.starCitizenId
      });
      alert('Profile updated!');

    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  // if (!editProfile) return null;

  // User data
  const userData = {
    name: "Javier",
    joinDate: "Joined April 04, 2024",
    wallet: "$1427.001",
    coins: 134,
    xpEarned: "8,450 XP",
    level: 12,
    currentLevelXP: 8450,
    nextLevelXP: 10000,
    winRate: 40,
    totalGames: 24,
    lossRate: 12,
    tournaments: 112,
    avatar: "👤"
  };

  // Achievements data
  const achievements = [
    {
      title: "Welcome Aboard",
      xp: "120 XP",
      icon: "🌟",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Social Butterfly",
      xp: "70 XP",
      icon: "🦋",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Event Champion",
      xp: "1,120 XP",
      icon: "🏆",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      title: "Champion's Crest",
      xp: "70 XP",
      icon: "👑",
      color: "from-purple-500 to-purple-600"
    }
  ];

  // Friends data
  const friends = [
    { name: "Pixel Phantom", avatar: "PP", color: "from-red-500 to-red-600" },
    { name: "NeoDash", avatar: "ND", color: "from-blue-500 to-blue-600" },
    { name: "BlueArc", avatar: "BA", color: "from-cyan-500 to-cyan-600" },
    { name: "ZenWave", avatar: "ZW", color: "from-purple-500 to-purple-600" },
    { name: "JohnGo", avatar: "JG", color: "from-green-500 to-green-600" }
  ];

  // Groups data
  const groups = [
    {
      name: "Elite Circle",
      role: "Leader",
      members: "14 Members",
      xp: "+52 XP",
      avatar: "💀",
      color: "from-red-500 to-red-600"
    },
    {
      name: "XP Force",
      role: "Member",
      members: "22 Members",
      xp: "+52 XP",
      avatar: "⚡",
      color: "from-orange-500 to-orange-600"
    },
    {
      name: "Roundtable",
      role: "Member",
      members: "29 Members",
      xp: "+52 XP",
      avatar: "🎯",
      color: "from-blue-500 to-blue-600"
    }
  ];

  // Leaderboard data
  const leaderboard = [
    { rank: "#20", name: "You ranked at", xp: "8,450 XP", isCurrentUser: true },
    { rank: "Rank 10", name: "NovaStar#8621", xp: "16,600 XP", avatar: "NS" },
    { rank: "Rank 14", name: "SkyFox#1045", xp: "14,300 XP", avatar: "SF" },
    { rank: "Rank 24", name: "EchoStrider#93", xp: "13,750 XP", avatar: "ES" }
  ];



  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Header */}
      <div className="bg-[#111111] border-b border-[#333333] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-white text-2xl sm:text-3xl font-bold font-['Rajdhani',Helvetica]">
            Welcome Back!    {user?.name
              ? user.name.includes('@')
                ? user.name.split('@')[0]
                : user.name
              : 'Unknown'}
          </h1>
          <Button className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white px-4 sm:px-6 py-2 rounded-lg w-full sm:w-auto" onClick={() => {
            setEditProfile(!editProfile)

          }}>
            Edit Profile
          </Button>
        </div>
      </div>

      <div>
        {
          editProfile && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-80">
                <h2 className="text-lg font-bold mb-4">Edit Profile</h2>

                <div className="space-y-3 text-black">
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    className="w-full p-2 border rounded"
                  />

                  <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange('username')}
                    className="w-full p-2 border rounded"
                  />

                  <input
                    type="text"
                    placeholder="Steam ID (optional)"
                    value={formData.steamId}
                    onChange={handleInputChange('steamId')}
                    className="w-full p-2 border rounded"
                  />

                  <input
                    type="text"
                    placeholder="Star Citizen ID (optional)"
                    value={formData.starCitizenId}
                    onChange={handleInputChange('starCitizenId')}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => { setEditProfile(!editProfile) }}
                    className="flex-1 p-2 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="flex-1 p-2 bg-blue-500 text-white rounded"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )
        }
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        {/* Main Profile Section - Updated to match screenshot */}
        <div className="grid grid-cols-1 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* Profile Info - Matching screenshot layout */}
          <Card className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-[#333333] p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start lg:items-center">
              {/* Avatar and Basic Info */}
              <div className="lg:col-span-3 flex items-center gap-4 sm:gap-6 lg:gap-4 xl:gap-6">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                    {/* User Avatar Image */}
                    <img
                      src={user?.image}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-[#1a1a1a]" />
                </div>
                <div>
                  <h2 className="text-white text-xl sm:text-2xl lg:text-lg font-bold lg:font-semibold mb-1 break-words">
                    {user?.name
                      ? user.name.includes('@')
                        ? user.name.split('@')[0]
                        : user.name
                      : 'Unknown'}

                  </h2>
                  <p className="text-[#ffffffb2] text-sm">{userData.joinDate}</p>
                </div>
              </div>

              {/* Wallet Section */}
              <div className="lg:col-span-2">
                <p className="text-[#ffffffb2] text-sm mb-2">Wallet</p>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">C</span>
                  </div>
                  <span className="text-yellow-400 font-bold">{userData.coins}</span>
                </div>
                <p className="text-white text-lg sm:text-xl font-bold">{userData.wallet}</p>
              </div>

              {/* XP Earned Section */}
              <div className="lg:col-span-2">
                <p className="text-[#ffffffb2] text-sm mb-2">XP Earned</p>
                <p className="text-white text-lg sm:text-xl font-bold">{userData.xpEarned}</p>
              </div>

              {/* Level Progress Section */}
              <div className="lg:col-span-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#ffffffb2] text-sm">Level {userData.level}</span>
                  <span className="text-white text-lg font-bold">{userData.level}</span>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#ffffffb2] text-sm">Level 13</span>
                    <span className="text-[#ffffffb2] text-sm">{userData.currentLevelXP.toLocaleString()}/{userData.nextLevelXP.toLocaleString()} XP</span>
                  </div>
                </div>
                <div className="w-full bg-[#333333] rounded-full h-2 sm:h-3">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 sm:h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${(userData.currentLevelXP / userData.nextLevelXP) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Stats and Achievements Section */}
            <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Game Stats */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-[#ffffffb2] text-sm">Game Played</p>
                    <p className="text-white text-xl sm:text-2xl font-bold">{userData.totalGames}</p>
                  </div>
                  <div>
                    <p className="text-[#ffffffb2] text-sm">Win</p>
                    <p className="text-white text-xl sm:text-2xl font-bold">{userData.winRate}%</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center mt-4">
                  <div>
                    <p className="text-[#ffffffb2] text-sm">Tournament</p>
                    <p className="text-white text-base sm:text-lg font-bold">{userData.tournaments}</p>
                  </div>
                  <div>
                    <p className="text-[#ffffffb2] text-sm">Loss</p>
                    <p className="text-white text-base sm:text-lg font-bold">{userData.lossRate}%</p>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="lg:col-span-9">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#333333] rounded-2xl flex items-center justify-center mb-3 mx-auto shadow-lg relative overflow-hidden">
                        {/* Achievement Icons based on screenshot */}
                        {achievement.title === "Welcome Aboard" && (
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-lg">✓</span>
                          </div>
                        )}
                        {achievement.title === "Social Butterfly" && (
                          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">★</span>
                          </div>
                        )}
                        {achievement.title === "Event Champion" && (
                          <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center relative">
                            <span className="text-yellow-400 text-lg">🏆</span>
                            <div className="absolute top-0 right-0 w-3 h-3 bg-yellow-400 rounded-full" />
                          </div>
                        )}
                        {achievement.title === "Champion's Crest" && (
                          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">▲</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-white font-semibold text-sm mb-1">{achievement.title}</h3>
                      <p className="text-[#ffffffb2] text-xs">{achievement.xp}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 xl:gap-8">
          {/* Friends */}
          <Card className="bg-[#111111] border-[#333333]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white font-bold text-lg sm:text-xl">
                  Friends ({friends.length.toString().padStart(2, '0')})
                </CardTitle>
                <Button variant="ghost" className="text-[#30bdee] hover:text-white text-sm">
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {friends.map((friend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${friend.color} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-bold text-xs sm:text-sm">{friend.avatar}</span>
                    </div>
                    <span className="text-white font-medium text-sm sm:text-base truncate">{friend.name}</span>
                  </div>
                  <div className="flex flex-col lg:flex-col xl:flex-row gap-1 sm:gap-2">
                    <Button size="sm" className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white px-2 sm:px-3 py-1 rounded text-xs">
                      Message
                    </Button>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white px-2 sm:px-3 py-1 rounded text-xs">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Groups */}
          <Card className="bg-[#111111] border-[#333333]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white font-bold text-lg sm:text-xl">
                  Groups ({groups.length.toString().padStart(2, '0')})
                </CardTitle>
                <Button variant="ghost" className="text-[#30bdee] hover:text-white text-sm">
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {groups.map((group, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${group.color} rounded-xl flex items-center justify-center`}>
                      <span className="text-white text-lg sm:text-xl">{group.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-semibold text-sm sm:text-base truncate">{group.name}</h3>
                        <span className="text-[#ffffffb2] text-xs sm:text-sm">{group.members}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#ffffffb2] text-xs sm:text-sm">{group.role}</span>
                        <span className="text-yellow-400 text-xs sm:text-sm font-bold">{group.xp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-[#ffffff12] hover:bg-[#ffffff1a] text-[#ffffffb2] hover:text-white border-0 rounded text-xs sm:text-sm">
                      Leave Group
                    </Button>
                    <Button className="flex-1 bg-[#30bdee] hover:bg-[#2aa3d1] text-white rounded text-xs sm:text-sm">
                      {group.role === 'Leader' ? 'Manage Group' : 'View Group'}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="bg-[#111111] border-[#333333]">
            <CardHeader>
              <CardTitle className="text-white font-bold text-lg sm:text-xl">
                Leaderboard (Top 3)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {leaderboard.map((player, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${player.isCurrentUser ? 'bg-[#30bdee]/20 border border-[#30bdee]/50' : 'bg-[#ffffff06]'
                  }`}>
                  <div className="flex items-center gap-3">
                    {player.avatar ? (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs sm:text-sm">{player.avatar}</span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#30bdee] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs sm:text-sm">Y</span>
                      </div>
                    )}
                    <div>
                      <p className={`font-semibold text-sm sm:text-base ${player.isCurrentUser ? 'text-[#30bdee]' : 'text-white'}`}>
                        {player.name}
                      </p>
                      <p className="text-[#ffffffb2] text-xs sm:text-sm">{player.rank}</p>
                    </div>
                  </div>
                  <span className="text-[#30bdee] font-bold text-sm sm:text-base">{player.xp}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};