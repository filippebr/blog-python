module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-discard-comments': {
      remove: (comment: string | string[]) => comment.includes('sourceMappingURL'),
    },
  },
}