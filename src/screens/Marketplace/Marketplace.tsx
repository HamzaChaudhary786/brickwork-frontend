import { ChevronDownIcon, SearchIcon, FilterIcon, SortAscIcon, HeartIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { PurchaseConfirmationModal } from "../../components/ui/purchase-confirmation-modal";
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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";

export const Marketplace = ({ user }: any): JSX.Element => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Marketplace items data matching the screenshot
  const marketplaceItems = [
    {
      id: 1,
      name: "Armored Knight",
      price: 12.08,
      coins: 134,
      rating: 4,
      reviews: 24,
      image: "/public/News&Updatesimages/12 copy.png",
      bgColor: "from-gray-600 to-gray-700",
      rarity: "Epic",
      category: "Warrior Class",
      xpBoost: "+20%",
      description: "Armed with a heavy battle mace and blessed shield plating, this elite unit is perfect for front-line battles.",
      seller: "Wade warren",
      reviewDate: "Oct 07 2024",
      reviewText: "The Armored Knight stands tall as the ultimate tank unit - built for glory and war. Love the product 🔥 Impeccable craftsmanship and sheer strength make this warrior a battlefield icon ⚔️"
    },
    {
      id: 2,
      name: "Chibbi Warrior",
      price: 15.00,
      coins: 156,
      rating: 5,
      reviews: 18,
      image: "/public/News&Updatesimages/12 copy.png",
      bgColor: "from-red-600 to-red-700",
      isFavorited: true,
      rarity: "Common",
      category: "Stealth Class",
      xpBoost: "+15%",
      description: "A nimble and agile warrior specializing in stealth attacks and quick strikes.",
      seller: "Ninja Master",
      reviewDate: "Oct 05 2024",
      reviewText: "Amazing stealth capabilities and perfect for quick missions. Highly recommended for tactical gameplay!"
    },
    {
      id: 3,
      name: "Black Armor",
      price: 14.09,
      coins: 140,
      rating: 4,
      reviews: 31,
      image: "/public/News&Updatesimages/12 copy.png",
      bgColor: "from-gray-800 to-black",
      rarity: "Epic",
      category: "Defense Class",
      xpBoost: "+25%",
      description: "Forged from the darkest metals, this armor provides exceptional protection against all forms of attack.",
      seller: "Dark Smith",
      reviewDate: "Oct 03 2024",
      reviewText: "Incredible defense stats and looks absolutely stunning. The dark aesthetic is perfect for my character build."
    },
    {
      id: 4,
      name: "Viking Toy",
      price: 12.08,
      coins: 134,
      rating: 4,
      reviews: 15,
      image: "/public/News&Updatesimages/12 copy.png",
      bgColor: "from-orange-600 to-orange-700",
      rarity: "Rare",
      category: "Berserker Class",
      xpBoost: "+30%",
      description: "Channel the fury of ancient Vikings with this powerful berserker equipment.",
      seller: "Norse Trader",
      reviewDate: "Oct 01 2024",
      reviewText: "Great for aggressive playstyles. The berserker rage effect is incredibly satisfying!"
    },
    {
      id: 5,
      name: "Medieval Knight",
      price: 12.08,
      coins: 134,
      rating: 4,
      reviews: 22,
      image: "/public/News&Updatesimages/12 copy.png",
      bgColor: "from-orange-500 to-red-600",
      rarity: "Rare",
      category: "Paladin Class",
      xpBoost: "+18%",
      description: "A noble knight's equipment blessed with holy power and unwavering courage.",
      seller: "Holy Order",
      reviewDate: "Sep 28 2024",
      reviewText: "Perfect for support roles and team play. The holy buffs are very useful in group battles."
    },
    {
      id: 6,
      name: "Golden Armored",
      price: 20.00,
      coins: 165,
      rating: 5,
      reviews: 42,
      image: "/public/News&Updatesimages/12 copy.png",
      bgColor: "from-yellow-600 to-yellow-700",
      rarity: "Legendary",
      category: "Royal Class",
      xpBoost: "+35%",
      description: "Crafted from pure gold and blessed by ancient kings, this legendary armor grants immense power.",
      seller: "Royal Armorer",
      reviewDate: "Oct 10 2024",
      reviewText: "Absolutely magnificent! The golden shine and power boost make this worth every coin. A true masterpiece!"
    },
    {
      id: 7,
      name: "Armored Knight",
      price: 20.00,
      coins: 165,
      rating: 5,
      reviews: 28,
      image: "/public/News&Updatesimages/12 copy.png",
      bgColor: "from-purple-600 to-purple-700",
      isFavorited: true,
      rarity: "Legendary",
      category: "Champion Class",
      xpBoost: "+40%",
      description: "The ultimate warrior's gear, forged in the fires of legend and tempered by countless victories.",
      seller: "Legendary Smith",
      reviewDate: "Oct 08 2024",
      reviewText: "This is the pinnacle of warrior equipment. Unmatched in both style and performance!"
    },
    {
      id: 8,
      name: "Blue Armored Warrior",
      price: 25.04,
      coins: 172,
      rating: 4,
      reviews: 19,
      image: "/public/News&Updatesimages/12 copy.png",
      bgColor: "from-blue-600 to-blue-700",
      rarity: "Rare",
      category: "Guardian Class",
      xpBoost: "+22%",
      description: "Infused with mystical blue energy, this armor provides both protection and magical enhancement.",
      seller: "Mystic Forge",
      reviewDate: "Oct 06 2024",
      reviewText: "The magical properties are incredible! Great for hybrid combat-magic builds."
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${index < rating ? 'text-yellow-400' : 'text-gray-600'}`}
      >
        ★
      </span>
    ));
  };

  const handleBuyNow = (item: any) => {
    setSelectedItem(item);
    setShowPurchaseModal(true);
  };

  const handleConfirmPurchase = async () => {
    if (!selectedItem) return;
    
    setIsPurchasing(true);
    
    // Simulate purchase process
    setTimeout(() => {
      console.log('Purchase confirmed for:', selectedItem.name);
      setIsPurchasing(false);
      setShowPurchaseModal(false);
      setSelectedItem(null);
      // Here you would typically handle the actual purchase logic
    }, 2000);
  };

  const handleClosePurchaseModal = () => {
    if (isPurchasing) return; // Prevent closing while processing
    setShowPurchaseModal(false);
    setSelectedItem(null);
  };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 bg-[#0a0a0a] dark:bg-[#0a0a0a] light:bg-gray-50 min-h-screen transition-colors duration-300">
        {/* Title Section */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-white dark:text-white light:text-gray-900 text-2xl sm:text-3xl lg:text-[32px] tracking-[-0.32px] leading-tight lg:leading-[51.2px] font-['Rajdhani',Helvetica] font-semibold mb-2 transition-colors duration-300">
            Marketplace
          </h1>
          <p className="font-['Rajdhani',Helvetica] font-medium text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 text-sm sm:text-base tracking-[-0.16px] leading-relaxed lg:leading-[25.6px] transition-colors duration-300">
            Browse And Purchase Exclusive Items
          </p>
        </div>

        {/* Enhanced Filters Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-6 mb-6 lg:mb-8">
          {/* Search Item */}
          <div className="relative flex-1 max-w-full lg:max-w-md">
            <Input
              className="h-10 sm:h-12 bg-[#1a1a1a] dark:bg-[#1a1a1a] light:bg-white border-[#333333] dark:border-[#333333] light:border-gray-300 rounded-lg pl-10 sm:pl-12 pr-4 font-['Rajdhani',Helvetica] font-medium text-white dark:text-white light:text-gray-900 placeholder:text-[#ffffffb2] dark:placeholder:text-[#ffffffb2] light:placeholder:text-gray-500 focus:border-[#30bdee] focus:bg-[#222222] dark:focus:bg-[#222222] light:focus:bg-gray-50 transition-all text-sm sm:text-base"
              placeholder="Search Item"
            />
            <SearchIcon className="absolute w-4 h-4 sm:w-5 sm:h-5 top-3 sm:top-3.5 left-3 sm:left-4 text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-500" />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {/* Sort Dropdown */}
            <Select defaultValue="game">
              <SelectTrigger className="h-10 sm:h-12 px-4 sm:px-6 py-3 bg-[#1a1a1a] dark:bg-[#1a1a1a] light:bg-white border border-[#333333] dark:border-[#333333] light:border-gray-300 rounded-lg flex items-center gap-3 hover:bg-[#222222] dark:hover:bg-[#222222] light:hover:bg-gray-50 hover:border-[#30bdee] transition-all text-white dark:text-white light:text-gray-900 min-w-[195px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] dark:bg-[#1a1a1a] light:bg-white border-[#333333] dark:border-[#333333] light:border-gray-300">
                <SelectItem value="game" className="text-white dark:text-white light:text-gray-900 hover:bg-[#333333] dark:hover:bg-[#333333] light:hover:bg-gray-100 w-[190px] ">Sort by Game</SelectItem>
                <SelectItem value="price-low" className="text-white dark:text-white light:text-gray-900 hover:bg-[#333333] dark:hover:bg-[#333333] light:hover:bg-gray-100">Price: Low to High</SelectItem>
                <SelectItem value="price-high" className="text-white dark:text-white light:text-gray-900 hover:bg-[#333333] dark:hover:bg-[#333333] light:hover:bg-gray-100">Price: High to Low</SelectItem>
                <SelectItem value="rating" className="text-white dark:text-white light:text-gray-900 hover:bg-[#333333] dark:hover:bg-[#333333] light:hover:bg-gray-100">Rating</SelectItem>
              </SelectContent>
            </Select>

            {/* Filter Dropdown */}
            <Select defaultValue="all">
              <SelectTrigger className="h-10 sm:h-12 px-4 sm:px-6 py-3 bg-[#1a1a1a] dark:bg-[#1a1a1a] light:bg-white border border-[#333333] dark:border-[#333333] light:border-gray-300 rounded-lg flex items-center gap-3 hover:bg-[#222222] dark:hover:bg-[#222222] light:hover:bg-gray-50 hover:border-[#30bdee] transition-all text-white dark:text-white light:text-gray-900 min-w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] dark:bg-[#1a1a1a] light:bg-white border-[#333333] dark:border-[#333333] light:border-gray-300">
                <SelectItem value="all" className="text-white dark:text-white light:text-gray-900 hover:bg-[#333333] dark:hover:bg-[#333333] light:hover:bg-gray-100">Filter by</SelectItem>
                <SelectItem value="armor" className="text-white dark:text-white light:text-gray-900 hover:bg-[#333333] dark:hover:bg-[#333333] light:hover:bg-gray-100">Armor</SelectItem>
                <SelectItem value="weapons" className="text-white dark:text-white light:text-gray-900 hover:bg-[#333333] dark:hover:bg-[#333333] light:hover:bg-gray-100">Weapons</SelectItem>
                <SelectItem value="accessories" className="text-white dark:text-white light:text-gray-900 hover:bg-[#333333] dark:hover:bg-[#333333] light:hover:bg-gray-100">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Items Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 lg:mb-12">
          {marketplaceItems.map((item) => (
            <Link 
              key={item.id} 
              to={`/item/${item.id}`} 
              state={{ itemData: item }}
              className="block group"
            >
              <div className="bg-[#1a1a1a] dark:bg-[#1a1a1a] light:bg-white border border-[#333333] dark:border-[#333333] light:border-gray-200 rounded-2xl overflow-hidden hover:border-[#30bdee] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#30bdee]/10">
                {/* Image Container */}
                <div className="relative aspect-square bg-[#2a2a2a] dark:bg-[#2a2a2a] light:bg-gray-100 flex items-center justify-center overflow-hidden transition-colors duration-300">
                  {/* Item Image */} 
                  <div className={`  w-full max-w-[350px] h-[280px] bg-gradient-to-br rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300`}>
                   
                  <img
                      src={item.image.replace("/public", "")}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {/* Heart Icon */}
                  <button className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    item.isFavorited 
                      ? 'bg-[#30bdee] text-white' 
                      : 'bg-black/40 text-white hover:bg-[#30bdee]'
                  }`}>
                    <HeartIcon className={`w-4 h-4 ${item.isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  {/* Item Name */}
                  <h3 className="text-white dark:text-white light:text-gray-900 font-bold text-base sm:text-lg mb-2 group-hover:text-[#30bdee] transition-colors duration-300">
                    {item.name}
                  </h3>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {renderStars(item.rating)}
                  </div>

                  {/* Price and Coins */}
                  <div className="flex items-center justify-between">
                    <div className="text-[#30bdee] font-bold text-lg sm:text-xl">
                      ${item.price.toFixed(2)}
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 bg-[#30bdee]/20 rounded-full">
                      <div className="w-4 h-4 bg-[#30bdee] rounded-full" />
                      <span className="text-white dark:text-white light:text-gray-900 font-semibold text-sm transition-colors duration-300">{item.coins}</span>
                    </div>
                  </div>

                  {/* Buy Now Button */}
                  <div className="mt-3">
                    <Button
                      onClick={() => handleBuyNow(item)}
                      className="w-full bg-[#30bdee] hover:bg-[#2aa3d1] text-white rounded-lg font-semibold text-sm py-2"
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Enhanced Pagination */}
        <div className="bg-[#1a1a1a] dark:bg-[#1a1a1a] light:bg-white rounded-2xl border border-[#333333] dark:border-[#333333] light:border-gray-200 p-4 sm:p-6 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Entries display section */}
            <div className="flex items-center gap-3">
              <span className="font-['Rajdhani',Helvetica] font-semibold text-sm sm:text-base text-white dark:text-white light:text-gray-900 transition-colors duration-300">
                Showing
              </span>

              <Select defaultValue="13">
                <SelectTrigger className="h-8 sm:h-10 px-3 sm:px-4 py-2 bg-[#ffffff08] dark:bg-[#ffffff08] light:bg-gray-100 border-[#ffffff12] dark:border-[#ffffff12] light:border-gray-300 rounded-xl text-white dark:text-white light:text-gray-900 hover:bg-[#ffffff12] dark:hover:bg-[#ffffff12] light:hover:bg-gray-200 hover:border-[#30bdee] transition-all min-w-[60px] sm:min-w-[80px]">
                  <SelectValue className="font-['Rajdhani',Helvetica] font-semibold text-white dark:text-white light:text-gray-900" />
                </SelectTrigger>
                <SelectContent className="bg-[#111111] dark:bg-[#111111] light:bg-white border-[#ffffff12] dark:border-[#ffffff12] light:border-gray-300">
                  <SelectItem value="10" className="text-white dark:text-white light:text-gray-900 hover:bg-[#ffffff12] dark:hover:bg-[#ffffff12] light:hover:bg-gray-100">10</SelectItem>
                  <SelectItem value="13" className="text-white dark:text-white light:text-gray-900 hover:bg-[#ffffff12] dark:hover:bg-[#ffffff12] light:hover:bg-gray-100">13</SelectItem>
                  <SelectItem value="20" className="text-white dark:text-white light:text-gray-900 hover:bg-[#ffffff12] dark:hover:bg-[#ffffff12] light:hover:bg-gray-100">20</SelectItem>
                  <SelectItem value="50" className="text-white dark:text-white light:text-gray-900 hover:bg-[#ffffff12] dark:hover:bg-[#ffffff12] light:hover:bg-gray-100">50</SelectItem>
                </SelectContent>
              </Select>

              <span className="font-['Rajdhani',Helvetica] font-semibold text-sm sm:text-base text-white dark:text-white light:text-gray-900 transition-colors duration-300">
                Entries of <span className="text-[#30bdee] font-bold">430</span>
              </span>
            </div>

            {/* Pagination controls */}
            <Pagination>
              <PaginationContent className="flex items-center justify-center gap-1 sm:gap-2">
                <PaginationItem>
                  <PaginationPrevious className="px-2 sm:px-4 py-2 bg-[#ffffff08] dark:bg-[#ffffff08] light:bg-gray-100 border border-[#ffffff12] dark:border-[#ffffff12] light:border-gray-300 rounded-xl text-white dark:text-white light:text-gray-900 hover:bg-[#ffffff12] dark:hover:bg-[#ffffff12] light:hover:bg-gray-200 hover:border-[#30bdee] transition-all text-xs sm:text-sm" />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink
                    className="px-2 sm:px-4 py-2 rounded-xl font-['Rajdhani',Helvetica] font-bold text-sm sm:text-base transition-all bg-[#30bdee] text-white shadow-lg shadow-[#30bdee]/25"
                    isActive={true}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink className="px-2 sm:px-4 py-2 bg-[#ffffff08] dark:bg-[#ffffff08] light:bg-gray-100 border border-[#ffffff12] dark:border-[#ffffff12] light:border-gray-300 rounded-xl font-['Rajdhani',Helvetica] font-bold text-sm sm:text-base text-white dark:text-white light:text-gray-900 hover:bg-[#ffffff12] dark:hover:bg-[#ffffff12] light:hover:bg-gray-200 hover:border-[#30bdee] transition-all">
                    2
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink className="px-2 sm:px-4 py-2 bg-[#ffffff08] dark:bg-[#ffffff08] light:bg-gray-100 border border-[#ffffff12] dark:border-[#ffffff12] light:border-gray-300 rounded-xl font-['Rajdhani',Helvetica] font-bold text-sm sm:text-base text-white dark:text-white light:text-gray-900 hover:bg-[#ffffff12] dark:hover:bg-[#ffffff12] light:hover:bg-gray-200 hover:border-[#30bdee] transition-all">
                    3
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationEllipsis className="px-2 sm:px-4 py-2 bg-[#ffffff08] dark:bg-[#ffffff08] light:bg-gray-100 border border-[#ffffff12] dark:border-[#ffffff12] light:border-gray-300 rounded-xl text-white dark:text-white light:text-gray-900 text-xs sm:text-sm" />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink className="px-2 sm:px-4 py-2 bg-[#ffffff08] dark:bg-[#ffffff08] light:bg-gray-100 border border-[#ffffff12] dark:border-[#ffffff12] light:border-gray-300 rounded-xl font-['Rajdhani',Helvetica] font-bold text-sm sm:text-base text-white dark:text-white light:text-gray-900 hover:bg-[#ffffff12] dark:hover:bg-[#ffffff12] light:hover:bg-gray-200 hover:border-[#30bdee] transition-all">
                    20
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext className="px-2 sm:px-4 py-2 bg-[#ffffff08] dark:bg-[#ffffff08] light:bg-gray-100 border border-[#ffffff12] dark:border-[#ffffff12] light:border-gray-300 rounded-xl text-white dark:text-white light:text-gray-900 hover:bg-[#ffffff12] dark:hover:bg-[#ffffff12] light:hover:bg-gray-200 hover:border-[#30bdee] transition-all text-xs sm:text-sm" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>

      {/* Purchase Confirmation Modal */}
      <PurchaseConfirmationModal
        isOpen={showPurchaseModal}
        onClose={handleClosePurchaseModal}
        onConfirm={handleConfirmPurchase}
        item={selectedItem}
        isLoading={isPurchasing}
      />
    </>
  );
};