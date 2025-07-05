import React from "react";
import { XIcon, TrashIcon, AlertTriangleIcon } from "lucide-react";
import { Button } from "./button";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  itemName?: string;
  isLoading?: boolean;
}

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  itemName,
  isLoading = false
}: DeleteConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#111111] w-full max-w-md rounded-2xl border border-[#333333] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
              <AlertTriangleIcon className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-white text-lg font-bold">{title}</h3>
          </div>
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
        <div className="mb-6">
          <p className="text-[#ffffffb2] text-sm leading-relaxed mb-4">
            {description}
          </p>
          
          {itemName && (
            <div className="bg-[#ffffff06] border border-[#333333] rounded-lg p-3">
              <p className="text-white font-medium text-sm">
                Item: <span className="text-red-400">{itemName}</span>
              </p>
            </div>
          )}
        </div>

        {/* Warning */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6">
          <p className="text-red-400 text-xs font-medium">
            ⚠️ This action cannot be undone. Please confirm you want to proceed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-[#333333] text-[#ffffffb2] hover:text-white hover:bg-[#ffffff12] rounded-lg"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              <>
                <TrashIcon className="w-4 h-4 mr-2" />
                Delete
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};