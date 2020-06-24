var mongoose = require("mongoose");
var schema = mongoose.Schema(
  {
    package_name: {
      type: String,
      require: true
    },
    package_desc: {
      type: String,
      require: true
    },
    monthly_price: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
);

module.exports=mongoose.model('packages',schema);
