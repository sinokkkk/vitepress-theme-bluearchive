<template>
  <div
    class="banner"
    :class="{ postViewer: state.currPost.href, loadingComplete: !state.splashLoading }"
  >
    <!-- //welcomebox是个单独的组件 //:是v-bind 这是用于区别首页和文章预览的显示 -->
    <slot></slot>

    <!-- <canvas id="wave"></canvas> -->
    <video autoplay muted loop class="bg-video" v-if="videoBanner">
      <source src="../assets/banner/banner_video.mp4" type="video/mp4" />
    </video>
    <div class="bg-img" v-else></div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
const themeConfig = useData().theme.value
const videoBanner = themeConfig.videoBanner
//由videobannner这个属性决定banner是放图片还是视频

import { useStore } from '../store'
const { state } = useStore()
import { onMounted } from 'vue'
</script>

<style scoped lang="less">
.banner {
  /* 横幅容器 - 网站顶部展示区域 */
  transform: translateZ(0); /* 开启GPU加速，优化动画性能 */
  display: flex;

  flex-direction: column; /* 垂直布局 */
  align-items: center; /* 水平居中 */
  justify-content: center;

  position: absolute;

  top: 0; /* 顶部对齐 */
  width: 100%; /* 全宽 */
  height: 75vh; /* 高度占视口的75% */
  mask: linear-gradient(to top, transparent, var(--general-background-color) 5%);
  /* 底部渐变遮罩：从透明到背景色，实现内容淡出效果 */
  perspective: 1000px; /* 制造卡片3D透视效果 */
  overflow: hidden;
  -webkit-user-drag: none;
  transition: height 0.3s;

  &.loadingComplete {
    animation: fade-blur-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
}

@keyframes float-fade {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(10px);
  }
}

@keyframes fade-blur-in {
  //淡入模糊进入
  from {
    filter: var(--blur-val);
    // 在vars.less文件里,深色和浅色不一样
    transform: scale(1.5);
    //放大1.5倍
  }

  to {
    filter: none;
    transform: scale(1);
  }
}

.postViewer {
  height: 50vh;
}

.bg-img {
  background-image: url(../assets/banner/banner.webp); //url变量
  html[theme='dark'] & {
    background-image: url(../assets/banner/banner_dark.webp), url(../assets/banner/banner.webp);
  } //属性选择器,对theme是dark的html 的 .bg-img,采取xx的url
  position: absolute;
  top: 0; //将元素顶部与父元素顶部对齐
  width: 100%; //宽度高度占满父元素
  height: 100%;
  background-size: cover; //背景图片会缩放以完全覆盖背景区域，可能会裁剪图片。
  background-position: center center; //背景图片在水平和垂直方向都居中显示。
  filter: var(--img-brightness); /* 添加亮度过滤器 由变量--img-brightness决定*/
  transition: filter 0.5s, background-image 0.5s; /* 添加过渡效果 */
}

.bg-video {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 禁用视频拖动 */
  -webkit-user-drag: none;
}
</style>
