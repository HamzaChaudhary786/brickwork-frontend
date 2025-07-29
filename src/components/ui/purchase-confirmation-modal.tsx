import { XIcon, StarIcon } from "lucide-react";
import React from "react";
import { Button } from "./button";

interface PurchaseConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  item: {
    id: number;
    name: string;
    price: number;
    coins: number;
    rating: number;
    image: string;
    bgColor: string;
    rarity: string;
    category: string;
    description: string;
  } | null;
  isLoading?: boolean;
}

export const PurchaseConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  item,
  isLoading = false 
}: PurchaseConfirmationModalProps): JSX.Element | null => {
  if (!isOpen || !item) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
      />
    ));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#111111] w-full max-w-md rounded-2xl border border-[#333333] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#333333]">
          <h2 className="text-white text-lg font-bold">Confirm Purchase</h2>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-[#ffffffb2] hover:text-white p-2"
            disabled={isLoading}
          >
            <XIcon className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Item Details Section */}
          <div>
            <h3 className="text-white font-semibold text-base mb-3">Item Details</h3>
            <div className="flex items-center gap-3 p-3 bg-[#ffffff06] rounded-lg">
              {/* Item Image */}
              <div className={`w-16 h-16 bg-gradient-to-br ${item.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <span className="text-white text-2xl">{item.image}</span>
              </div>
              
              {/* Item Info */}
              <div className="flex-1">
                <h4 className="text-white font-semibold text-base mb-1">{item.name}</h4>
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(item.rating)}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#30bdee] rounded-full" />
                  <span className="text-[#30bdee] text-sm font-medium">In Game Currency</span>
                </div>
              </div>
            </div>
          </div>

          {/* Seller Info Section */}
          <div>
            <h3 className="text-white font-semibold text-base mb-3">Seller Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#ffffffb2] text-sm">Discord Username:</span>
                <span className="text-white text-sm">ZenWave#1045</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#ffffffb2] text-sm">Game:</span>
                <span className="text-white text-sm">Star Citizen</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#ffffffb2] text-sm">In-Game Name:</span>
                <span className="text-white text-sm">ZenGM23</span>
              </div>
            </div>
          </div>

          {/* In-Game Payment Method Section */}
          <div>
            <h3 className="text-white font-semibold text-base mb-3">In-Game Payment Method</h3>
            <div className="p-3 bg-[#ffffff06] rounded-lg">
              <p className="text-white text-sm">
                Send <span className="text-[#30bdee] font-semibold">5000 Solari</span> in-game to <span className="text-[#30bdee] font-semibold">ZenGM23</span>
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="p-3 bg-[#ffffff06] rounded-lg">
            <p className="text-[#ffffffb2] text-sm leading-relaxed">
              Once you have sent the in-game currency, Click "Confirm payment sent" to proceed. The seller will then Mark it as Received.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-[#333333] space-y-3">
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full bg-[#30bdee] hover:bg-[#2aa3d1] text-white h-12 rounded-lg font-semibold"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              "Confirm Payment Sent"
            )}
          </Button>
          <Button
            onClick={onClose}
            disabled={isLoading}
            variant="outline"
            className="w-full border-[#333333] text-[#ffffffb2] hover:text-white hover:bg-[#ffffff12] h-12 rounded-lg"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};