
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com']
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};
export default nextConfig;