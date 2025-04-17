import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './lib/theme-context';
import { Navbar } from './components/navbar';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Router>
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)]">
            <AppRoutes />
          </main>
        </Router>
      </div>
    </ThemeProvider>
  );
}