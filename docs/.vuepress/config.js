module.exports = {
  title: '@ostore/utils',
  description: '一个常用的工具函数库',
  base: '/',
  theme: 'reco',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  head: [
    ['link', { rel: 'icon', href: 'favicon.png' }]
  ],
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
    subSidebar: 'auto',
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/docs/url' },
      {
        text: 'Github',
        link: 'https://github.com/wyh-code/utils'
      }
    ],
    sidebar: {
      '/docs/': [
        '/docs/url',
        '/docs/date',
        '/docs/assets',
        '/docs/storage',
        '/docs/format',
        '/docs/math',
        '/docs/dom',
        '/docs/colors',
        '/docs/utils'
      ]
    }
    // [
    //   { 
    //     title: "路由", 
    //     path: "/docs/url"
    //   },
    //   { 
    //     title: "时间", 
    //     path: "/docs/date"
    //   },
    //   { 
    //     title: "资源类", 
    //     path: "/docs/assets"
    //   },
    //   { 
    //     title: "本地缓存", 
    //     path: "/docs/storage"
    //   },
    //   { 
    //     title: "格式化", 
    //     path: "/docs/format"
    //   },
    //   { 
    //     title: "数学计算", 
    //     path: "/docs/math"
    //   },
    //   { 
    //     title: "DOM", 
    //     path: "/docs/dom"
    //   },
    //   { 
    //     title: "颜色值", 
    //     path: "/docs/colors"
    //   },
    //   { 
    //     title: "其他", 
    //     path: "/docs/utils"
    //   },
    // ]
  }
}