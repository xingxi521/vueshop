export default {
    namespaced: true,
    store:{
        token:'',
        nickName:''
    },
    mutations:{
        setToken(state,value){
            state.token = value;
        },
        setNickName(state,value){
            state.nickName = value;
        },
        logOut(state){
            state.token = '';
            state.nickName = '';
        },
    }
}