import { Outlet } from 'react-router-dom';
import { Navbar } from './navbar';
import { useTheme } from '../lib/theme-context';

export function Layout() {
  const { theme } = useTheme();
  
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950">
        {/* Background decoration */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          {/* Large decorative blobs */}
          <div className="absolute -top-48 -left-48 w-96 h-96 bg-orange-400/30 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
          
          {/* Medium decorative blobs */}
          <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-red-400/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-lime-400/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }} />
          
          {/* Small decorative blobs */}
          <div className="absolute top-1/6 left-1/6 w-24 h-24 bg-rose-400/30 rounded-full blur-xl animate-float" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-1/6 right-1/6 w-24 h-24 bg-teal-400/30 rounded-full blur-xl animate-float" style={{ animationDelay: '2.5s' }} />
          <div className="absolute top-3/4 right-1/3 w-24 h-24 bg-emerald-400/30 rounded-full blur-xl animate-float" style={{ animationDelay: '3.5s' }} />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="animate-fade-in">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}