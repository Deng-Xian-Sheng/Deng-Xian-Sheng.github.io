<template>
  <div>
    <router-view />
    <FloatBall :text="''"></FloatBall>
    <el-dialog
      title="注意⚠️"
      :visible.sync="MusicDialogVisible"
      :destroy-on-close="true"
      :width="MusicDialogVisibleWidth"
      @open="MusicDialogVisibleStart"
      @close="MusicDialogVisibleEnd"
    >
    <span>本站有背景音乐哦，请注意避免公共场合外放！</span>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="MusicDialogVisible = false;">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Public from '@/components/Public'
export default {
  name: "App",
  data(){
    return{
    MusicDialogVisible:false,
    MusicDialogVisibleWidth:"35%",
    }
  },
  methods:{
    MusicDialogVisibleStart(){
      Public.daZiJiValue=false
      Public.MusicTiShi=false
    },
    MusicDialogVisibleEnd(){
      Public.daZiJiValue=true
      Public.MusicTiShi=true
    },
  },
  mounted() {
    if (this.$route.name != "404") {
      this.MusicDialogVisible = true
    }
    if (Public._isMobile()) {
      // alert("手机端")
      this.MusicDialogVisibleWidth = "80%"
    }
  },
};
</script>