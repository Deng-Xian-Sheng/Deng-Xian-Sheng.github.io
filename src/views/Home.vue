<template>
  <div>
    <div class="box" v-bind:style="boxStyle" v-loading.fullscreen.lock="fullscreenLoading">
      <el-collapse-transition>
        <div  v-show="BackgroundImgOneDiv" v-bind:style="BackgroundImgOneDivStyle" class="box BackgroundImgDivClass"></div>
      </el-collapse-transition>
        <el-collapse-transition>
        <div v-show="BackgroundImgTwoDiv" v-bind:style="BackgroundImgTwoDivStyle" class="box BackgroundImgDivClass"></div>
        </el-collapse-transition>
      <el-tooltip
        v-model="changeBackgroundExceed"
        :manual="true"
        effect="dark"
        placement="bottom-start"
      >
        <div slot="content">
          {{changeBackgroundExceedTextUp}}
          <br />
          {{changeBackgroundExceedTextDown}}
        </div>
        <el-button
          @click="changeBackgroundClick"
          v-show="changeBackgroundButtonIPhoneOrNot== false"
          class="el-icon-refresh changeBackgroundButton"
          size="mini"
          type="primary"
          plain
        >不好看，换一张？</el-button>
      </el-tooltip>
      <el-tooltip
        v-model="changeBackgroundExceedIPhone"
        :manual="true"
        effect="dark"
        placement="bottom-end"
      >
        <div slot="content">
          {{changeBackgroundExceedTextUp}}
          <br />
          {{changeBackgroundExceedTextDown}}
        </div>
        <el-button
          @click="changeBackgroundClick"
          v-show="changeBackgroundButtonIPhoneOrNot==true"
          class="changeBackgroundButtonIPhone"
          type="primary"
          circle
        >
          <i class="el-icon-refresh"></i>
        </el-button>
      </el-tooltip>
      <el-button
        @click="onOrOffVisionForContent=false;OffVisionForContentButtonShow=false"
        v-show="OffVisionForContentButtonShow"
        type="info"
        class="OffVisionForContent"
        circle
      >
        <i class="el-icon-view"></i>
      </el-button>
      <div class="BackgroundImgDescription" v-if="BackgroundImgDescriptionShow">
        <span>
          {{BackgroundImgDescriptionContent}}
          <a
            v-bind:href="bingImgUrl"
            download="BackgroundImg"
            target="_blank"
          >
            下载本图片
            <i class="el-icon-download"></i>
          </a>
        </span>
      </div>
      <transition name="el-fade-in-linear">
        <div
          @dblclick="onOrOffVisionForContent=true;OffVisionForContentButtonShow=true"
          v-show="onOrOffVisionForContent == false"
          v-bind:class="contentClass"
          v-bind:style="contentStyle"
        >
          <div id="contents"></div>
          <span>双击隐藏</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Public from "@/components/Public";
