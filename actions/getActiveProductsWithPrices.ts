import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { ProductWithPrice } from "@/types";

/**
 * Fetches active products with their prices from the Supabase database.
 * 
 * @returns {Promise<ProductWithPrice[]>} A promise that resolves to an array of ProductWithPrice objects.
 */
const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {
  // Create a Supabase client using the server-side authentication cookies
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  // Fetch active products with their prices from the 'products' table
  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' });

  // Handle any errors that occurred during the fetch
  if (error) {
    console.log(error.message);
  }

  // Return the fetched data as an array of ProductWithPrice objects
  return (data as any) || [];
}

export default getActiveProductsWithPrices;
