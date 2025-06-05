
import { supabase } from "@/integrations/supabase/client";
import { DatabaseUser } from "@/types/database";

export class UserService {
  static async getCurrentUser(): Promise<DatabaseUser | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    return data;
  }

  static async createUserProfile(userId: string, name: string, email: string) {
    const { data, error } = await supabase
      .from('users')
      .insert({
        user_id: userId,
        name: name,
        email: email
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }

    return data;
  }

  static async updateUserProfile(userId: string, updates: Partial<DatabaseUser>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }

    return data;
  }
}
