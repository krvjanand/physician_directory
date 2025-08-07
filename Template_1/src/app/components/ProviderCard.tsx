import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Star, Video, Building, Shield } from 'lucide-react';
import type { Provider } from '../../types/provider';

interface ProviderCardProps {
  provider: Provider;
  onClick: (provider: Provider) => void;
  fallbackBrand?: string;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  onClick,
  fallbackBrand = 'OnlyMedChoice',
}) => {
  const [brandName, setBrandName] = useState(fallbackBrand);
    
  
    // ✅ Fetch brand name and logo from Flask backend
    useEffect(() => {
      const fetchBrandData = async () => {
        try {
          const res = await fetch('http://127.0.0.1:5000/config');
          const data = await res.json();
  
          if (data.brand_name) setBrandName(data.brand_name);
          
        } catch (error) {
          console.error('Error fetching brand info:', error);
        }
      };
  
      fetchBrandData();
    }, []);
  const [settings, setSettings] = useState({
    rating: true,
    yearsOfExperience: true,
    phoneNumber: true,
    acceptingStatus: true,
    virtualCareStatus: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem('providerSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const fullName = `${provider.firstName}${provider.middleInitial ? ` ${provider.middleInitial}` : ''} ${provider.lastName}`;
  const fullAddress = `${provider.addressLine1}${provider.addressLine2 ? `, ${provider.addressLine2}` : ''}`;
  const cityStateZip = `${provider.city}, ${provider.state} ${provider.zipCode}`;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 h-full flex flex-col relative overflow-hidden">
      
      {/* Provider Badge */}
      <div className="absolute top-2 left-2 z-10">
        <div className="flex items-center bg-white rounded-full px-2 py-1 shadow-sm border border-gray-200">
          <Shield className="w-3 h-3 text-teal-600 mr-1" />
          <span className="text-xs font-medium text-teal-700">{brandName} clinician</span>
        </div>
      </div>

      {/* Accepting New Patients Badge */}
      {provider.acceptingNewPatients && settings.acceptingStatus && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-teal-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            Accepts new patients
          </div>
        </div>
      )}

      {/* Provider Image */}
      <div className="flex justify-center items-center">
        <img
          src={provider.profileImage}
          alt={fullName}
          className="w-[400px] h-[400px]"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-grow flex flex-col">

        {/* Top Row: Name, Degree Left | Rating Right */}
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">
              {fullName}, {provider.degree}
            </h3>
            <p className="text-teal-600 font-medium text-sm">{provider.specialtyName}</p>
          </div>

          {provider.rating && settings.rating && (
            <div className="flex items-center space-x-1 mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-900">{provider.rating}</span>
              {provider.yearsOfExperience && settings.yearsOfExperience && (
                <span className="text-sm text-gray-600">({provider.yearsOfExperience} yrs)</span>
              )}
            </div>
          )}
        </div>

        {/* Location Block Full Width */}
        <div className="flex items-start text-sm text-gray-700 mb-3">
          <MapPin className="w-4 h-4 text-teal-600 mt-0.5 mr-2 flex-shrink-0" />
          <div className="leading-snug text-justify">
            <p className="font-medium">{provider.affiliationName || 'WellMed at Medical Center'}</p>
            <p>{fullAddress}</p>
            {provider.addressLine2 && <p>{provider.addressLine2}</p>}
            <p>{cityStateZip}</p>
          </div>
        </div>

        {/* Bottom Row: Virtual Care Left | Hospital Right */}
        <div className="flex justify-between items-center text-sm mt-auto">
          {provider.virtualCareAvailable && settings.virtualCareStatus ? (
            <div className="flex items-center text-blue-600">
              <Video className="w-4 h-4 mr-1" />
              <span className="font-medium">Virtual Care Available</span>
            </div>
          ) : <div />}

          {provider.hospitalAffiliations && (
            <div className="flex items-center text-teal-600">
              <Building className="w-4 h-4 mr-1" />
              <span className="font-medium">Hospital Affiliated</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 mt-4">
          <button
            onClick={() => onClick(provider)}
            className="w-full bg-white border border-gray-300 text-gray-700 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            View profile
          </button>

          {provider.phoneNumber && settings.phoneNumber && (
            <button className="w-full bg-teal-600 text-white px-3 py-2.5 rounded-lg hover:bg-teal-800 transition-colors font-medium text-sm flex items-center justify-center">
              <Phone className="w-4 h-4 mr-2" />
              {provider.phoneNumber}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
