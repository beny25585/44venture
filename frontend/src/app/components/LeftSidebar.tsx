import { useNavigate, useLocation } from 'react-router';
import { Home, Calendar, User, Users, Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export function LeftSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Live Page', path: '/app' },
    { icon: Calendar, label: 'Weeklies', path: '/app/weekly' },
    { icon: User, label: 'Profile', path: '/app/profile' },
    { icon: Users, label: 'Community', path: '/app/community' },
  ];

  const isActive = (path: string) => {
    if (path === '/app') {
      return location.pathname === '/app';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className="fixed left-0 top-16 bottom-0 w-20 flex flex-col items-center py-6 border-r"
      style={{ backgroundColor: '#FFFFFF', borderColor: '#C4C4C4' }}
    >
      <TooltipProvider>
        <div className="flex flex-col gap-4 flex-1">
          {navItems.map(({ icon: Icon, label, path }) => (
            <Tooltip key={path}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => navigate(path)}
                  className={`w-12 h-12 flex items-center justify-center rounded-lg transition-all ${
                    isActive(path)
                      ? 'shadow-md'
                      : 'hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: isActive(path) ? '#2E2E2E' : 'transparent',
                    color: isActive(path) ? '#FFFFFF' : '#575757',
                  }}
                >
                  <Icon className="w-6 h-6" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Settings at bottom */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-all"
              style={{ color: '#575757' }}
            >
              <Settings className="w-6 h-6" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
