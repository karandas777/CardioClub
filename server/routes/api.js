var express = require('express');
var router = express.Router();
var members = require('../controller/members.controller');
var users = require('../controller/users.controller');
var packages = require('../controller/packages.controller');
var equipments = require('../controller/equipments.controller');
var jwt = require('jsonwebtoken');

router.post('/insert-member',verification,members.insertMember);
router.get('/select-member',verification,members.selectMember);
router.post('/update-member',verification,members.updateMember);
router.post('/delete-member',verification,members.deleteMember);

router.post('/insert-user',verification,users.insertUser);
router.get('/select-user',verification,users.selectUser);
router.post('/update-user',verification,users.updateUser);
router.post('/delete-user',verification,users.deleteUser);

router.post('/verify-user',users.verifyUser);

router.post('/insert-package',verification,packages.insertPackage);
router.get('/select-package',verification,packages.selectPackage);
router.post('/update-package',verification,packages.updatePackage);
router.post('/delete-package',verification,packages.deletePackage);
router.post('/sort-package',verification,packages.sortPackage);

router.post('/insert-equipment',verification,equipments.insertEquipments);
router.get('/select-equipment',verification,equipments.selectEquipments);
router.post('/update-equipment',verification,equipments.updateEquipments);
router.post('/delete-equipment',verification,equipments.deleteEquipments);


function verification(req,res,next){
    var token = req.headers['xtoken'];
    if(typeof(token) !== undefined){
        jwt.verify(token,'1234',(err,data)=>{
            if(err){
                res.json({
                    status:"NOK",
                    message:err
                })
            }
            else{
                next();
            }
        })
    }
}


module.exports=router