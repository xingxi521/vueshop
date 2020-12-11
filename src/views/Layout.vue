<template>
    <div class="layout">
        <TopNav/>
        <LeftNav/>
        <div class="router">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import TopNav from '../components/TopNav'//顶部导航
import LeftNav from '../components/LeftNav'//左边导航
export default {
    name:'Layout',
    components:{
        TopNav,
        LeftNav
    }
}
</script>
<style lang="less" scoped>
    .layout{
        position: relative;
        .router{
            margin-left: 210px;
            max-height: 880px;
            overflow-y: auto;
            margin-left: 210px;
        }
    }
    
</style>