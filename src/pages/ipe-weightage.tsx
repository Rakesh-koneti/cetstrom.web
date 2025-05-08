import { IPEWeightage } from '../components/IPEWeightage';
import { ThemeProvider } from '../lib/theme-context';

export function IPEWeightagePage() {
  return (
    <ThemeProvider>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <IPEWeightage />
      </div>
    </ThemeProvider>
  );
} 