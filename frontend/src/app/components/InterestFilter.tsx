import { useState } from 'react';

interface InterestFilterProps {
  interests: string[];
}

export function InterestFilter({ interests }: InterestFilterProps) {
  const [selectedInterest, setSelectedInterest] = useState(interests[0]);

  return (
    <div className="flex gap-2 items-center overflow-x-auto">
      {interests.map((interest) => {
        const isSelected = selectedInterest === interest;
        return (
          <button
            key={interest}
            onClick={() => setSelectedInterest(interest)}
            className="px-4 py-2 rounded-full border-2 transition-all duration-200 ease-out whitespace-nowrap shrink-0"
            style={{
              backgroundColor: isSelected ? 'var(--primary)' : 'var(--background)',
              borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
              color: isSelected ? 'var(--primary-foreground)' : 'var(--foreground)',
              boxShadow: isSelected ? '0px 4px 6px 0px rgba(0,0,0,0.1), 0px 2px 4px 0px rgba(0,0,0,0.1)' : 'none',
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-family-body)',
              fontWeight: isSelected ? 'var(--font-weight-bold)' : 'var(--font-weight-normal)',
              lineHeight: '24px'
            }}
          >
            {interest}
          </button>
        );
      })}
    </div>
  );
}