import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Upload } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export function Registration() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<'original' | 'middle-finger' | 'heart-eyes'>('original');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/onboarding/brands');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2" style={{ color: '#2E2E2E' }}>Welcome to Cheezburger</h1>
          <p style={{ color: '#575757' }}>Create your content editor profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Email Input */}
          <div>
            <label className="block mb-2" style={{ color: '#2E2E2E' }}>Company Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.name@cheezburger.com"
              required
              className="w-full"
            />
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label className="block mb-2" style={{ color: '#2E2E2E' }}>Profile Picture</label>
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-gray-400"
              style={{ borderColor: '#C4C4C4' }}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full mx-auto object-cover" />
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 mx-auto" style={{ color: '#575757' }} />
                  <p style={{ color: '#575757' }}>Drag and drop your photo here, or click to browse</p>
                </div>
              )}
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* AI-Generated Variations */}
          {profileImage && (
            <div>
              <label className="block mb-4" style={{ color: '#2E2E2E' }}>Choose Your Style</label>
              <div className="flex gap-4 justify-center">
                <div
                  className={`cursor-pointer transition-all ${selectedVariation === 'original' ? 'ring-4 ring-offset-2' : ''}`}
                  style={{ ringColor: selectedVariation === 'original' ? '#2E2E2E' : 'transparent' }}
                  onClick={() => setSelectedVariation('original')}
                >
                  <img src={profileImage} alt="Original" className="w-24 h-24 rounded-lg object-cover" />
                  <p className="text-center mt-2 text-sm" style={{ color: '#575757' }}>Original</p>
                </div>
                <div
                  className={`cursor-pointer transition-all ${selectedVariation === 'middle-finger' ? 'ring-4 ring-offset-2' : ''}`}
                  style={{ ringColor: selectedVariation === 'middle-finger' ? '#2E2E2E' : 'transparent' }}
                  onClick={() => setSelectedVariation('middle-finger')}
                >
                  <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center">
                    <span className="text-3xl">🖕</span>
                  </div>
                  <p className="text-center mt-2 text-sm" style={{ color: '#575757' }}>Edgy</p>
                </div>
                <div
                  className={`cursor-pointer transition-all ${selectedVariation === 'heart-eyes' ? 'ring-4 ring-offset-2' : ''}`}
                  style={{ ringColor: selectedVariation === 'heart-eyes' ? '#2E2E2E' : 'transparent' }}
                  onClick={() => setSelectedVariation('heart-eyes')}
                >
                  <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center">
                    <span className="text-3xl">😍</span>
                  </div>
                  <p className="text-center mt-2 text-sm" style={{ color: '#575757' }}>Enthusiastic</p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            style={{ backgroundColor: '#2E2E2E', color: '#FFFFFF' }}
            disabled={!email || !profileImage}
          >
            Continue to Onboarding
          </Button>
        </form>
      </div>
    </div>
  );
}
