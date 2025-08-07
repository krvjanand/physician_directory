import React, { useState } from "react";
import {
  Upload,
  Settings,
  Search,
  User,
  Filter,
  Globe,
  Smartphone,
  Monitor,
} from "lucide-react";

interface ConfigureProps {
  onSave: () => void;
}

const Toggle = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (val: boolean) => void;
}) => (
  <div className="flex items-center justify-between py-3 px-1 group">
    <label className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200 flex-1 pr-4">
      {label}
    </label>
    <button
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        value ? "bg-green-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm ${
          value ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  </div>
);

const Configure: React.FC<ConfigureProps> = ({ onSave }) => {
  const [logo, setLogo] = useState<File | null>(null);
  const [brandName, setBrandName] = useState("");

  const [settings, setSettings] = useState<{ [key: string]: boolean }>({
    nameInput: true,
    locationInput: true,
    plansFacility: true,
    fullName: true,
    fullAddress: true,
    specialtyName: true,
    rating: true,
    yearsOfExperience: true,
    phoneNumber: true,
    planName: true,
    acceptingStatus: true,
    virtualCareStatus: true,
    typeOfProvider: true,
    boardCertified: true,
    gender: true,
    email: true,
    npi: true,
    languages: true,
    boardName: true,
    hospitalAffiliation: true,
    affiliationName: true,
    sortAtoZ: true,
    sortZtoA: true,
    sortHighRated: true,
    sortExperience: true,
    filterDistance: true,
    filterAcceptingStatus: true,
    filterVirtualCare: true,
    filterHospitalAffiliation: true,
    filterGender: true,
    filterLanguages: true,
    filterBoardCertified: true,
    filterExperience: true,
    filterRating: true,
  });

  const handleToggleChange = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Optionally persist config to backend/localStorage
    onSave(); // Trigger app to switch to MainApp
  };

  const formatLabel = (key: string) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

   return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-600">Provider Directory Settings</p>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Smartphone className="w-5 h-5" />
            <Monitor className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        {/* Desktop Header */}
        <div className="hidden lg:block mb-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Admin Configuration</h1>
            <p className="text-gray-600 text-lg">Customize your provider directory settings and appearance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 items-stretch">

          {/* Left Column */}
          <div className="space-y-6">
            {/* Header Section */}
            <section className="bg-white rounded-2xl lg:rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-blue-900 px-4 sm:px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white bg-opacity-20 rounded-xl flex-shrink-0">
                    <Globe className="w-5 h-5 text-black" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white">Header & Footer Configuration</h2>
                </div>
              </div>
              <div className="p-4 sm:p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Logo Upload</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="flex items-center justify-center w-full px-4 sm:px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl lg:rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
                    >
                      <div className="text-center">
                        <Upload className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2 transition-colors" />
                        <p className="text-xs sm:text-sm text-gray-600 group-hover:text-blue-600 transition-colors">
                          {logo ? logo.name : "Click to upload logo"}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Brand Name</label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Enter your brand name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm sm:text-base"
                  />
                </div>
              </div>
            </section>

            {/* Search Bar Section */}
            <section className="bg-white rounded-2xl lg:rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-blue-900 px-4 sm:px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white bg-opacity-20 rounded-xl flex-shrink-0">
                    <Search className="w-5 h-5 text-black" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white">Search Bar Options</h2>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-1">
                  
                  <div className="border-t border-gray-100 mx-1"></div>
                  <Toggle
                    label="Search by Speciality"
                    value={settings.plansFacility}
                    onChange={(val) => handleToggleChange("plansFacility", val)}
                  />
                </div>
              </div>
            </section>

            {/* Provider Profile Section */}
            <section className="bg-white rounded-2xl lg:rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-blue-900 px-4 sm:px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white bg-opacity-20 rounded-xl flex-shrink-0">
                    <User className="w-5 h-5 text-black" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white">Provider Profile Fields</h2>
                </div>
              </div>
              <div className="p-4 sm:p-6">
             <div className="max-h-[32rem] lg:max-h-[46.5rem] overflow-y-auto space-y-1">
                  {[
                    
                    "rating",
                    "yearsOfExperience",
                    "boardCertified",
                    "gender",
                    "acceptingStatus",
                    "email",
                    "phoneNumber",
                    "npi",
                    "boardName",
                    "virtualCareStatus",
                    "hospitalAffiliation",
                    "affiliationName",
                  ].map((key, index, array) => (
                    <div key={key}>
                      <Toggle
                        label={formatLabel(key)}
                        value={settings[key]}
                        onChange={(val) => handleToggleChange(key, val)}
                      />
                      {index < array.length - 1 && <div className="border-t border-gray-100 mx-1"></div>}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Provider Card Section */}
            <section className="bg-white rounded-2xl lg:rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-blue-900 px-4 sm:px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white bg-opacity-20 rounded-xl flex-shrink-0">
                    <Settings className="w-5 h-5 text-black" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white">Provider Card Display</h2>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-1">
                  {[
                     "rating",
                    "yearsOfExperience",
                    "phoneNumber",
                    "acceptingStatus",
                    "virtualCareStatus",
                  ].map((key, index, array) => (
                    <div key={key}>
                      <Toggle
                        label={formatLabel(key)}
                        value={settings[key]}
                        onChange={(val) => handleToggleChange(key, val)}
                      />
                      {index < array.length - 1 && <div className="border-t border-gray-100 mx-1"></div>}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Filters & Sort Section */}
            <section className="bg-white rounded-2xl lg:rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-blue-900 px-4 sm:px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white bg-opacity-20 rounded-xl flex-shrink-0">
                    <Filter className="w-5 h-5 text-black" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white">Filters & Sorting</h2>
                </div>
              </div>
              <div className="p-4 sm:p-6 space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Sort Options</h3>
                  <div className="space-y-1">
                    {[
                      "sortAtoZ",
                      "sortZtoA",
                      "sortHighRated",
                      "sortExperience",
                    ].map((key, index, array) => (
                      <div key={key}>
                        <Toggle
                          label={formatLabel(key)}
                          value={settings[key]}
                          onChange={(val) => handleToggleChange(key, val)}
                        />
                        {index < array.length - 1 && <div className="border-t border-gray-100 mx-1"></div>}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Filter Options</h3>
                 <div className="max-h-[24rem] lg:max-h-[32rem] overflow-y-auto space-y-1">

                    {[
                      "filterDistance",
                      "filterAcceptingStatus",
                      "filterVirtualCare",
                      "filterHospitalAffiliation",
                      "filterGender",
                      "filterLanguages",
                      "filterBoardCertified",
                      "filterExperience",
                      "filterRating",
                    ].map((key, index, array) => (
                      <div key={key}>
                        <Toggle
                          label={formatLabel(key)}
                          value={settings[key]}
                          onChange={(val) => handleToggleChange(key, val)}
                        />
                        {index < array.length - 1 && <div className="border-t border-gray-100 mx-1"></div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

           
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 text-sm sm:text-base"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default Configure;
