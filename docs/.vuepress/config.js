const path = require('path');

module.exports = {
  title: '@ostore/utils',
  description: '一个开发常用的工具函数库',
  base: '/',
  theme: 'reco',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  head: [
    ['link', { rel: 'icon', href: 'favicon.png' }],
    ['script', { charset: 'utf-8' },
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?d4a1bc3893d7387634d57667d4ec1b3b";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      `
    ]
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
  },
  plugins: [
    path.resolve(__dirname, './plugin-code-copy/index.js'),
    [path.resolve(__dirname, './plugin-bulletin-popover/index.js'), {
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
    }]
  ],
  markdown: {
    lineNumbers: true
  },
}
