import { Outlet } from 'react-router';
import { TopNav } from './TopNav';
import { LeftSidebar } from './LeftSidebar';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <div className="flex">
        <LeftSidebar />
        <main className="flex-1 ml-20 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
