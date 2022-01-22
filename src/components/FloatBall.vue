<template>
  <div>
    <transition name="el-zoom-in-bottom">
      <mt-switch
        v-model="showXueAndBing"
        ref="dragIcon"
        style="position: fixed;"
        :style="{left: left -5+'px',top: top - 90 + 'px',width: itemWidth +4+'px',height: itemHeight+2 + 'px'}"
        v-show="show"
        v-if="isShow"
      ></mt-switch>
    </transition>
    <transition name="el-zoom-in-bottom">
      <el-button
        @click="lianXiZuoZheClick"
        type="info"
        ref="dragIcon"
        style="position: fixed;"
        :style="{left: left +'px',top: top - 45 + 'px',width: itemWidth + 'px',height: itemHeight + 'px'}"
        v-show="show"
        v-if="isShow"
        icon="el-icon-chat-dot-round"
        circle
      ></el-button>
    </transition>
    <transition name="el-zoom-in-bottom">
      <el-button
        @click="guanYuBenZhanClick"
        type="info"
        ref="dragIcon"
        style="position: fixed;"
        :style="{left: left - 10 +'px',top: top + 45 + 'px',width: itemWidth + 'px',height: itemHeight + 'px'}"
        v-show="show"
        v-if="isShow"
        icon="el-icon-info"
        circle
      ></el-button>
    </transition>
    <transition name="el-zoom-in-bottom">
      <el-button
        @click="juanZhuClick"
        type="info"
        ref="dragIcon"
        style="position: fixed;"
        :style="{left: left - 10 +'px',top: top + 90 + 'px',width: itemWidth + 'px',height: itemHeight + 'px'}"
        v-show="show"
        v-if="isShow"
        icon="el-icon-milk-tea"
        circle
      ></el-button>
    </transition>
    <transition>
      <el-tooltip
        v-model="tiShiMain"
        :manual="true"
        effect="dark"
        :content="tiShiMainContent"
        placement="left-end"
      >
        <div
          @click="show = !show"
          ref="dragIcon"
          class="dragIcon"
          @touchstart.stop="handleTouchStart"
          @mousedown="handleTouchStart"
          @touchmove.prevent.stop="handleTouchMove($event)"
          @touchend.stop="handleTouchEnd"
          @mouseup="handleTouchEnd"
          :style="{left: left + 'px',top: top + 'px',width: itemWidth + 'px',height: itemHeight + 'px'}"
          v-text="text"
          v-if="isShow"
        >{{text}}</div>
      </el-tooltip>
    </transition>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "FloatBall",
  props: {
    text: {
      type: String,
      default: "球",
    },
    itemWidth: {
      type: Number,
      default: 40,
    },
    itemHeight: {
      type: Number,
      default: 40,
    },
  },
  watch: {
    showXueAndBing(newValue) {
      this.$parent.showXueAndBingClick(newValue);
    },
  },
  data() {
    return {
      left: 0,
      top: 0,
      startToMove: false,
      isShow: true,
      timer: null,
      currentTop: null,
      clientW: document.documentElement.clientWidth, //视口宽
      clientH: document.documentElement.clientHeight, //视口高
      show: false,
      tiShiMain: false,
      tiShiMainContent: "点我有惊喜！",
      showXueAndBing: true,
    };
  },
  created() {
    this.left = this.clientW - this.itemWidth - 50;
    this.top = this.clientH / 2 - this.itemHeight / 2;
  },
  mounted() {
    this.bindScrollEvent();
    $(window).mousemove(this.handleTouchMoveForMouse);
  },
  beforeDestroy() {
    // 记得销毁一些全局的的事件
    this.removeScrollEvent();
  },
  methods: {
    handleTouchStart() {
      this.startToMove = true;
      this.$refs.dragIcon.style.transition = "none";
    },
    handleTouchMove(e) {
      const clientX = e.targetTouches[0].clientX; //手指相对视口的x
      const clientY = e.targetTouches[0].clientY; //手指相对视口的y
      const isInScreen =
        clientX <= this.clientW &&
        clientX >= 0 &&
        clientY <= this.clientH &&
        clientY >= 0;
      if (this.startToMove && e.targetTouches.length === 1) {
        if (isInScreen) {
          this.left = clientX - this.itemWidth / 2;
          this.top = clientY - this.itemHeight / 2;
        }
      }
    },
    handleTouchMoveForMouse(e) {
      const clientX = e.clientX; //手指相对视口的x
      const clientY = e.clientY; //手指相对视口的y
      const isInScreen =
        clientX <= this.clientW &&
        clientX >= 0 &&
        clientY <= this.clientH &&
        clientY >= 0;
      if (this.startToMove == true) {
        if (isInScreen) {
          this.left = clientX - this.itemWidth / 2;
          this.top = clientY - this.itemHeight / 2;
        }
      }
    },
    handleTouchEnd() {
      this.startToMove = false;
      if (this.left < this.clientW / 2) {
        this.left = 50; //不让贴边 所以设置30没设置0
        this.handleIconY();
      } else {
        this.left = this.clientW - this.itemWidth - 50; //不让贴边 所以减30
        this.handleIconY();
      }
      this.$refs.dragIcon.style.transition = "all .3s";
    },
    handleIconY() {
      if (this.top < 0) {
        this.top = 30; //不上帖上边所以设置为30 没设置0
      } else if (this.top + this.itemHeight > this.clientH) {
        this.top = this.clientH - this.itemHeight - 30; //不让帖下边所以减30
      }
    },
    bindScrollEvent() {
      window.addEventListener("scroll", this.handleScrollStart);
    },
    removeScrollEvent() {
      window.removeEventListener("scroll", this.handleScrollStart);
    },
    handleScrollStart() {
      this.isShow = false;
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.handleScrollEnd();
      }, 300);
      this.currentTop =
        document.documentElement.scrollTop || document.body.scrollTop;
    },
    handleScrollEnd() {
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 判断是否停止滚动的条件
      if (this.scrollTop == this.currentTop) {
        this.isShow = true;
      }
    },
    lianXiZuoZheClick() {
      this.$parent.lianXiZuoZheClick();
    },
    juanZhuClick() {
      this.$parent.juanZhuClick();
    },
    guanYuBenZhanClick() {
      this.$parent.guanYuBenZhanClick();
    },
    tiShiMainShow() {
      this.tiShiMain = true;
      setTimeout(() => {
        this.tiShiMain = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.dragIcon {
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* background-color: orange; */
  background-image: url("/image/kafei.png") !important;
  background-size: cover !important;
  line-height: 40px;
  text-align: center;
  color: #fff;
  border: 1px solid #fff;
}
.v-enter {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s;
}
</style>