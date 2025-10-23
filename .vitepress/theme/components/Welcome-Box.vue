<template>
  <div class="welcome-box">
    <!-- ref="welcomeBoxRef"
    @mousemove="parallax"
    @mouseleave="reset"
    :style="{ transform: `rotateY(${calcY}deg) rotateX(${calcX}deg)` } -->
    <!-- @mousemove指在这个div上移动离开的时候各触发两个方法 // :是v-bind: -->
    <!-- appear : 表示在组件初始渲染时也应用过渡动画。 -->

    <span class="welcome-text">{{ welcomeText }}</span>
    <transition name="fade" appear>
      <div
        class="info-box"
        :style="{
          background: `linear-gradient(${angle}deg, var(--infobox-background-initial), var(--infobox-background-final))`,
        }"
      >
        <img @dragstart.prevent src="../assets/banner/avatar.webp" alt="" class="avatar" />
        <!-- @dragstart.prevent : 阻止图片被拖拽的默认行为。 小属性记一下-->

        <span class="name">{{ name }}</span>
        <span class="motto">
          {{ mottoText }}
          <span class="pointer"></span>
        </span>

        <ul>
          <li v-for="item in social" :key="item.url">
            <a :href="item.url" target="_blank" rel="noopener noreferrer">
              <i :class="`iconfont icon-${item.icon} social`"></i>
            </a>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'

const themeConfig = useData().theme.value
const name = themeConfig.name
const welcomeText = themeConfig.welcomeText
const motto = themeConfig.motto
const social = themeConfig.social

const multiple = 30
const welcomeBoxRef = ref<HTMLElement | null>(null)
const calcY = ref(0)
const calcX = ref(0)
const angle = ref(0)

/*const parallax = (e: MouseEvent) => {
  if (welcomeBoxRef.value) {
    window.requestAnimationFrame(() => {
      const box = welcomeBoxRef.value!.getBoundingClientRect()
      calcY.value = (e.clientX - box.x - box.width / 2) / multiple
      calcX.value = -(e.clientY - box.y - box.height / 2) / multiple
      angle.value = Math.floor(
        getMouseAngle(e.clientY - box.y - box.height / 2, e.clientX - box.x - box.width / 2),
      )
    })
  }
}
const getMouseAngle = (x: number, y: number) => {
  const radians = Math.atan2(y, x)
  let angle = radians * (180 / Math.PI)

  if (angle < 0) {
    angle += 360
  }

  return angle
}
const reset = () => {
  calcX.value = calcY.value = angle.value = 0
}*/

let index = 0
const mottoText = ref('')
const randomMotto = motto[Math.floor(Math.random() * motto.length)]

const addNextCharacter = () => {
  if (index < randomMotto.length) {
    mottoText.value += randomMotto[index]
    index++
    setTimeout(addNextCharacter, Math.random() * 150 + 50)
  }
}

onMounted(() => {
  addNextCharacter()
})
</script>

<style scoped lang="less">
.welcome-box {
  margin-top: 4.2vw; //外边距根据浏览器窗口进行响应式调整
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100; //z轴顺序,大于0即可
  transition: transform 0.2s, color 0.5s, text-shadow 0.5s; //值随便写
}

.welcome-text {
  font-size: 4.5vw; //可以调稍微小点
  font-weight: bold;
  color: var(--welcome-text-color);
  text-shadow: var(--welcome-text-shadow);
  text-align: center;
  margin-bottom: 5vw; //与下面卡片的距离
  user-select: none !important; //user-select: none !important;可以强制无法选中
}

.info-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 6vh 2vw 3vh;
  width: 40vw; //随便搞
  border-radius: 3vw;
  box-shadow: var(--info-box-shadow); //可以改浅一点或者直接去掉
  backdrop-filter: var(--blur-val) saturate(120%); //饱和度可以随便调,整点效果
  // 模糊也可以调低一点,毛玻璃没必要那么重
  //backdrop是背景的模糊,不是元素本身
  .avatar {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 7.5vw;
    height: 7.5vw;
    border-radius: 50%; //可以调成方的 节目效果
    border: solid 3px var(--infobox-border-color); //可以不要边框
    transition: transform 0.6s ease, box-shadow 0.4s ease, filter 0.5s;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.6); //也可以不加
    cursor: pointer; //指针变成手形
    user-select: none; //!important
    filter: var(--img-brightness);

    &:hover {
      transform: translate(-50%, -50%) rotate(1turn) scale(1.1);
      //居中定位的同时旋转一周,同时放大1.1倍
      box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);
    }
  }

  .name {
    font-size: 1.5vw;
    margin-top: 3vh;
  }
  .motto {
    font-size: 1vw;
    font-weight: bold;
    animation: color-change 0.8s linear infinite;
    margin-top: 3vh;
    text-align: center;
    .pointer {
      display: inline-block;
      margin: -0.5vh 0 0;
      padding: 0;
      vertical-align: middle;
      width: 2px;
      height: 1vw;
      animation: color-change 0.8s linear infinite;
      background-color: var(--pointerColor);
    }
    @keyframes color-change {
      0%,
      40% {
        --pointerColor: var(--font-color-grey);
      }

      60%,
      100% {
        --pointerColor: transparent;
      }
    }
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 3.5vh;
    width: 12vw;
    padding: 0;

    .social {
      font-size: 1.5vw;
      font-weight: 600;
      transition: all 0.5s; //这个有一个明显的渐入
      color: var(--font-color-grey);

      &:hover {
        filter: drop-shadow(0 0 5px var(--font-color-grey)); //还是filter...
      }
    }
  }
}

@media (max-width: 768px) {
  .welcome-text {
    font-size: 5vh;
    margin-bottom: 10vh;
  }

  .info-box {
    padding: 5vh 6vw 2vh;
    width: 75vw;
    border-radius: 4vh;

    .avatar {
      width: 10vh;
      height: 10vh;
    }

    .name {
      font-size: 2.5vh;
      margin-top: 1.8vh;
    }
    .motto {
      font-size: 1.5vh;
      margin-top: 1.5vh;
      .pointer {
        height: 1.5vh;
      }
    }

    ul {
      margin-top: 1.8vh;
      width: 32vw;

      .social {
        font-size: 2vh;
      }
    }
  }
} //对移动端的适配
</style>
