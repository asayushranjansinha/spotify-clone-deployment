/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'misc.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'geo-media.beatsource.com',
      },
      {
        protocol: 'https',
        hostname: 'i1.sndcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'media.pitchfork.com',
      },
      {
        protocol: 'https',
        hostname: 'seed-mix-image.spotifycdn.com',
      },
      {
        protocol: 'https',
        hostname: 'ajiwrbslpexamsfcjtpa.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'wdhqztgrqvjzisvwxbkh.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;