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
    // logo: '/logo.svg',
    // docsDir: 'docs',
    lastUpdated: '最后更新',
    subSidebar: 'auto',
    nav: [
      {
        text: 'Github',
        link: 'https://github.com/wyh-code/utils'
      }
    ],
    sidebar: [
      {
        title: '介绍',
        path: '/',
        collapsable: false,
        children: [
          {
            title: '关于',
            path: '/',
          }
        ]
      },
      {
        title: '核心',
        path: '/docs/url',
        collapsable: false,
        children: [
            { 
              title: "路由", 
              path: "/docs/url"
            },
            { 
              title: "时间", 
              path: "/docs/date"
            },
            { 
              title: "资源", 
              path: "/docs/assets"
            },
            { 
              title: "缓存", 
              path: "/docs/storage"
            },
            { 
              title: "格式化", 
              path: "/docs/format"
            },
            { 
              title: "数学计算", 
              path: "/docs/math"
            },
            { 
              title: "DOM", 
              path: "/docs/dom"
            },
            { 
              title: "颜色值", 
              path: "/docs/colors"
            },
            { 
              title: "其他", 
              path: "/docs/utils"
            },
          ]
      }
    ],
    plugins: [
      ['@vuepress-reco/vuepress-plugin-bulletin-popover', {
        width: '300px', // 默认 260px
        title: '消息提示',
        body: [
          {
            type: 'title',
            content: '添加冴羽好友入前端交流群',
            style: 'text-aligin: center;'
          },
          {
            type: 'image',
            src: 'https://cdn.jsdelivr.net/gh/mqyqingfeng/picture/IMG_3516.JPG'
          }
        ],
        footer: [
          {
            type: 'button',
            text: '打赏',
            link: '/donate'
          } 
        ]
      }],
      ["vuepress-plugin-nuggets-style-copy", {
        copyText: "复制代码",
        tip: {
            content: "复制成功"
        }
     }]
    ]
    
  }
}

 // sidebar: {
    //   '/docs/': [
    //     '/docs/url',
    //     '/docs/date',
    //     '/docs/assets',
    //     '/docs/storage',
    //     '/docs/format',
    //     '/docs/math',
    //     '/docs/dom',
    //     '/docs/colors',
    //     '/docs/utils'
    //   ]
    // },