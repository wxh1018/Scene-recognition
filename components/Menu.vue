<template>
  <div >
    <a-popconfirm
      class="out"
      placement="leftTop"
      okText="Yes"
      cancelText="No"
      @confirm="confirm"
      style="position:fixed;right:30px;
      top:10px;z-index:100"
    >
      <template slot="title">
        <p>{{text}}</p>
      </template>
      <a-button>
        <a-icon type="export" style="fontSize:10px" />
      </a-button>
    </a-popconfirm>

    <a-menu mode="inline" theme="dark" :inlineCollapsed="collapsed">
      <template v-for="item in list">
        <a-menu-item v-if="!item.children" :key="item.key" @click="Jump(item)">
          <span>{{item.title}}</span>
        </a-menu-item>
        <SubMenu v-else :menu-info="item" :key="item.key" />
      </template>
    </a-menu>
  </div>
</template>
<script>
import SubMenu from "~/components/SubMenu";
export default {
  components: {
    SubMenu
  },
  data() {
    return {
      list: [],
      collapsed: true,
      text: "您确定要退出吗？"
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    confirm() {
      // message.info('Clicked on Yes.');
      location.href = 'http://119.3.210.185:8999/'
    },
    Jump(info) {
      console.log("jump" + JSON.stringify(info));
    },
    getData() {
      let that = this;
      fetch("/scene/FindScenelog").then(res => {
        let result = res.data;
        let parents = result
          .filter(item => {
            return item.lv == 1;
          })
          .map((it, index) => {
            return {
              key: it.id,
              title: it.name,
              children: []
            };
          });

        for (let i = 0; i < parents.length; i++) {
          for (let ff = 0; ff < result.length; ff++) {
            if (result[ff].parentid == parents[i].key && result[ff].lv == 2) {
              parents[i].children.push({
                key: result[ff].id,
                title: result[ff].name
              });
            }
          }
        }
        that.list.push(...parents);
      });
    }
  }
};
</script>