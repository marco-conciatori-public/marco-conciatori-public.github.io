/** @type {import('tailwindcss').Config} */
module.exports = {
  // Files Tailwind scans for class names. main.js is included because it adds
  // some classes at runtime (active nav highlighting), which must not be purged.
  content: [
    './*.html',
    './_layouts/**/*.html',
    './_includes/**/*.html',
    './main.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
