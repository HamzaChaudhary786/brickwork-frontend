import { ChevronDownIcon, LogOutIcon, SearchIcon, ShoppingCartIcon, HomeIcon, UserIcon, ShoppingBagIcon, RocketIcon, UsersIcon, SettingsIcon, PackageIcon, MenuIcon, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TopNavbar} from "../TopNavbar";
import { getUserById } from "../../apis/profileApi/getUserProfile";

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export const Layout = ({ children, onLogout }: LayoutProps): JSX.Element => {
  const location = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null); // Make sure User is imported from your API type
  const [loading, setLoading] = useState<boolean>(true);
  let userId = "Yf3rO1tei0aUXdlJw4rMKoNJuJwJdpH8";

  // Navigation items data with proper icons
  const navItems = [
    { icon: HomeIcon, label: "Dashboard", path: "/dashboard", active: false },
    { icon: UserIcon, label: "Profile", path: "/profile", active: false },
    { icon: ShoppingBagIcon, label: "Marketplace", path: "/marketplace", active: false },
    { icon: RocketIcon, label: "Missions", path: "/missions", active: false },
    { icon: UsersIcon, label: "Groups", path: "/groups", active: false },
    { icon: SettingsIcon, label: "Admin Dashboard", path: "/admin", active: false },
    { icon: PackageIcon, label: "Inventory Management", path: "/inventory", active: false },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);

    // Simulate logout process
    setTimeout(() => {
      onLogout();
      setIsLoggingOut(false);
    }, 1500);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };



  return (
    <div className="bg-[#0a0a0a] dark:bg-[#0a0a0a] light:bg-gray-50 flex flex-col w-full min-h-screen transition-colors duration-300">
      {/* Top Navbar */}
      <TopNavbar  />

      <div className="flex flex-1">
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={toggleMobileMenu}>
            <div className="bg-[#111111] dark:bg-[#111111] light:bg-white w-80 h-full border-r border-[#ffffff0a] dark:border-[#ffffff0a] light:border-gray-200 p-4 transition-colors duration-300" onClick={(e) => e.stopPropagation()}>
              {/* Mobile Logo */}
              <Link to="/dashboard" className="block mb-8" onClick={toggleMobileMenu}>
                <div className="text-[#30bdee] dark:text-[#30bdee] light:text-blue-600 text-xl font-bold font-['Rajdhani',Helvetica] tracking-wider text-center transition-colors duration-300">
                  THE UNNAMED
                </div>
              </Link>

              {/* Mobile Navigation */}
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <Link key={index} to={item.path} onClick={toggleMobileMenu} className="w-full">
                      <Button
                        variant="ghost"
                        className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl justify-start transition-colors duration-200 text-base bg-transparent border ${isActive
                          ? "text-[#00cfff] dark:text-[#00cfff] light:text-blue-600 font-bold border-[#00cfff] dark:border-[#00cfff] light:border-blue-600 hover:text-[#00cfff] dark:hover:text-[#00cfff] light:hover:text-blue-600 hover:bg-transparent"
                          : "text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 font-medium hover:text-[#00cfff] dark:hover:text-[#00cfff] light:hover:text-blue-600 border-transparent hover:border-transparent hover:bg-transparent"
                          }`}
                      >
                        <IconComponent className={`w-5 h-5 transition-colors duration-200 ${isActive
                          ? 'text-[#00cfff] dark:text-[#00cfff] light:text-blue-600'
                          : 'text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600'
                          }`} />
                        <span className="font-['Rajdhani',Helvetica] text-base">
                          {item.label}
                        </span>
                      </Button>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Logout Button */}
              <div className="absolute bottom-8 left-4 right-4">
                <Button
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  disabled={isLoggingOut}
                  variant="ghost"
                  className="flex w-full items-center gap-3 px-4 py-3 bg-[#ffffff08] dark:bg-[#ffffff08] light:bg-gray-100 rounded-xl text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 hover:bg-[#ffffff08] dark:hover:bg-[#ffffff08] light:hover:bg-gray-200 hover:text-[#00cfff] dark:hover:text-[#00cfff] light:hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#ffffffb2]/30 border-t-[#ffffffb2] rounded-full animate-spin" />
                      <span className="font-['Rajdhani',Helvetica] font-medium text-base">
                        Logging out...
                      </span>
                    </>
                  ) : (
                    <>
                      <LogOutIcon className="w-5 h-5" />
                      <span className="font-['Rajdhani',Helvetica] font-medium text-base">
                        Logout
                      </span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-[240px] h-[calc(100vh-64px)] bg-[#111111] dark:bg-[#111111] light:bg-white fixed top-16 left-0 z-10 border-r border-[#ffffff0a] dark:border-[#ffffff0a] light:border-gray-200 transition-colors duration-300">
          {/* Navigation Menu */}
          <div className="flex flex-col items-start gap-1 mt-8 px-4">
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={index} to={item.path} className="w-full">
                  <Button
                    variant="ghost"
                    className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl justify-start transition-colors duration-200 text-base bg-transparent border ${isActive
                      ? "text-[#00cfff] dark:text-[#00cfff] light:text-blue-600 font-bold border-[#00cfff] dark:border-[#00cfff] light:border-blue-600 hover:text-[#00cfff] dark:hover:text-[#00cfff] light:hover:text-blue-600 hover:bg-transparent hover:border-[#00cfff] dark:hover:border-[#00cfff] light:hover:border-blue-600"
                      : "text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 font-medium hover:text-[#00cfff] dark:hover:text-[#00cfff] light:hover:text-blue-600 border-transparent hover:border-transparent hover:bg-transparent"
                      }`}
                  >
                    <IconComponent className={`w-5 h-5 transition-colors duration-200 ${isActive
                      ? 'text-[#00cfff] dark:text-[#00cfff] light:text-blue-600'
                      : 'text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600'
                      }`} />
                    <span className="font-['Rajdhani',Helvetica] text-base">
                      {item.label}
                    </span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Logout Button */}
          <div className="absolute bottom-8 left-4 right-4">
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              variant="ghost"
              className="flex w-full items-center gap-3 px-4 py-3 bg-[#ffffff08] dark:bg-[#ffffff08] light:bg-gray-100 rounded-xl text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 hover:bg-[#ffffff08] dark:hover:bg-[#ffffff08] light:hover:bg-gray-200 hover:text-[#00cfff] dark:hover:text-[#00cfff] light:hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#ffffffb2]/30 border-t-[#ffffffb2] rounded-full animate-spin" />
                  <span className="font-['Rajdhani',Helvetica] font-medium text-base">
                    Logging out...
                  </span>
                </>
              ) : (
                <>
                  <LogOutIcon className="w-5 h-5" />
                  <span className="font-['Rajdhani',Helvetica] font-medium text-base">
                    Logout
                  </span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Header - Updated to show menu button */}
        <div className="lg:hidden bg-[#111111] dark:bg-[#111111] light:bg-white border-b border-[#ffffff0a] dark:border-[#ffffff0a] light:border-gray-200 p-4 flex items-center justify-between fixed top-16 left-0 right-0 z-40 transition-colors duration-300">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              onClick={toggleMobileMenu}
              className="w-10 h-10 p-0 text-white dark:text-white light:text-gray-900 hover:bg-[#ffffff12] dark:hover:bg-[#ffffff12] light:hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </Button>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Cart */}
            <Link to="/cart">
              <Button
                variant="ghost"
                className="w-10 h-10 p-0 bg-[#ffffff08] dark:bg-[#ffffff08] light:bg-gray-100 rounded-xl hover:bg-[#ffffff12] dark:hover:bg-[#ffffff12] light:hover:bg-gray-200 transition-colors relative"
              >
                <ShoppingCartIcon className="w-5 h-5 text-white dark:text-white light:text-gray-900" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#30bdee] dark:bg-[#30bdee] light:bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  3
                </div>
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:ml-[240px] flex-1 pt-16 lg:pt-0">
          {/* Page Content */}
          <div className="min-h-[calc(100vh-64px)] bg-[#0a0a0a] dark:bg-[#0a0a0a] light:bg-gray-50 transition-colors duration-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};