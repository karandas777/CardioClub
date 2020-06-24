var members = require("../model/members.schema");

function insertMember(req, res) {
  var member = new members({
    name: req.body.name,
    address: req.body.address,
    contact: req.body.contact,
    gender: req.body.gender,
    package: req.body.package,
    duration: req.body.duration,
    monthly_fees: req.body.monthly_fees,
    total_fees: req.body.total_fees,
    paid_fees: req.body.paid_fees,
    pending_fees: req.body.pending_fees,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  });
  member
    .save()
    .then(() => {
      res.json({
        status: "OK",
        message: "record inserted succesfully"
      });
    })
    .catch(err => {
      res.json({
        status: "NOK",
        message: err
      });
    });
}

function selectMember(req, res) {
  members
    .find()
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

function updateMember(req, res) {
  members.updateOne(
    { _id: req.body._id },
    {
      name: req.body.name,
      address: req.body.address,
      contact: req.body.contact,
      gender: req.body.gender,
      package: req.body.package,
      duration: req.body.duration,
      monthly_fees: req.body.monthly_fees,
      total_fees: req.body.total_fees,
      paid_fees: req.body.paid_fees,
      pending_fees: req.body.pending_fees,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
    }
  )
  .then(()=>{
      res.json({
          status:"OK",
          message:"Member Updated"
      })
  })
  .catch((err)=>{
        res.json({
            status:"NOK",
            message:err
        })
  })
}

function deleteMember(req,res){
    members.deleteOne({_id:req.body._id})
    .then(()=>{
        res.json({
            status:"OK",
            message:"Member Deleted"
        })
    })
    .catch((err)=>{
          res.json({
              status:"NOK",
              message:err
          })
    })
}

module.exports.insertMember = insertMember;
module.exports.selectMember = selectMember;
module.exports.updateMember = updateMember;
module.exports.deleteMember = deleteMember;
