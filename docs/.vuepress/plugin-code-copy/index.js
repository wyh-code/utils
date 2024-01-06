const path = require('path');

module.exports = (options, ctx) => {
  return {
    name: 'plugin-code-copy',
    define: {
      copybuttonText: options.copybuttonText || 'copy',
      copiedButtonText: options.copiedButtonText || "copied!"
    },
    clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js')
  }
}