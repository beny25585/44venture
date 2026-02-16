import { useState } from 'react';
import { Home, User, Calendar, Users, Settings } from 'lucide-react';
import { InterestFilter } from './components/InterestFilter';
import { MasonryGrid } from './components/MasonryGrid';
import { TopicDetailPage } from './components/TopicDetailPage';
const imgImageProfile = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop";

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const interests = ['Celebs', 'TV', 'Films', 'Music', 'Sports', 'Harry Potter'];

  const mockTopic = {
    id: '1',
    title: 'New Meme Format Takes Over Internet',
    description: 'A hilarious new meme format featuring dogs opening fridges has gone viral across social media platforms.',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800',
    category: 'Memebase',
    sources: [
      'https://knowyourmeme.com/memes/dog-fridge',
      'https://twitter.com/trending/dogmemes'
    ]
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <aside
        className="fixed left-0 top-0 h-full w-20 flex flex-col items-center py-6 z-30"
        style={{
          backgroundColor: 'var(--sidebar)',
          borderRight: '1px solid var(--sidebar-border)'
        }}
      >
        {/* Logo */}
        <div className="mb-8">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            <span 
              className="text-2xl"
              style={{ 
                fontFamily: 'var(--font-family-heading)',
                fontWeight: 'var(--font-weight-bold)'
              }}
            >
              🍔
            </span>
          </div>
        </div>

        {/* Navigation Icons */}
        <nav className="flex-1 flex flex-col gap-4">
          <button
            className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)'
            }}
          >
            <Home className="w-6 h-6" />
          </button>
          
          <button className="w-12 h-12 rounded-lg flex items-center justify-center hover:bg-muted transition-all duration-200">
            <User className="w-6 h-6" style={{ color: 'var(--muted-foreground)' }} />
          </button>
          
          <button className="w-12 h-12 rounded-lg flex items-center justify-center hover:bg-muted transition-all duration-200">
            <Calendar className="w-6 h-6" style={{ color: 'var(--muted-foreground)' }} />
          </button>
          
          <button className="w-12 h-12 rounded-lg flex items-center justify-center hover:bg-muted transition-all duration-200">
            <Users className="w-6 h-6" style={{ color: 'var(--muted-foreground)' }} />
          </button>
        </nav>

        {/* Settings at Bottom */}
        <button className="w-12 h-12 rounded-lg flex items-center justify-center hover:bg-muted transition-all duration-200">
          <Settings className="w-6 h-6" style={{ color: 'var(--muted-foreground)' }} />
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-20">
        {/* Top Navigation Bar */}
        <header
          className="fixed top-0 right-0 h-16 flex items-center justify-between px-6 z-20"
          style={{
            backgroundColor: 'var(--background)',
            borderBottom: '1px solid var(--border)',
            left: '80px'
          }}
        >
          {/* Logo Text */}
          <div className="flex items-center gap-2">
            <span
              style={{
                fontSize: 'var(--text-h2)',
                fontFamily: 'var(--font-family-heading)',
                fontWeight: 'var(--font-weight-bold)'
              }}
            >
              Cheezburger
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <input
              type="text"
              placeholder="Search content..."
              className="w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--input-background)',
                fontSize: 'var(--text-base)',
                fontFamily: 'var(--font-family-body)'
              }}
            />
          </div>

          {/* Profile and Notifications */}
          <div className="flex items-center gap-4">
            <button className="relative">
              <div className="w-3 h-3 rounded-full absolute -top-1 -right-1 z-10"
                style={{ backgroundColor: '#EF4444' }}
              />
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={imgImageProfile}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="pt-24 p-6">
          <div className="flex flex-col gap-6">
            {/* Interest Filter Pills */}
            <InterestFilter interests={interests} />
            
            {/* Masonry Grid */}
            <MasonryGrid onCardClick={() => setSelectedTopic(mockTopic)} />
          </div>
        </main>
      </div>

      {/* Topic Detail Page */}
      <TopicDetailPage
        isOpen={!!selectedTopic}
        onClose={() => setSelectedTopic(null)}
        topic={selectedTopic || mockTopic}
      />
    </div>
  );
}
