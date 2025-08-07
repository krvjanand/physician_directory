import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [brandName, setBrandName] = useState<string>('');
  const [logoUrl, setLogoUrl] = useState<string>('');

  // ✅ Fetch brand name & logo directly from DB via Flask
  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/config');
        const data = await res.json();

        if (data.brand_name) setBrandName(data.brand_name);

        if (data.logo) {
          // Backend should ideally send Base64
          if (data.logo.startsWith('data:image')) {
            setLogoUrl(data.logo);
          } else {
            // Convert hex from DB to blob for <img> usage
            const byteArray = new Uint8Array(
              data.logo.match(/.{1,2}/g).map((byte: string) => parseInt(byte, 16))
            );
            const blob = new Blob([byteArray], { type: 'image/png' });
            setLogoUrl(URL.createObjectURL(blob));
          }
        }
      } catch (error) {
        console.error('Error fetching brand info:', error);
      }
    };

    fetchBrandData();
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-teal-800 rounded-lg flex items-center justify-center overflow-hidden">
                {logoUrl && <img src={logoUrl} alt="Logo" className="w-10 h-10 object-contain" />}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-teal-800">{brandName}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;