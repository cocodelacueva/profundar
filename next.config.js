module.exports = {
  basePath: '/test/next-estatico',
  reactStrictMode: true,
  //trailingSlash: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/posts': { page: '/posts' },
      '/post/blog-next-js-y-markdown': { page: '/post/[slug]', query: { slug: 'blog-next-js-y-markdown' } },
    }
  }
}
