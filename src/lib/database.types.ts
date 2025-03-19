export interface Database {
  public: {
    Tables: {
      exams: {
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
          created_at?: string
          updated_at?: string
        }
      }
      exam_results: {
        Row: {
          id: string
          exam_id: string
          user_id: string
          score: number
          completed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          exam_id: string
          user_id: string
          score: number
          completed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          exam_id?: string
          user_id?: string
          score?: number
          completed_at?: string
          created_at?: string
        }
      }
    }
  }
}