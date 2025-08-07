import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Star, CheckCircle, XCircle, Video, Building, Calendar, Award, User, ChevronDown, ChevronUp } from 'lucide-react';
import type{ Provider } from '../../types/provider';

interface ProviderDetailProps {
  provider: Provider;
  onClose: () => void;
}

const ProviderDetail: React.FC<ProviderDetailProps> = ({ provider, onClose }) => {
  const [showNpi, setShowNpi] = useState(false);
  const fullName = `${provider.firstName}${provider.middleInitial ? ` ${provider.middleInitial}` : ''} ${provider.lastName}`;
  const fullAddress = `${provider.addressLine1}${provider.addressLine2 ? `, ${provider.addressLine2}` : ''}${provider.addressLine3 ? `, ${provider.addressLine3}` : ''}, ${provider.city}, ${provider.state} ${provider.zipCode}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-900">Provider Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Provider Info */}
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <img src={provider.profileImage} alt={fullName} className="w-28 h-28 rounded-full object-cover border" />
          <div className="flex-1 space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">{fullName}, {provider.degree}</h1>
            <p className="text-lg text-teal-600 font-medium">{provider.specialtyName}</p>
            <p className="text-gray-600">{provider.providerType}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-lg font-semibold text-gray-900">{provider.rating}</span>
              <span className="text-gray-600">({provider.yearsOfExperience} yrs experience)</span>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">

          {/* Left Column */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">{fullAddress}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">{provider.phoneNumber}</p>
                  </div>
                </div>
                {provider.emailId && (
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">{provider.emailId}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Working Hours */}
            {provider.workingHours && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Working Hours</h3>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-600">{provider.workingHours}</p>
                </div>
              </div>
            )}

            {/* Services & Availability */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Services & Availability</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Accepting New Patients</span>
                  <div className="flex items-center">
                    {provider.acceptingNewPatients ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span className="text-green-600 font-medium">Yes</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-500 mr-2" />
                        <span className="text-red-600 font-medium">No</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Virtual Care Available</span>
                  <div className="flex items-center">
                    {provider.virtualCareAvailable ? (
                      <>
                        <Video className="w-5 h-5 text-blue-500 mr-2" />
                        <span className="text-blue-600 font-medium">Yes</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-gray-600 font-medium">No</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Hospital Affiliations</span>
                  <div className="flex items-center">
                    {provider.hospitalAffiliations ? (
                      <>
                        <Building className="w-5 h-5 text-teal-500 mr-2" />
                        <span className="text-teal-600 font-medium">Yes</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-gray-600 font-medium">No</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* NPI Dropdown */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowNpi(!showNpi)}>
                <p className="font-medium text-gray-900">Identifiers</p>
                {showNpi ? (
                  <ChevronUp className="w-4 h-4 text-gray-700" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-700" />
                )}
              </div>
              {showNpi && (
                <p className="text-gray-600 mt-2">NPI ID : {provider.npiId}</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Professional Information */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Information</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Board Certified</span>
                  <div className="flex items-center">
                    {provider.boardCertified ? (
                      <>
                        <Award className="w-5 h-5 text-green-500 mr-2" />
                        <span className="text-green-600 font-medium">Yes</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-gray-600 font-medium">No</span>
                      </>
                    )}
                  </div>
                </div>

                {provider.boardName && (
                  <div>
                    <p className="font-medium text-gray-900">Board Name</p>
                    <p className="text-gray-600">{provider.boardName}</p>
                  </div>
                )}

                {provider.affiliationName && (
                  <div>
                    <p className="font-medium text-gray-900">Affiliation</p>
                    <p className="text-gray-600">{provider.affiliationName}</p>
                  </div>
                )}
              </div>
            </div>

            

            {/* Languages */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Languages Spoken</h3>
              <div className="flex flex-wrap gap-2">
                {provider.languagesSpoken.map(lang => (
                  <span key={lang} className="px-3 py-1 bg-white border border-gray-200 text-sm text-gray-700 rounded-full">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Demographics */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">More About Provider</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Gender</p>
                    <p className="text-gray-600">{provider.gender}</p>
                  </div>
                </div>
                {provider.raceEthnicity && (
                  <div>
                    <p className="font-medium text-gray-900">Race/Ethnicity</p>
                    <p className="text-gray-600">{provider.raceEthnicity}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Insurance */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Insurance Plans</h3>
              <div className="text-sm text-gray-700"><span className="font-medium">Plan:</span> {provider.planName}</div>
              <div>
                <p className="text-gray-700 font-medium mb-2">All Accepted Plans:</p>
                <div className="flex flex-wrap gap-2">
                  {provider.acceptedAllPlans.map(plan => (
                    <span key={plan} className="px-3 py-1 bg-white border border-gray-200 text-sm text-gray-700 rounded-full">
                      {plan}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition">Schedule Appointment</button>
          <button className="flex-1 border border-teal-600 text-teal-600 px-6 py-3 rounded-lg hover:bg-teal-50 transition">Add to Favorites</button>
          <button className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition">Share Profile</button>
        </div>

      </div>
    </div>
  );
};

export default ProviderDetail;
