const baseUrl = {
    host:'/api',
    login:'/api/login',//登录接口地址

    productQuery:'/api/productQuery',//商品查询接口地址
    productCount:'/api/productCount',//商品总数查询接口地址
    productDelete:'/api/productDelete',//删除商品接口地址
    productCategory:'/api/productCategory',//商品类目接口地址
    productAdd:'/api/productAdd',//添加商品接口地址
    productEditor:'/api/productOne',//查询单一商品接口地址
    productUpdate:'/api/productUpdate',//修改商品接口地址

    params:'/api/params',//规格参数查询接口地址
    paramsCount:'/api/paramsCount',//规格参数总数查询接口地址
    paramsDelete:'/api/paramsDelete',//删除规格接口地址
    paramsAdd:'/api/paramsAdd',//添加规格参数接口地址


    classifiedData:'/api/classifiedData',//获取分类数据接口地址
    classifiedNavAdd:'/api/classifiedNavAdd',//添加分类接口地址
    classifiedNavDelete:'/api/classifiedNavDelete',//删除分类接口地址
    classifiedUpdate:'/api/classifiedUpdate',//修改分类接口地址

    classifiedTableData:"/api/classifiedTableData",//获取分类表格数据接口地址
    classifiedTableDelete:"/api/classifiedTableDelete",//删除分类表格数据接口
    classifiedTableAdd:"/api/classifiedTableAdd"//添加分类表格数据接口
}

export default baseUrl