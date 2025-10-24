const path = require('path');

module.exports = {
  // Run Nx format:write on all staged files
  '*': (files) => {
    const relativeFiles = files.map((file) => path.relative(process.cwd(), file));
    return `nx format:write --files ${relativeFiles.join(' ')}`;
  },

  // Run Nx affected lint on staged files
  '*.{ts,tsx,js,jsx,json,md}': (files) => {
    const relativeFiles = files.map((file) => path.relative(process.cwd(), file));
    return `nx affected -t lint --files ${relativeFiles.join(' ')} -- --no-warn-ignored`;
  },
};
