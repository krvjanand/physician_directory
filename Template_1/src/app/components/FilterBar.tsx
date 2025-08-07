import React, { useEffect, useState } from 'react';
import { Filter } from 'lucide-react';
import type { FilterOptions } from '../../types/provider';
import { specialties, languages } from '../../data/mockProviders';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
}) => {
  const [settings, setSettings] = useState({
    filterAcceptingStatus: true,
    filterSpeciality: true,
    filterGender: true,
    filterLanguages: true,
    filterVirtualCare: true,
    filterBoardCertified: true,
    filterExperience: true,
    sortHighRated: true,
    sortAtoZ: true,
    sortZtoA: true,
    sortExperience: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem('providerSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700">Filters</span>
          </div>
          <button
            onClick={() =>
              onFilterChange({
                distance: 25,
                nearMe: false,
                acceptingNewPatients: null,
                languagesSpoken: [],
                gender: null,
                virtualCareAvailable: null,
                hospitalAffiliations: null,
                boardCertified: null,
                yearsOfExperience: null,
                specialty: null,
              })
            }
            className="text-teal-600 hover:text-teal-700 text-sm font-medium"
          >
            Clear All
          </button>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* Scrollable Filters */}
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-2 min-w-max">
              {/* Distance - always shown */}
              <select
                value={filters.distance}
                onChange={(e) => handleFilterChange('distance', parseInt(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-teal-500"
              >
                <option value={5}>Within 5 miles</option>
                <option value={10}>Within 10 miles</option>
                <option value={25}>Within 25 miles</option>
                <option value={50}>Within 50 miles</option>
              </select>

              {settings.filterAcceptingStatus && (
                <select
                  value={filters.acceptingNewPatients === null ? '' : filters.acceptingNewPatients.toString()}
                  onChange={(e) =>
                    handleFilterChange(
                      'acceptingNewPatients',
                      e.target.value === '' ? null : e.target.value === 'true'
                    )
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">All Providers</option>
                  <option value="true">Accepting New Patients</option>
                  <option value="false">Not Accepting</option>
                </select>
              )}

              {settings.filterSpeciality && (
                <select
                  value={filters.specialty || ''}
                  onChange={(e) => handleFilterChange('specialty', e.target.value || null)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">All Specialties</option>
                  {specialties.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              )}

              {settings.filterGender && (
                <select
                  value={filters.gender || ''}
                  onChange={(e) => handleFilterChange('gender', e.target.value || null)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Any Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              )}

              {settings.filterLanguages && (
                <select
                  onChange={(e) => {
                    const lang = e.target.value;
                    if (lang && !filters.languagesSpoken.includes(lang)) {
                      handleFilterChange('languagesSpoken', [...filters.languagesSpoken, lang]);
                    }
                  }}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Languages Spoken</option>
                  {languages.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              )}

              {settings.filterVirtualCare && (
                <select
                  value={filters.virtualCareAvailable === null ? '' : filters.virtualCareAvailable.toString()}
                  onChange={(e) =>
                    handleFilterChange(
                      'virtualCareAvailable',
                      e.target.value === '' ? null : e.target.value === 'true'
                    )
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Virtual Care</option>
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              )}

              {settings.filterBoardCertified && (
                <select
                  value={filters.boardCertified === null ? '' : filters.boardCertified.toString()}
                  onChange={(e) =>
                    handleFilterChange(
                      'boardCertified',
                      e.target.value === '' ? null : e.target.value === 'true'
                    )
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Board Certification</option>
                  <option value="true">Board Certified</option>
                  <option value="false">Not Certified</option>
                </select>
              )}

              <button className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-teal-500">
                Favourites
              </button>

              {settings.filterExperience && (
                <select
                  value={filters.yearsOfExperience || ''}
                  onChange={(e) =>
                    handleFilterChange(
                      'yearsOfExperience',
                      e.target.value ? parseInt(e.target.value) : null
                    )
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Years of Experience</option>
                  <option value="2">2+ years</option>
                  <option value="5">5+ years</option>
                  <option value="10">10+ years</option>
                  <option value="15">15+ years</option>
                  <option value="20">20+ years</option>
                </select>
              )}
            </div>
          </div>

          {/* Sort By - only show options based on settings */}
          <div className="flex-shrink-0 border-l border-gray-300 pl-4">
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-teal-500 text-gray-700"
            >
              {settings.sortHighRated && <option value="rating">Sort by</option>}
              {settings.sortAtoZ && <option value="name-asc">Name A-Z</option>}
              {settings.sortZtoA && <option value="name-desc">Name Z-A</option>}
              {settings.sortExperience && <option value="experience">Years of Experience</option>}
            </select>
          </div>
        </div>

        {/* Active Language Filters */}
        {settings.filterLanguages && filters.languagesSpoken.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {filters.languagesSpoken.map((lang) => (
              <span
                key={lang}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
              >
                {lang}
                <button
                  onClick={() =>
                    handleFilterChange(
                      'languagesSpoken',
                      filters.languagesSpoken.filter((l) => l !== lang)
                    )
                  }
                  className="ml-2 text-teal-600 hover:text-teal-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
