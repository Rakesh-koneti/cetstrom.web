import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Flag to track connection status
let isSupabaseConnected = false;

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'x-application-name': 'cetstroam'
    }
  }
});

// Check if Supabase is connected
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    // Try to ping the Supabase health endpoint
    const { error } = await supabase.rpc('authenticate_admin', {
      email_input: 'test@example.com',
      password_input: 'wrong_password'
    });

    // Even if authentication fails, if we get a response without a network error,
    // it means the connection is working
    isSupabaseConnected = !error || (error && !error.message?.includes('network') && !error.message?.includes('fetch'));
    console.log('Supabase connection check result:', isSupabaseConnected);
    return isSupabaseConnected;
  } catch (error) {
    console.error('Supabase connection check failed:', error);
    isSupabaseConnected = false;
    return false;
  }
};

// Initialize connection check
checkSupabaseConnection().then(connected => {
  console.log(`Supabase connection ${connected ? 'successful' : 'failed'}`);
});

// Offline data sync helper
export const syncData = async <T extends object>(
  tableName: string,
  offlineData: T[],
  primaryKey: keyof T
): Promise<void> => {
  try {
    // Batch process offline data
    const batchSize = 50;
    for (let i = 0; i < offlineData.length; i += batchSize) {
      const batch = offlineData.slice(i, i + batchSize);

      // Upsert data with retry mechanism
      let retries = 3;
      while (retries > 0) {
        try {
          const { error } = await supabase
            .from(tableName)
            .upsert(batch, { onConflict: primaryKey as string });

          if (error) throw error;
          break;
        } catch (err) {
          retries--;
          if (retries === 0) throw err;
          await new Promise(resolve => setTimeout(resolve, 1000 * (4 - retries)));
        }
      }
    }
  } catch (error) {
    console.error(`Error syncing ${tableName}:`, error);
    // Store failed sync attempts for retry
    const failedSyncs = JSON.parse(localStorage.getItem('failedSyncs') || '[]');
    failedSyncs.push({
      tableName,
      data: offlineData,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('failedSyncs', JSON.stringify(failedSyncs));
  }
};

// Fetch data with offline support
export async function fetchDataWithOfflineSupport<T>(tableName: string, query: any): Promise<T[]> {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select(query);

    if (error) throw error;

    // Cache the fetched data
    localStorage.setItem(`${tableName}_cache`, JSON.stringify(data));
    return data as T[];
  } catch (error) {
    console.warn(`Error fetching ${tableName}, using cached data:`, error);
    // Return cached data if available
    const cachedData = localStorage.getItem(`${tableName}_cache`);
    return cachedData ? JSON.parse(cachedData) : [];
  }
};