import $ from "jquery";
export default {
  name: "Home",
  data() {
    return {
      boxStyle: "",
      contentClass: "content",
      contentStyle: "",
      bingImgUrl: "",
      changeBackgroundCount: 0,
      getBingImgComputeInterval: null,
      onOrOffVisionForContent: false,
      OffVisionForContentButtonShow: false,
      changeBackgroundExceed: false,
      changeBackgroundExceedTextUp: "小姐姐/小哥哥，",
      changeBackgroundExceedTextDown: "还没找到喜欢的嘛？",
      changeBackgroundButtonIPhoneOrNot: false,
      changeBackgroundExceedIPhone: false,
      BackgroundImgDescriptionContent: "",
      BackgroundImgDescriptionShow: true,
      BackgroundImgOneDivStyle: "",
      BackgroundImgTwoDivStyle: "",
      BackgroundImgOneDiv: true,
      BackgroundImgTwoDiv: true,
      fullscreenLoading:false,
    };
  },
  methods: {
    //打字机
    daZiJi() {
      let str =
        "此后，我生命中有很多时刻，每当我遇到一个遥不可及的目标，或者一个令人畏惧的情境，当我感到惊慌失措时，我都能够轻松应对——因为我回想起了很久以前悬崖上的那一课。<br><br>我提醒自己不要看下面遥远的岩石，而是注意相对轻松、容易的第一小步，迈出一小步、再一小步，就这样体会每一步带来的成就感，直到达成了自己的目标。<br><br>这个时候，再回头看，就会对自己走过的这段漫漫长路感到惊讶和骄傲。<br><br>——《走一步再走一步》节选";
      let str_ = "";
      let i = 0;
      let content = document.getElementById("contents");
      let timer = setInterval(() => {
        if (Public.daZiJiValue == true) {
          if (str_.length < str.length) {
            str_ += str[i++];
            content.innerHTML = "<p>" + str_ + "_</p>"; //打印时加光标
          } else {
            clearInterval(timer);
            content.innerHTML = "<p>" + str_ + "</p>";
          }
        }
      }, 500);
    },
    getBingImg() {
      return new Promise((resolve) => {
        this.axios
          .get("//bing.uosblog.top")
          .then((response) => {
            if (response.status == 200) {
              var num = Math.floor(Math.random() * response.data.images.length);
              var img = new Image();
              img.onload = () => {
                resolve([num, response]);
              };
              img.onerror = () => {
                console.error(img, "图片预加载错误");
              };
              img.src = response.data.images[num].url;
            } else {
              console.error(response);
            }
          })
          .catch((error) => {
            // 请求失败处理
            console.error(error);
          });
      });
    },
    async getBingImgCompute(Type) {
      if (Type != "auto"){
        this.fullscreenLoading = true
        var out = await this.getBingImg();
        this.fullscreenLoading = false
      }else{
        out = await this.getBingImg();
      }
      this.bingImgUrl = out[1].data.images[out[0]].url;
      this.BackgroundImgDescriptionContent =
        out[1].data.images[out[0]].copyright;
      if ( this.BackgroundImgOneDiv == true) {
        this.BackgroundImgTwoDivStyle =
          "background-image:url('" + this.bingImgUrl + "');";
        this.BackgroundImgOneDiv = false;
      } else {
        this.BackgroundImgOneDivStyle =
          "background-image:url('" + this.bingImgUrl + "');";
        this.BackgroundImgOneDiv = true;
      }
      this.contentStyle = "--bingImgUrl:url('" + this.bingImgUrl + "');";
    },
    getBingImgComputeIntervalClick() {
      this.getBingImgComputeInterval = setInterval(() => {
        this.getBingImgCompute("auto");
      }, 30000);
    },
    changeBackgroundClick() {
      this.getBingImgCompute("not auto");
      this.changeBackgroundCount = this.changeBackgroundCount + 1;
      clearInterval(this.getBingImgComputeInterval); //重置自动换背景图的定时器，防止手动换图后短时间内又被更换
      this.getBingImgComputeIntervalClick();
      if (this.changeBackgroundCount > 5) {
        if (Public._isMobile()) {
          this.changeBackgroundExceedIPhone = true;
          setTimeout(() => {
            this.changeBackgroundExceedIPhone = false;
          }, 5000);
        } else {
          this.changeBackgroundExceed = true;
          setTimeout(() => {
            this.changeBackgroundExceed = false;
          }, 5000);
        }
        this.changeBackgroundCount = 0;
      }
    },
  },
  mounted() {
    this.daZiJi();
    if (Public._isMobile()) {
      // alert("手机端")
      this.contentClass = "contentiPhone";
      this.changeBackgroundButtonIPhoneOrNot = true;
      this.BackgroundImgDescriptionShow = false;
    }
    this.getBingImgCompute("not auto");
    this.getBingImgComputeIntervalClick();
    $(window).resize(() => {
      this.boxStyle =
        "height:" +
        $(window).height() +
        "px;width:" +
        $(window).width() +
        "px;";
    });
    this.boxStyle =
      "height:" + $(window).height() + "px;width:" + $(window).width() + "px;";
    setInterval(() => {
      this.changeBackgroundCount = 0;
    }, 20000);
  },
};
</script>
<style>
html,
body {
  overflow: hidden !important;
  /*禁止滚动处理*/
}
/*模糊的背景*/
.box {
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}
@media (min-width: 1300px) {
  .content {
    height: 60%;
    width: 60%;
    background-color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -30%;
    margin-top: -16%;
    border-radius: 4px;
  }
}
@media (max-width: 1300px) {
  .content {
    height: 60%;
    width: 60%;
    background-color: white;
    position: absolute;
    left: 50%;
    top: 40%;
    margin-left: -30%;
    margin-top: -16%;
    border-radius: 4px;
  }
}
/* filter是对该元素的模糊，因此对content添加并模糊伪元素，并定位到content的下层，而不是直接修改背景图或content的样式 */
.content span {
  position: absolute;
  top: 0px;
  font-size: 12px;
  color: #606266;
}

