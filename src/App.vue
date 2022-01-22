<template>
  <div>
    <router-view class="view boss"></router-view>
    <FloatBall ref="floatBall" :text="''"></FloatBall>
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
      @touchstart="NeteaseCloudPlayIframeMouseDownOrUp =  true"
      @mouseup="NeteaseCloudPlayIframeMouseDownOrUp = false"
      @touchend="NeteaseCloudPlayIframeMouseDownOrUp = false"
      @touchmove.prevent.stop="NeteaseCloudPlayIframeForTouchClick($event)"
    >
      <el-row>
        <el-col :span="NeteaseIconSpan">
          <div
            v-bind:class="NeteaseCloudPlayIframeClassIcon"
            @mousedown="NeteaseShowClick"
            @mouseup="NeteaseIconUp = true"
          >
            <el-row>
              <el-col :pull="4" :span="1">
                <i v-bind:class="NeteaseIconClass"></i>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="23">
          <div
            v-bind:style="NeteaseCloudPlayIframeDivStyle"
            v-bind:class="NeteaseCloudPlayIframeDivClass"
          >
            <iframe
              v-bind:style="NeteaseCloudPlayIframeIframeStyle"
              frameborder="no"
              border="0"
              marginwidth="0"
              marginheight="0"
              width="280"
              height="86"
              src="//music.163.com/outchain/player?type=2&id=1898990940&auto=1&height=66"
            ></iframe>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--雪花和冰封的元素标签-->
    <transition name="el-fade-in-linear">
      <div v-if="showXueAndBing" class="hp_special_experience">
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
    </transition>
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
      NeteaseCloudPlayIframeStyle: "left:60px;top:40%;",
      NeteaseCloudPlayIframeMouseDownOrUp: false,
      NeteaseCloudPlayIframeClassIcon: "NeteaseCloudPlayIframeIcon",
      NeteaseCloudPlayIframeDivStyle: "left:-270px;",
      NeteaseCloudPlayIframeWindowWidth: 0,
      NeteaseIconSpan: 1,
      NeteaseIconClass: "el-icon-arrow-left",
      NeteaseCloudPlayIframeDivClass: "NeteaseCloudPlayIframeDiv",
      NeteaseGPSLeftOrRight: true,
      NeteaseGPSTop: 0,
      NeteaseGPSLeft: 0,
      NeteaseIfMove: false,
      NeteaseIconUp: false,
      NeteaseLockIframeIframeStyle: true,
      NeteaseCloudPlayIframeIframeStyle:
        "mask-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 1) 0%);",
      showXueAndBing: true,
    };
  },
  methods: {
    MusicDialogVisibleStart() {
      Public.daZiJiValue = false;
    },
    MusicDialogVisibleEnd() {
      Public.daZiJiValue = true;
      this.setupToNeteaseShow();
      setTimeout(() => {
        this.$refs.floatBall.tiShiMainShow();
      }, 3000);
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
    NeteaseCloudPlayIframeClick(event) {
      var e = event || window.event;
      var ValueX = e.pageX || e.clientX + document.body.scroolLeft;
      var ValueY = e.pageY || e.clientY + document.body.scrollTop;
      var x = ValueX - 10;
      var y = ValueY - 45;
      if (this.NeteaseCloudPlayIframeMouseDownOrUp == true) {
        if (this.NeteaseCloudPlayIframeClass != "NeteaseCloudPlayIframe") {
          this.NeteaseCloudPlayIframeClass = "NeteaseCloudPlayIframe";
        }
        var HalfWindowWidth = this.NeteaseCloudPlayIframeWindowWidth / 2;
        var ToCenterLong = ValueX - HalfWindowWidth;
        if (ToCenterLong > 0) {
          this.NeteaseCloudPlayIframeStyle =
            "left:" + x + "px;" + "top:" + y + "px;";
          this.NeteaseGPSLeft = x;
          this.NeteaseGPSTop = y;
          if (ToCenterLong < 270) {
            if (this.NeteaseGPSLeftOrRight != false) {
              this.NeteaseIconFlipClick();
              this.NeteaseGPSLeftOrRight = false;
              if (this.NeteaseLockIframeIframeStyle == false) {
                this.NeteaseCloudPlayIframeDivClass =
                  "NeteaseCloudPlayIframeDiv NeteaseCloudPlayIframeTransition";
                this.NeteaseCloudPlayIframeDivStyle = "left:-270px;";
              } else {
                this.NeteaseCloudPlayIframeDivClass =
                  "NeteaseCloudPlayIframeDiv";
                this.NeteaseCloudPlayIframeDivStyle = "left:0px;";
              }
            }
          }
        } else {
          this.NeteaseCloudPlayIframeStyle =
            "left:" + x + "px;" + "top:" + y + "px;";
          this.NeteaseGPSLeft = x;
          this.NeteaseGPSTop = y;
          if (HalfWindowWidth - ValueX < 270) {
            if (this.NeteaseGPSLeftOrRight != true) {
              this.NeteaseIconFlipClick();
              this.NeteaseGPSLeftOrRight = true;
              if (this.NeteaseLockIframeIframeStyle == false) {
                this.NeteaseCloudPlayIframeDivClass =
                  "NeteaseCloudPlayIframeDiv NeteaseCloudPlayIframeTransition";
                this.NeteaseCloudPlayIframeDivStyle = "left:0px;";
              } else {
                this.NeteaseCloudPlayIframeDivClass =
                  "NeteaseCloudPlayIframeDiv";
                this.NeteaseCloudPlayIframeDivStyle = "left:-270px;";
              }
            }
          }
        }
        this.NeteaseIfMove = true;
      }
    },
    NeteaseCloudPlayIframeForTouchClick(event) {
      var ValueX = event.targetTouches[0].clientX;
      var ValueY = event.targetTouches[0].clientY;
      var x = ValueX - 10;
      var y = ValueY - 45;
      if (this.NeteaseCloudPlayIframeMouseDownOrUp == true) {
        if (this.NeteaseCloudPlayIframeClass != "NeteaseCloudPlayIframe") {
          this.NeteaseCloudPlayIframeClass = "NeteaseCloudPlayIframe";
        }
        var HalfWindowWidth = this.NeteaseCloudPlayIframeWindowWidth / 2;
        var ToCenterLong = ValueX - HalfWindowWidth;
        if (ToCenterLong > 0) {
          this.NeteaseCloudPlayIframeStyle =
            "left:" + x + "px;" + "top:" + y + "px;";
          this.NeteaseGPSLeft = x;
          this.NeteaseGPSTop = y;
          if (ToCenterLong < 270) {
            if (this.NeteaseGPSLeftOrRight != false) {
              this.NeteaseIconFlipClick();
              this.NeteaseGPSLeftOrRight = false;
              if (this.NeteaseLockIframeIframeStyle == false) {
                this.NeteaseCloudPlayIframeDivClass =
                  "NeteaseCloudPlayIframeDiv NeteaseCloudPlayIframeTransition";
                this.NeteaseCloudPlayIframeDivStyle = "left:-270px;";
              } else {
                this.NeteaseCloudPlayIframeDivClass =
                  "NeteaseCloudPlayIframeDiv";
                this.NeteaseCloudPlayIframeDivStyle = "left:0px;";
              }
            }
          }
        } else {
          this.NeteaseCloudPlayIframeStyle =
            "left:" + x + "px;" + "top:" + y + "px;";
          this.NeteaseGPSLeft = x;
          this.NeteaseGPSTop = y;
          if (HalfWindowWidth - ValueX < 270) {
            if (this.NeteaseGPSLeftOrRight != true) {
              this.NeteaseIconFlipClick();
              this.NeteaseGPSLeftOrRight = true;
              if (this.NeteaseLockIframeIframeStyle == false) {
                this.NeteaseCloudPlayIframeDivClass =
                  "NeteaseCloudPlayIframeDiv NeteaseCloudPlayIframeTransition";
                this.NeteaseCloudPlayIframeDivStyle = "left:0px;";
              } else {
                this.NeteaseCloudPlayIframeDivClass =
                  "NeteaseCloudPlayIframeDiv";
                this.NeteaseCloudPlayIframeDivStyle = "left:-270px;";
              }
            }
          }
        }
        this.NeteaseIfMove = true;
      }
    },
    NeteaseCloudPlayIframeWindowWidthClick() {
      this.NeteaseCloudPlayIframeWindowWidth = $(window).width();
    },
    NeteaseIconFlipClick() {
      if (this.NeteaseIconClass == "el-icon-arrow-left") {
        this.NeteaseIconClass = "el-icon-arrow-right";
      } else {
        this.NeteaseIconClass = "el-icon-arrow-left";
      }
    },
    NeteaseHelpToEdge() {
      if (this.NeteaseCloudPlayIframeMouseDownOrUp == false) {
        if (this.NeteaseIfMove == true) {
          if (
            this.NeteaseCloudPlayIframeClass !=
            "NeteaseCloudPlayIframe NeteaseCloudPlayIframeTransition"
          ) {
            this.NeteaseCloudPlayIframeClass =
              "NeteaseCloudPlayIframe NeteaseCloudPlayIframeTransition";
          }
          if (this.NeteaseGPSLeftOrRight == true) {
            this.NeteaseCloudPlayIframeStyle =
              "left:" + 60 + "px;" + "top:" + this.NeteaseGPSTop + "px;";
          } else {
            this.NeteaseCloudPlayIframeStyle =
              "left:" +
              (this.NeteaseCloudPlayIframeWindowWidth - 80) +
              "px;" +
              "top:" +
              this.NeteaseGPSTop +
              "px;";
          }
        }
      }
    },
    NeteaseShowClick() {
      this.NeteaseIconUp = false;
      setTimeout(() => {
        if (this.NeteaseIconUp == true) {
          this.NeteaseCloudPlayIframeDivClass =
            "NeteaseCloudPlayIframeDiv NeteaseCloudPlayIframeDivTransition";
          let i;
          let x;
          let Show;
          let NotShow;
          if (this.NeteaseGPSLeftOrRight == true) {
            if (this.NeteaseCloudPlayIframeDivStyle != "left:-270px;") {
              this.NeteaseIconFlipClick();
              this.NeteaseLockIframeIframeStyle = true;
              this.NeteaseCloudPlayIframeDivStyle = "left:-270px;";
              i = 0;
              NotShow = setInterval(() => {
                i++;
                x = i + 20;
                if (i == 100) {
                  x = 100;
                }
                this.NeteaseCloudPlayIframeIframeStyle =
                  "mask-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) " +
                  i +
                  "%, rgba(0, 0, 0, 1) " +
                  x +
                  "%);";
                if (i == 100) {
                  clearInterval(NotShow);
                }
              }, 10);
            } else {
              this.NeteaseIconFlipClick();
              this.NeteaseLockIframeIframeStyle = false;
              this.NeteaseCloudPlayIframeDivStyle = "left:0px;";
              i = 100;
              Show = setInterval(() => {
                i--;
                x = i + 20;
                if (i == 0) {
                  x = 0;
                }
                this.NeteaseCloudPlayIframeIframeStyle =
                  "mask-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) " +
                  i +
                  "%, rgba(0, 0, 0, 1) " +
                  x +
                  "%);";
                if (i == 0) {
                  clearInterval(Show);
                }
              }, 10);
            }
          } else {
            if (this.NeteaseCloudPlayIframeDivStyle != "left:0px;") {
              this.NeteaseIconFlipClick();
              this.NeteaseLockIframeIframeStyle = true;
              this.NeteaseCloudPlayIframeDivStyle = "left:0px;";
              i = 0;
              NotShow = setInterval(() => {
                i++;
                x = i + 20;
                if (i == 100) {
                  x = 100;
                }
                this.NeteaseCloudPlayIframeIframeStyle =
                  "mask-image: -webkit-linear-gradient(right, rgba(0, 0, 0, 0) " +
                  i +
                  "%, rgba(0, 0, 0, 1) " +
                  x +
                  "%);";
                if (i == 100) {
                  clearInterval(NotShow);
                }
              }, 10);
            } else {
              this.NeteaseIconFlipClick();
              this.NeteaseLockIframeIframeStyle = false;
              this.NeteaseCloudPlayIframeDivStyle = "left:-270px;";
              i = 100;
              Show = setInterval(() => {
                i--;
                x = i + 20;
                if (i == 0) {
                  x = 0;
                }
                this.NeteaseCloudPlayIframeIframeStyle =
                  "mask-image: -webkit-linear-gradient(right, rgba(0, 0, 0, 0) " +
                  i +
                  "%, rgba(0, 0, 0, 1) " +
                  x +
                  "%);";
                if (i == 0) {
                  clearInterval(Show);
                }
              }, 10);
            }
          }
        }
      }, 200);
    },
    showXueAndBingClick(newValue) {
      this.showXueAndBing = newValue;
    },
    setupToNeteaseShow() {
      this.NeteaseShowClick();
      setTimeout(() => {
        this.NeteaseIconUp = true;
      }, 100);
      setTimeout(() => {
        this.NeteaseShowClick();
        setTimeout(() => {
          this.NeteaseIconUp = true;
        }, 100);
      }, 3000);
    },
  },
  mounted() {
    if (this.$route.name != "404") {
      this.MusicDialogVisible = true;
    }
    if (Public._isMobile()) {
      // alert("手机端")
      this.MusicDialogVisibleWidth = "80%";
      this.NeteaseCloudPlayIframeStyle = "left:60px;top:60%;";
    }
    $(() => {
      $(window).mousemove(this.NeteaseCloudPlayIframeClick);
      this.NeteaseCloudPlayIframeWindowWidthClick();
      $(window).resize(this.NeteaseCloudPlayIframeWindowWidthClick);
      $(window).mouseup(this.NeteaseHelpToEdge);
      $(window).on("touchend", this.NeteaseHelpToEdge);
    });
  },
};
</script>
<style scoped>
.NeteaseCloudPlayIframe {
  position: fixed;
  width: 0;
}
.NeteaseCloudPlayIframeIcon {
  user-select: none;
  top: 10px;
  position: absolute;
  height: 66px;
  width: 18px;
  background-color: #dcdfe6;
  z-index: 1;
}
.NeteaseCloudPlayIframeDiv {
  position: relative;
}
.NeteaseCloudPlayIframeIcon i {
  position: absolute;
  top: 22px;
  font-size: 25px;
  color: #606266;
}
.NeteaseCloudPlayIframeTransition {
  transition: all 1s ease;
}
.NeteaseCloudPlayIframeDivTransition {
  transition: all 1s linear;
}
</style>