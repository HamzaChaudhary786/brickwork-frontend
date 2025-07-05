import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const FrameSubsection = (): JSX.Element => {
  return (
    <Card className="w-full max-w-[300px] h-[400px] bg-[#111111] border-[#ffffff12] rounded-2xl overflow-hidden hover:border-[#30bdee] transition-all duration-300 group shadow-lg hover:shadow-2xl hover:shadow-[#30bdee]/10">
      <CardContent className="p-0 h-full relative">
        {/* Image Container */}
        <div className="w-full h-[220px] bg-gradient-to-br from-[#ffffff08] to-[#ffffff04] rounded-t-2xl relative overflow-hidden">
          {/* High-quality placeholder image */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#30bdee]/20 to-[#65cbff]/20">
            <div className="w-32 h-32 bg-gradient-to-br from-[#30bdee] to-[#65cbff] rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-4xl">⚔️</span>
            </div>
          </div>

          {/* Enhanced Heart Icon */}
          <button className="absolute w-10 h-10 top-4 right-4 bg-[#000000]/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#30bdee] transition-all duration-300 group/heart">
            <HeartIcon className="w-5 h-5 text-white group-hover/heart:scale-125 transition-transform duration-200" />
          </button>

          {/* Quick Add to Cart */}
          <button className="absolute bottom-4 right-4 w-10 h-10 bg-[#30bdee] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110">
            <ShoppingCartIcon className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content Container */}
        <div className="p-6 flex flex-col justify-between h-[180px]">
          <div>
            {/* Item Name */}
            <h3 className="font-['Rajdhani',Helvetica] font-bold text-white text-xl tracking-[-0.2px] leading-[28px] mb-2 group-hover:text-[#30bdee] transition-colors duration-300">
              Armored Knight
            </h3>

            {/* Rarity Badge */}
            <div className="mb-3">
              <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs font-bold rounded-full">
                EPIC
              </span>
            </div>

            {/* Price */}
            <div className="font-['Rajdhani',Helvetica] font-bold text-[#30bdee] text-2xl tracking-[-0.2px] leading-[32px] mb-3">
              $12.08
            </div>
          </div>

          {/* Coins Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#30bdee]/20 to-[#65cbff]/20 rounded-xl border border-[#30bdee]/30">
              <div className="w-5 h-5 bg-gradient-to-br from-[#30bdee] to-[#65cbff] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">C</span>
              </div>
              <span className="font-['Rajdhani',Helvetica] font-bold text-base text-white">
                134
              </span>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="text-white text-sm font-medium">4.8</span>
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#30bdee]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </CardContent>
    </Card>
  );
};