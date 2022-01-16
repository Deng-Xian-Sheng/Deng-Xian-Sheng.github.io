<template>
  <div>
    <mt-popup
      class="lianXiZuoZheClass"
      v-model="lianXiZuoZhe"
      position="right"
    >
      <mt-header :title="lianXiZuoZheTitle">
        <router-link to slot="left">
          <mt-button @click="Exit" icon="back">返回</mt-button>
        </router-link>
        <mt-button @click="juanZhu=true" icon="more" slot="right"></mt-button>
      </mt-header>
      <el-row :gutter="20">
        <el-col :span="12" :offset="9">
          <div class="grid-content bg-purple zuoZheTouXiangClass" @click="zuoZheTouXiangDaTuChufa">
            <el-avatar shape="square" :size="80" :src="zuoZheTouXiangUrl" :fit="zuoZheTouXiangFit">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
            </el-avatar>
          </div>
        </el-col>
      </el-row>
      <el-image
        v-show="false"
        id="zuoZheTouXiangDaTu"
        style="width: 100px; height: 100px"
        :src="zuoZheTouXiangUrl"
        :preview-src-list="zuoZheTouXiangUrlList"
      ></el-image>
      <mavon-editor
        :toolbarsFlag="false"
        defaultOpen="preview"
        :subfield="false"
        :editable="false"
        v-model="zuoZheMarkdown"
        :boxShadow="false"
        previewBackground="#fff"
      />
      <div @click="goToQQ(lianXiZuoZheQQValue)">
        <mt-cell :title="lianXiZuoZheQQTitle" is-link :value="lianXiZuoZheQQValue"></mt-cell>
      </div>
      <div
        class="copyMailboxIPhone"
        :data-clipboard-text="lianXiZuoZheMailboxValue"
        @click="copyMailbox"
      >
        <mt-cell :title="lianXiZuoZheMailboxTitle" is-link :value="lianXiZuoZheMailboxValue"></mt-cell>
      </div>
    </mt-popup>
    <mt-actionsheet :actions="juanZhuXuanXiang" v-model="juanZhu"></mt-actionsheet>
    <router-view class="view popupNeiTui"></router-view>
  </div>
</template>
<script>
import Public from "@/components/Public";
export default {
  name: "LianXiZuoZhe",
  data() {
    return {
      lianXiZuoZhe: false,
      lianXiZuoZheTitle: "联系作者-邓文怡.com",
      juanZhu: false,
      juanZhuXuanXiang: [
        {
          name: "捐助！",
          method: this.juanZhuClickJuan,
        },
        {
          name: "帮我内推！",
          method: this.juanZhuClickTui,
        },
      ],
      zuoZheTouXiangUrl: "/image/zuoZheTouXiangImg.png",
      zuoZheTouXiangFit: "contain",
      zuoZheTouXiangUrlList: ["/image/zuoZheTouXiangImg.png"],
      zuoZheMarkdown: "",
      lianXiZuoZheQQTitle: "联系作者QQ",
      lianXiZuoZheQQValue: 2966681280,
      lianXiZuoZheMailboxTitle: "联系作者邮箱",
      lianXiZuoZheMailboxValue: "breezy@geekzwzs.cn",
    };
  },
  methods: {
    setup() {
      if (Public._isMobile()) {
        // alert("手机端")
        /*获取ZuoZheREADME开始*/
        var resultGetZuoZheREADME = this.getMDFile("/markdown/ZuoZheREADME.md");
        if (resultGetZuoZheREADME[1] == 200) {
          this.zuoZheMarkdown = resultGetZuoZheREADME[0];
        }
        /*获取ZuoZheREADME结束*/
        this.lianXiZuoZhe = true;
      }
    },
    juanZhuClickJuan() {
      this.$router.push({ path: "/juanzhu" });
    },
    juanZhuClickTui() {
      this.$router.push({ path: "/lianxizuozhe/neitui" });
    },
    zuoZheTouXiangDaTuChufa() {
      document.getElementById("zuoZheTouXiangDaTu").click();
    },
    getMDFile(path) {
      let xhr = new XMLHttpRequest(),
        okStatus = document.location.protocol === "file:" ? 0 : 200;
      xhr.open("GET", path, false); // 文件路径
      xhr.overrideMimeType("text/html;charset=utf-8"); //默认为utf-8
      xhr.send(null);
      return [xhr.responseText, okStatus];
    },
    goToQQ(ID) {
      this.$indicator.open({
        text: "正在唤醒QQ...",
        spinnerType: "double-bounce",
      });
      setTimeout(() => {
        this.$indicator.close();
        setTimeout(() => {
          window.open("http://wpa.qq.com/msgrd?v=3&uin=" + ID);
        }, 500);
      }, 1000);
    },
    copyMailbox() {
      var clipboard = new this.Clipboard(".copyMailboxIPhone");
      clipboard.on("success", () => {
        let copyMailboxInstance = this.$toast({
          message: "邮箱已复制",
          iconClass: "el-icon-check",
        });
        setTimeout(() => {
          copyMailboxInstance.close();
        }, 2000);
        //  释放内存
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        // 不支持复制
        let copyMailboxInstance = this.$toast({
          message: "对不起，复制失败",
          iconClass: "el-icon-close",
        });
        setTimeout(() => {
          copyMailboxInstance.close();
        }, 2000);
        // 释放内存
        clipboard.destroy();
      });
    },
    Exit() {
      this.lianXiZuoZhe = false;
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
.lianXiZuoZheClass {
  background-color: #fff;
  width: 100%;
  height: 100%;
}
.zuoZheTouXiangClass {
  margin-top: 20px;
}
.mint-indicator {
  z-index: 9999;
  position: fixed;
}
.mint-toast {
  z-index: 9999 !important;
}
</style>