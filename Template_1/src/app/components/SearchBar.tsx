import React from 'react';
import { Search, MapPin,ShieldCheck } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  location: string;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  location,
  onSearchChange,
  onLocationChange,
  onSearch
}) => {
  return (
    <div className="bg-teal-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Find Healthcare Providers</h2>
          <p className="text-teal-100">Search by name, specialty, or location</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Provider name or specialty"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="City, State or ZIP"
                  value={location}
                  onChange={(e) => onLocationChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              {/* Insurance Plan Selector */}
<div className="relative sm:col-span-2 lg:col-span-1">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
  </div>
  <select
    className="block w-full pl-10 pr-10 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent bg-white appearance-none transition duration-150 ease-in-out"
  >
    <option value="">All Plans</option>
    <option value="medicare">Medicare</option>
    <option value="medicaid">Medicaid</option>
    <option value="blue-cross">Blue Cross</option>
    <option value="aetna">Aetna</option>
    <option value="cigna">Cigna</option>
    <option value="unitedhealthcare">UnitedHealthcare</option>
    <option value="self-pay">Self Pay</option>
  </select>
</div>
              
              <button
                onClick={onSearch}
                className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                Search Providers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;