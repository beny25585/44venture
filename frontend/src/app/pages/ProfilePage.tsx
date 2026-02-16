import { useState } from 'react';
import Masonry from 'react-responsive-masonry';
import { Checkbox } from '../components/ui/checkbox';
import { liveContent, weeklyTopics } from '../data/mockData';

export function ProfilePage() {
  const [completedWeeklies, setCompletedWeeklies] = useState<string[]>([]);

  // Mock claimed content
  const claimedContent = liveContent.filter(item => item.claimed);

  // Flatten weekly topics
  const pendingWeeklies = Object.values(weeklyTopics).flat();

  const toggleComplete = (weeklyId: string) => {
    setCompletedWeeklies(prev =>
      prev.includes(weeklyId)
        ? prev.filter(id => id !== weeklyId)
        : [...prev, weeklyId]
    );
  };

  return (
    <div className="p-6">
      {/* Profile Header */}
      <div className="mb-8 flex items-center gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
            alt="Your Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl mb-2" style={{ color: '#2E2E2E' }}>Your Profile</h1>
          <p style={{ color: '#575757' }}>Track your claimed topics and weekly assignments</p>
        </div>
      </div>

      {/* Claimed Topics Section */}
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl mb-2" style={{ color: '#2E2E2E' }}>Claimed Topics</h2>
          <p style={{ color: '#575757' }}>Content you've claimed from the live feed ({claimedContent.length})</p>
        </div>
        
        <Masonry columnsCount={4} gutter="16px">
          {claimedContent.map(content => (
            <div
              key={content.id}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
            >
              <img
                src={content.image}
                alt={content.title}
                className="w-full h-auto object-cover"
              />
              <div className="p-4">
                <h3 className="text-sm mb-2" style={{ color: '#2E2E2E' }}>{content.title}</h3>
                <div className="flex items-center gap-2 text-xs" style={{ color: '#575757' }}>
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img
                      src={content.claimedBy.avatar}
                      alt={content.claimedBy.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>Claimed by {content.claimedBy.name}</span>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </div>

      {/* Pending Weeklies Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl mb-2" style={{ color: '#2E2E2E' }}>Pending Weeklies</h2>
          <p style={{ color: '#575757' }}>
            Your assigned weekly content ({pendingWeeklies.length - completedWeeklies.length} pending)
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pendingWeeklies.map(weekly => {
            const isCompleted = completedWeeklies.includes(weekly.id);
            return (
              <div
                key={weekly.id}
                className={`rounded-lg overflow-hidden border-2 transition-all ${
                  isCompleted ? 'opacity-60' : 'hover:shadow-lg'
                }`}
                style={{ borderColor: isCompleted ? '#C4C4C4' : '#2E2E2E' }}
              >
                <div className="relative">
                  <img
                    src={weekly.image}
                    alt={weekly.title}
                    className="w-full h-32 object-cover"
                  />
                  {isCompleted && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={isCompleted}
                      onCheckedChange={() => toggleComplete(weekly.id)}
                    />
                    <div className="flex-1">
                      <h3 className={`text-sm mb-1 ${isCompleted ? 'line-through' : ''}`} style={{ color: '#2E2E2E' }}>
                        {weekly.title}
                      </h3>
                      <p className="text-xs" style={{ color: '#575757' }}>
                        {weekly.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
