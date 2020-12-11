<template>
    <div class="add-shop-main">
        <div class="add-shop-bar">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/product' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/product' }">商品查询</el-breadcrumb-item>
                <el-breadcrumb-item>添加商品</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="add-shop-form">
            <el-form :model="addShopForm" :rules="rules" ref="addShopForm" label-width="100px" >
                <el-form-item class="add-shop-form-item" label="商品名称" prop="shopName">
                    <el-input v-model="addShopForm.shopName"></el-input>
                </el-form-item>
                <el-form-item class="add-shop-form-item" label="商品卖点" prop="sellPoint">
                    <el-input v-model="addShopForm.sellPoint"></el-input>
                </el-form-item>
                <el-form-item class="add-shop-form-item" label="商品价格" prop="price">
                    <el-input v-model="addShopForm.price"></el-input>
                </el-form-item>
                <el-form-item class="add-shop-form-item" label="商品数量" prop="num">
                    <el-input v-model="addShopForm.num"></el-input>
                </el-form-item>
                <el-form-item class="add-shop-form-item" label="商品类目" prop="category">
                    <el-tag>{{categoryData.name}}</el-tag>
                    <div class="add-shop-category-btn">
                        <el-button type='primary' @click="dialogCategoryVisible = true">选择类目</el-button>
                    </div>
                    <el-dialog
                    title="类目选择"
                    :visible.sync="dialogCategoryVisible"
                    width="30%"
                    >
                        <CategoryTree @onCategoryData="getCategoryData"/>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="dialogCategoryVisible = false">确 定</el-button>
                        </span>
                    </el-dialog>
                </el-form-item>
                <el-form-item class="add-shop-form-item" label="图片上传" prop="shopImg">
                    <span>{{uploadData.url}}</span>
                    <Upload @onUploadHandler="getUploadHandler"/>
                </el-form-item>
                <el-form-item label="商品描述">
                    <UEditor @onUeditorHandler="getUeditorHandler"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('addShopForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import CategoryTree from './CategoryTree'
import Upload from './Upload'
import UEditor from './Ueditor'
export default {
    name:'AddShop',
    components:{
        CategoryTree,
        Upload,
        UEditor
    },
    data(){
        //价格输入框检测规则
        var checkPrice = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('价格不能为空'));
            }
            setTimeout(() => {
            if (!Number.isInteger(parseInt(value))) {
                callback(new Error('请输入数字值'));
            } else {
                callback();
            }
            }, 1000);
        };
        //数量输入框规则
        var checkNum = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('数量不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(parseInt(value))) {
                    callback(new Error('请输入数字值'));
                } else {
                    callback();
                }
            }, 1000);
        };
        return{
            addShopForm:{
                shopName:'',
                sellPoint:'',
                price:''
            },
            dialogCategoryVisible:false,//类目选择对话框显示开关
            categoryData:{
                name:'请选择类目'
            },
            uploadData:{},
            ueditorData:'',
            rules:{
                shopName:[
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                ],
                sellPoint:[
                    { required: true, message: '请输入商品卖点', trigger: 'blur' },
                    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                ],
                price:[
                    { required: true, validator: checkPrice, trigger: 'blur' }
                ],
                num:[
                    { required: true, validator: checkNum, trigger: 'blur' }
                ],
                // category:[
                //     {required:true,message: '请选择类目'}
                // ],
                // shopImg:[
                //     {required:true,message: '请选择图片'}
                // ]
            }
        }
    },
    methods: {
        /**
         * 设置当前类目名字
         */
        getCategoryData(data){
            this.categoryData = data;
        },
        /**
         * 提交新增商品
         */
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$api.productAddRequest({
                        title:this.addShopForm.shopName,
                        image:this.uploadData.url,
                        sellPoint:this.addShopForm.sellPoint,
                        price:this.addShopForm.price,
                        num:this.addShopForm.num,
                        cid:this.categoryData.cid,
                        descs:this.ueditorData
                    }).then(res=>{
                        if(res.data.status == 200){
                            this.$message.success(res.data.msg);
                            this.$router.push('/product');
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        /**
         * 设置上传文件的名字
         */
        getUploadHandler(data){
            this.uploadData = data;
        },
        /**
         * 获取富文本编辑器的内容
         */
        getUeditorHandler(data){
            this.ueditorData = data;
        }
    },
}
</script>
<style lang="less" scoped>
    .add-shop-main{
        padding: 10px 0 0 0;
        .add-shop-bar{
            padding: 10px;
            border-bottom: 1px solid #f5f5f5;
        }
        .add-shop-form{
            // width: 30%;
            margin-top: 20px;
            .add-shop-form-item{
                width: 30%;
            }
            .add-shop-category-btn{
                display: inline-block;
                margin-left: 10px;
            }
        }
    }
</style>