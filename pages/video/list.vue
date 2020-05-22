<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item>场景</a-breadcrumb-item>
      <a-breadcrumb-item>{{menutitle}}</a-breadcrumb-item>
    </a-breadcrumb>
    <!-- <a-button type="primary" style="float:right;" @click="tother">实时监控</a-button> -->
    <a-divider />
    <a-table :columns="columns" :rowKey="record => record.id" :dataSource="data" :loading="loading">
      <template slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="look(record)">预览</a>
      </template>
    </a-table>
    <a-drawer
      title="详情预览"
      placement="right"
      :closable="false"
      width="800"
      @close="onClose"
      :visible="visible"
    >
      <a-row>
        <a-col>
          <video width="100%" controls autoplay :src="Detial.videopath"></video>
          <!-- <video width="100%" controls :src="Detial.videopath"></video> -->
          <!-- <a-button @click="show">查看详情</a-button> -->
          <div class="imgs">
            <img @click="showModal" v-for="(item , id) of imgs" :key="id" :src="item" alt />
          </div>
        </a-col>
      </a-row>
      <a-row>
        <div style="width:auto;overflow:auto;height:100%;">
          <img
            v-for="(item,id) in Detial.images"
            :key="id"
            :src="item"
            style="width:200px;margin:5px;"
            alt
          />
        </div>
      </a-row>
    </a-drawer>
    <a-modal title="分析结果" v-model="visible1" @ok="handleOk" width="1000px">
      <img style="width:100%" :src="tarimg" alt />
    </a-modal>
  </div>
</template>
<script>
import $ from "jquery";
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
export default {
  data() {
    return {
      tarimg: "",
      visible1: false,
      imgs: [],
      url: "",
      menutitle: "",
      visible: false,
      loading: false,
      time: null,
      endparse: "", //视频解析结束时间
      columns: [
        {
          title: "场景名称",
          dataIndex: "scenename",
          width: "10%",
          scopedSlots: { customRender: "scenename" }
        },
        {
          title: "场景描述",
          dataIndex: "scenedescribe",
          width: "50%",
          scopedSlots: { customRender: "scenedescribe" }
        },
        {
          title: "道路类型",
          dataIndex: "routetype",
          width: "10%",
          scopedSlots: { customRender: "routetype" }
        },
        {
          title: "场景类型",
          dataIndex: "scenetype",
          width: "10%",
          scopedSlots: { customRender: "scenetype" }
        },
        {
          title: "场景来源",
          dataIndex: "scenefrom",
          width: "10%",
          scopedSlots: { customRender: "scenefrom" }
        },
        {
          title: "场景数据",
          width: "10%",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
      Detial: {
        videopath: "",
        images: []
      },
      videoparse: ""
    };
  },
  created() {
    let InfoName = this.$route.query.catalog;
    if (InfoName != "") {
      this.menutitle = InfoName;
      this.GetData();
    }
    // this.show()
  },
  mounted() {
    clearInterval(this.time);
    this.imgs = [];
    this.climg();
  },
  watch: {
    $route(to, from) {
      console.log(to.query.catalog);
      if (to.query.catalog != undefined) {
        this.menutitle = to.query.catalog;
        this.GetData();
      }
    }
  },
  methods: {
    show() {
      let _this = this;
      this.$message.success("开始解析视频").then(() => {
        this.$message.info("视频正在解析中…………");
      });
    },
    GetData() {
      let that = this;
      console.log(this.menutitle);
      fetch("/scene/GetAllByScenelog", { scenelog: this.menutitle }).then(
        res => {
          console.log("GetData" + res);
          this.data = [];
          let result = res.data.filter(item => {
            return item.scenelog == that.menutitle;
          });
          this.data.push(...result);
        }
      );
    },
    tother() {
      window.location.href = "http://120.27.227.253:8550/#/";
    },
    look(info) {
      //调用接口
      this.show();
      let that = this;
      console.log(info, 1);
      fetch("/scene/FindBydirectory", {
        videodirectory: info.scenedata.split("/")[0]
      }).then(res => {
        console.log(res);
        that.Detial.videopath = `${defultfilepath}/${info.scenedata}`;
        that.url = `${res.data[0].videodirectory}\\${res.data[0].videoname}`;
        this.videoParse();
        if (res.data.length > 0) {
          for (let i = 0; i < Number(res.data[0].imagelength); i++) {
            that.Detial.images.push(
              `${defultfilepath}${res.data[0].videodirectory}/result/res_${i}.jpg`
            );
          }
          this.visible = true;
          console.log(that.Detial);
        } else {
          that.$message.info("视频未完成计算。。。");
          this.visible = true;
        }
      });
    },
    onClose() {
      this.visible = false;
    },
    //视频解析
    videoParse() {
      let baseurl = "http://106.12.111.224:9010";
      this.imgs = [];
      NProgress.start();
      clearInterval(this.time);
      let _this = this;
      let url = this.url;
      console.log(url);
      // axios.post('http://192.168.100.44:9010/video/change',url).then((data)=>{
      //     console.log(data);
      //     // this.videoparse = data
      // })
      var timenum = 0;
      clearInterval(ti);
      let ti = setInterval(() => {
        timenum++;
      }, 1000);
      this.$.post(baseurl + "/video/change", { path: url }, data => {
        clearInterval(ti);
        this.endparse = timenum;
        this.$message.success("分析结束");
        NProgress.done();
        console.log("收到结束信息");
        clearInterval(this.time);
      });

      //获取图片
      this.time = setInterval(() => {
        get();
      }, 1000);
      function get() {
        _this.$.post(baseurl + "/video/change1", data => {
          console.log("开始获取信息", data);
          _this.imgs = [];
          data.forEach(v => {
            v = v.substring(23);
            _this.imgs.push("http://119.3.210.185:9999//" + v);
          });
        });
      }
    },
    climg() {
      document.onclick = e => {
        if (e.target.nodeName == "IMG") {
          let src = e.target.src;
          this.tarimg = src;
        }
      };
    },
    showModal() {
      console.log("打开");
      this.visible1 = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible1 = false;
    }
  }
};
</script>
<style scoped>
.rightpic {
  width: 510px;
  height: 600px;
  overflow: auto;
  float: right;
}
.ant-modal-body {
  height: 600px !important;
}
.imgs {
  height: 360px;
  width: 100%;
  border: 1px solid gray;
  overflow: auto;
  padding: 10px;
  box-sizing: border-box;
}
.imgs::-webkit-scrollbar {
  display: none;
}
.imgs img {
  width: 18%;
  margin: 5px;
}
.ant-modal {
  width: 1000px !important;
}
</style>