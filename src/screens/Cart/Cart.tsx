import { MinusIcon, PlusIcon, TrashIcon, ShoppingBagIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export const Cart = (): JSX.Element => {
  const cartItems = [
    {
      id: 1,
      name: "Golden Armored Knight",
      price: 20.00,
      coins: 165,
      quantity: 1,
      rarity: "Legendary"
    },
    {
      id: 2,
      name: "Medieval Knight",
      price: 12.08,
      coins: 134,
      quantity: 2,
      rarity: "Epic"
    },
    {
      id: 3,
      name: "Blue Warrior",
      price: 25.04,
      coins: 172,
      quantity: 1,
      rarity: "Rare"
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalCoins = cartItems.reduce((sum, item) => sum + (item.coins * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-white text-2xl sm:text-3xl lg:text-[32px] tracking-[-0.32px] leading-tight lg:leading-[51.2px] font-['Rajdhani',Helvetica] font-semibold">
          Shopping Cart
        </h1>
        <p className="font-['Rajdhani',Helvetica] font-medium text-[#ffffffb2] text-sm sm:text-base tracking-[-0.16px] leading-relaxed lg:leading-[25.6px]">
          Review your items before checkout
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          {cartItems.length === 0 ? (
            <Card className="bg-[#ffffff1a] border-[#ffffff1a]">
              <CardContent className="p-8 sm:p-12 text-center">
                <ShoppingBagIcon className="w-12 h-12 sm:w-16 sm:h-16 text-[#ffffffb2] mx-auto mb-4" />
                <h3 className="text-white text-lg sm:text-xl font-semibold mb-2">Your cart is empty</h3>
                <p className="text-[#ffffffb2] mb-4 sm:mb-6 text-sm sm:text-base">Add some items from the marketplace to get started</p>
                <Link to="/marketplace">
                  <Button className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white">
                    Browse Marketplace
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            cartItems.map((item) => (
              <Card key={item.id} className="bg-[#ffffff1a] border-[#ffffff1a]">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Item Image */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#ffffff0d] rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-[#30bdee] rounded" />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
                        <h3 className="text-white font-semibold text-base sm:text-lg">{item.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.rarity === 'Legendary' ? 'bg-yellow-600 text-white' :
                          item.rarity === 'Epic' ? 'bg-purple-600 text-white' :
                          'bg-blue-600 text-white'
                        }`}>
                          {item.rarity}
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-3">
                        <span className="text-[#30bdee] font-bold text-base sm:text-lg">${item.price.toFixed(2)}</span>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#30bdee] rounded-full" />
                          <span className="text-white text-sm sm:text-base">{item.coins} coins</span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="flex items-center gap-2 bg-[#ffffff0d] rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-6 h-6 sm:w-8 sm:h-8 p-0 hover:bg-[#ffffff1a]"
                          >
                            <MinusIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </Button>
                          <span className="text-white font-medium px-2 sm:px-3 text-sm sm:text-base">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-6 h-6 sm:w-8 sm:h-8 p-0 hover:bg-[#ffffff1a]"
                          >
                            <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 text-sm"
                        >
                          <TrashIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>

                    {/* Item Total - Mobile: Below content, Desktop: Right side */}
                    <div className="text-left sm:text-right w-full sm:w-auto">
                      <p className="text-white font-bold text-base sm:text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-[#ffffffb2] text-xs sm:text-sm">
                        {item.coins * item.quantity} coins
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="bg-[#ffffff1a] border-[#ffffff1a] sticky top-6 lg:top-24">
            <CardHeader>
              <CardTitle className="text-white font-['Rajdhani',Helvetica] font-semibold text-lg sm:text-xl">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[#ffffffb2] text-sm sm:text-base">Subtotal</span>
                <span className="text-white font-medium text-sm sm:text-base">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[#ffffffb2] text-sm sm:text-base">Tax</span>
                <span className="text-white font-medium text-sm sm:text-base">${tax.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[#ffffffb2] text-sm sm:text-base">Total Coins</span>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#30bdee] rounded-full" />
                  <span className="text-white font-medium text-sm sm:text-base">{totalCoins}</span>
                </div>
              </div>

              <hr className="border-[#ffffff1a]" />

              <div className="flex justify-between items-center">
                <span className="text-white font-semibold text-base sm:text-lg">Total</span>
                <span className="text-[#30bdee] font-bold text-lg sm:text-xl">${total.toFixed(2)}</span>
              </div>

              <div className="space-y-3 pt-4">
                <Link to="/checkout" className="block">
                  <Button className="w-full bg-[#30bdee] hover:bg-[#2aa3d1] text-white h-10 sm:h-12 text-sm sm:text-base">
                    Proceed to Checkout
                  </Button>
                </Link>
                
                <Link to="/marketplace">
                  <Button variant="outline" className="w-full border-[#ffffff1a] text-[#ffffffb2] hover:text-white hover:bg-[#ffffff0d] h-10 sm:h-12 text-sm sm:text-base">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Promo Code */}
              <div className="pt-4 border-t border-[#ffffff1a]">
                <p className="text-[#ffffffb2] text-xs sm:text-sm mb-2">Have a promo code?</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 h-8 sm:h-10 px-2 sm:px-3 bg-[#ffffff0d] border border-[#ffffff1a] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:outline-none text-sm"
                  />
                  <Button variant="outline" className="border-[#ffffff1a] text-[#ffffffb2] hover:text-white text-xs sm:text-sm px-2 sm:px-3">
                    Apply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};