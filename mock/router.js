var express = require('express');
var jwt = require('jsonwebtoken');
var url = require('url');
var router = express.Router();
var sqlQuery = require('./mysql');
const multer = require("multer");
const fs = require("fs")
/**
 * 登陆接口
 */
router.post('/login',(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    const sql = `select * from account where username='${username}' and password='${password}'`
    sqlQuery(sql,function(result){
        if(result.length > 0){
            const data = JSON.parse(JSON.stringify(result));
            const token = jwt.sign({
                username:username,
                password:password
            },'KOEXskexer');
            res.send({
                status:200,
                userinfo:{
                    id:data[0].id,
                    user:data[0].username
                },
                token:token
            });
        }else{
            res.send({
                status:500,
                msg:'您输入账号或密码不正确,请重新输入！'
            });
        }
    });
});
/**
 * 商品查询接口
 * 参数：page --查询的页数
 */
router.get('/productQuery',(req,res)=>{
    var page = url.parse(req.url,true).query.page || 1;
    var sql = "select * from project order by id desc limit 10 offset " + (page - 1) * 10;
    sqlQuery(sql,function(result){
        if(result.length>0){
            res.send({
                status:200,
                data:result
            });
        }else{
            res.send({
                status:500,
                msg:'暂无数据'
            });
        }
    })
});
/**
 * 商品数据总数接口
 */
router.get('/productCount',(req,res)=>{
    var sql = "select count(*) from project where id";
    
    sqlQuery(sql,function(result){
        if(result.length > 0){
            var data = JSON.parse(JSON.stringify(result))[0]['count(*)'];
            res.send({
                status:200,
                total:data
            });
        }else{
            res.send({
                status:500,
                msg:"查询失败，请联系管理员！"
            });
        }
    });
});
/**
 * 删除商品
 * 参数 商品id
 */
router.get('/productDelete',(req,res)=>{
    var id = url.parse(req.url,true).query.id;
    var sql = "DELETE FROM project WHERE id = "+id;
    sqlQuery(sql,function(result){
        if(result.affectedRows>0){
            res.send({
                status:200,
            });
        }else{
            res.send({
                status:500,
                msg:'删除失败，请联系管理员！'
            });
        }
    })
});
/**
 * 类目查询接口
 * 参数 id
 */
router.get('/productCategory',(req,res)=>{
    var id = url.parse(req.url,true).query.id || 1;
    var sql = 'select * from category where id='+id;
    sqlQuery(sql,function(result){
        if(result.length > 0){
            res.send({
                status:200,
                data:result
            });
        }else{
            res.send({
                status:500,
                msg:'暂无数据'
            });
        }
    })
});
/**
 * 上传图片
 */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./mock/upload/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
}

var uploadFolder = './mock/upload/';
createFolder(uploadFolder);
var upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.json({ res_code: '0', name: file.originalname, url: file.path });
});
/**
 * 新增商品接口
 */
router.get('/productAdd',(req,res)=>{
    var title = url.parse(req.url,true).query.title;
    var image = url.parse(req.url,true).query.image;
    var sellPoint = url.parse(req.url,true).query.sellPoint;
    var price = url.parse(req.url,true).query.price;
    var num = url.parse(req.url,true).query.num;
    var cid = url.parse(req.url,true).query.cid;
    var descs = url.parse(req.url,true).query.descs;
    //const sql = `insert into project values (null,'${title}','${image}','${sellPoint}','${price}','${num}','${cid}','',1,'','','${descs}')`
    const sql = "insert into project values (null,?,?,?,?,?,?,'',1,'','',?)"
    const arr = [title,image,sellPoint,price,cid,num,descs];
    sqlQuery(sql,result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                msg:'商品添加成功'
            });
        }else{
            res.send({
                status:500,
                msg:'添加商品失败，请联系管理员！'
            });
        }
    },arr);
});
/**
 * 单个商品数据获取接口
 */
router.get('/productOne',(req,res)=>{
    var id = url.parse(req.url,true).query.id;
    var sql = "select * from project where id="+id;
    sqlQuery(sql,result=>{
        if(result.length > 0){
            res.send({
                status:200,
                data:result[0]
            });
        }else{
            res.send({
                status:500,
                msg:'暂无数据'
            })
        }
    })
});
/**
 * 修改商品接口
 */
router.get('/productUpdate',(req,res)=>{
    var id = url.parse(req.url,true).query.id;
    var title = url.parse(req.url,true).query.title;
    var image = url.parse(req.url,true).query.image;
    var sellPoint = url.parse(req.url,true).query.sellPoint;
    var price = url.parse(req.url,true).query.price;
    var num = url.parse(req.url,true).query.num;
    var cid = url.parse(req.url,true).query.cid;
    var descs = url.parse(req.url,true).query.descs;
    var sql = "update project set title=?,image=?,sellPoint=?,price=?,cid=?,num=?,descs=? where id=?";
    sqlQuery(sql,result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                msg:'修改商品成功！'
            });
        }else{
            res.send({
                status:500,
                msg:"修改商品失败，请联系管理员！"
            });
        }
    },[title,image,sellPoint,price,cid,num,descs,id]);
});
/**
 * 查询规格参数 数据 接口
 *  参数 page
 */
