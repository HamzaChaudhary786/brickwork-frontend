import { ChevronDownIcon, ChevronUpIcon, XIcon, CheckIcon } from "lucide-react";
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

interface MembershipApplicationProps {
  onClose: () => void;
}

export const MembershipApplication = ({ onClose }: MembershipApplicationProps): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  type SectionKey = keyof typeof expandedSections;

  const [expandedSections, setExpandedSections] = useState({
    step1: true,
    step2: false,
    rulesAgreement: false,
    communityAgreement: false,
    confidentialityAgreement: false
  });

  const [formData, setFormData] = useState({
    // Step 1 data
    discordUsername: "ExUNNAMED.Echo",
    inGameUsername: "Ex.UNNAMED.Echo",
    dob: "MM/DD/YY",
    references: "",
    ageAgreement: "agree", // "agree" or "disagree"
    rulesAgreement: false,
    communityAgreement: false,
    confidentialityAgreement: false,
    applyingTo: {
      squad: true,
      starCitizen: false,
      armaRefugee: false,
      warThunder: true,
      duneAwakening: true,
      community: false
    },
    
    // Step 2 data
    steamId: "",
    discordId: "",
    starCitizenId: "",
    refugeeId: "",
    warThunderId: "",
    duneAwakeningId: "",
    playTimePerWeek: "",
    discoveredThrough: "",
    drawnToBy: "",
    mostHelpsYou: "",
    gamesOfInterest: "",
    timeplayingGames: "",
    breakInUnnamed: "",
    troublesComes: "",
    exclusivityAgreement: ""
  });

  const toggleSection = (section: SectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApplyingToChange = (field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      applyingTo: {
        ...prev.applyingTo,
        [field]: value
      }
    }));
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      setExpandedSections(prev => ({
        ...prev,
        step1: false,
        step2: true
      }));
    }
  };

  const handleGoBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setExpandedSections(prev => ({
        ...prev,
        step1: true,
        step2: false
      }));
    } else {
      onClose();
    }
  };

  const handleSubmitApplication = () => {
    console.log("Submitting application:", formData);
    // Show success modal instead of closing immediately
    setShowSuccessModal(true);
  };

  const handleViewApplicationStatus = () => {
    // Handle navigation to application status page
    console.log("Navigating to application status");
    setShowSuccessModal(false);
    onClose();
  };

  const handleBackToDashboard = () => {
    // Handle navigation back to dashboard
    console.log("Navigating back to dashboard");
    setShowSuccessModal(false);
    onClose();
  };

  return (
    <>
      {/* Main Application Modal */}
      {!showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="relative bg-[#111111] w-full max-w-4xl rounded-2xl border border-[#333333] max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#333333]">
          <div>
            <h2 className="text-white text-2xl font-bold">Apply to Join the Community</h2>
            <p className="text-[#ffffffb2] text-sm mt-1">
              Please respond to each question thoughtfully and avoid one-word answers. If you have any questions please ask the recruiter in your ticket.
            </p>
            <p className="text-[#ffffffb2] text-sm mt-2">
              <span className="text-yellow-400">Note:</span> This is NOT a staff application, if you wish to be an admin or staff member of The Unnamed you must be a member (this application) for a minimum of 3 months first.
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-[#ffffffb2] hover:text-white p-2"
          >
            <XIcon className="w-6 h-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Step 1 */}
          <Card className="bg-[#1a1a1a] border-[#333333]">
            <CardHeader>
              <button
                onClick={() => toggleSection('step1')}
                className="flex items-center justify-between w-full text-left"
              >
                <CardTitle className="text-white text-lg">Step 1</CardTitle>
                {expandedSections.step1 ? (
                  <ChevronUpIcon className="w-5 h-5 text-[#ffffffb2]" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-[#ffffffb2]" />
                )}
              </button>
            </CardHeader>
            {expandedSections.step1 && (
              <CardContent className="space-y-6">
                {/* User Profile Section */}
                <div className="flex items-center gap-4 p-4 bg-[#ffffff06] rounded-lg">
                  <img 
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2"
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-white text-lg font-semibold">ZenWave</h3>
                    <p className="text-[#ffffffb2] text-sm">ID XP</p>
                    <a href="https://discord.gg/gaminghub" className="text-[#30bdee] text-sm hover:underline">
                      https://discord.gg/gaminghub
                    </a>
                    <div className="mt-2">
                      <span className="text-[#30bdee] text-xs">Change Image</span>
                      <p className="text-[#ffffffb2] text-xs">Join the discord limit</p>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Discord Username</label>
                    <Input
                      value={formData.discordUsername}
                      onChange={(e) => handleInputChange('discordUsername', e.target.value)}
                      className="bg-[#0a0a0a] border-[#333333] text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">In-Game Username</label>
                    <Input
                      value={formData.inGameUsername}
                      onChange={(e) => handleInputChange('inGameUsername', e.target.value)}
                      className="bg-[#0a0a0a] border-[#333333] text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#ffffffb2] text-sm block mb-2">DOB (Optional)</label>
                  <Input
                    value={formData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                    className="bg-[#0a0a0a] border-[#333333] text-white max-w-xs"
                    placeholder="MM/DD/YY"
                  />
                </div>

                <div>
                  <label className="text-[#ffffffb2] text-sm block mb-2">Reference(s) (Recent User name/NNA)</label>
                  <textarea
                    value={formData.references}
                    onChange={(e) => handleInputChange('references', e.target.value)}
                    className="w-full h-20 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white p-3 resize-none"
                    placeholder="Results Cannot Be Used As References"
                  />
                </div>

                {/* Age Agreement */}
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">18+ Agreement</h4>
                  <p className="text-[#ffffffb2] text-sm">
                    The Unnamed Requires Our Members To Be Above The Age Of 18 Years Old. If You Are Found To Be Dishonest With Your Selection You Will Be Removed From The Community.
                  </p>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="ageAgreement"
                        value="agree"
                        checked={formData.ageAgreement === "agree"}
                        onChange={(e) => handleInputChange('ageAgreement', e.target.value)}
                        className="text-green-500"
                      />
                      <span className="text-green-400">I Agree</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="ageAgreement"
                        value="disagree"
                        checked={formData.ageAgreement === "disagree"}
                        onChange={(e) => handleInputChange('ageAgreement', e.target.value)}
                      />
                      <span className="text-red-400">I Do Not Agree</span>
                    </label>
                  </div>
                </div>

                {/* Agreements */}
                <div className="space-y-4">
                  {/* Rules Agreement */}
                  <div>
                    <button
                      onClick={() => toggleSection('rulesAgreement')}
                      className="flex items-center justify-between w-full text-left p-3 bg-[#ffffff06] rounded-lg hover:bg-[#ffffff08] transition-colors"
                    >
                      <span className="text-[#30bdee] font-medium">Rules Agreement</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#30bdee] text-sm">+</span>
                        {expandedSections.rulesAgreement ? (
                          <ChevronUpIcon className="w-4 h-4 text-[#ffffffb2]" />
                        ) : (
                          <ChevronDownIcon className="w-4 h-4 text-[#ffffffb2]" />
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Community Agreement */}
                  <div>
                    <button
                      onClick={() => toggleSection('communityAgreement')}
                      className="flex items-center justify-between w-full text-left p-3 bg-[#ffffff06] rounded-lg hover:bg-[#ffffff08] transition-colors"
                    >
                      <span className="text-[#30bdee] font-medium">Community Agreement</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#30bdee] text-sm">+</span>
                        {expandedSections.communityAgreement ? (
                          <ChevronUpIcon className="w-4 h-4 text-[#ffffffb2]" />
                        ) : (
                          <ChevronDownIcon className="w-4 h-4 text-[#ffffffb2]" />
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Confidentiality Agreement */}
                  <div>
                    <button
                      onClick={() => toggleSection('confidentialityAgreement')}
                      className="flex items-center justify-between w-full text-left p-3 bg-[#ffffff06] rounded-lg hover:bg-[#ffffff08] transition-colors"
                    >
                      <span className="text-[#30bdee] font-medium">Confidentiality Agreement</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#30bdee] text-sm">+</span>
                        {expandedSections.confidentialityAgreement ? (
                          <ChevronUpIcon className="w-4 h-4 text-[#ffffffb2]" />
                        ) : (
                          <ChevronDownIcon className="w-4 h-4 text-[#ffffffb2]" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Applying To Section */}
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Applying To UNA: For</h4>
                  <p className="text-[#ffffffb2] text-sm">
                    Please select the games you're joining UNA for. Choose community only if you don't play any listed games.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { key: 'squad', label: 'Squad', checked: formData.applyingTo.squad },
                      { key: 'starCitizen', label: 'Star Citizen', checked: formData.applyingTo.starCitizen },
                      { key: 'armaRefugee', label: 'Arma Refugee', checked: formData.applyingTo.armaRefugee },
                      { key: 'warThunder', label: 'War Thunder', checked: formData.applyingTo.warThunder },
                      { key: 'duneAwakening', label: 'Dune Awakening', checked: formData.applyingTo.duneAwakening },
                      { key: 'community', label: 'Community', checked: formData.applyingTo.community }
                    ].map((item) => (
                      <label key={item.key} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={(e) => handleApplyingToChange(item.key, e.target.checked)}
                          className="text-[#30bdee]"
                        />
                        <span className="text-white text-sm">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Step 1 Actions */}
                {currentStep === 1 && (
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleGoBack}
                      variant="outline"
                      className="flex-1 border-[#333333] text-[#ffffffb2] hover:text-white hover:bg-[#ffffff12]"
                    >
                      Cancel & Return
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      className="flex-1 bg-[#30bdee] hover:bg-[#2aa3d1] text-white"
                    >
                      Next Step
                    </Button>
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* Step 2 */}
          <Card className="bg-[#1a1a1a] border-[#333333]">
            <CardHeader>
              <button
                onClick={() => toggleSection('step2')}
                className="flex items-center justify-between w-full text-left"
              >
                <CardTitle className="text-white text-lg">Step 2</CardTitle>
                {expandedSections.step2 ? (
                  <ChevronUpIcon className="w-5 h-5 text-[#ffffffb2]" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-[#ffffffb2]" />
                )}
              </button>
            </CardHeader>
            {expandedSections.step2 && (
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">The Unnamed Supported Games Application</h3>
                  <p className="text-[#ffffffb2] text-sm mb-6">
                    Below is the questions for our supported games reveal, this allows direct telegram war thunder.
                  </p>
                </div>

                {/* Game IDs Section */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Steam ID</label>
                    <Input
                      value={formData.steamId}
                      onChange={(e) => handleInputChange('steamId', e.target.value)}
                      className="bg-[#0a0a0a] border-[#333333] text-white"
                      placeholder="Your Steam ID for SQUAD/ARMA/DUNE etc. If you don't have a Steam ID, put N/A or leave blank."
                    />
                  </div>

                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Discord ID</label>
                    <Input
                      value={formData.discordId}
                      onChange={(e) => handleInputChange('discordId', e.target.value)}
                      className="bg-[#0a0a0a] border-[#333333] text-white"
                      placeholder="Your Discord ID for SQUAD/ARMA/DUNE etc. If you don't have a Discord ID, put N/A or leave blank."
                    />
                  </div>

                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Star Citizen ID</label>
                    <Input
                      value={formData.starCitizenId}
                      onChange={(e) => handleInputChange('starCitizenId', e.target.value)}
                      className="bg-[#0a0a0a] border-[#333333] text-white"
                      placeholder="Your Star Citizen ID for STAR CITIZEN etc. If you don't have a Star Citizen ID, put N/A or leave blank."
                    />
                  </div>

                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Refugee ID</label>
                    <Input
                      value={formData.refugeeId}
                      onChange={(e) => handleInputChange('refugeeId', e.target.value)}
                      className="bg-[#0a0a0a] border-[#333333] text-white"
                      placeholder="Your Refugee ID for ARMA REFUGEE etc. If you don't have a Refugee ID, put N/A or leave blank."
                    />
                  </div>

                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">War Thunder ID</label>
                    <Input
                      value={formData.warThunderId}
                      onChange={(e) => handleInputChange('warThunderId', e.target.value)}
                      className="bg-[#0a0a0a] border-[#333333] text-white"
                      placeholder="Your War Thunder ID for WAR THUNDER etc. If you don't have a War Thunder ID, put N/A or leave blank."
                    />
                  </div>

                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Dune Awakening ID</label>
                    <Input
                      value={formData.duneAwakeningId}
                      onChange={(e) => handleInputChange('duneAwakeningId', e.target.value)}
                      className="bg-[#0a0a0a] border-[#333333] text-white"
                      placeholder="Your Dune Awakening ID for DUNE AWAKENING etc. If you don't have a Dune Awakening ID, put N/A or leave blank."
                    />
                  </div>
                </div>

                {/* Questions Section */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#ffffffb2] text-sm block mb-2">Play Time Per Week (Optional)</label>
                      <Select value={formData.playTimePerWeek} onValueChange={(value) => handleInputChange('playTimePerWeek', value)}>
                        <SelectTrigger className="bg-[#0a0a0a] border-[#333333] text-white">
                          <SelectValue placeholder="Select Play Time" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#111111] border-[#333333]">
                          <SelectItem value="1-5" className="text-white">1-5 Hours</SelectItem>
                          <SelectItem value="6-10" className="text-white">6-10 Hours</SelectItem>
                          <SelectItem value="11-20" className="text-white">11-20 Hours</SelectItem>
                          <SelectItem value="20+" className="text-white">20+ Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-[#ffffffb2] text-sm block mb-2">Discovered Us Through (Optional)</label>
                      <Select value={formData.discoveredThrough} onValueChange={(value) => handleInputChange('discoveredThrough', value)}>
                        <SelectTrigger className="bg-[#0a0a0a] border-[#333333] text-white">
                          <SelectValue placeholder="Select Option" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#111111] border-[#333333]">
                          <SelectItem value="discord" className="text-white">Discord</SelectItem>
                          <SelectItem value="friend" className="text-white">Friend Referral</SelectItem>
                          <SelectItem value="social" className="text-white">Social Media</SelectItem>
                          <SelectItem value="other" className="text-white">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Drawn To Us By (Optional)</label>
                    <textarea
                      value={formData.drawnToBy}
                      onChange={(e) => handleInputChange('drawnToBy', e.target.value)}
                      className="w-full h-20 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white p-3 resize-none"
                      placeholder="What drew you to our community?"
                    />
                  </div>

                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Most Helps You Interested In The Community? (Optional)</label>
                    <textarea
                      value={formData.mostHelpsYou}
                      onChange={(e) => handleInputChange('mostHelpsYou', e.target.value)}
                      className="w-full h-20 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white p-3 resize-none"
                      placeholder="What interests you most about our community?"
                    />
                  </div>

                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Games Of Interest (Optional)</label>
                    <div className="flex gap-2 mb-2">
                      <Button size="sm" className="bg-[#30bdee] text-white text-xs px-3 py-1">Squad</Button>
                      <Button size="sm" className="bg-[#30bdee] text-white text-xs px-3 py-1">Arma</Button>
                      <Button size="sm" className="bg-[#30bdee] text-white text-xs px-3 py-1">Star Citizen</Button>
                    </div>
                    <textarea
                      value={formData.gamesOfInterest}
                      onChange={(e) => handleInputChange('gamesOfInterest', e.target.value)}
                      className="w-full h-20 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white p-3 resize-none"
                      placeholder="Tell us about your gaming interests"
                    />
                  </div>

                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Timeplaying Games (Optional)</label>
                    <textarea
                      value={formData.timeplayingGames}
                      onChange={(e) => handleInputChange('timeplayingGames', e.target.value)}
                      className="w-full h-20 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white p-3 resize-none"
                      placeholder="Let Some Games You Enjoy When Having Treatment And Timeplaying If Any"
                    />
                  </div>

                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Break In Unnamed (Optional)</label>
                    <textarea
                      value={formData.breakInUnnamed}
                      onChange={(e) => handleInputChange('breakInUnnamed', e.target.value)}
                      className="w-full h-20 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white p-3 resize-none"
                      placeholder="What would you like to see in our community or what would you like to contribute?"
                    />
                  </div>

                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Troubles Comes By (Optional)</label>
                    <textarea
                      value={formData.troublesComes}
                      onChange={(e) => handleInputChange('troublesComes', e.target.value)}
                      className="w-full h-20 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white p-3 resize-none"
                      placeholder="When You Should Handle Other Situations"
                    />
                  </div>

                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Exclusivity Agreement (Optional)</label>
                    <Select value={formData.exclusivityAgreement} onValueChange={(value) => handleInputChange('exclusivityAgreement', value)}>
                      <SelectTrigger className="bg-[#0a0a0a] border-[#333333] text-white">
                        <SelectValue placeholder="Select Your Opinion That Suits You" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111111] border-[#333333]">
                        <SelectItem value="agree" className="text-white">I Agree</SelectItem>
                        <SelectItem value="disagree" className="text-white">I Disagree</SelectItem>
                        <SelectItem value="neutral" className="text-white">Neutral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Step 2 Actions */}
                {currentStep === 2 && (
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleGoBack}
                      variant="outline"
                      className="border-[#333333] text-[#ffffffb2] hover:text-white hover:bg-[#ffffff12]"
                    >
                      Go Back
                    </Button>
                    <Button
                      onClick={handleSubmitApplication}
                      className="bg-[#30bdee] hover:bg-[#2aa3d1] text-white"
                    >
                      Submit Application
                    </Button>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          
          {/* Success Modal */}
          <div className="relative bg-[#111111] w-full max-w-md rounded-2xl border border-[#333333] p-8 text-center">
            {/* Close Button */}
            <button
              onClick={handleBackToDashboard}
              className="absolute top-4 right-4 text-[#ffffffb2] hover:text-white transition-colors"
            >
              <XIcon className="w-6 h-6" />
            </button>

            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="w-8 h-8 text-white" />
            </div>

            {/* Success Message */}
            <h3 className="text-white text-2xl font-bold mb-4">Application Submitted!</h3>
            <p className="text-[#ffffffb2] text-base mb-8 leading-relaxed">
              You'll be notified once a recruiter reviews your request.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleViewApplicationStatus}
                className="w-full bg-[#30bdee] hover:bg-[#2aa3d1] text-white h-12 rounded-lg font-semibold"
              >
                View Application Status
              </Button>
              <button
                onClick={handleBackToDashboard}
                className="w-full text-[#ffffffb2] hover:text-white transition-colors py-3 text-base"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
