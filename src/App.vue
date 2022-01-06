<template>
  <div>
    <div class="box">
      <div class="content" id="contents"></div>
    </div>
    <FloatBall :text="'哈哈'"></FloatBall>
  </div>
</template>

<script>
export default {
  name: "App",
  meta: {
    // 页面标题title
    title: "说说话-邓文怡.com",
  },
  methods: {
    //打字机
    start() {
      let str =
        "此后，我生命中有很多时刻，每当我遇到一个遥不可及的目标，或者一个令人畏惧的情境，当我感到惊慌失措时，我都能够轻松应对——因为我回想起了很久以前悬崖上的那一课。<br><br>我提醒自己不要看下面遥远的岩石，而是注意相对轻松、容易的第一小步，迈出一小步、再一小步，就这样体会每一步带来的成就感，直到达成了自己的目标。<br><br>这个时候，再回头看，就会对自己走过的这段漫漫长路感到惊讶和骄傲。<br><br>——《走一步再走一步》节选";
      let str_ = "";
      let i = 0;
      let content = document.getElementById("contents");
      let timer = setInterval(() => {
        if (str_.length < str.length) {
          str_ += str[i++];
          content.innerHTML = "<p>" + str_ + "_</p>"; //打印时加光标
        } else {
          clearInterval(timer);
          content.innerHTML = "<p>" + str_ + "</p>";
        }
      }, 500);
    },
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
  },
  mounted() {
    this.$alert("本站有背景音乐哦，请注意避免公共场合外放！", "注意⚠️", {
      confirmButtonText: "确定",
      center: true,
      callback: () => {
        this.start();
      },
    });
    if (this._isMobile()) {
      // alert("手机端")
      document
        .getElementById("contents")
        .setAttribute("class", "contentiPhone");
    }
  },
};
</script>

<style>
/*模糊的背景*/
/* .box {
            width: 750px;
            height: 400px;
            background: url('./img/timg.jpg') no-repeat 100% 100%; 
            background-size: cover;
            position: relative;
        } */

.content {
  height: 60%;
  width: 60%;
  background: white;
  position: absolute;
  left: 50%;
  top: 40%;
  margin-left: -30%;
  margin-top: -16%;
  border-radius: 4px;
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
  /* background: url('./img/timg.jpg') no-repeat 100% 100%; */
  background-color: black;
  background-size: cover;
  opacity: 0.8;
}

.content p {
  padding: 20px 15px;
  color: white;
  text-indent: 20px;
  font-size: 14px;
  line-height: 28px;
  letter-spacing: 1px;
  /* 清除子元素对父元素filter属性值的继承 */
  filter: blur(0);
}
/*手机页面打字机css开始*/

.contentiPhone {
  height: 800px;
  width: 65%;
  background: white;
  position: absolute;
  left: 45%;
  top: 25%;
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
  /* background: url('./img/timg.jpg') no-repeat 100% 100%; */
  background-color: black;
  background-size: cover;
  opacity: 0.8;
}

.contentiPhone p {
  padding: 20px 15px;
  color: white;
  text-indent: 20px;
  font-size: 14px;
  line-height: 28px;
  letter-spacing: 1px;
  /* 清除子元素对父元素filter属性值的继承 */
  filter: blur(0);
}
/*手机页面打字机css结束*/
</style>
