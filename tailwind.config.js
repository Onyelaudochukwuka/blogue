module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  
}
