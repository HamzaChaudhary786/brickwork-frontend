export const availableGroups = [
    {
        id: 1,
        name: "XP Seeker",
        description: "Complete missions, gain XP, and level up together daily.",
        members: 142,
        xpBoost: "+10% XP Boost",
        tags: ["#XP", "#Missions", "#LevelUp", "#Leaderboard"],
        avatar: "👤",
        color: "from-blue-500 to-blue-600",
        canJoin: true
    },
    {
        id: 2,
        name: "Social Sparks",
        description: "Sparking fun with games and community!",
        members: 170,
        xpBoost: "+30% XP Boost",
        tags: ["#Social", "#FunGames", "#SocialGaming"],
        avatar: "🥷",
        color: "from-orange-500 to-orange-600",
        canJoin: true
    },
    {
        id: 3,
        name: "Elite Circle",
        description: "Master new skills, share knowledge & grow as a team",
        members: 124,
        role: "Workshop Leader",
        description2: "Building hands-on learning, one session at a time",
        avatar: "💀",
        color: "from-red-500 to-red-600",
        canManage: true
    },
    {
        id: 4,
        name: "Level Up League",
        description: "Gaming hub for challenges, tournaments, and fun.",
        members: 0,
        role: "BOT",
        description2: "Manage matches, get alerts, and connect with players.",
        avatar: "💀",
        color: "from-gray-500 to-gray-600",
        canView: true
    }
];




 export const roleManagement = [
    {
      id: 1,
      user: "Ana 121",
      avatar: "A1",
      role: "Bot Manager",
      permissions: "Hosts Workshops And Manages Attendees",
      assignedUsers: "04",
      status: "Active",
      color: "from-green-500 to-green-600"
    },
    {
      id: 2,
      user: "Ana 121",
      avatar: "A2",
      role: "Content Creator",
      permissions: "Post Articles",
      assignedUsers: "02",
      status: "In Active",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 3,
      user: "Ana 121",
      avatar: "A3",
      role: "Game Analyst",
      permissions: "View Game Data",
      assignedUsers: "01",
      status: "Active",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      user: "Ana Jones",
      avatar: "AJ",
      role: "Poll Organizer",
      permissions: "Create Events, Manage Brackets/Scores",
      assignedUsers: "02",
      status: "Bot",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 5,
      user: "Ana 121",
      avatar: "A4",
      role: "Moderator",
      permissions: "Moderate Content",
      assignedUsers: "02",
      status: "Active",
      color: "from-red-500 to-red-600"
    }
  ];



   export const myGroups = [
    {
      id: 1,
      name: "Elite Circle",
      role: "Workshop Leader",
      avatar: "💀",
      color: "from-red-500 to-red-600"
    },
    {
      id: 2,
      name: "XP Force",
      role: "Content Creator",
      avatar: "⚡",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 3,
      name: "The Roundtable",
      role: "Tournament Organizer",
      avatar: "🎯",
      color: "from-blue-500 to-blue-600"
    }
  ];




   export const groupAdminData = {
      groupInfo: {
        name: "Elite Circle",
        description: "Elite Circle Is A Premier Squad For Veteran Gamers - Master Strategies, Tackle Advanced Missions, And Claim The Leaderboards Together.",
        created: "April 04, 2024",
        members: 124,
        xpEarned: "42,500 XP",
        xpBoost: "10%",
        status: "Active",
        avatar: "💀",
        color: "from-red-500 to-red-600"
      },
      pendingApplications: [
        {
          id: 1,
          user: "Gamer 123",
          avatar: "G1",
          message: "I'm an active streamer, happy to help!",
          color: "from-blue-500 to-blue-600"
        },
        {
          id: 2,
          user: "QuestMaster#3344",
          avatar: "QM",
          message: "Experienced moderator - here to support the team",
          color: "from-green-500 to-green-600"
        },
        {
          id: 3,
          user: "SkyRider#7788",
          avatar: "SR",
          message: "Ready to test new missions and report bugs helping improve it to customers",
          color: "from-purple-500 to-purple-600"
        }
      ],
  
      
      roleManagement: [
        {
          id: 1,
          user: "Ana 121",
          avatar: "A1",
          role: "Bot Manager",
          permissions: "Hosts Workshops And Manages Attendees",
          assignedUsers: "04",
          status: "Active",
          color: "from-green-500 to-green-600"
        },
        {
          id: 2,
          user: "Ana 121",
          avatar: "A2",
          role: "Content Creator",
          permissions: "Post Articles",
          assignedUsers: "02",
          status: "In Active",
          color: "from-blue-500 to-blue-600"
        },
        {
          id: 3,
          user: "Ana 121",
          avatar: "A3",
          role: "Game Analyst",
          permissions: "View Game Data",
          assignedUsers: "01",
          status: "Active",
          color: "from-purple-500 to-purple-600"
        },
        {
          id: 4,
          user: "Ana Jones",
          avatar: "AJ",
          role: "Poll Organizer",
          permissions: "Create Events, Manage Brackets/Scores",
          assignedUsers: "02",
          status: "Bot",
          color: "from-orange-500 to-orange-600"
        },
        {
          id: 5,
          user: "Ana 121",
          avatar: "A4",
          role: "Moderator",
          permissions: "Moderate Content",
          assignedUsers: "02",
          status: "Active",
          color: "from-red-500 to-red-600"
        }
      ],
      missions: [
        {
          id: 1,
          name: "Host Group Event",
          xpReward: "+300XP",
          coins: 15,
          status: "Active"
        },
        {
          id: 2,
          name: "Create a Poll",
          xpReward: "+300XP",
          coins: 0,
          status: "In Progress"
        },
        {
          id: 3,
          name: "Strategy Workshop",
          xpReward: "+70XP",
          coins: 15,
          status: "Completed"
        },
        {
          id: 4,
          name: "Arrange Quest",
          xpReward: "+170XP",
          coins: 0,
          status: "In Progress"
        }
      ],
      activityLog: [
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
          user: "Question321***",
          avatar: "Q3",
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
      ]
    };