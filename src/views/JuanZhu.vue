<template>
  <div>
    <transition name="el-zoom-in-center">
      <div v-show="juanZhu == true" class="juanZhuClass">
        <mt-header :title="juanZhuTitle">
          <router-link to slot="left">
            <mt-button @click="Exit" icon="back">返回</mt-button>
          </router-link>
        </mt-header>
        <el-empty :description="juanZhuEmptyDescription"></el-empty>
      </div>
    </transition>
  </div>
</template>
<script>
import Public from "@/components/Public";
export default {
  name: "JuanZhu",
  data() {
    return {
      juanZhu: false,
      juanZhuTitle: "捐助-邓文怡.com",
      juanZhuEmptyDescription:"暂不开放！"
    };
  },
  methods: {
    setup() {
      if (Public._isMobile()) {
        // alert("手机端")
        this.juanZhu = true;
      }
    },
    Exit() {
      this.juanZhu = false;
      setTimeout(() => {
        this.$router.go(-1);
      }, 500);
    },
  },
  mounted() {
    this.setup();
  },
};
</script>
<style>
.juanZhuClass {
  background-color: #fff;
  position: fixed;
  z-index: 2009;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
}
</style>
