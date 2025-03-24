import { supabase } from '../lib/supabase';
import { Stream } from '../lib/types';

export interface StreamWithSubjects {
  id: string;
  title: string;
  description: string;
  icon: string;
  subjects: {
    id: string;
    name: string;
    icon: string;
  }[];
}

/**
 * Service for managing streams and subjects in the database
 */
export const StreamService = {
  /**
   * Get all streams with their subjects
   */
  async getStreams(): Promise<StreamWithSubjects[]> {
    try {
      const { data, error } = await supabase
        .from('streams')
        .select(`
          id,
          title,
          description,
          icon
        `);

      if (error) {
        throw error;
      }

      // Get subjects for each stream
      const streamsWithSubjects = await Promise.all(
        (data || []).map(async (stream) => {
          const { data: subjectData, error: subjectError } = await supabase
            .from('subjects')
            .select(`
              id,
              name,
              icon
            `)
            .eq('stream_id', stream.id);

          if (subjectError) {
            console.error('Error fetching subjects:', subjectError);
            return null;
          }

          return {
            id: stream.id,
            title: stream.title,
            description: stream.description,
            icon: stream.icon,
            subjects: subjectData || []
          };
        })
      );

      // Filter out any null streams (from errors)
      return streamsWithSubjects.filter(Boolean) as StreamWithSubjects[];
    } catch (error) {
      console.error('Error in getStreams:', error);

      // Return hardcoded data as fallback
      return [
        {
          id: 'engineering',
          title: 'Engineering',
          description: 'Practice tests for engineering entrance and competitive exams',
          icon: 'Brain',
          subjects: [
            { id: 'mathematics', name: 'Mathematics', icon: 'Calculator' },
            { id: 'physics', name: 'Physics', icon: 'Atom' },
            { id: 'chemistry', name: 'Chemistry', icon: 'TestTube' }
          ]
        },
        {
          id: 'pharmacy',
          title: 'Pharmacy',
          description: 'Practice tests for pharmacy entrance and professional exams',
          icon: 'Beaker',
          subjects: [
            { id: 'biology', name: 'Biology', icon: 'Microscope' },
            { id: 'physics', name: 'Physics', icon: 'Atom' },
            { id: 'chemistry', name: 'Chemistry', icon: 'TestTube' }
          ]
        }
      ];
    }
  },

  /**
   * Get a single stream with its subjects
   */
  async getStreamById(id: string): Promise<StreamWithSubjects | null> {
    try {
      const { data, error } = await supabase
        .from('streams')
        .select(`
          id,
          title,
          description,
          icon
        `)
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      // Get subjects for this stream
      const { data: subjectData, error: subjectError } = await supabase
        .from('subjects')
        .select(`
          id,
          name,
          icon
        `)
        .eq('stream_id', id);

      if (subjectError) {
        throw subjectError;
      }

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        icon: data.icon,
        subjects: subjectData || []
      };
    } catch (error) {
      console.error('Error in getStreamById:', error);

      // Return hardcoded data as fallback
      const streams = [
        {
          id: 'engineering',
          title: 'Engineering',
          description: 'Practice tests for engineering entrance and competitive exams',
          icon: 'Brain',
          subjects: [
            { id: 'mathematics', name: 'Mathematics', icon: 'Calculator' },
            { id: 'physics', name: 'Physics', icon: 'Atom' },
            { id: 'chemistry', name: 'Chemistry', icon: 'TestTube' }
          ]
        },
        {
          id: 'pharmacy',
          title: 'Pharmacy',
          description: 'Practice tests for pharmacy entrance and professional exams',
          icon: 'Beaker',
          subjects: [
            { id: 'biology', name: 'Biology', icon: 'Microscope' },
            { id: 'physics', name: 'Physics', icon: 'Atom' },
            { id: 'chemistry', name: 'Chemistry', icon: 'TestTube' }
          ]
        }
      ];

      return streams.find(s => s.id === id) || null;
    }
  }
};
