import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { brands } from '../data/mockData';

export function OnboardingBrands() {
  const navigate = useNavigate();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const toggleBrand = (brandId: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const handleContinue = () => {
    navigate('/onboarding/social');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-3xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <span style={{ color: '#2E2E2E' }}>Step 1 of 3</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 rounded-full transition-all" style={{ width: '33.33%', backgroundColor: '#2E2E2E' }} />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl mb-2" style={{ color: '#2E2E2E' }}>Which brands will you be writing for?</h1>
          <p style={{ color: '#575757' }}>Select all that apply</p>
        </div>

        {/* Brand Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {brands.map(brand => (
            <div
              key={brand.id}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                selectedBrands.includes(brand.id) ? 'shadow-lg' : 'hover:shadow-md'
              }`}
              style={{
                borderColor: selectedBrands.includes(brand.id) ? brand.color : '#C4C4C4',
                backgroundColor: selectedBrands.includes(brand.id) ? `${brand.color}10` : 'white',
              }}
              onClick={() => toggleBrand(brand.id)}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selectedBrands.includes(brand.id)}
                  onCheckedChange={() => toggleBrand(brand.id)}
                />
                <div className="flex-1">
                  <h3 style={{ color: '#2E2E2E' }}>{brand.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
          >
            Back
          </Button>
          <Button
            onClick={handleContinue}
            style={{ backgroundColor: '#2E2E2E', color: '#FFFFFF' }}
            disabled={selectedBrands.length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
