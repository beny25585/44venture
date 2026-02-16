import { useState } from 'react';
import { Search } from 'lucide-react';
import Masonry from 'react-responsive-masonry';
import { Input } from '../components/ui/input';
import { ContentCard } from '../components/ContentCard';
import { RightDrawer } from '../components/RightDrawer';
import { SlackDrawer } from '../components/SlackDrawer';
import { liveContent, brands } from '../data/mockData';

export function LivePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [slackConversation, setSlackConversation] = useState<any>(null);

  const filteredContent = liveContent.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedBoard || item.category === selectedBoard)
  );

  const handleCardClick = (content: any) => {
    if (content.claimed) {
      return; // Claimed cards do nothing on click
    }
    setSelectedContent(content);
    setSlackConversation(null);
  };

  const handleProfileClick = (content: any) => {
    setSlackConversation(content);
    setSelectedContent(null);
  };

  const handleClaim = (contentId: string) => {
    // In a real app, this would update the backend
    setSelectedContent(null);
  };

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#575757' }} />
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search live content..."
          className="pl-10 h-12 text-lg"
        />
      </div>

      {/* Board Icons */}
      <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedBoard(null)}
          className={`flex-shrink-0 px-4 py-2 rounded-full border-2 transition-all ${
            !selectedBoard ? 'shadow-md' : 'hover:shadow-sm'
          }`}
          style={{
            borderColor: !selectedBoard ? '#2E2E2E' : '#C4C4C4',
            backgroundColor: !selectedBoard ? '#2E2E2E' : 'white',
            color: !selectedBoard ? '#FFFFFF' : '#2E2E2E',
          }}
        >
          All
        </button>
        {brands.map(brand => (
          <button
            key={brand.id}
            onClick={() => setSelectedBoard(brand.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full border-2 transition-all ${
              selectedBoard === brand.id ? 'shadow-md' : 'hover:shadow-sm'
            }`}
            style={{
              borderColor: selectedBoard === brand.id ? brand.color : '#C4C4C4',
              backgroundColor: selectedBoard === brand.id ? brand.color : 'white',
              color: selectedBoard === brand.id ? '#FFFFFF' : '#2E2E2E',
            }}
          >
            {brand.name}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <Masonry columnsCount={4} gutter="16px">
        {filteredContent.map(content => (
          <ContentCard
            key={content.id}
            content={content}
            onClick={() => handleCardClick(content)}
            onProfileClick={() => handleProfileClick(content)}
          />
        ))}
      </Masonry>

      {/* Right Drawer for Unclaimed Content */}
      {selectedContent && (
        <RightDrawer
          content={selectedContent}
          onClose={() => setSelectedContent(null)}
          onClaim={handleClaim}
        />
      )}

      {/* Slack Drawer for Claimed Content */}
      {slackConversation && (
        <SlackDrawer
          content={slackConversation}
          onClose={() => setSlackConversation(null)}
        />
      )}
    </div>
  );
}
