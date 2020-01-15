<template>
    <a-layout id="components-layout-demo-responsive">
    <a-layout-sider
      breakpoint="lg"
      collapsedWidth="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <!-- <div class="scenetitle">南理工车路协同<br/>场景库</div> -->
      <Menu />
      <nuxt-link class="addscene" to="/scene/add">新增场景</nuxt-link>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }" >
        <!-- <a-menu v-model="current" mode="horizontal">
          <a-menu-item key="tree">场景-树形搜索</a-menu-item>
          <a-menu-item key="keyword">场景-关键词搜索</a-menu-item>
        </a-menu> -->
        <div class="maintitle">南京理工大学车路协同场景识别库</div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <nuxt />
        </div>
      </a-layout-content>
      <a-layout-footer style="textAlign: center">
        
      </a-layout-footer>
    </a-layout>
  </a-layout> 
</template>

<script>
import Menu from '~/components/Menu'; 
export default {
  data(){
    return{
      current: ['tree'],
    }
  },
  components:{
    Menu
  },
  methods: {
      onCollapse(collapsed, type) {
        console.log(collapsed, type);
      },
      onBreakpoint(broken) {
        console.log(broken);
      },
    },
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  display: block;
  height: 100%;
}
#__nuxt{
  height: 100%;
}
#__layout{
  height: 100%;
}
.ant-layout{
  height: 100%;
  background: #e1edff;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.addscene{
  position: fixed;
  bottom: 20px;
  color: #fff !important;
  left: 2.5%;
}
.scenetitle{
  text-align: center;
  font-size:20px;
  font-weight:bold;
  color: #fff;
  margin: 10px;
}
.maintitle{
  width: 100%;
  line-height: 50px;
  text-align: center;
  color: #000;
  font-size: 25px;
  font-weight:bold;
}
</style>
