<template>
  <div class="container">
    <!-- 欢迎 -->
    <ul>
      <li @click="one">基本场景</li>
      <li @click="two">城市道路场景</li>
      <li @click="three">高速场景</li>
      <li @click="four">停车场景</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    one() {
      let a = document.querySelector(
        "#components-layout-demo-responsive > div.ant-layout-sider.ant-layout-sider-dark > div > div > ul > li:nth-child(1) > div.ant-menu-submenu-title"
      );
      a.click();
      this.$router.push({ path: "/video/list", query: { catalog: "超车预警" }})
    },
    two() {
      document
        .querySelector(
          "#components-layout-demo-responsive > div.ant-layout-sider.ant-layout-sider-dark > div > div > ul > li:nth-child(2) > div.ant-menu-submenu-title"
        )
        .click();
      this.$router.push({ path: "/video/list", query: { catalog: "掉头" }})
    },
    three() {
      document
        .querySelector(
          "#components-layout-demo-responsive > div.ant-layout-sider.ant-layout-sider-dark > div > div > ul > li:nth-child(3) > div.ant-menu-submenu-title"
        )
        .click();
      this.$router.push({ path: "/video/list", query: { catalog: "匝道" }})

    },
    four() {
      document
        .querySelector(
          "#components-layout-demo-responsive > div.ant-layout-sider.ant-layout-sider-dark > div > div > ul > li:nth-child(4) > div.ant-menu-submenu-title"
        )
        .click();
      this.$router.push({ path: "/video/list", query: { catalog: "平行式停车位" }})

    }
  }
};
</script>

<style scoped>
ul {
  margin-top: 50px;
  width: 100%;
  height: 200px;
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}
ul li {
  width: 20%;
  height: 100%;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: white;
  background-size: cover;
  cursor: pointer;
}
ul > li:nth-child(1) {
  background: url("https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1453724184,3406934619&fm=26&gp=0.jpg");
}
ul > li:nth-child(2) {
  background: url("https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3637331062,1641798241&fm=26&gp=0.jpg");
}
ul > li:nth-child(3) {
  background: url("https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3297822392,1081534160&fm=26&gp=0.jpg");
}
ul > li:nth-child(4) {
  background: url("https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4157894305,190466569&fm=15&gp=0.jpg");
}
</style>
