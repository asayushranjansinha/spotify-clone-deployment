import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

/**
 * Fetches a song from the Supabase database by its ID.
 * 
 * @param {string} id - The ID of the song to fetch.
 * @returns {Promise<Song>} A promise that resolves to the fetched Song object.
 */
const getSongById = async (id: string): Promise<Song> => {
  // Create a Supabase client using the server-side authentication cookies
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  // Fetch the song from the 'songs' table by its ID
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('id', id)
    .single();

  // Handle any errors that occurred during the fetch
  if (error) {
    console.log(error.message);
  }

  // Return the fetched data as a Song object
  return (data as any) || [];
};

export default getSongById;
