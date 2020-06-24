var mongoose = require("mongoose");
var schema = mongoose.Schema(
  {
    equipment_name: {
      type: String,
      require: true
    },
    equipment_desc: {
      type: String,
      require: true
    },
    quantity: {
      type: String,
      require: true
    },
    condition:{
      type:String,
      require:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("equipments", schema);
