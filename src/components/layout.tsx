import { Outlet } from 'react-router-dom';
import { Navbar } from './navbar';
import { useTheme } from '../lib/theme-context';

export function Layout() {
  const { theme } = useTheme();
  
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <main className="pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}