module.exports = {
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination: 'https://genuiback.onrender.com/:path*', 
        },
      ]
    },
  }
  
