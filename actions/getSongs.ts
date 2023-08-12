import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

/**
 * Fetches multiple songs from the Supabase database.
 * 
 * @returns {Promise<Song[]>} A promise that resolves to an array of fetched Song objects.
 */
const getSongs = async (): Promise<Song[]> => {
  // Create a Supabase client using the server-side authentication cookies
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  // Fetch songs from the 'songs' table and order them by 'created_at' in descending order
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false })

  // Handle any errors that occurred during the fetch
  if (error) {
    console.log(error.message);
  }

  // Return the fetched data as an array of Song objects
  return (data as any) || [];
};

export default getSongs;
