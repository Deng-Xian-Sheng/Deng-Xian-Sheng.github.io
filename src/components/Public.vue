<script type="text/javascript">
    // 定义一些公共的属性和方法
    var daZiJiValue = true
    var MusicTiShi = false
    function _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    }
    // 暴露出这些属性和方法
    export default {
        daZiJiValue,
        MusicTiShi,
        _isMobile
    }
</script>