.content::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  filter: blur(3px);
  margin: -21px;
  background-image: var(--bingImgUrl);
  background-repeat: no-repeat;
  background-color: black;
  background-size: cover;
  opacity: 0.5;
}

.content p {
  padding: 20px 15px;
  color: #303133;
  text-indent: 20px;
  font-size: 14px;
  line-height: 28px;
  letter-spacing: 1px;
  /* 清除子元素对父元素filter属性值的继承 */
  filter: blur(0);
}
/*手机页面打字机css开始*/

.contentiPhone {
  height: 600px;
  width: 65%;
  background-color: white;
  position: absolute;
  left: 45%;
  top: 16%;
  margin-left: -30%;
  margin-top: -16%;
  border-radius: 4px;
}
/* filter是对该元素的模糊，因此对content添加并模糊伪元素，并定位到content的下层，而不是直接修改背景图或content的样式 */

.contentiPhone::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  filter: blur(3px);
  margin: -21px;
  background-image: var(--bingImgUrl);
  background-repeat: no-repeat;
  background-color: black;
  background-size: cover;
  opacity: 0.5;
}

.contentiPhone p {
  padding: 20px 15px;
  color: #303133;
  text-indent: 20px;
  font-size: 14px;
  line-height: 28px;
  letter-spacing: 1px;
  /* 清除子元素对父元素filter属性值的继承 */
  filter: blur(0);
}
.contentiPhone span {
  position: absolute;
  top: 0px;
  font-size: 12px;
  color: #606266;
}
/*手机页面打字机css结束*/
.changeBackgroundButton {
  position: absolute;
  top: 50px;
  right: 50px;
}
.changeBackgroundButtonIPhone {
  position: absolute;
  top: -24px;
  left: -30px;
  z-index: 3;
  height: 60px;
  width: 60px;
}
.changeBackgroundButtonIPhone i {
  position: relative;
  font-size: 30px;
  right: -10px;
  bottom: -10px;
}
.OffVisionForContent {
  position: absolute;
  top: -25px;
  right: -16px;
  z-index: 3;
  height: 60px;
  width: 60px;
}
.OffVisionForContent i {
  position: relative;
  font-size: 30px;
  left: -10px;
  bottom: -10px;
}
.BackgroundImgDescription {
  position: absolute;
  top: 10px;
  right: 50px;
  background-color: #909399;
  border-radius: 4px;
  padding: 4px;
  z-index: 3;
}
.BackgroundImgDescription span {
  font-size: 12px;
  color: rgb(255, 255, 255);
}
.BackgroundImgDescription a {
  color: rgb(226, 226, 226);
  text-decoration: none;
}
.BackgroundImgDivClass {
  width: 100%;
  height: 100%;
}
</style>