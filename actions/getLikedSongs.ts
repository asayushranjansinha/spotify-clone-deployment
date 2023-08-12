import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

/**
 * Fetches the liked songs from the Supabase database for the currently authenticated user.
 * 
 * @returns {Promise<Song[]>} A promise that resolves to an array of Song objects.
 */
const getLikedSongs = async (): Promise<Song[]> => {
  // Create a Supabase client using the server-side authentication cookies
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  // Fetch the session of the currently authenticated user
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Fetch the liked songs for the user from the 'liked_songs' table
  const { data } = await supabase 
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', session?.user?.id)
    .order('created_at', { ascending: false })

  // If no data is returned, return an empty array
  if (!data) return [];

  // Map the fetched data to an array of Song objects
  return data.map((item) => ({
    ...item.songs
  }));
};

export default getLikedSongs;
