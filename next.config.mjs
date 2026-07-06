/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  devIndicators: false,

  serverExternalPackages: [
    '@nibgate/sdk',
    '@circle-fin/x402-batching',
    '@x402/core',
    '@x402/evm',
    'viem',
    'abitype',
    'ox',
    'isows',
    'ws',
    '@noble/curves',
    '@noble/hashes',
    '@scure/bip32',
    '@scure/bip39'
  ],
  outputFileTracingIncludes: {
    '/api/**/*': [
      './node_modules/@circle-fin/**/*',
      './node_modules/@nibgate/**/*',
      './node_modules/@x402/**/*',
      './node_modules/viem/**/*',
      './node_modules/abitype/**/*',
      './node_modules/ox/**/*',
      './node_modules/isows/**/*',
      './node_modules/ws/**/*',
      './node_modules/@noble/**/*',
      './node_modules/@scure/**/*'
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
