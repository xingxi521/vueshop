var mysql = require('mysql');
var client = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:'',
    database:"mynewsql"
});

function sqlQuery(sql,callback,params){
    if(params){
        client.query(sql,params,function(error,result){
            if(error){
                console.log(error);
                return;
            }
            callback(result);
        });
    }else{
        client.query(sql,function(error,result){
            if(error){
                console.log(error);
                return;
            }
            callback(result);
        });
    }
    
}
module.exports = sqlQuery;