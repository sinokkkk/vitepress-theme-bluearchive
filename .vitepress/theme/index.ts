// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import type { Theme } from 'vitepress'
import 'normalize.css'

import './assets/icon/iconfont.css'
import './styles/index.less'
import './components/Spine-Player/spine-player.css'

export default {
  Layout, //以layout作为入口文件导出
  enhanceApp({ app, router, siteData }) {
    // ...
  },
} satisfies Theme
//因为import了layout
//这是一种 JavaScript 的 对象属性简写 语法。它等同于 Layout: Layout,同名变量
//默认导出关键就在于导出时不给名字而是一个整体对象,要用的时候自己起一个名字import,就可以用那个名字叫他了
