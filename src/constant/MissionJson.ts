export const achievements = [
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
export const missions = [
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
export const xpHistory = [
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
export const upcomingMissions = [
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
export const availableMissions = [
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