export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      albums: {
        Row: {
          album_url: string
          created_at: string
          id: number
          release_date: string | null
          title: string
          updated_at: string
          user_id: string
          uuid: string
        }
        Insert: {
          album_url: string
          created_at?: string
          id?: number
          release_date?: string | null
          title: string
          updated_at?: string
          user_id: string
          uuid?: string
        }
        Update: {
          album_url?: string
          created_at?: string
          id?: number
          release_date?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "albums_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      albums_genres: {
        Row: {
          album_id: number | null
          created_at: string
          genre_id: number | null
          id: number
          updated_at: string
        }
        Insert: {
          album_id?: number | null
          created_at?: string
          genre_id?: number | null
          id?: number
          updated_at?: string
        }
        Update: {
          album_id?: number | null
          created_at?: string
          genre_id?: number | null
          id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "albums_genres_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "albums_genres_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genres"
            referencedColumns: ["id"]
          },
        ]
      }
      genres: {
        Row: {
          created_at: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount: number | null
          created_at: string
          currency: string | null
          date: string | null
          id: number
          paid_time: string | null
          product_description: string | null
          product_id: string | null
          product_name: string | null
          status: Database["public"]["Enums"]["order_status_type"] | null
          stripe_customer_id: string | null
          trade_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          currency?: string | null
          date?: string | null
          id?: number
          paid_time?: string | null
          product_description?: string | null
          product_id?: string | null
          product_name?: string | null
          status?: Database["public"]["Enums"]["order_status_type"] | null
          stripe_customer_id?: string | null
          trade_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          currency?: string | null
          date?: string | null
          id?: number
          paid_time?: string | null
          product_description?: string | null
          product_id?: string | null
          product_name?: string | null
          status?: Database["public"]["Enums"]["order_status_type"] | null
          stripe_customer_id?: string | null
          trade_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      songs: {
        Row: {
          album_id: number | null
          audio_url: string | null
          created_at: string
          duration: number | null
          id: string
          image_url: string | null
          is_private: boolean
          model_name: string | null
          prompt: string | null
          status: string | null
          tags: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          album_id?: number | null
          audio_url?: string | null
          created_at?: string
          duration?: number | null
          id: string
          image_url?: string | null
          is_private?: boolean
          model_name?: string | null
          prompt?: string | null
          status?: string | null
          tags?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          album_id?: number | null
          audio_url?: string | null
          created_at?: string
          duration?: number | null
          id?: string
          image_url?: string | null
          is_private?: boolean
          model_name?: string | null
          prompt?: string | null
          status?: string | null
          tags?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "songs_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "songs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      songs_genres: {
        Row: {
          created_at: string
          genre_id: number | null
          id: number
          song_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          genre_id?: number | null
          id?: number
          song_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          genre_id?: number | null
          id?: number
          song_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "songs_genres_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "songs_genres_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "distinct_songs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "songs_genres_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "songs"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          id: string
          paid_amount: number | null
          plan_expire_at: string | null
          plan_limit: number | null
          plan_type: number | null
          plan_used: number | null
          stripe_customer_id: string | null
          today_used: number | null
          total_used: number | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id: string
          paid_amount?: number | null
          plan_expire_at?: string | null
          plan_limit?: number | null
          plan_type?: number | null
          plan_used?: number | null
          stripe_customer_id?: string | null
          today_used?: number | null
          total_used?: number | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          paid_amount?: number | null
          plan_expire_at?: string | null
          plan_limit?: number | null
          plan_type?: number | null
          plan_used?: number | null
          stripe_customer_id?: string | null
          today_used?: number | null
          total_used?: number | null
          updated_at?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      distinct_songs: {
        Row: {
          album_id: number | null
          audio_url: string | null
          created_at: string | null
          duration: number | null
          id: string | null
          image_url: string | null
          is_private: boolean | null
          model_name: string | null
          prompt: string | null
          status: string | null
          tags: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "songs_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "songs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      get_gravatar_url: {
        Args: {
          email: string
        }
        Returns: string
      }
    }
    Enums: {
      order_status_type:
        | "processing"
        | "canceled"
        | "succeeded"
        | "requires_action"
        | "requires_capture"
        | "requires_confirmation"
        | "requires_payment_method"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
