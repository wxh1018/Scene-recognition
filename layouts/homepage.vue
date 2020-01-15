<template>
    <div class="contentmain">
        <div class="topmain">
          <div class="topcover">
            <div class="position1">
              <div class="position2">
                南京理工大学智能网联车路协同系统
              </div>
            </div>
          </div>
        </div>
        <div class="buttommain">
          <a-row type="flex" justify="space-around" align="middle">
            <a-col :span="4">
              <a-card hoverable style="width: 240px" @click="jumptoother">
                <img alt="云控平台" src="../static/img/cloud.jpg" slot="cover"/>
                <a-card-meta title="云控平台"></a-card-meta>
              </a-card>
            </a-col>
          
            <a-col :span="4">
              <a-card hoverable style="width: 240px" @click="()=>$router.push('/home')">
                <img alt="车载场景" src="../static/img/car.jpg" slot="cover"/>
                <a-card-meta title="车载场景" ></a-card-meta>
              </a-card>
            </a-col>
            <!-- <a-col :span="3">
              <a-card hoverable style="width: 240px">
                <img alt="路测场景" src="../static/img/line.jpg" slot="cover"/>
                <a-card-meta title="路测场景"></a-card-meta>
              </a-card>
            </a-col> -->
            </a-row>
          <footer>
            南京理工大学 <br>
            江苏智能交通信息感知和数据分析工程实验室 <br>
            技术支持：江苏智城慧宁交通科技有限公司 <br>
          </footer>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    methods:{
      tojump(url){
        
      },
      jumptoother(){
          window.location.href='http://119.3.210.185:8550/#/'
      }
    }
}
</script>
<style scoped>
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

.ant-card-meta{
      margin: -8px 63px!important;
}
.ant-card-meta-title{
  display: flex;
  justify-content: center;
  align-items: center;
}
.contentmain{
  width: 100%;
  height: 100%;
}
.topmain{
  width: 100%;
  height: 60%;
  background: url("../static/img/homepage.jpg") no-repeat center center;
  background-size: cover;
}
.topcover{
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 2555, .2);
  box-shadow:inset 0px 0px 5px 5px #000;
  
}
.position1{
  width: 100%;
  height: 100%;
  position: relative;
  top: -50%;
}
.position1{
  width: 100%;
  height: 100px;
  position: relative;
  top: 40%;
  color: #fff;
  text-shadow: 5px 5px 5px #000;
  font-family: "\534e\6587\65b0\9b4f";
  font-size: 50px;
  text-align: center;
  line-height: 100px;
}
.buttommain{
  width: 100%;
  height: 40%;
  background-color: #eaeaea;
  padding-top: 2%;
}
footer{
  width: 100%;
  height: 7%;
  position: fixed;
  bottom: 0;
  text-align: center;
  color: #858585;
}
</style>