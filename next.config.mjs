/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  devIndicators: false,

  serverExternalPackages: [
    '@nibgate/sdk',
    '@circle-fin/x402-batching',
  ],
  outputFileTracingIncludes: {
    '/api/**/*': [
      './node_modules/@circle-fin/**/*',
      './node_modules/@nibgate/**/*',
      './node_modules/@x402/**/*',
      './node_modules/viem/**/*'
    ],
  },
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: 'http://127.0.0.1:3001/admin/:path*',
      },
      {
        source: '/admin',
        destination: 'http://127.0.0.1:3001/admin',
      }
    ];
  }
};

export default nextConfig;
