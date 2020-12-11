<template>
    <div id='login-main'>
        <el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>欢迎使用后台管理系统</span>
			</div>
			<el-form :model="loginRef" :rules="rules" ref="loginRef" label-width="100px" class="demo-ruleForm">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="loginRef.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="loginRef.password"></el-input>
				</el-form-item>
				<div style="text-align: center;margin-right:96px">
				<el-form-item>
					<el-button type="primary" @click="submitForm('loginRef')">立即登录</el-button>
				</el-form-item>
				</div>
			</el-form>
		</el-card>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
	name:'Login',
	data(){
		return{
			loginRef: {
				username: '',
				password:''
			},
			rules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		...mapMutations('LoginModule',['setToken','setNickName']),
		submitForm(formName){
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$api.loginRequest({
						username:this.loginRef.username,
						password:this.loginRef.password
					}).then(res=>{
						if(res.data.status == 200){//200就是登陆成功了
							this.setToken(res.data.token);//写入token
							this.setNickName(res.data.userinfo.user);//写入昵称
							localStorage.setItem('token',res.data.token);
							localStorage.setItem('nickName',res.data.userinfo.user);
							this.$router.replace('/product');
						}else{
							this.$message.error(res.data.msg);
						}
					})
				} else {
					this.$message.error('请填写好账号和密码再进行登录！');
					return false;
				}
			});
		}
	},
}
</script>
<style lang="less" scoped>
	#login-main{
		width: 600px;
		margin: 0 auto;
		margin-top: 200px;
		.clearfix{
			text-align: center;
		}
	}
</style>