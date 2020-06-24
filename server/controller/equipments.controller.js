var equipments = require("../model/equipments.schema");

function insertEquipments(req, res) {
  var equipment = new equipments({
    equipment_name: req.body.equipment_name,
    equipment_desc: req.body.equipment_desc,
    quantity: req.body.quantity,
    condition:req.body.condition
  });
  equipment.save()
    .then(() => {
      res.json({
        status: "OK",
        message: "Equipment Added"
      });
    })
    .catch(err => {
      res.json({
        status: "NOK",
        message: err
      });
    });
}

function selectEquipments(req, res) {
  equipments.find()
    .then(data => {
      res.json({
        status: "OK",
        message: data
      });
    })
    .catch(err => {
      res.json({
        status: "NOK",
        message: err
      });
    });
}

function updateEquipments(req, res) {
  equipments.updateOne(
    { _id: req.body._id },
    {
      equipment_name: req.body.equipment_name,
      equipment_desc: req.body.equipment_desc,
      quantity: req.body.quantity,
      condition:req.body.condition
    }
  )
  .then(()=>{
      res.json({
          status:"OK",
          message:"Equipment Updated"
      });
  })
  .catch((err)=>{
      res.json({
          status:"NOK",
          message:err
      })
  })
}

function deleteEquipments(req,res){
    equipments.deleteOne({_id:req.body._id})
    .then(()=>{
        res.json({
            status:"OK",
            message:"Equipment Deleted"
        });
    })
    .catch((err)=>{
        res.json({
            status:"NOK",
            message:err
        })
    })
}

module.exports.insertEquipments=insertEquipments;
module.exports.selectEquipments=selectEquipments;
module.exports.updateEquipments=updateEquipments;
module.exports.deleteEquipments=deleteEquipments;