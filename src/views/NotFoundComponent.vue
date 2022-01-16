<template>
  <div class="NotFoundComponent">
    <el-dialog
      title="404，页面找不到啦"
      :visible.sync="DialogVisible"
      :destroy-on-close="true"
      :width="DialogVisibleWidth"
      center
    >
      <el-image class="image" :src="url" :fit="fit"></el-image>
      <el-row :gutter="20">
        <el-col :span="12" :offset="8">
          <div class="grid-content bg-purple">
            <span>{{ text }}</span>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="DialogVisible = false;goToIndex();">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Public from "@/components/Public";
export default {
  name: "NotFoundComponent",
  data() {
    return {
      text: "是否跳转到首页？",
      fit: "contain",
      url: "/image/404.png",
      DialogVisible: false,
      DialogVisibleWidth: "50%",
    };
  },
  methods: {
    goToIndex() {
      this.$router.push({ path: "/" });
    },
  },
  mounted() {
    if (Public._isMobile()) {
      // alert("手机端")
      this.DialogVisibleWidth = "80%";
    }
    this.DialogVisible = true;
  },
};
</script>
<style scoped>
.image {
  width: 100%;
}
</style>