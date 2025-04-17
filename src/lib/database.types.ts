export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tests: {
        Row: {
          id: string
          title: string
          description: string
          stream: string
          subject: string
          difficulty: 'easy' | 'medium' | 'hard'
          duration: number
          total_marks: number
          status: 'draft' | 'scheduled' | 'active' | 'completed'
          is_previous_year: boolean
          year: number | null
          created_by: string | null
          category: string
          scheduled_date: string
          reminder_before: number
          notifications_enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          stream: string
          subject: string
          difficulty: 'easy' | 'medium' | 'hard'
          duration: number
          total_marks: number
          status?: 'draft' | 'scheduled' | 'active' | 'completed'
          is_previous_year?: boolean
          year?: number | null
          created_by?: string | null
          category?: string
          scheduled_date?: string
          reminder_before?: number
          notifications_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          stream?: string
          subject?: string
          difficulty?: 'easy' | 'medium' | 'hard'
          duration?: number
          total_marks?: number
          status?: 'draft' | 'scheduled' | 'active' | 'completed'
          is_previous_year?: boolean
          year?: number | null
          created_by?: string | null
          category?: string
          scheduled_date?: string
          reminder_before?: number
          notifications_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      test_results: {
        Row: {
          id: string
          test_id: string
          user_id: string
          score: number
          answers: Record<string, any>
          completed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          test_id: string
          user_id: string
          score: number
          answers: Record<string, any>
          completed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          test_id?: string
          user_id?: string
          score?: number
          answers?: Record<string, any>
          completed_at?: string
          created_at?: string
        }
      }
      sections: {
        Row: {
          id: string
          name: string
          instructions: string | null
          subject: string | null
          negative_marking: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          instructions?: string | null
          subject?: string | null
          negative_marking?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          instructions?: string | null
          subject?: string | null
          negative_marking?: number
          created_at?: string
          updated_at?: string
        }
      }
      test_sections: {
        Row: {
          id: string
          test_id: string
          section_id: string
          section_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          test_id: string
          section_id: string
          section_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          test_id?: string
          section_id?: string
          section_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          test_id: string | null
          section_id: string | null
          question_text: string
          question_type: string
          options: string[]
          correct_answer: string
          marks: number
          explanation: string | null
          difficulty: string
          topic: string | null
          weightage: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          test_id?: string | null
          section_id?: string | null
          question_text: string
          question_type: string
          options: string[]
          correct_answer: string
          marks: number
          explanation?: string | null
          difficulty?: string
          topic?: string | null
          weightage?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          test_id?: string | null
          section_id?: string | null
          question_text?: string
          question_type?: string
          options?: string[]
          correct_answer?: string
          marks?: number
          explanation?: string | null
          difficulty?: string
          topic?: string | null
          weightage?: number
          created_at?: string
          updated_at?: string
        }
      }
      marking_schemes: {
        Row: {
          id: string
          test_id: string
          default_weightage: number
          default_negative_marking: number
          passing_percentage: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          test_id: string
          default_weightage?: number
          default_negative_marking?: number
          passing_percentage?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          test_id?: string
          default_weightage?: number
          default_negative_marking?: number
          passing_percentage?: number
          created_at?: string
          updated_at?: string
        }
      }
      streams: {
        Row: {
          id: string
          title: string
          description: string | null
          icon: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          title: string
          description?: string | null
          icon?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          icon?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subjects: {
        Row: {
          id: string
          stream_id: string
          name: string
          icon: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          stream_id: string
          name: string
          icon?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          stream_id?: string
          name?: string
          icon?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          email: string
          password_hash: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          created_at?: string
          updated_at?: string
        }
      }
      auth_logs: {
        Row: {
          id: string
          email: string
          action: string
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          action: string
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          action?: string
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
      mock_tests: {
        Row: {
          id: string
          title: string
          description: string
          duration: number
          questions_count: number
          difficulty: 'Easy' | 'Medium' | 'Hard'
          subject: string
          stream: 'Engineering' | 'Pharmacy'
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          duration: number
          questions_count: number
          difficulty: 'Easy' | 'Medium' | 'Hard'
          subject: string
          stream: 'Engineering' | 'Pharmacy'
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          duration?: number
          questions_count?: number
          difficulty?: 'Easy' | 'Medium' | 'Hard'
          subject?: string
          stream?: 'Engineering' | 'Pharmacy'
          created_at?: string
        }
      }
    }
    Functions: {
      verify_admin_password: {
        Args: {
          email_input: string
          password_input: string
        }
        Returns: boolean
      }
    }
  }
}