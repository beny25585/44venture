import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Twitter, Instagram } from 'lucide-react';

export function OnboardingSocial() {
  const navigate = useNavigate();
  const [social, setSocial] = useState({
    twitter: '',
    instagram: '',
    reddit: '',
  });

  const handleContinue = () => {
    navigate('/onboarding/interests');
  };

  const handleSkip = () => {
    navigate('/onboarding/interests');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <span style={{ color: '#2E2E2E' }}>Step 2 of 3</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 rounded-full transition-all" style={{ width: '66.66%', backgroundColor: '#2E2E2E' }} />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl mb-2" style={{ color: '#2E2E2E' }}>Connect your social media</h1>
          <p style={{ color: '#575757' }}>This helps us understand your content style (optional)</p>
        </div>

        {/* Social Media Inputs */}
        <div className="space-y-6 mb-8">
          <div>
            <label className="block mb-2 flex items-center gap-2" style={{ color: '#2E2E2E' }}>
              <Twitter className="w-5 h-5" />
              X (Twitter)
            </label>
            <Input
              type="text"
              value={social.twitter}
              onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
              placeholder="@yourusername"
            />
          </div>

          <div>
            <label className="block mb-2 flex items-center gap-2" style={{ color: '#2E2E2E' }}>
              <Instagram className="w-5 h-5" />
              Instagram
            </label>
            <Input
              type="text"
              value={social.instagram}
              onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
              placeholder="@yourusername"
            />
          </div>

          <div>
            <label className="block mb-2 flex items-center gap-2" style={{ color: '#2E2E2E' }}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
              </svg>
              Reddit
            </label>
            <Input
              type="text"
              value={social.reddit}
              onChange={(e) => setSocial({ ...social, reddit: e.target.value })}
              placeholder="u/yourusername"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/onboarding/brands')}
          >
            Back
          </Button>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleSkip}
            >
              Skip
            </Button>
            <Button
              onClick={handleContinue}
              style={{ backgroundColor: '#2E2E2E', color: '#FFFFFF' }}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
