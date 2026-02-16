import { useState } from 'react';
import { weeklyTopics } from '../data/mockData';
import { WeeklyDetailView } from '../components/WeeklyDetailView';

const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function WeeklyPage() {
  const [selectedTopic, setSelectedTopic] = useState<any>(null);

  return (
    <div className="p-6">
      {selectedTopic ? (
        <WeeklyDetailView topic={selectedTopic} onBack={() => setSelectedTopic(null)} />
      ) : (
        <>
          <div className="mb-6">
            <h1 className="text-3xl mb-2" style={{ color: '#2E2E2E' }}>Weekly Content Calendar</h1>
            <p style={{ color: '#575757' }}>Plan and organize your weekly content topics</p>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-4">
            {daysOfWeek.map((day, index) => (
              <div key={day} className="min-h-96">
                {/* Day Header */}
                <div
                  className="p-3 rounded-t-lg border-b-2 text-center"
                  style={{
                    backgroundColor: '#F5F5F5',
                    borderColor: '#2E2E2E',
                    color: '#2E2E2E',
                  }}
                >
                  <h3>{dayLabels[index]}</h3>
                </div>

                {/* Topics List */}
                <div className="border border-t-0 rounded-b-lg p-3 space-y-3 min-h-80" style={{ borderColor: '#C4C4C4' }}>
                  {weeklyTopics[day as keyof typeof weeklyTopics]?.map((topic: any) => (
                    <div
                      key={topic.id}
                      className="cursor-pointer rounded-lg overflow-hidden hover:shadow-lg transition-all border"
                      style={{ borderColor: '#C4C4C4' }}
                      onClick={() => setSelectedTopic(topic)}
                    >
                      <img
                        src={topic.image}
                        alt={topic.title}
                        className="w-full h-24 object-cover"
                      />
                      <div className="p-3">
                        <h4 className="text-sm mb-1 line-clamp-2" style={{ color: '#2E2E2E' }}>
                          {topic.title}
                        </h4>
                        <p className="text-xs line-clamp-2" style={{ color: '#575757' }}>
                          {topic.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
