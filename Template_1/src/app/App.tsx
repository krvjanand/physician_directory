import { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import ProviderCard from './components/ProviderCard';
import ProviderDetail from './components/ProviderDetail';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import type { Provider, FilterOptions } from '../types/provider';

const PROVIDERS_PER_PAGE = 12;

function App() {
  const [providerList, setProviderList] = useState<Provider[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  const [filters, setFilters] = useState<FilterOptions>({
    distance: 25,
    nearMe: false,
    acceptingNewPatients: null,
    languagesSpoken: [],
    gender: null,
    virtualCareAvailable: null,
    hospitalAffiliations: null,
    boardCertified: null,
    yearsOfExperience: null,
    specialty: null
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/providers')
      .then((res) => res.json())
      .then((data) => {
        setProviderList(data);
      })
      .catch((err) => {
        console.error('Error fetching providers:', err);
      });
  }, []);

  const filteredAndSortedProviders = useMemo(() => {
    let filtered = providerList.filter((provider) => {
      // Search by name
      const fullName = `${provider.firstName} ${provider.lastName}`.toLowerCase();
      if (searchTerm && !fullName.includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Location filter (simplified)
      if (location) {
        const locationLower = location.toLowerCase();
        if (
          !provider.city.toLowerCase().includes(locationLower) &&
          !provider.state.toLowerCase().includes(locationLower) &&
          !provider.zipCode.includes(location)
        ) {
          return false;
        }
      }

      // Accepting new patients filter
      if (filters.acceptingNewPatients !== null && provider.acceptingNewPatients !== filters.acceptingNewPatients) {
        return false;
      }

      // Specialty filter
      if (filters.specialty && provider.specialtyName !== filters.specialty) {
        return false;
      }

      // Gender filter
      if (filters.gender && provider.gender !== filters.gender) {
        return false;
      }

      // Languages filter
      if (filters.languagesSpoken.length > 0) {
        const hasLanguage = filters.languagesSpoken.some((lang) =>
          provider.languagesSpoken.includes(lang)
        );
        if (!hasLanguage) {
          return false;
        }
      }

      // Virtual care filter
      if (filters.virtualCareAvailable !== null && provider.virtualCareAvailable !== filters.virtualCareAvailable) {
        return false;
      }

      // Hospital affiliations filter
      if (filters.hospitalAffiliations !== null && provider.hospitalAffiliations !== filters.hospitalAffiliations) {
        return false;
      }

      // Board certified filter
      if (filters.boardCertified !== null && provider.boardCertified !== filters.boardCertified) {
        return false;
      }

      // Years of experience filter
      if (filters.yearsOfExperience !== null && provider.yearsOfExperience < filters.yearsOfExperience) {
        return false;
      }

      return true;
    });

    // Sort providers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'name-asc':
          return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        case 'name-desc':
          return `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`);
        case 'experience':
          return b.yearsOfExperience - a.yearsOfExperience;
        case 'distance':
          return a.latitude - b.latitude; // Replace with real distance in production
        default:
          return 0;
      }
    });

    return filtered;
  }, [providerList, searchTerm, location, filters, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedProviders.length / PROVIDERS_PER_PAGE);
  const paginatedProviders = filteredAndSortedProviders.slice(
    (currentPage - 1) * PROVIDERS_PER_PAGE,
    currentPage * PROVIDERS_PER_PAGE
  );

  // Handlers
  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProviderClick = (provider: Provider) => {
    setSelectedProvider(provider);
  };

  const handleCloseDetail = () => {
    setSelectedProvider(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header brandName="MedivueGreen" tagline="Find Quality Healthcare Providers" logo="" />

      <SearchBar
        searchTerm={searchTerm}
        location={location}
        onSearchChange={setSearchTerm}
        onLocationChange={setLocation}
        onSearch={handleSearch}
      />

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />

      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Healthcare Providers {location && `in ${location}`}
          </h2>
          <p className="text-gray-600">
            Showing {paginatedProviders.length} of {filteredAndSortedProviders.length} providers
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {paginatedProviders.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginatedProviders.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} onClick={handleProviderClick} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No providers found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters to find more providers.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setLocation('');
                setFilters({
                  distance: 25,
                  nearMe: false,
                  acceptingNewPatients: null,
                  languagesSpoken: [],
                  gender: null,
                  virtualCareAvailable: null,
                  hospitalAffiliations: null,
                  boardCertified: null,
                  yearsOfExperience: null,
                  specialty: null
                });
                setCurrentPage(1);
              }}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      <Footer />

      {selectedProvider && (
        <ProviderDetail provider={selectedProvider} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

export default App;
