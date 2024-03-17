import MillionLint from '@million/lint';
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com']
  }
};
export default MillionLint.next({
  rsc: true
})(nextConfig);