router.get('/params',(req,res)=>{
    var page = url.parse(req.url,true).query.page || 1;
    var sql = "select * from params order by id desc limit 10 offset " + (page-1)*10;
    sqlQuery(sql,result=>{
        if(result.length > 0){
            res.send({
                status:200,
                data:result
            });
        }else{
            res.send({
                status:500,
                msg:'暂无数据'
            });
        }
    });
});
/**
 * 查询规格参数的总数
 */
router.get('/paramsCount',(req,res)=>{
    var sql = "select count(*) from params where id";
    sqlQuery(sql,function(result){
        if(result.length > 0){
            var data = JSON.parse(JSON.stringify(result))[0]['count(*)'];
            res.send({
                status:200,
                total:data
            });
        }else{
            res.send({
                status:500,
                msg:"查询失败，请联系管理员！"
            });
        }
    })
});
/**
 * 删除规格参数
 */
router.get('/paramsDelete',(req,res)=>{
    var id = url.parse(req.url,true).query.id;
    var sql = "DELETE FROM params WHERE id = "+id;
    sqlQuery(sql,result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                msg:"删除成功！"
            });
        }else{
            res.send({
                status:500,
                msg:"删除失败，请联系管理员！"
            });
        }
    })
});
/**
 * 添加规格参数
 */
router.get('/paramsAdd',(req,res)=>{
    var cid = url.parse(req.url,true).query.cid;
    var paramData = url.parse(req.url,true).query.paramData;
    var sql = "insert into params values (null,?,?)"
    var arr = [cid,paramData];
    sqlQuery(sql,result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                msg:"添加规格参数成功！"
            });
        }else{
            res.send({
                status:500,
                msg:'添加规格参数失败，请联系管理员！'
            });
        }
    },arr);
});

//分类管理接口

/**
 * 获取分类导航管理的数据
 */
router.get('/classifiedData',(req,res)=>{
    var id = url.parse(req.url,true).query.id;
    var sql = "select * from content where id="+id;
    sqlQuery(sql,result=>{
        if(result.length > 0){
            res.send({
                status:200,
                data:result
            });
        }else{
            res.send({
                status:500,
                msg:'暂无数据'
            });
        }
    });
});
/**
 * 添加分类导航
 */
router.get('/classifiedNavAdd',(req,res)=>{
    var id = url.parse(req.url,true).query.id;
    var name = url.parse(req.url,true).query.name;
    var pid = Math.floor(Math.random()*1000000);
    var sql = "insert into content values(?,?,?)";
    var arr = [id,name,pid];
    sqlQuery(sql,result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                msg:'添加成功！'
            });
        }else{
            res.send({
                status:500,
                msg:'添加失败，请联系管理员！'
            });
        }
    },arr);
});
/**
 * 删除分类导航
 */
router.get('/classifiedNavDelete',(req,res)=>{
    var pid = url.parse(req.url,true).query.pid;
    var sql = "delete from content where pid="+pid;
    sqlQuery(sql,result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                msg:'删除成功！'
            });
        }else{
            res.send({
                status:500,
                msg:'删除失败，请联系管理员！'
            });
        }
    });
});
/**
 * 修改分类导航
 */
router.get('/classifiedUpdate',(req,res)=>{
    var pid = url.parse(req.url,true).query.pid;
    var name = url.parse(req.url,true).query.name;
    var sql = "update content set name=? where pid=?";
    var arr = [name,pid];
    sqlQuery(sql,result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                msg:'修改成功！'
            });
        }else{
            res.send({
                status:500,
                msg:'修改失败，请联系管理员！'
            });
        }
    },arr);
});
/**
 * 获取分类表格数据
 */
router.get('/classifiedTableData',(req,res)=>{
    var pid = url.parse(req.url,true).query.pid;
    var sql = "select * from contentinfo where pid="+pid;
    sqlQuery(sql,result=>{
        if(result.length > 0){
            res.send({
                status:200,
                data:result
            });
        }else{
            res.send({
                status:500,
                msg:'暂无数据'
            });
        }
    });
});
/**
 * 删除分类表格的数据
 */
router.get('/classifiedTableDelete',(req,res)=>{
    var id = url.parse(req.url,true).query.id;
    var sql = "delete from contentinfo where id="+id;
    sqlQuery(sql,result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                msg:'删除成功！'
            });
        }else{
            res.send({
                status:500,
                msg:"删除失败，请联系管理员！"
            });
        }
    });
});
/**
 * 添加分类表格数据
 */
router.get('/classifiedTableAdd',(req,res)=>{
    var pid = url.parse(req.url,true).query.pid;
    var name = url.parse(req.url,true).query.name;
    var link = url.parse(req.url,true).query.link;
    var image = url.parse(req.url,true).query.image;
    var sql = 'insert into contentinfo values(null,?,?,?,?)';
    var arr = [pid,name,link,image];
    sqlQuery(sql,result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                msg:'添加成功！'
            });
        }else{
            res.send({
                status:500,
                msg:"添加失败，请联系管理员！"
            });
        }
    },arr);
});
module.exports = router;