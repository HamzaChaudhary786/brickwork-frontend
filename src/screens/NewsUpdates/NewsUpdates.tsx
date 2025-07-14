import { BellIcon, PlusIcon, XIcon, CalendarIcon, UserIcon, EyeIcon } from "lucide-react";
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

export const NewsUpdates = (): JSX.Element => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [newPost, setNewPost] = useState({
    type: 'News',
    title: '',
    summary: '',
    content: '',
    visibility: 'Public',
    location: '',
    eventDate: '',
    eventTime: '',
    image: null as File | null
  });

  // News updates ticker data
  const newsUpdates = [
    "Join Our Community Meeting - Sunday",
    "New Mission Batch Live Now!",
    "🎉 Congratulations to Our Top Recruits",
    "🎉 Event Ended Operation News This Week"
  ];

  // Featured announcement data
  const featuredAnnouncement = {
    id: 1,
    title: "Cyber Knight Armor Set In Stock",
    subtitle: "🔥 New Store Items Available",
    description: "Armed with a heavy battle mace and blessed shield plating, this elite unit is perfect for front-line battles.",
    image: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=2",
    author: "GameHub",
    timeAgo: "2 Minutes Ago",
    readTime: "2 min read",
    category: "🔥 New Store Items Available"
  };

  // Community updates data - right sidebar
  const communityUpdates = [
    {
      id: 1,
      title: "Join Our Community AMA 🎤",
      description: "Got questions? Our command staff will be live to chat about future features.",
      author: "NexDash",
      timeAgo: "10 Minutes Ago",
      avatar: "ND",
      color: "from-blue-500 to-blue-600",
      readMore: "Read more"
    },
    {
      id: 2,
      title: "Weekend Challenge Incoming",
      description: "Limited-time mission challenge. Complete any 3 group objectives in 48 hours.",
      author: "BlueArc",
      timeAgo: "18 Minutes Ago",
      avatar: "BA",
      color: "from-cyan-500 to-cyan-600",
      readMore: "Read more"
    },
    {
      id: 3,
      title: "Hall of Legends Updated",
      description: "Check out who dominated this month's XP charts! Think you can climb?",
      author: "ZenWave",
      timeAgo: "45 Minutes Ago",
      avatar: "ZW",
      color: "from-purple-500 to-purple-600",
      readMore: "Read more"
    }
  ];

  // Announcements data - main content cards
  const announcements = [
    {
      id: 1,
      title: "Join Our Community AMA 🎤",
      description: "Got questions? Our command staff will be live to chat",
      author: "NexDash",
      timeAgo: "10 Minutes Ago",
      image: "https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
      readMore: "Read more",
      avatar: "ND",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Budget Patch v1.3 Live",
      description: "5 new budgets have been added. Complete your collection",
      author: "NexDash",
      timeAgo: "10 Minutes Ago",
      image: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
      readMore: "Read more",
      avatar: "ND",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: "Server Maintenance Tonight",
      description: "Our servers will be offline for updates from 2 AM - 4 AM UTC",
      author: "NexDash",
      timeAgo: "10 Minutes Ago",
      image: "https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
      readMore: "Read more",
      avatar: "ND",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 4,
      title: "Event Reminder",
      description: "Operation 'Join Gate' goes live Friday at 7 PM UTC",
      author: "NexDash",
      timeAgo: "10 Minutes Ago",
      image: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
      readMore: "Read more",
      avatar: "ND",
      color: "from-purple-500 to-purple-600"
    }
  ];

  // Upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Operation Iron Gate",
      date: "Friday, July 5 - 7:00 PM UTC",
      type: "Tactical Community Mission",
      rewards: "Rewards: +500 XP",
      status: "Join Mission",
      image: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
      author: "NexDash",
      avatar: "ND"
    },
    {
      id: 2,
      title: "Dev Test Session",
      date: "Friday, July 5 - 7:00 PM UTC",
      type: "Tactical Community Mission",
      rewards: "Rewards: Rare 'Iron Vanguard' Badge",
      status: "Join",
      image: "https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
      author: "NexDash",
      avatar: "ND"
    },
    {
      id: 3,
      title: "Award Ceremony Stream",
      date: "Monday, July 8 - 9:00 PM UTC",
      type: "Discord Voice + Twitch",
      rewards: "Details: Celebrating top contributors!",
      status: "Join Stream",
      image: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
      author: "NexDash",
      avatar: "ND"
    },
    {
      id: 4,
      title: "Target Practice Night",
      date: "Saturday, July 5 - 7:00 PM UTC",
      type: "Casual Group Training",
      rewards: "Rewards: +50 XP",
      status: "Join",
      image: "https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
      author: "NexDash",
      avatar: "ND"
    }
  ];

  const handleAnnouncementClick = (announcement: any) => {
    setSelectedAnnouncement(announcement);
    setShowAnnouncementModal(true);
  };

  const handleCloseAnnouncementModal = () => {
    setShowAnnouncementModal(false);
    setSelectedAnnouncement(null);
  };

  const handleCreatePostClick = () => {
    setShowCreatePostModal(true);
  };

  const handleCloseCreatePostModal = () => {
    setShowCreatePostModal(false);
    setNewPost({
      type: 'News',
      title: '',
      summary: '',
      content: '',
      visibility: 'Public',
      location: '',
      eventDate: '',
      eventTime: '',
      image: null
    });
  };

  const handlePostInputChange = (field: string, value: any) => {
    setNewPost(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewPost(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handlePublishPost = () => {
    console.log('Publishing post:', newPost);
    // Add post publishing logic here
    handleCloseCreatePostModal();
  };
  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 bg-[#0a0a0a] dark:bg-[#0a0a0a] light:bg-gray-50 min-h-screen transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 lg:mb-8">
          <div>
            <h1 className="text-white dark:text-white light:text-gray-900 text-2xl sm:text-3xl lg:text-[32px] tracking-[-0.32px] leading-tight lg:leading-[51.2px] font-['Rajdhani',Helvetica] font-semibold mb-2 transition-colors duration-300">
              Community News & Updates
            </h1>
            <p className="font-['Rajdhani',Helvetica] font-medium text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 text-sm sm:text-base tracking-[-0.16px] leading-relaxed lg:leading-[25.6px] transition-colors duration-300">
              Stay informed with the latest missions, announcements, and important alerts.
            </p>
          </div>
          <Button 
            className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white px-4 sm:px-6 py-2 rounded-lg font-semibold"
            onClick={handleCreatePostClick}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Create new post
          </Button>
        </div>

        {/* News Updates Ticker */}
        <div className="bg-[#111111] dark:bg-[#111111] light:bg-white border border-[#333333] dark:border-[#333333] light:border-gray-200 rounded-lg p-4 transition-colors duration-300">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-white dark:text-white light:text-gray-900 font-semibold text-sm transition-colors duration-300">New updates:</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {newsUpdates.map((update, index) => (
              <React.Fragment key={index}>
                <span className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 transition-colors duration-300">
                  {update}
                </span>
                {index < newsUpdates.length - 1 && (
                  <span className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-500 transition-colors duration-300">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
          {/* Left Column - Featured Content (3/4 width) */}
          <div className="xl:col-span-3 space-y-6 lg:space-y-8">
            {/* Featured Hero Section */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 min-h-[400px] flex items-center">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={featuredAnnouncement.image}
                  alt={featuredAnnouncement.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-blue-900/60 to-transparent" />
              </div>
              
              {/* Content */}
              <div className="relative z-10 p-6 sm:p-8 lg:p-12 max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-orange-600 text-white text-sm font-bold rounded-full">
                    {featuredAnnouncement.category}
                  </span>
                </div>
                <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  {featuredAnnouncement.title}
                </h2>
                <p className="text-gray-200 text-base sm:text-lg mb-6 leading-relaxed">
                  {featuredAnnouncement.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span>📖 {featuredAnnouncement.readTime}</span>
                  <span>⏰ {featuredAnnouncement.timeAgo}</span>
                </div>
                <Button className="mt-6 bg-[#30bdee] hover:bg-[#2aa3d1] text-white px-6 py-3 rounded-lg font-semibold">
                  Read more
                </Button>
              </div>
            </div>

            {/* Announcements Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-white dark:text-white light:text-gray-900 font-bold text-xl transition-colors duration-300">
                  Announcements
                </h2>
                <Button variant="ghost" className="text-[#30bdee] hover:text-[#65cbff] text-sm font-medium">
                  Explore More
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {announcements.map((announcement) => (
                  <div 
                    key={announcement.id} 
                    className="bg-[#1a1a1a] dark:bg-[#1a1a1a] light:bg-white border border-[#333333] dark:border-[#333333] light:border-gray-200 rounded-xl overflow-hidden hover:border-[#30bdee]/50 transition-all duration-300 cursor-pointer group"
                    onClick={() => handleAnnouncementClick(announcement)}
                  >
                    <div className="relative h-32">
                      <img 
                        src={announcement.image}
                        alt={announcement.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <div className="p-4">
                      {/* Author Info */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-6 h-6 bg-gradient-to-br ${announcement.color} rounded-full flex items-center justify-center`}>
                          <span className="text-white font-bold text-xs">{announcement.avatar}</span>
                        </div>
                        <span className="text-white dark:text-white light:text-gray-900 text-sm font-medium transition-colors duration-300">{announcement.author}</span>
                        <span className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-500 text-xs ml-auto transition-colors duration-300">{announcement.timeAgo}</span>
                      </div>
                      
                      <h3 className="text-white dark:text-white light:text-gray-900 font-semibold text-sm mb-2 line-clamp-2 transition-colors duration-300">
                        {announcement.title}
                      </h3>
                      <p className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 text-xs mb-3 line-clamp-2 transition-colors duration-300">
                        {announcement.description}
                      </p>
                      <div className="flex justify-end">
                        <span className="text-[#30bdee] text-xs font-medium hover:underline">
                          {announcement.readMore}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-white dark:text-white light:text-gray-900 font-bold text-xl transition-colors duration-300">
                  Upcoming Events
                </h2>
                <Button variant="ghost" className="text-[#30bdee] hover:text-[#65cbff] text-sm font-medium">
                  Explore More
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-[#1a1a1a] dark:bg-[#1a1a1a] light:bg-white border border-[#333333] dark:border-[#333333] light:border-gray-200 rounded-xl overflow-hidden hover:border-[#30bdee]/50 transition-all duration-300 cursor-pointer group">
                    <div className="relative h-32">
                      <img 
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <div className="p-4">
                      {/* Author Info */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">{event.avatar}</span>
                        </div>
                        <span className="text-white dark:text-white light:text-gray-900 text-sm font-medium transition-colors duration-300">{event.author}</span>
                        <span className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-500 text-xs ml-auto transition-colors duration-300">{event.date.split(' - ')[0]}</span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <h4 className="text-white dark:text-white light:text-gray-900 font-semibold text-sm transition-colors duration-300">
                          {event.title}
                        </h4>
                        <p className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 text-xs transition-colors duration-300">
                          Date: {event.date}
                        </p>
                        <p className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 text-xs transition-colors duration-300">
                          Type: {event.type}
                        </p>
                        <p className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 text-xs transition-colors duration-300">
                          {event.rewards}
                        </p>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg py-2">
                        {event.status}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Community Updates (1/4 width) */}
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-[#111111] dark:bg-[#111111] light:bg-white border border-[#333333] dark:border-[#333333] light:border-gray-200 rounded-2xl p-6 transition-colors duration-300">
              <h3 className="text-white dark:text-white light:text-gray-900 font-bold text-lg mb-6 transition-colors duration-300">
                Community Updates
              </h3>
              <div className="space-y-6">
                {communityUpdates.map((update) => (
                  <div key={update.id} className="flex gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${update.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white font-bold text-sm">{update.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white dark:text-white light:text-gray-900 font-semibold text-sm transition-colors duration-300">
                          {update.author}
                        </span>
                        <span className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-500 text-xs transition-colors duration-300">
                          {update.timeAgo}
                        </span>
                      </div>
                      <h4 className="text-white dark:text-white light:text-gray-900 font-medium text-sm mb-2 line-clamp-2 transition-colors duration-300">
                        {update.title}
                      </h4>
                      <p className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 text-xs mb-2 line-clamp-2 transition-colors duration-300">
                        {update.description}
                      </p>
                      <span className="text-[#30bdee] text-xs font-medium hover:underline cursor-pointer">
                        {update.readMore}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Announcement Detail Modal */}
      {showAnnouncementModal && selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseAnnouncementModal}
          />
          
          {/* Modal */}
          <div className="relative bg-[#111111] w-full max-w-lg rounded-2xl border border-[#333333] max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#333333]">
              <h2 className="text-white text-lg font-bold">Server Maintenance Tonight</h2>
              <Button
                variant="ghost"
                onClick={handleCloseAnnouncementModal}
                className="text-[#ffffffb2] hover:text-white p-2"
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <div>
                  <span className="text-white font-medium text-sm">NexDash</span>
                  <span className="text-[#ffffffb2] text-xs ml-2">10 Minutes Ago</span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative mb-4 rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=2"
                  alt="Server Maintenance"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Maintenance Alert */}
              <div className="bg-orange-600/20 border border-orange-600 rounded-lg p-4 mb-4">
                <h3 className="text-orange-400 font-semibold text-sm mb-2">⚠️ Maintenance Alert!</h3>
                <p className="text-white text-sm leading-relaxed">
                  Store features may be unavailable tonight as we perform essential updates to improve your experience.
                </p>
              </div>

              {/* Maintenance Details */}
              <div className="space-y-4 mb-6">
                <p className="text-[#ffffffb2] text-sm leading-relaxed">
                  We will be performing scheduled maintenance on our servers tonight to ensure a smoother experience for all users.
                </p>

                {/* Maintenance Window */}
                <div className="space-y-2">
                  <h4 className="text-white font-semibold text-sm">🕒 Maintenance Window:</h4>
                  <div className="ml-4 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-[#ffffffb2] text-sm">Start: 11:00 PM UTC</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-[#ffffffb2] text-sm">End: 2:00 AM UTC (Approx. 3 hours)</span>
                    </div>
                  </div>
                </div>

                {/* What's Being Updated */}
                <div className="space-y-2">
                  <h4 className="text-white font-semibold text-sm">⚙️ What's Being Updated:</h4>
                  <div className="ml-4 space-y-1">
                    <div className="flex items-start gap-2">
                      <span className="text-[#30bdee] text-sm">•</span>
                      <span className="text-[#ffffffb2] text-sm">Backend performance improvements</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#30bdee] text-sm">•</span>
                      <span className="text-[#ffffffb2] text-sm">Patch fixes for reported mission bugs</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#30bdee] text-sm">•</span>
                      <span className="text-[#ffffffb2] text-sm">Optimization of dashboard load speeds</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#30bdee] text-sm">•</span>
                      <span className="text-[#ffffffb2] text-sm">Security and stability enhancements</span>
                    </div>
                  </div>
                </div>

                {/* Affected Services */}
                <div className="space-y-2">
                  <h4 className="text-yellow-400 font-semibold text-sm">⚠️ Affected Services:</h4>
                  <div className="ml-4 space-y-1">
                    <div className="flex items-start gap-2">
                      <span className="text-red-400 text-sm">•</span>
                      <span className="text-[#ffffffb2] text-sm">Login access may be interrupted</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400 text-sm">•</span>
                      <span className="text-[#ffffffb2] text-sm">Mission submissions might be temporarily disabled</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400 text-sm">•</span>
                      <span className="text-[#ffffffb2] text-sm">Store and group pages may not load properly</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#ffffff06] rounded-lg p-3 mt-4">
                  <p className="text-[#ffffffb2] text-sm">
                    Thank you for your patience and understanding as we work to keep you on the other side – faster and smoother! 🚀
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="border-t border-[#333333] p-4">
              <div className="flex gap-3">
                <Button className="flex-1 bg-[#30bdee] hover:bg-[#2aa3d1] text-white text-sm">
                  Share Update
                </Button>
                <Button variant="outline" className="border-[#333333] text-[#ffffffb2] hover:text-white hover:bg-[#ffffff12] text-sm">
                  Set Reminder
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create New Post Modal */}
      {showCreatePostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseCreatePostModal}
          />
          
          {/* Modal */}
          <div className="relative bg-[#111111] w-full max-w-md rounded-2xl border border-[#333333] max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#333333]">
              <h2 className="text-white text-lg font-bold">Create New Post</h2>
              <Button
                variant="ghost"
                onClick={handleCloseCreatePostModal}
                className="text-[#ffffffb2] hover:text-white p-2"
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Post Type */}
              <div>
                <label className="text-[#ffffffb2] text-sm block mb-3">Post Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="postType"
                      value="News"
                      checked={newPost.type === 'News'}
                      onChange={(e) => handlePostInputChange('type', e.target.value)}
                      className="text-[#30bdee]"
                    />
                    <span className="text-white text-sm">News</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="postType"
                      value="Announcement"
                      checked={newPost.type === 'Announcement'}
                      onChange={(e) => handlePostInputChange('type', e.target.value)}
                      className="text-[#30bdee]"
                    />
                    <span className="text-white text-sm">Announcement</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="postType"
                      value="Event"
                      checked={newPost.type === 'Event'}
                      onChange={(e) => handlePostInputChange('type', e.target.value)}
                      className="text-[#30bdee]"
                    />
                    <span className="text-white text-sm">Event</span>
                  </label>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="text-[#ffffffb2] text-sm block mb-2">Title</label>
                <Input
                  value={newPost.title}
                  onChange={(e) => handlePostInputChange('title', e.target.value)}
                  className="bg-[#0a0a0a] border-[#333333] text-white placeholder:text-[#ffffffb2]"
                  placeholder="Add Title"
                />
              </div>

              {/* Image Upload */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-[#ffffffb2] text-sm block mb-2">Summary (Optional)</label>
                  <textarea
                    value={newPost.summary}
                    onChange={(e) => handlePostInputChange('summary', e.target.value)}
                    className="w-full h-20 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] p-3 resize-none text-sm"
                    placeholder="Add Summary"
                  />
                </div>
                <div className="w-24">
                  <label className="text-[#ffffffb2] text-sm block mb-2">Image</label>
                  <div className="w-20 h-20 border-2 border-dashed border-[#333333] rounded-lg flex items-center justify-center cursor-pointer hover:border-[#30bdee] transition-colors relative overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {newPost.image ? (
                      <img 
                        src={URL.createObjectURL(newPost.image)} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="text-[#ffffffb2] text-xs mb-1">📷</div>
                        <div className="text-[#ffffffb2] text-xs">Upload Image</div>
                        <div className="text-[#ffffffb2] text-xs">JPG, PNG, GIF (Max 10 MB)</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div>
                <label className="text-[#ffffffb2] text-sm block mb-2">Main Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => handlePostInputChange('content', e.target.value)}
                  className="w-full h-24 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] p-3 resize-none text-sm"
                  placeholder="Add Content"
                />
              </div>

              {/* Visibility */}
              <div>
                <label className="text-[#ffffffb2] text-sm block mb-3">Visibility</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="visibility"
                      value="Public"
                      checked={newPost.visibility === 'Public'}
                      onChange={(e) => handlePostInputChange('visibility', e.target.value)}
                      className="text-[#30bdee]"
                    />
                    <span className="text-white text-sm">Public</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="visibility"
                      value="Admin Only"
                      checked={newPost.visibility === 'Admin Only'}
                      onChange={(e) => handlePostInputChange('visibility', e.target.value)}
                      className="text-[#30bdee]"
                    />
                    <span className="text-white text-sm">Admin Only</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="visibility"
                      value="Groups"
                      checked={newPost.visibility === 'Groups'}
                      onChange={(e) => handlePostInputChange('visibility', e.target.value)}
                      className="text-[#30bdee]"
                    />
                    <span className="text-white text-sm">Groups</span>
                    <span className="text-[#ffffffb2] text-xs">▼</span>
                  </label>
                </div>
              </div>

              {/* Location (Optional) */}
              <div>
                <label className="text-[#ffffffb2] text-sm block mb-2">Location (Optional)</label>
                <Input
                  value={newPost.location}
                  onChange={(e) => handlePostInputChange('location', e.target.value)}
                  className="bg-[#0a0a0a] border-[#333333] text-white placeholder:text-[#ffffffb2]"
                  placeholder="Add Location"
                />
              </div>

              {/* Event Date and Time (only show if Event is selected) */}
              {newPost.type === 'Event' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Event Date</label>
                    <Input
                      type="date"
                      value={newPost.eventDate}
                      onChange={(e) => handlePostInputChange('eventDate', e.target.value)}
                      className="bg-[#0a0a0a] border-[#333333] text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Event Time</label>
                    <Input
                      type="time"
                      value={newPost.eventTime}
                      onChange={(e) => handlePostInputChange('eventTime', e.target.value)}
                      className="bg-[#0a0a0a] border-[#333333] text-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="border-t border-[#333333] p-4">
              <div className="flex gap-3">
                <Button
                  onClick={handleCloseCreatePostModal}
                  variant="outline"
                  className="flex-1 border-[#333333] text-[#ffffffb2] hover:text-white hover:bg-[#ffffff12]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePublishPost}
                  className="flex-1 bg-[#30bdee] hover:bg-[#2aa3d1] text-white"
                >
                  Publish Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};