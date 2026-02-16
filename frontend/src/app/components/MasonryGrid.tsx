import { ContentCard } from './ContentCard';
const imgImageDogLearnsToOpenFridgeChaosEnsues = "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=600&fit=crop";
const imgImageDogLearnsToOpenFridgeChaosEnsues1 = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&h=600&fit=crop";
const imgImageDogLearnsToOpenFridgeChaosEnsues2 = "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=500&h=600&fit=crop";
const imgImageDogLearnsToOpenFridgeChaosEnsues3 = "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=500&h=600&fit=crop";
const imgImageDogLearnsToOpenFridgeChaosEnsues4 = "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&h=600&fit=crop";
const imgImageMikeChen = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop";
const imgImageMikeChen1 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop";
const imgWhatsAppImage20260215At1703561 = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop";
const imgWhatsAppImage20260215At1520342 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop";

interface MasonryGridProps {
  onCardClick?: () => void;
}

const mockContentCards = [
  {
    id: '1',
    image: imgImageDogLearnsToOpenFridgeChaosEnsues,
    title: 'Dog Learns to Open Fridge, Chaos Ensues',
    duration: '5 MIN',
    claimedBy: 'bar' as const,
    profileImage: imgImageMikeChen,
    profileImageLarge: imgWhatsAppImage20260215At1703561
  },
  {
    id: '2',
    image: imgImageDogLearnsToOpenFridgeChaosEnsues1,
    title: 'Dog Learns to Open Fridge, Chaos Ensues',
    duration: '5 MIN',
    claimedBy: null,
    profileImage: undefined,
    profileImageLarge: undefined
  },
  {
    id: '3',
    image: imgImageDogLearnsToOpenFridgeChaosEnsues2,
    title: 'Dog Learns to Open Fridge, Chaos Ensues',
    duration: '5 MIN',
    claimedBy: 'etai' as const,
    profileImage: imgImageMikeChen1,
    profileImageLarge: imgWhatsAppImage20260215At1520342
  },
  {
    id: '4',
    image: imgImageDogLearnsToOpenFridgeChaosEnsues3,
    title: 'Dog Learns to Open Fridge, Chaos Ensues',
    duration: '5 MIN',
    claimedBy: null,
    profileImage: undefined,
    profileImageLarge: undefined
  },
  {
    id: '5',
    image: imgImageDogLearnsToOpenFridgeChaosEnsues4,
    title: 'Dog Learns to Open Fridge, Chaos Ensues',
    duration: '5 MIN',
    claimedBy: null,
    profileImage: undefined,
    profileImageLarge: undefined
  },
  {
    id: '6',
    image: imgImageDogLearnsToOpenFridgeChaosEnsues,
    title: 'Dog Learns to Open Fridge, Chaos Ensues',
    duration: '5 MIN',
    claimedBy: 'etai' as const,
    profileImage: imgImageMikeChen1,
    profileImageLarge: imgWhatsAppImage20260215At1520342
  },
  {
    id: '7',
    image: imgImageDogLearnsToOpenFridgeChaosEnsues1,
    title: 'Dog Learns to Open Fridge, Chaos Ensues',
    duration: '5 MIN',
    claimedBy: null,
    profileImage: undefined,
    profileImageLarge: undefined
  },
  {
    id: '8',
    image: imgImageDogLearnsToOpenFridgeChaosEnsues2,
    title: 'Dog Learns to Open Fridge, Chaos Ensues',
    duration: '5 MIN',
    claimedBy: null,
    profileImage: undefined,
    profileImageLarge: undefined
  },
  {
    id: '9',
    image: imgImageDogLearnsToOpenFridgeChaosEnsues3,
    title: 'Dog Learns to Open Fridge, Chaos Ensues',
    duration: '5 MIN',
    claimedBy: 'bar' as const,
    profileImage: imgImageMikeChen,
    profileImageLarge: imgWhatsAppImage20260215At1703561
  }
];

export function MasonryGrid({ onCardClick }: MasonryGridProps) {
  return (
    <div className="grid grid-cols-3 gap-4 auto-rows-max">
      {mockContentCards.map((card, index) => (
        <div 
          key={card.id} 
          style={{
            gridRow: index === 0 || index === 5 ? 'span 1' : 'span 1'
          }}
        >
          <ContentCard
            {...card}
            onClick={() => {
              console.log('Card clicked:', card.id);
              if (onCardClick) {
                onCardClick();
              }
            }}
          />
        </div>
      ))}
    </div>
  );
}