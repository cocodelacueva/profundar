module.exports = {
  //basePath: '/test/next-estatico',
  reactStrictMode: true,
  trailingSlash: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/posts': { page: '/posts' },
      '/p/blog-next-js-y-markdown': { page: '/p/[slug]', query: { slug: 'blog-next-js-y-markdown' } },
    }
  }
}
