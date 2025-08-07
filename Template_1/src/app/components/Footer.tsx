import React, { useEffect, useState } from 'react';
import { Heart, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  fallbackBrand?: string;
}

const Footer: React.FC<FooterProps> = ({ fallbackBrand = 'OnlyMedChoice' }) => {
  const [brandName, setBrandName] = useState(fallbackBrand);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  // ✅ Fetch brand name and logo from Flask backend
  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/config');
        const data = await res.json();

        if (data.brand_name) setBrandName(data.brand_name);
        if (data.logo) {
          if (data.logo.startsWith('data:image')) {
            // Already base64
            setLogoUrl(data.logo);
          } else {
            // Convert hex to base64 PNG
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
    <footer className="bg-teal-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <Heart className="w-6 h-6 text-teal-800" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold">{brandName}</h3>
                <p className="text-teal-200 text-sm">
                  Find Quality Healthcare Providers
                </p>
              </div>
            </div>
            <p className="text-teal-100 mb-4 max-w-md">
              Connecting patients with quality healthcare providers through our comprehensive 
              directory and advanced search capabilities.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-teal-200 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-teal-200 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-teal-200 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-teal-200 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-teal-200 hover:text-white transition-colors">Find Providers</a></li>
              <li><a href="#" className="text-teal-200 hover:text-white transition-colors">Health Plans</a></li>
              <li><a href="#" className="text-teal-200 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-teal-200 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-teal-200 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-teal-200 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-teal-200 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-teal-200 hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-800 mt-8 pt-8 text-center">
          <p className="text-teal-200">
            © 2025 {brandName}. All rights reserved. | Built with care for better healthcare access.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;