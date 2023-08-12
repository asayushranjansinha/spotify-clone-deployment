import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

/**
 * Fetches songs from the Supabase database based on the current user's ID.
 * 
 * @returns {Promise<Song[]>} A promise that resolves to an array of fetched Song objects.
 */
const getSongsByUserId = async (): Promise<Song[]> => {
  // Create a Supabase client using the server-side authentication cookies
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  // Get the current user's session data
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  // Handle any errors that occurred while getting the session data
  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  // Fetch songs from the 'songs' table that belong to the current user and order them by 'created_at' in descending order
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', sessionData.session?.user.id)
    .order('created_at', { ascending: false })

  // Handle any errors that occurred during the fetch
  if (error) {
    console.log(error.message);
  }

  // Return the fetched data as an array of Song objects
  return (data as any) || [];
};

export default getSongsByUserId;
