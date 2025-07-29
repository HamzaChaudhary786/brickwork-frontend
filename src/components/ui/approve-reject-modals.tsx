import React from "react";
import { CheckIcon, XIcon } from "lucide-react";
import { Button } from "./button";

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  applicantName?: string;
  isLoading?: boolean;
}

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  applicantName?: string;
  isLoading?: boolean;
}

export const ApproveModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  applicantName = "this applicant",
  isLoading = false 
}: ApproveModalProps): JSX.Element | null => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#111111] w-full max-w-md rounded-2xl border border-[#333333] p-6 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#ffffffb2] hover:text-white transition-colors"
          disabled={isLoading}
        >
          <XIcon className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckIcon className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-white text-xl font-bold mb-4">Approve Application</h3>
        <p className="text-[#ffffffb2] text-base mb-8 leading-relaxed">
          Are you sure you want to approve {applicantName}? This action will grant them access to the community.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-[#333333] text-[#ffffffb2] hover:text-white hover:bg-[#ffffff12]"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Approving...
              </>
            ) : (
              "Approve"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const RejectModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  applicantName = "this applicant",
  isLoading = false 
}: RejectModalProps): JSX.Element | null => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#111111] w-full max-w-md rounded-2xl border border-[#333333] p-6 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#ffffffb2] hover:text-white transition-colors"
          disabled={isLoading}
        >
          <XIcon className="w-5 h-5" />
        </button>

        {/* Warning Icon */}
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <XIcon className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-white text-xl font-bold mb-4">Reject Application</h3>
        <p className="text-[#ffffffb2] text-base mb-8 leading-relaxed">
          Are you sure you want to reject {applicantName}? This action will deny their access to the community.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-[#333333] text-[#ffffffb2] hover:text-white hover:bg-[#ffffff12]"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Rejecting...
              </>
            ) : (
              "Reject"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};