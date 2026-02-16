import { useState } from 'react';
import { Search, Bell } from 'lucide-react';
import { Input } from './ui/input';

export function TopNav() {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div
      className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 border-b z-50"
      style={{ backgroundColor: '#FFFFFF', borderColor: '#C4C4C4' }}
    >
      {/* Left: Logo and Search */}
      <div className="flex items-center gap-6 flex-1">
        <div className="text-xl" style={{ color: '#2E2E2E' }}>
          🍔 <span className="font-semibold">Cheezburger</span>
        </div>
        
        <div className={`transition-all ${searchExpanded ? 'w-96' : 'w-64'}`}>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: '#575757' }}
            />
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setSearchExpanded(true)}
              onBlur={() => setSearchExpanded(false)}
              placeholder="Search content..."
              className="pl-10 h-10"
            />
          </div>
        </div>
      </div>

      {/* Right: Notifications and Profile */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-6 h-6" style={{ color: '#2E2E2E' }} />
          <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        
        <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer hover:ring-2 ring-gray-300 transition-all">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
