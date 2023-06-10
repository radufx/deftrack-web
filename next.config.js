/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'deftrack.s3.eu-west-3.amazonaws.com'
    ]
  }
}

module.exports = nextConfig;
