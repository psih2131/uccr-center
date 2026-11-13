import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(() => {
    return [
        { loc: '/', _sitemap: 'pages' },
        { loc: '/o-kompanii', _sitemap: 'pages' },
        { loc: '/licenzii', _sitemap: 'pages' },
        { loc: '/kontakty', _sitemap: 'pages' },
        { loc: '/blog', _sitemap: 'pages' },
    ]
})
