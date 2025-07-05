import { CreditCardIcon, ShieldCheckIcon, ArrowLeftIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export const Checkout = (): JSX.Element => {
  const orderItems = [
    { name: "Golden Armored Knight", price: 20.00, quantity: 1 },
    { name: "Medieval Knight", price: 12.08, quantity: 2 },
    { name: "Blue Warrior", price: 25.04, quantity: 1 },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/cart">
            <Button variant="ghost" className="text-[#ffffffb2] hover:text-white">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
        </div>
        <h1 className="text-white text-2xl sm:text-3xl lg:text-[32px] tracking-[-0.32px] leading-tight lg:leading-[51.2px] font-['Rajdhani',Helvetica] font-semibold">
          Checkout
        </h1>
        <p className="font-['Rajdhani',Helvetica] font-medium text-[#ffffffb2] text-sm sm:text-base tracking-[-0.16px] leading-relaxed lg:leading-[25.6px]">
          Complete your purchase securely
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Checkout Form */}
        <div className="space-y-4 sm:space-y-6">
          {/* Contact Information */}
          <Card className="bg-[#ffffff1a] border-[#ffffff1a]">
            <CardHeader>
              <CardTitle className="text-white font-['Rajdhani',Helvetica] font-semibold text-lg sm:text-xl">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div>
                <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-2">Email Address</label>
                <Input
                  type="email"
                  placeholder="john.doe@email.com"
                  className="bg-[#ffffff0d] border-[#ffffff1a] text-white focus:border-[#30bdee] h-10 sm:h-12 text-sm sm:text-base"
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="w-3 h-3 sm:w-4 sm:h-4 text-[#30bdee]" />
                <label className="text-[#ffffffb2] text-xs sm:text-sm">
                  Email me with news and offers
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="bg-[#ffffff1a] border-[#ffffff1a]">
            <CardHeader>
              <CardTitle className="text-white font-['Rajdhani',Helvetica] font-semibold text-lg sm:text-xl flex items-center">
                <CreditCardIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-2">Card Number</label>
                  <Input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="bg-[#ffffff0d] border-[#ffffff1a] text-white focus:border-[#30bdee] h-10 sm:h-12 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-2">Cardholder Name</label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    className="bg-[#ffffff0d] border-[#ffffff1a] text-white focus:border-[#30bdee] h-10 sm:h-12 text-sm sm:text-base"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-2">Expiry Date</label>
                  <Input
                    type="text"
                    placeholder="MM/YY"
                    className="bg-[#ffffff0d] border-[#ffffff1a] text-white focus:border-[#30bdee] h-10 sm:h-12 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-2">CVV</label>
                  <Input
                    type="text"
                    placeholder="123"
                    className="bg-[#ffffff0d] border-[#ffffff1a] text-white focus:border-[#30bdee] h-10 sm:h-12 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-[#30bdee1a] border border-[#30bdee] rounded-lg">
                <ShieldCheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#30bdee]" />
                <span className="text-[#30bdee] text-xs sm:text-sm font-medium">
                  Your payment information is secure and encrypted
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Billing Address */}
          <Card className="bg-[#ffffff1a] border-[#ffffff1a]">
            <CardHeader>
              <CardTitle className="text-white font-['Rajdhani',Helvetica] font-semibold text-lg sm:text-xl">
                Billing Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-2">First Name</label>
                  <Input
                    type="text"
                    placeholder="John"
                    className="bg-[#ffffff0d] border-[#ffffff1a] text-white focus:border-[#30bdee] h-10 sm:h-12 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-2">Last Name</label>
                  <Input
                    type="text"
                    placeholder="Doe"
                    className="bg-[#ffffff0d] border-[#ffffff1a] text-white focus:border-[#30bdee] h-10 sm:h-12 text-sm sm:text-base"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-2">Address</label>
                <Input
                  type="text"
                  placeholder="123 Main Street"
                  className="bg-[#ffffff0d] border-[#ffffff1a] text-white focus:border-[#30bdee] h-10 sm:h-12 text-sm sm:text-base"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-2">City</label>
                  <Input
                    type="text"
                    placeholder="New York"
                    className="bg-[#ffffff0d] border-[#ffffff1a] text-white focus:border-[#30bdee] h-10 sm:h-12 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-2">State</label>
                  <Input
                    type="text"
                    placeholder="NY"
                    className="bg-[#ffffff0d] border-[#ffffff1a] text-white focus:border-[#30bdee] h-10 sm:h-12 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="text-[#ffffffb2] text-xs sm:text-sm block mb-2">ZIP Code</label>
                  <Input
                    type="text"
                    placeholder="10001"
                    className="bg-[#ffffff0d] border-[#ffffff1a] text-white focus:border-[#30bdee] h-10 sm:h-12 text-sm sm:text-base"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="bg-[#ffffff1a] border-[#ffffff1a] sticky top-6 lg:top-24">
            <CardHeader>
              <CardTitle className="text-white font-['Rajdhani',Helvetica] font-semibold text-lg sm:text-xl">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {/* Order Items */}
              <div className="space-y-2 sm:space-y-3">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <div>
                      <p className="text-white font-medium text-sm sm:text-base">{item.name}</p>
                      <p className="text-[#ffffffb2] text-xs sm:text-sm">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-white font-medium text-sm sm:text-base">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="border-[#ffffff1a]" />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#ffffffb2] text-sm sm:text-base">Subtotal</span>
                  <span className="text-white text-sm sm:text-base">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#ffffffb2] text-sm sm:text-base">Tax</span>
                  <span className="text-white text-sm sm:text-base">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-base sm:text-lg font-semibold">
                  <span className="text-white">Total</span>
                  <span className="text-[#30bdee]">${total.toFixed(2)}</span>
                </div>
              </div>

              <hr className="border-[#ffffff1a]" />

              {/* Complete Order Button */}
              <Button className="w-full bg-[#30bdee] hover:bg-[#2aa3d1] text-white h-10 sm:h-12 text-base sm:text-lg font-semibold">
                Complete Order
              </Button>

              <div className="text-center">
                <p className="text-[#ffffffb2] text-xs">
                  By completing your order, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};