<template>
  <div>
    <mt-popup id="listenGunDong" class="neiTuiClass" v-model="neiTui" position="right">
      <mt-header
        v-bind:class="headerGunDongGuoDuClass"
        v-bind:style="headerStyle"
        :title="neiTuiTitle"
      >
        <router-link to slot="left">
          <mt-button @click="Exit" icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="neiTuiMingYan">
        <el-row>
          <el-col :span="23" :push="1">
            <span class="neiTuiMingYanTitle">我的座右铭：</span>
            <div class="neiTuiMingYanContent">
              <span>一个高尚的人，一个纯粹的人，一个有道德的人，一个脱离了低级趣味的人，一个有益于人民的人。</span>
              <el-divider content-position="right">毛泽东《纪念白求恩》</el-divider>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-alert :title="neiTuiAlertTitle" :type="neiTuiAlertType" center :closable="false"></el-alert>
      <div @click="getPDFNumPagesCompute">
        <mt-cell :title="neiTuiLookJianLiButtonTitle" is-link>
          <mt-spinner
            v-if="neiTuiLookJianLiButtonSpinner == true"
            color="#26a2ff"
            type="double-bounce"
          ></mt-spinner>
        </mt-cell>
      </div>
      <div @click="lookWeiXin">
        <mt-cell :title="neiTuiLookWeiXinTitle" is-link></mt-cell>
      </div>
      <transition name="el-zoom-in-center">
        <el-dialog
          v-show="lookWeiXinDialogVisibleShow == true"
          :destroy-on-close="true"
          title
          :visible.sync="lookWeiXinDialogVisible"
          :width="lookWeiXinDialogVisibleWidth"
          center
          :modal="false"
          :before-close="lookWeiXin"
          :top="lookWeiXinDialogVisibleTop"
        >
          <el-image
            class="lookWeiXinDialogVisibleImgClass"
            :src="lookWeiXinDialogVisibleImgUrl"
            :fit="lookWeiXinDialogVisibleImgFit"
          ></el-image>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="lookWeiXin">确 定</el-button>
          </span>
        </el-dialog>
      </transition>
      <transition name="el-zoom-in-center">
        <div v-show="geRenJianLi == true">
          <PDF
            ref="geRenJianLi"
            :src="geRenJianLiURL"
            v-for="i in geRenJianLiPages"
            :key="i"
            :page="i"
          ></PDF>
        </div>
      </transition>
    </mt-popup>
  </div>
</template>
<script>
import Public from "@/components/Public";
import $ from "jquery";
export default {
  name: "NeiTui",
  data() {
    return {
      neiTui: false,
      neiTuiTitle: "联系作者-帮我内推！",
      geRenJianLiURL: "https://uosblog.top/diy/look_pdf/web/pdf_file/grjl.pdf",
      geRenJianLiPages: null,
      neiTuiAlertTitle: "我很荣幸的等到您！您可以通过以下方式与我深入交流～",
      neiTuiAlertType: "info",
      neiTuiLookJianLiButtonTitle: "查看简历",
      neiTuiLookJianLiButtonSpinner: false,
      getPDFNumPagesResultErrorIf: null,
      neiTuiLookWeiXinTitle: "查看微信",
      geRenJianLi: false,
      lookWeiXinDialogVisible: false,
      lookWeiXinDialogVisibleImgUrl: "/image/weiXin.jpg",
      lookWeiXinDialogVisibleImgFit: "cover",
      lookWeiXinDialogVisibleShow: false,
      lookWeiXinDialogVisibleWidth: "30%",
      lookWeiXinDialogVisibleTop: "15vh",
      headerStyleNumber: 0,
      headerStyle: "",
      headerGunDongGuoDuClass: "",
    };
  },
  methods: {
    setup() {
      if (Public._isMobile()) {
        // alert("手机端")
        this.neiTui = true;
        this.lookWeiXinDialogVisibleWidth = "80%";
        this.lookWeiXinDialogVisibleTop = "10vh";
        $("#listenGunDong").scroll(this.listenGunDongClick);
      }
    },
    getPDFNumPages(url) {
      this.getPDFNumPagesResultErrorIf = setTimeout(() => {
        if (this.neiTuiLookJianLiButtonSpinner == true) {
          console.error("个人简历加载失败");
          this.neiTuiLookJianLiButtonSpinner = false;
          let getPDFNumPagesResultError = this.$toast({
            message: "对不起，简历加载失败",
            iconClass: "el-icon-close",
          });
          setTimeout(() => {
            getPDFNumPagesResultError.close();
          }, 2000);
        }
      }, 10000);
      //计算pdf页码总数
      let loadingTask = this.PDF.createLoadingTask(url);
      return new Promise((resolve) => {
        loadingTask.promise
          .then((pdf) => {
            resolve([pdf.numPages, null]);
          })
          .catch((err) => {
            resolve([null, err]);
          });
      });
    },
    async getPDFNumPagesCompute() {
      this.geRenJianLi = false;
      this.neiTuiLookJianLiButtonSpinner = true;
      var getPDFNumPagesResult = await this.getPDFNumPages(this.geRenJianLiURL);
      if (getPDFNumPagesResult[-1] != null) {
        console.error("个人简历加载失败", getPDFNumPagesResult[-1]);
        clearTimeout(this.getPDFNumPagesResultErrorIf);
        this.neiTuiLookJianLiButtonSpinner = false;
        let getPDFNumPagesResultError = this.$toast({
          message: "对不起，简历加载失败",
          iconClass: "el-icon-close",
        });
        setTimeout(() => {
          getPDFNumPagesResultError.close();
        }, 2000);
      } else {
        this.geRenJianLiPages = getPDFNumPagesResult[0];
        this.neiTuiLookJianLiButtonSpinner = false;
        clearTimeout(this.getPDFNumPagesResultErrorIf);
        setTimeout(() => {
          this.geRenJianLi = true;
        }, 1000);
      }
    },
    lookWeiXin() {
      this.lookWeiXinDialogVisibleShow = !this.lookWeiXinDialogVisibleShow;
      setTimeout(() => {
        this.lookWeiXinDialogVisible = !this.lookWeiXinDialogVisible;
      }, 500);
    },
    listenGunDongClick() {
      var result = $("#listenGunDong").scrollTop();
      if (result < this.headerStyleNumber) {
        this.headerGunDongGuoDuClass = "";
        this.headerStyleNumber = 0;
      } else if (result > this.headerStyleNumber) {
        this.headerGunDongGuoDuClass = "headerGunDongGuoDu";
        this.headerStyleNumber = result;
      }
      this.headerStyle = "top:" + this.headerStyleNumber + "px!important;";
    },
    Exit() {
      this.neiTui = false;
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
.neiTuiClass {
  background-color: #fff;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.neiTuiMingYan {
  margin-top: 20px;
}
.neiTuiMingYanContent {
  margin-top: 10px;
}
.neiTuiMingYanTitle {
  color: #909399;
}
.lookWeiXinDialogVisibleImgClass {
  width: 100%;
}
.headerGunDongGuoDu {
  transition: top 1s ease;
}
</style>