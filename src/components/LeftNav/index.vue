<template>
  <div id="left-nav-main">
    <el-menu
      :default-active="currentIndex"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
      @select="handleSelect"
    >
      <el-menu-item index="/product">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span>商城管理</span>
        </template>
        <el-menu-item-group>
            <el-menu-item index="/product">商品查询</el-menu-item>
            <el-menu-item index="/classified">分类管理</el-menu-item>
            <el-menu-item index="/params">规格参数</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "LeftNav",
  data(){
    return{
      currentIndex:'/product'
    }
  },
  mounted() {
    if(sessionStorage.getItem('navCurrenIndex')){
      this.currentIndex = sessionStorage.getItem('navCurrenIndex');
    }
  },
  methods: {
    handleSelect(key, keyPath){
      sessionStorage.setItem('navCurrenIndex',key);
    }
  },
};
</script>
<style lang="less" scoped>
#left-nav-main {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 80px;
    width: 210px;
    min-height: 880px;
    background-color: #304156;
    .el-menu-vertical-demo{
        border-right: none;
    }
    
}
</style>