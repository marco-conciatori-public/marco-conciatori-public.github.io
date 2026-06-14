/** @type {import('tailwindcss').Config} */
module.exports = {
  // Files Tailwind scans for class names. main.js is included because it adds
  // some classes at runtime (active nav highlighting, mobile TOC), which must
  // not be purged.
  content: [
    './*.html',
    './_layouts/**/*.html',
    './_includes/**/*.html',
    './main.js',
  ],
  theme: {
    extend: {
      // "Field robotics telemetry" identity: machined display type, an
      // engineering body face, and a mono for technical labels.
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      // Warm "bone paper" + ink + machine-green accent (from the robot logo).
      colors: {
        paper: '#E7E3D8',
        surface: '#F3F0E8',
        surface2: '#DCD8CB',
        ink: '#181A15',
        inksoft: '#4C5048',
        line: '#C7C2B2',
        accent: {
          DEFAULT: '#137A4E',
          bright: '#2FBE7E',
          ink: '#0C4D31',
        },
        hazard: '#CC6B23',
      },
    },
  },
  plugins: [],
};
