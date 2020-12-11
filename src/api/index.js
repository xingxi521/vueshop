import axios from '../utils/http'
import baseUrl from './baseUrl'
const api = {
    /**
     * 登录接口
     * 参数为对象：{username , password}
     */
    loginRequest(params){
        return axios.post(baseUrl.host+baseUrl.login,params);
    },
    /**
     * 商品查询接口
     * 参数为对象{page}
     */
    productQueryRequest(params){
        return axios.get(baseUrl.host+baseUrl.productQuery,{
            params:params
        });
    },
    /**
     * 商品总数查询接口
     */
    productCountRequest(){
        return axios.get(baseUrl.host+baseUrl.productCount);
    },
    /**
     * 删除商品接口
     */
    productDeleteRequest(params){
        return axios.get(baseUrl.host+baseUrl.productDelete,{
            params:params
        })
    },
    /**
     * 商品类目查询接口
     */
    productCategoryRequest(params){
        return axios.get(baseUrl.host+baseUrl.productCategory,{
            params
        });
    },
    /**
     * 添加商品接口
     */
    productAddRequest(params){
        return axios.get(baseUrl.host+baseUrl.productAdd,{
            params
        });
    },
    /**
     * 查询商品单一接口
     */
    productEditorRequest(params){
        return axios.get(baseUrl.host+baseUrl.productEditor,{
            params
        });
    },
    /**
     * 修改商品接口
     */
    productUpdateRequest(params){
        return axios.get(baseUrl.host+baseUrl.productUpdate,{
            params
        });
    },
    //规格参数接口
    /**
     * 查询所有规格参数数据接口
     */
    paramsRequest(params){
        return axios.get(baseUrl.host+baseUrl.params,{
            params
        });
    },
    /**
     * 规格参数总数查询接口
     */
    paramsCountRequest(){
        return axios.get(baseUrl.host+baseUrl.paramsCount);
    },
    /**
     * 删除规格参数接口
     */
    paramsDeleteRequest(params){
        return axios.get(baseUrl.host+baseUrl.paramsDelete,{
            params
        });
    },
    /**
     * 添加规格参数接口
     */
    paramsAddRequest(params){
        return axios.get(baseUrl.host+baseUrl.paramsAdd,{
            params
        });
    },

    /**
     * 获取分类管理的数据接口
     */
    classifiedDataRequest(params){
        return axios.get(baseUrl.host+baseUrl.classifiedData,{
            params
        });
    },
    /**
     * 添加分类接口
     */
    classifiedNavAddRequest(params){
        return axios.get(baseUrl.host+baseUrl.classifiedNavAdd,{
            params
        });
    },
    /**
     * 删除分类接口
     */
    classifiedNavDeleteRequest(params){
        return axios.get(baseUrl.host+baseUrl.classifiedNavDelete,{
            params
        });
    },
    /**
     * 修改分类接口
     */
    classifiedUpdateRequest(params){
        return axios.get(baseUrl.host+baseUrl.classifiedUpdate,{
            params
        });
    },
    /**
     * 获取分类表格数据接口
     *
     */
    classifiedTableDataRequest(params){
        return axios.get(baseUrl.host+baseUrl.classifiedTableData,{
            params
        });
    },
    /**
     * 删除分类表格数据
     */
    classifiedTableDeleteRequest(params){
        return axios.get(baseUrl.host+baseUrl.classifiedTableDelete,{
            params
        });
    },
    /***
     * 添加分类表格数据
     */
    classifiedTableAddRequest(params){
        return axios.get(baseUrl.host+baseUrl.classifiedTableAdd,{
            params
        });
    }
}
export default api