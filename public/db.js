const mysql=require('mysql');
const conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Sonali@21",
    database:'project'
});

conn.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected to the database");
    }
});
module.exports=conn;