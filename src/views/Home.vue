<template>
  <div>
    <div class="box" v-bind:style="boxStyle">
      <el-button
        @click="changeBackgroundClick"
        class="el-icon-refresh changeBackgroundButton"
        size="mini"
        type="primary"
        plain
      >不好看，换一张？</el-button>
      <div
        @dblclick="onOrOffVisionForContent=!onOrOffVisionForContent"
        v-show="onOrOffVisionForContent == false"
        v-bind:class="contentClass"
        v-bind:style="contentStyle"
        id="contents"
      ></div>
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
      onOrOffVisionForContent:false
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
          .get("http://bing.getlove.cn/latelyBingImageStory")
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            // 请求失败处理
            console.error(error);
          });
      });
    },
    async getBingImgCompute() {
      var out = await this.getBingImg();
      if (out.status == 200) {
        this.bingImgUrl =
          out.data[Math.floor(Math.random() * out.data.length)].CDNUrl;
        this.boxStyle =
          "height:" +
          $(window).height() +
          "px;width:" +
          $(window).width() +
          "px;background-image:url('" +
          this.bingImgUrl +
          "');";
        this.contentStyle = "--bingImgUrl:url('" + this.bingImgUrl + "');";
      } else {
        console.error(out);
      }
    },
    getBingImgComputeIntervalClick() {
      this.getBingImgComputeInterval = setInterval(() => {
        this.getBingImgCompute();
      }, 30000);
    },
    changeBackgroundClick() {
      this.getBingImgCompute();
      this.changeBackgroundCount = this.changeBackgroundCount + 1;
      clearInterval(this.getBingImgComputeInterval); //重置自动换背景图的定时器，防止手动换图后短时间内又被更换
      this.getBingImgComputeIntervalClick();
      if (this.changeBackgroundCount > 5) {
        alert("小姐姐，还找不到喜欢的嘛？");
        this.changeBackgroundCount = 0;
      }
    },
  },
  mounted() {
    this.daZiJi();
    if (Public._isMobile()) {
      // alert("手机端")
      this.contentClass = "contentiPhone";
    }
    this.getBingImgCompute();
    this.getBingImgComputeIntervalClick();
    $(window).resize(() => {
      this.boxStyle =
        "height:" +
        $(window).height() +
        "px;width:" +
        $(window).width() +
        "px;background-image:url('" +
        this.bingImgUrl +
        "');";
    });
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
  color: black;
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
  color: black;
  text-indent: 20px;
  font-size: 14px;
  line-height: 28px;
  letter-spacing: 1px;
  /* 清除子元素对父元素filter属性值的继承 */
  filter: blur(0);
}
/*手机页面打字机css结束*/
.changeBackgroundButton {
  position: relative;
  float: right;
  top: 50px;
  right: 50px;
}
</style>
<!--修改换一换超过提示，全局禁止滚动处理，背景图加载动画（非手动更换背景不要加载动画），背景图更换动画，换一换按钮手机端适配处理，图片描述，中央文字块隐藏问题，下载本图片-->