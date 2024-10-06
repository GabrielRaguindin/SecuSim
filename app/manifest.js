export default function manifest() {
    return {
      name: 'SECUSIM',
      short_name: 'SECUSIM',
      description: '',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#000000',
      icons: [
        {
          src: '/secusim.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    }
  }