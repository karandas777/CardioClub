var packages = require("../model/packages.schema");

function insertPackage(req, res) {
  var package = new packages({
    package_name: req.body.package_name,
    package_desc: req.body.package_desc,
    monthly_price: req.body.monthly_price
  });
  package.save()
    .then(() => {
      res.json({
        status: "OK",
        message: "Package Added"
      });
    })
    .catch(err => {
      res.json({
        status: "NOK",
        message: err
      });
    });
}

function selectPackage(req, res) {
  packages
    .find()
    .then((data) => {
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

function updatePackage(req, res) {
  packages.updateOne(
    { _id: req.body._id },
    {
      package_name: req.body.package_name,
      package_desc: req.body.package_desc,
      monthly_price: req.body.monthly_price
    }
  )
  .then(()=>{
      res.json({
          status:"OK",
          message:"Package Updated"
      })
  })
  .catch((err)=>{
      res.json({
          status:"NOK",
          message:err
      })
  })
};

function deletePackage(req,res){
    packages.deleteOne({_id:req.body._id})
    .then(()=>{
        res.json({
            status:"OK",
            message:"Package Deleted"
        })
    })
    .catch((err)=>{
        res.json({
            status:"NOK",
            message:err
        })
    })
};

function sortPackage(req, res) {
  packages
    .findOne({package_name:req.body.package_name})
    .then((data) => {
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


module.exports.insertPackage=insertPackage;
module.exports.selectPackage=selectPackage;
module.exports.updatePackage=updatePackage;
module.exports.deletePackage=deletePackage;
module.exports.sortPackage=sortPackage;