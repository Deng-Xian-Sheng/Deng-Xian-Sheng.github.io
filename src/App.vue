<template>
  <div>
    <router-view class="view boss"></router-view>
    <FloatBall :text="''"></FloatBall>
    <router-view ref="popupFloatBall" class="view popupFloatBall" name="popupFloatBall"></router-view>
    <el-dialog
      title="注意⚠️"
      :visible.sync="MusicDialogVisible"
      :destroy-on-close="true"
      :width="MusicDialogVisibleWidth"
      @open="MusicDialogVisibleStart"
      @close="MusicDialogVisibleEnd"
    >
      <span>页面有背景音乐哦，请避免公共场合外放！</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="MusicDialogVisible = false;">确 定</el-button>
      </span>
    </el-dialog>
    <!--网易云外链播放器-->
    <div
      v-bind:class="NeteaseCloudPlayIframeClass"
      v-bind:style="NeteaseCloudPlayIframeStyle"
      @mousedown="NeteaseCloudPlayIframeMouseDownOrUp =  true"
      @mouseup="NeteaseCloudPlayIframeMouseDownOrUp = false"
      @mousemove="NeteaseCloudPlayIframeExtendRunTime"
    >
      <div v-bind:class="NeteaseCloudPlayIframeClassIcon">
        <i class="el-icon-arrow-right"></i>
      </div>
      <iframe
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        width="330"
        height="86"
        src="//music.163.com/outchain/player?type=2&id=1898990940&auto=1&height=66"
      ></iframe>
    </div>
    <!--雪花和冰封的元素标签-->
    <div class="hp_special_experience">
      <div class="hol_frames_cont">
        <div class="frame fader frost show">
          <div class="frame_sprite frame_left"></div>
          <div class="frame_sprite frame_right"></div>
          <div class="frame_sprite frame_top"></div>
          <div class="frame_sprite frame_bottom"></div>
        </div>
        <div class="frame fader lights">
          <div class="frame_sprite frame_left"></div>
          <div class="frame_sprite frame_right"></div>
          <div class="frame_sprite frame_top"></div>
          <div class="frame_sprite frame_bottom"></div>
        </div>
        <div id="snow_container" class="fader snow show">
          <div class="snow_slice snow_1">
            <div class="snow_drifter drift_1"></div>
          </div>
          <div class="snow_slice snow_2">
            <div class="snow_drifter drift_2"></div>
          </div>
          <div class="snow_slice snow_3">
            <div class="snow_drifter drift_3"></div>
          </div>
          <div class="snow_slice snow_4">
            <div class="snow_drifter drift_4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Public from "@/components/Public";
import $ from "jquery";
export default {
  name: "App",
  data() {
    return {
      MusicDialogVisible: false,
      MusicDialogVisibleWidth: "30%",
      NeteaseCloudPlayIframeClass: "NeteaseCloudPlayIframe",
      NeteaseCloudPlayIframeStyle: "",
      NeteaseCloudPlayIframeMouseDownOrUp: false,
      NeteaseCloudPlayIframeClassIcon: "NeteaseCloudPlayIframeIcon",
    };
  },
  methods: {
    MusicDialogVisibleStart() {
      Public.daZiJiValue = false;
      Public.MusicTiShi = false;
    },
    MusicDialogVisibleEnd() {
      Public.daZiJiValue = true;
      Public.MusicTiShi = true;
    },
    lianXiZuoZheClick() {
      if (this.$route.path != "/lianxizuozhe") {
        this.$router.push({ path: "/lianxizuozhe" });
      }
    },
    juanZhuClick() {
      if (this.$route.path != "/juanzhu") {
        this.$router.push({ path: "/juanzhu" });
      }
    },
    guanYuBenZhanClick() {
      if (this.$route.path != "/guanyubenzhan") {
        this.$router.push({ path: "/guanyubenzhan" });
      }
    },
    NeteaseCloudPlayIframeMouseMove() {
      return new Promise((resolve) => {
        $(document).mousemove((event) => {
          var e = event || window.event;
          var x = e.pageX || e.clientX + document.body.scroolLeft;
          var y = e.pageY || e.clientY + document.body.scrollTop;
          resolve([x - 30, y - 45]);
        });
      });
    },
    async NeteaseCloudPlayIframeCompute() {
      if (this.NeteaseCloudPlayIframeMouseDownOrUp == true) {
        var result = await this.NeteaseCloudPlayIframeMouseMove();
        this.NeteaseCloudPlayIframeStyle =
          "left:" + result[0] + "px;" + "top:" + result[1] + "px;";
      }
    },
    NeteaseCloudPlayIframeExtendRunTime(){
      var ExtendRunTime = setInterval(this.NeteaseCloudPlayIframeCompute)
      setTimeout(()=>{
        clearInterval(ExtendRunTime)
      },500)
    }
  },
  mounted() {
    if (this.$route.name != "404") {
      this.MusicDialogVisible = true;
    }
    if (Public._isMobile()) {
      // alert("手机端")
      this.MusicDialogVisibleWidth = "80%";
    }
  },
};
</script>
<style scoped>
.NeteaseCloudPlayIframe {
  z-index: 9999;
  position: fixed;
  background-color: lightcoral;
  transition: all 300ms ease;
}
.NeteaseCloudPlayIframeIcon {
  top:10px;
  position: absolute;
  height: 66px;
  width: 18px;
  background-color: #DCDFE6;
}
.NeteaseCloudPlayIframeIcon i{
  position:absolute;
  top:22px;
  font-size: 25px;
  right: 0.01px;
  color: #606266;
}
</style>