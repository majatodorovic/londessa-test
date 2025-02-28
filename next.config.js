/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    NAME: process.env.NAME,
    ADDRESS: process.env.ADDRESS,
    PIB: process.env.PIB,
    CODE: process.env.CODE,
    EMAIL: process.env.EMAIL,
    TELEPHONE: process.env.TELEPHONE,
    CAPTCHAKEY: process.env.CAPTCHAKEY,
    INSTAGRAM: process.env.INSTAGRAM,
  },
  images: {
    domains: [
      "api.londessa.croonus.com",
      "api.staging.croonus.com",
      "scontent.cdninstagram.com",
      "api.fashiondemo.croonus.com",
      "video.cdninstagram.com",
    ],
    minimumCacheTTL: 60 * 60 * 24 * 90,
  },
};

module.exports = nextConfig;
