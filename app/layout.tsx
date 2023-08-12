// Import necessary dependencies
import { Figtree } from "next/font/google";

// Import actions
import getSongsByUserId from "@/actions/getSongsByUserId";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";

// Import components and providers
import Sidebar from "@/components/Sidebar";
import ToasterProvider from "@/providers/ToasterProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import Player from "@/components/Player";

// Import global styles
import "./globals.css";

// Define custom font with Figtree
const font = Figtree({ subsets: ["latin"] });

// Define metadata for the page
export const metadata = {
  title: "Spotify Clone",
  description: "Spotify Clone by Ayush Ranjan Sinha",
};

// Define revalidate value
export const revalidate = 0; // Set to 0 to disable revalidation
/* In Next.js, you can use the revalidate option to define how often a static page should be revalidated and regenerated on the server. The revalidate value represents the number of seconds after which Next.js will revalidate the page and regenerate it if necessary.
 */

/**
 * RootLayout component for the Spotify Clone app.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children components to render.
 * @returns {JSX.Element} The JSX element representing the layout structure.
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch active products with prices
  const products = await getActiveProductsWithPrices();

  // Fetch user songs
  const userSongs = await getSongsByUserId();

  // Return the JSX structure of the layout
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
