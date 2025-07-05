import { HeartIcon, ShoppingCartIcon, ShareIcon, StarIcon, MinusIcon, PlusIcon, ShieldCheckIcon, TrendingUpIcon, FlameIcon, ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export const ItemDetail = (): JSX.Element => {
  const { id } = useParams();
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  // Get item data from navigation state or use fallback data
  const itemData = location.state?.itemData;
  
  // Fallback item data if no data is passed from marketplace
  const fallbackItem = {
    id: id,
    name: "Armored Knight",
    price: 12.08,
    coins: 134,
    rarity: "Epic",
    category: "Warrior Class",
    xpBoost: "+20%",
    description: "Armed with a heavy battle mace and blessed shield plating, this elite unit is perfect for front-line battles.",
    rating: 4,
    reviews: 24,
    seller: "Wade warren",
    reviewDate: "Oct 07 2024",
    reviewText: "The Armored Knight stands tall as the ultimate tank unit - built for glory and war. Love the product 🔥 Impeccable craftsmanship and sheer strength make this warrior a battlefield icon ⚔️",
    image: "⚔️",
    bgColor: "from-gray-600 to-gray-700"
  };

  // Use passed data or fallback
  const item = itemData || fallbackItem;

  // Set initial favorited state based on item data
  React.useEffect(() => {
    if (item.isFavorited) {
      setIsFavorited(true);
    }
  }, [item.isFavorited]);

  const relatedProducts = [
    { 
      id: 2,
      name: "Chibbi Warrior", 
      price: 16.00, 
      coins: 156, 
      rating: 4,
      image: "🥷"
    },
    { 
      id: 3,
      name: "Black Armor", 
      price: 14.00, 
      coins: 140, 
      rating: 3,
      image: "🖤",
      isNew: true
    },
  ];

  const hotSellingItems = [
    { 
      id: 4,
      name: "Viking Toy", 
      price: 16.00, 
      coins: 156, 
      rating: 4,
      image: "⚡"
    },
    { 
      id: 5,
      name: "Medieval Knight", 
      price: 12.00, 
      coins: 134, 
      rating: 4,
      image: "🛡️"
    },
  ];

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'text-yellow-400';
      case 'Epic': return 'text-purple-400';
      case 'Rare': return 'text-blue-400';
      default: return 'text-green-400';
    }
  };

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'bg-gradient-to-r from-yellow-600 to-yellow-700';
      case 'Epic': return 'bg-gradient-to-r from-purple-600 to-purple-700';
      case 'Rare': return 'bg-gradient-to-r from-blue-600 to-blue-700';
      default: return 'bg-gradient-to-r from-green-600 to-green-700';
    }
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Header with Breadcrumb */}
      <div className="bg-[#111111] border-b border-[#333333] px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3 text-[#ffffffb2] text-sm">
          <Link to="/marketplace" className="hover:text-[#30bdee] transition-colors">
            Marketplace
          </Link>
          <span>/</span>
          <span className="text-white">{item.name}</span>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
          {/* Main Item Display - Left Side */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            {/* Large Item Image */}
            <Card className="bg-[#111111] border-[#333333] overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center relative group">
                  {/* 3D Item Display */}
                  <div className={`w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gradient-to-br ${item.bgColor} rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-all duration-500 relative`}>
                    <span className="text-white text-4xl sm:text-6xl lg:text-8xl drop-shadow-2xl">{item.image}</span>
                    
                    {/* Magical Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl sm:rounded-3xl animate-pulse" />
                    <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-2xl sm:rounded-3xl blur-xl" />
                  </div>

                  {/* Favorite Button */}
                  <Button
                    variant="ghost"
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`absolute top-4 sm:top-6 right-4 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 p-0 rounded-full backdrop-blur-sm transition-all duration-300 ${
                      isFavorited 
                        ? 'bg-[#30bdee] hover:bg-[#2aa3d1] text-white' 
                        : 'bg-[#000000]/40 hover:bg-[#30bdee] text-white'
                    }`}
                  >
                    <HeartIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${isFavorited ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Thumbnail Images */}
            <div className="flex gap-2 sm:gap-3">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="w-16 h-16 sm:w-20 sm:h-20 bg-[#111111] border border-[#333333] rounded-xl flex items-center justify-center cursor-pointer hover:border-[#30bdee] transition-colors">
                  <div className={`w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br ${item.bgColor} rounded-lg flex items-center justify-center`}>
                    <span className="text-white text-base sm:text-xl">{item.image}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Description and Reviews Tabs */}
            <Card className="bg-[#111111] border-[#333333]">
              <CardContent className="p-0">
                {/* Tab Headers */}
                <div className="flex border-b border-[#333333]">
                  <button
                    onClick={() => setActiveTab("description")}
                    className={`px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium transition-colors ${
                      activeTab === "description" 
                        ? "text-[#30bdee] border-b-2 border-[#30bdee]" 
                        : "text-[#ffffffb2] hover:text-white"
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium transition-colors ${
                      activeTab === "reviews" 
                        ? "text-[#30bdee] border-b-2 border-[#30bdee]" 
                        : "text-[#ffffffb2] hover:text-white"
                    }`}
                  >
                    Reviews ({item.reviews || 10})
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-4 sm:p-6">
                  {activeTab === "description" ? (
                    <div>
                      <p className="text-[#ffffffb2] leading-relaxed text-sm sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 sm:space-y-6">
                      {/* Review Item */}
                      <div className="flex gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm sm:text-base">
                            {item.seller ? item.seller.charAt(0).toUpperCase() : 'W'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-white font-semibold text-sm sm:text-base">{item.seller}</h4>
                            <span className="text-[#ffffffb2] text-xs sm:text-sm">{item.reviewDate}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon 
                                key={star} 
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${star <= item.rating ? 'text-yellow-400 fill-current' : 'text-[#333333]'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-[#ffffffb2] leading-relaxed text-sm sm:text-base">
                            {item.reviewText}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Item Details - Center */}
          <div className="xl:col-span-1 space-y-4 sm:space-y-6">
            {/* Item Info */}
            <div>
              <h1 className="text-white text-2xl sm:text-3xl font-bold font-['Rajdhani',Helvetica] mb-4">
                {item.name}
              </h1>
              
              <p className="text-[#ffffffb2] leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                {item.description}
              </p>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon 
                      key={star} 
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${star <= item.rating ? 'text-yellow-400 fill-current' : 'text-[#333333]'}`} 
                    />
                  ))}
                </div>
                <span className="text-white font-semibold text-sm sm:text-base">{item.rating}</span>
                <span className="text-[#ffffffb2] text-sm sm:text-base">({item.reviews})</span>
              </div>

              {/* Price */}
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-2">
                  <span className="text-[#30bdee] text-2xl sm:text-3xl font-bold">${item.price.toFixed(2)} USD</span>
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#30bdee]/20 rounded-full">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#30bdee] rounded-full" />
                    <span className="text-white font-semibold text-sm sm:text-base">{item.coins}</span>
                  </div>
                </div>
              </div>

              {/* Item Properties */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between">
                  <span className="text-[#ffffffb2] text-sm sm:text-base">Category:</span>
                  <span className="text-white font-medium text-sm sm:text-base">{item.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#ffffffb2] text-sm sm:text-base">Rarity:</span>
                  <span className={`font-medium text-sm sm:text-base ${getRarityColor(item.rarity)}`}>{item.rarity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#ffffffb2] text-sm sm:text-base">XP Boost:</span>
                  <span className="text-green-400 font-medium text-sm sm:text-base">{item.xpBoost}</span>
                </div>
              </div>

              {/* Rarity Badge */}
              <div className="mb-4 sm:mb-6">
                <span className={`px-3 py-1 ${getRarityBadgeColor(item.rarity)} text-white text-xs font-bold rounded-full`}>
                  {item.rarity.toUpperCase()}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  className="w-8 h-8 sm:w-10 sm:h-10 p-0 border-[#333333] hover:border-[#30bdee] hover:bg-[#30bdee] hover:text-white"
                >
                  <MinusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <span className="text-white font-bold text-lg sm:text-xl px-3 sm:px-4">{quantity.toString().padStart(2, '0')}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  className="w-8 h-8 sm:w-10 sm:h-10 p-0 border-[#333333] hover:border-[#30bdee] hover:bg-[#30bdee] hover:text-white"
                >
                  <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  variant="outline"
                  className="ml-2 sm:ml-4 border-[#333333] hover:border-[#30bdee] hover:bg-[#30bdee] hover:text-white"
                >
                  <ShoppingCartIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>

              {/* Buy Now Button */}
              <Button className="w-full bg-[#30bdee] hover:bg-[#2aa3d1] text-white h-10 sm:h-12 text-base sm:text-lg font-semibold rounded-lg">
                Buy Now
              </Button>
            </div>
          </div>

          {/* Related Products - Right Side */}
          <div className="xl:col-span-1 space-y-4 sm:space-y-6">
            {/* Related Products */}
            <Card className="bg-[#111111] border-[#333333]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white font-semibold text-base sm:text-lg">
                    Related products
                  </CardTitle>
                  <Button variant="ghost" className="text-[#30bdee] hover:text-white text-xs sm:text-sm">
                    View all
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {relatedProducts.map((product, index) => (
                  <Link key={index} to={`/item/${product.id}`} className="block">
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-[#ffffff06] rounded-lg hover:bg-[#ffffff08] transition-colors cursor-pointer relative">
                      {product.isNew && (
                        <div className="absolute top-1 sm:top-2 right-1 sm:right-2 px-1 sm:px-2 py-0.5 sm:py-1 bg-green-600 text-white text-xs font-bold rounded">
                          New
                        </div>
                      )}
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#333333] rounded-lg flex items-center justify-center">
                        <span className="text-lg sm:text-2xl">{product.image}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-xs sm:text-sm mb-1 truncate">{product.name}</h4>
                        <div className="flex items-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon 
                              key={star} 
                              className={`w-2 h-2 sm:w-3 sm:h-3 ${star <= product.rating ? 'text-yellow-400 fill-current' : 'text-[#333333]'}`} 
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="text-[#30bdee] font-bold text-xs sm:text-sm">${product.price.toFixed(2)}</span>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#30bdee] rounded-full" />
                            <span className="text-white text-xs">{product.coins}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Hot Selling */}
            <Card className="bg-[#111111] border-[#333333]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white font-semibold text-base sm:text-lg">
                    Hot Selling
                  </CardTitle>
                  <Button variant="ghost" className="text-[#30bdee] hover:text-white text-xs sm:text-sm">
                    View all
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {hotSellingItems.map((product, index) => (
                  <Link key={index} to={`/item/${product.id}`} className="block">
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-[#ffffff06] rounded-lg hover:bg-[#ffffff08] transition-colors cursor-pointer">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#333333] rounded-lg flex items-center justify-center">
                        <span className="text-lg sm:text-2xl">{product.image}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-xs sm:text-sm mb-1 truncate">{product.name}</h4>
                        <div className="flex items-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon 
                              key={star} 
                              className={`w-2 h-2 sm:w-3 sm:h-3 ${star <= product.rating ? 'text-yellow-400 fill-current' : 'text-[#333333]'}`} 
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="text-[#30bdee] font-bold text-xs sm:text-sm">${product.price.toFixed(2)}</span>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#30bdee] rounded-full" />
                            <span className="text-white text-xs">{product.coins}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};