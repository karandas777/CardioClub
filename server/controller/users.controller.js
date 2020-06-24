var users = require('../model/users.schema');
var jwt = require('jsonwebtoken');

function insertUser(req,res){
    var user = new users({
        username:req.body.username,
        password:req.body.password,
        userType:req.body.userType
    });
    user.save()
    .then(()=>{
        res.json({
            status:"OK",
            message:"User Added"
        });
    })
    .catch((err)=>{
        res.json({
            status:"NOK",
            message:err
        })
    })
};

function selectUser(req,res){
    users.find()
    .then((data)=>{
        res.json({
            status:"OK",
            message:data
        });
    })
    .catch((err)=>{
        res.json({
            status:"NOK",
            message:err
        })
    })
};

function updateUser(req,res){
    users.updateOne({_id:req.body._id},{
        username:req.body.username,
        password:req.body.password,
        userType:req.body.userType
    })
    .then(()=>{
        res.json({
            status:"OK",
            message:"User Updated"
        });
    })
    .catch((err)=>{
        res.json({
            status:"NOK",
            message:err
        })
    })
};

function deleteUser(req,res){
    users.deleteOne({_id:req.body._id})
    .then(()=>{
        res.json({
            status:"OK",
            message:"User Deleted"
        });
    })
    .catch((err)=>{
        res.json({
            status:"NOK",
            message:err
        })
    })
};

function verifyUser(req,res){
    var user={
        username:req.body.username,
        password:req.body.password,
        userType:req.body.userType
    }
    users.findOne(user)
    .then((data)=>{
        if(data === undefined || data === null || data === "" ){
            res.json({
                status:"NOK",
                message:"User not found"
            })
        }
        else{
            var token = jwt.sign({data:data},'1234',{expiresIn:30000});
            res.json({
                status:"OK",
                message:"Success",
                xtoken:token
            })
        }
    })
    .catch((err)=>{
        res.json({
            status:"NOK",
            message:err
        })
    })
}


module.exports.insertUser=insertUser;
module.exports.selectUser=selectUser;
module.exports.updateUser=updateUser;
module.exports.deleteUser=deleteUser;
module.exports.verifyUser=verifyUser;