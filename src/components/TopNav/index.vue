<template>
    <div id="top-nav-main">
        <div class="top-nav-container">
            <div class="top-nav-left">
                <h1>商城管理后台</h1>
            </div>
            <div class="top-nav-right">  
                <el-button type="danger" icon="el-icon-delete" @click="logoutHandler">{{nickName}}</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
export default {
    name:'TopNav',
    computed:{
        ...mapState('LoginModule',['nickName'])
    },
    methods: {
        ...mapMutations('LoginModule',['logOut']),
        logoutHandler(){
            localStorage.removeItem('token');
            localStorage.removeItem('nickName');
            this.logOut();
            this.$router.replace('/login');
        }
    },
}
</script>
<style lang="less" scoped>
    #top-nav-main{
        width: 100%;
        // height: 80px;
        // line-height: 80px;
        background-color: #304156;
        .top-nav-container{
            min-width: 980px;
            width: 85%;
            height: 80px;
            line-height: 80px;
            margin: 0 auto;
            .top-nav-left{
                float: left;
                h1{
                    color:#fff;
                    font-size: 26px;
                }
            }
            .top-nav-right{
                float: right;
            }
        }
    }
</style>