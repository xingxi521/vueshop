<template>
    <div class="editor-shop-main">
        <div class="editor-shop-bar">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/product' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/product' }">商品查询</el-breadcrumb-item>
                <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div v-loading="loading" element-loading-text="拼命加载中">
            <div class="editor-shop-form" v-if="editorShopForm.descs">
                <el-form :model="editorShopForm" :rules="rules" ref="editorShopForm" label-width="100px" >
                    <el-form-item class="editor-shop-form-item" label="商品名称" prop="title">
                        <el-input v-model="editorShopForm.title"></el-input>
                    </el-form-item>
                    <el-form-item class="editor-shop-form-item" label="商品卖点" prop="sellPoint">
                        <el-input v-model="editorShopForm.sellPoint"></el-input>
                    </el-form-item>
                    <el-form-item class="editor-shop-form-item" label="商品价格" prop="price">
                        <el-input v-model="editorShopForm.price"></el-input>
                    </el-form-item>
                    <el-form-item class="editor-shop-form-item" label="商品数量" prop="num">
                        <el-input v-model="editorShopForm.num"></el-input>
                    </el-form-item>
                    <el-form-item class="editor-shop-form-item" label="商品类目" prop="category">
                        <el-tag>{{editorShopForm.cid}}</el-tag>
                        <div class="editor-shop-category-btn">
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
                        <span>{{editorShopForm.image}}</span>
                        <Upload @onUploadHandler="getUploadHandler"/>
                    </el-form-item>
                    <el-form-item label="商品描述">
                        <UEditor @onUeditorHandler="getUeditorHandler" :content="editorShopForm.descs"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('editorShopForm')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import CategoryTree from '../AddShop/CategoryTree'
import Upload from '../AddShop/Upload'
import UEditor from '../AddShop/Ueditor'
export default {
    name:'EditorShop',
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
            editorShopForm:{},
            dialogCategoryVisible:false,
            loading:true,
            rules:{
                title:[
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                    // { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                ],
                sellPoint:[
                    { required: true, message: '请输入商品卖点', trigger: 'blur' },
                    // { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                ],
                price:[
                    { required: true, validator: checkPrice, trigger: 'blur' }
                ],
                num:[
                    { required: true, validator: checkNum, trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        this.$api.productEditorRequest({
            id:this.$route.params.id
        }).then(res=>{
            if(res.data.status == 200){
                this.editorShopForm = res.data.data;
                this.loading = false;
            }else{
                this.$message.error(res.data.msg);
            }
        })
    },
    methods: {
        getCategoryData(data){
            this.editorShopForm.cid = data.cid;
        },
        /**
         * 设置上传文件的名字
         */
        getUploadHandler(data){
            this.editorShopForm.image = data.url;
        },
        /**
         * 获取富文本编辑器的内容
         */
        getUeditorHandler(data){
            this.editorShopForm.descs = data;
        },
        /**
         * 提交修改商品
         */
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$api.productUpdateRequest({
                        id:this.$route.params.id,
                        title:this.editorShopForm.title,
                        image:this.editorShopForm.image,
                        sellPoint:this.editorShopForm.sellPoint,
                        price:this.editorShopForm.price,
                        num:this.editorShopForm.num,
                        cid:this.editorShopForm.cid,
                        descs:this.editorShopForm.descs
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
        }
    },
}
</script>
<style lang="less" scoped>
    .editor-shop-main{
        padding: 10px 0 0 0;
        .editor-shop-bar{
            padding: 10px;
            border-bottom: 1px solid #f5f5f5;
        }
        .editor-shop-form{
            // width: 30%;
            margin-top: 20px;
            .editor-shop-form-item{
                width: 30%;
            }
            .editor-shop-category-btn{
                display: inline-block;
                margin-left: 10px;
            }
        }
    }
</style>