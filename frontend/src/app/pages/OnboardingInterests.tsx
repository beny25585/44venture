import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { interests } from '../data/mockData';

export function OnboardingInterests() {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInterests = interests.filter(interest =>
    interest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleComplete = () => {
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <span style={{ color: '#2E2E2E' }}>Step 3 of 3</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 rounded-full transition-all" style={{ width: '100%', backgroundColor: '#2E2E2E' }} />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2" style={{ color: '#2E2E2E' }}>Select your interests</h1>
          <p style={{ color: '#575757' }}>This helps us curate relevant content for you</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#575757' }} />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search interests..."
            className="pl-10"
          />
        </div>

        {/* Selected Interests Tags */}
        {selectedInterests.length > 0 && (
          <div className="mb-6">
            <p className="mb-3" style={{ color: '#575757' }}>Selected ({selectedInterests.length})</p>
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map(interest => (
                <div
                  key={interest}
                  className="px-4 py-2 rounded-full flex items-center gap-2"
                  style={{ backgroundColor: '#2E2E2E', color: '#FFFFFF' }}
                >
                  <span>{interest}</span>
                  <X
                    className="w-4 h-4 cursor-pointer hover:opacity-70"
                    onClick={() => toggleInterest(interest)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interests Grid */}
        <div className="mb-8 p-6 rounded-lg border" style={{ borderColor: '#C4C4C4', maxHeight: '400px', overflowY: 'auto' }}>
          <div className="flex flex-wrap gap-2">
            {filteredInterests.map(interest => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full border-2 transition-all ${
                  selectedInterests.includes(interest)
                    ? 'opacity-50'
                    : 'hover:shadow-md'
                }`}
                style={{
                  borderColor: selectedInterests.includes(interest) ? '#2E2E2E' : '#C4C4C4',
                  backgroundColor: selectedInterests.includes(interest) ? '#F5F5F5' : 'white',
                  color: '#2E2E2E',
                }}
                disabled={selectedInterests.includes(interest)}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/onboarding/social')}
          >
            Back
          </Button>
          <Button
            onClick={handleComplete}
            style={{ backgroundColor: '#2E2E2E', color: '#FFFFFF' }}
            disabled={selectedInterests.length === 0}
          >
            Complete Setup
          </Button>
        </div>
      </div>
    </div>
  );
}
