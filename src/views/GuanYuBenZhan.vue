<template>
  <div>
    <transition name="el-zoom-in-center">
      <div v-show="guanYuBenZhan == true" class="guanYuBenZhanClass">
        <mt-header fixed :title="guanYuBenZhanTitle">
          <router-link to slot="left">
            <mt-button @click="Exit" icon="back">返回</mt-button>
          </router-link>
        </mt-header>
        <div class="guanYuBenZhanContent">
          <mavon-editor
            :toolbarsFlag="false"
            defaultOpen="preview"
            :subfield="false"
            :editable="false"
            v-model="benZhanMarkdown"
            :boxShadow="false"
            previewBackground="#fff"
          />
          <mt-cell title="友情链接："></mt-cell>
          <el-row>
            <el-col :span="24" :offset="4">
              <div
                class="grid-content bg-purple"
                v-for="titleLink in youQingLink"
                :key="titleLink.link"
              >
                <el-link
                  :href="titleLink.link"
                  target="_blank"
                  underline
                  type="primary"
                  icon="el-icon-link"
                >{{titleLink.title}}</el-link>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Public from "@/components/Public";
export default {
  name: "GuanYuBenZhan",
  data() {
    return {
      guanYuBenZhan: false,
      guanYuBenZhanTitle: "关于本站-邓文怡.com",
      benZhanMarkdown: "",
      youQingLink: [
        { title: "FJD安全团队官网", link: "https://fjd.geekzwzs.cn" },
        { title: "邓文怡的新浪微博", link: "https://weibo.com/u/5863228053" },
        { title: "Deng-Xian-Sheng的CSDN博客", link: "https://blog.csdn.net/Deng_Xian_Sheng" },
      ],
    };
  },
  methods: {
    setup() {
      if (Public._isMobile()) {
        // alert("手机端")
        /*获取ZuoZheREADME开始*/
        var resultGetBenZhanREADME = this.getMDFile(
          "/markdown/BenZhanREADME.md"
        );
        if (resultGetBenZhanREADME[1] == 200) {
          this.benZhanMarkdown = resultGetBenZhanREADME[0];
        }
        /*获取ZuoZheREADME结束*/
        this.guanYuBenZhan = true;
      }
    },
    getMDFile(path) {
      let xhr = new XMLHttpRequest(),
        okStatus = document.location.protocol === "file:" ? 0 : 200;
      xhr.open("GET", path, false); // 文件路径
      xhr.overrideMimeType("text/html;charset=utf-8"); //默认为utf-8
      xhr.send(null);
      return [xhr.responseText, okStatus];
    },
    Exit() {
      this.guanYuBenZhan = false;
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
.guanYuBenZhanClass {
  background-color: #fff;
  position: fixed;
  z-index: 2009;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
.mint-header {
  z-index: 2009 !important;
}
.guanYuBenZhanContent {
  margin-top: 20px;
}
</style>