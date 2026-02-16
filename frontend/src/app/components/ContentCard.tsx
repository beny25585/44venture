import { useState } from 'react';
import { Clock, Plus } from 'lucide-react';

interface ContentCardProps {
  id: string;
  image: string;
  title: string;
  duration: string;
  claimedBy?: 'bar' | 'etai' | null;
  profileImage?: string;
  profileImageLarge?: string;
  onClick?: () => void;
}

export function ContentCard({
  id,
  image,
  title,
  duration,
  claimedBy = null,
  profileImage,
  profileImageLarge,
  onClick
}: ContentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isClaimedByOther = claimedBy === 'etai';
  const isClaimedByMe = claimedBy === 'bar';
  const isUnclaimed = !claimedBy;

  const getCursorStyle = () => {
    if (isClaimedByOther) return 'cursor-not-allowed';
    return 'cursor-pointer';
  };

  return (
    <div
      className={`relative bg-card rounded-[var(--radius)] overflow-hidden transition-all duration-200 ease-out ${getCursorStyle()}`}
      style={{
        boxShadow: isHovered && !isClaimedByOther 
          ? '0px 8px 16px rgba(0, 0, 0, 0.15)' 
          : 'var(--shadow-elevation-sm)',
        transform: isHovered && isUnclaimed ? 'translateY(-4px)' : 'translateY(0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={isClaimedByOther ? undefined : onClick}
    >
      {/* Background Image */}
      <div className="relative w-full aspect-[244/305]">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Title and Duration Overlay */}
        <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/80 to-transparent p-4">
          <div className="flex flex-col gap-2">
            <h3 
              className="text-white leading-tight max-w-[175px]"
              style={{
                fontSize: 'var(--text-h3)',
                fontFamily: 'var(--font-family-heading)',
                fontWeight: 'var(--font-weight-bold)'
              }}
            >
              {title}
            </h3>
            <div className="inline-flex items-center gap-1 bg-white rounded-full px-2.5 py-0.5 w-fit">
              <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span 
                style={{
                  fontSize: 'var(--text-label)',
                  fontFamily: 'var(--font-family-body)',
                  lineHeight: '20px'
                }}
              >
                {duration}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Sticker - Small (Static) */}
        {(isClaimedByOther || isClaimedByMe) && profileImage && !isHovered && (
          <div 
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full overflow-hidden"
            style={{ boxShadow: '0px 0px 0px 2px white' }}
          >
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Unclaimed - Hover Overlay with Plus Icon */}
        {isUnclaimed && isHovered && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-200">
            <div className="bg-primary rounded-full p-3 shadow-lg">
              <Plus className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
            </div>
          </div>
        )}

        {/* Claimed by Other - Hover Overlay (Middle Finger Pose) */}
        {isClaimedByOther && isHovered && profileImageLarge && (
          <div className="absolute inset-0 bg-black/[0.51] flex flex-col items-center justify-center transition-all duration-200">
            <div 
              className="w-[206px] h-[325px] mb-4 rounded-lg overflow-hidden"
              style={{ boxShadow: '0px 0px 0px 2px white' }}
            >
              <img
                src={profileImageLarge}
                alt="Claimed by Etai"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Claimed Badge */}
            <div className="relative">
              <svg width="271" height="89" viewBox="0 0 271 89" fill="none">
                <circle cx="65" cy="44" r="5.5" fill="#FDBB30" />
                <text x="85" y="55" fill="black" fontSize="32" fontWeight="bold" fontFamily="var(--font-family-heading)">
                  Claimed
                </text>
              </svg>
            </div>
          </div>
        )}

        {/* Claimed by Me - Hover Overlay (Heart Hands Pose) */}
        {isClaimedByMe && isHovered && profileImageLarge && (
          <div className="absolute inset-0 bg-black/[0.51] flex flex-col items-center justify-center transition-all duration-200">
            <div 
              className="w-[206px] h-[296px] mb-4 rounded-lg overflow-hidden"
              style={{ boxShadow: '0px 0px 0px 2px white' }}
            >
              <img
                src={profileImageLarge}
                alt="Claimed by you"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Claimed Badge */}
            <div className="relative">
              <svg width="271" height="89" viewBox="0 0 271 89" fill="none">
                <circle cx="65" cy="44" r="5.5" fill="#FDBB30" />
                <text x="85" y="55" fill="black" fontSize="32" fontWeight="bold" fontFamily="var(--font-family-heading)">
                  Claimed
                </text>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}