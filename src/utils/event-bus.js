import Vue from 'vue'
const install = function(Vue){
    const EventBus = new Vue();
    Object.defineProperties(Vue.prototype,{
        $bus:{
            get(){
                return EventBus;
            }
        }
    });
}
export default install