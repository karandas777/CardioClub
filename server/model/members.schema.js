var mongoose = require("mongoose");
var schema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    address: {
      type: String,
      require: true
    },
    contact: {
      type: String,
      require: true
    },
    gender: {
      type: String,
      require: true
    },
    package: {
      type: String,
      require: true
    },
    duration: {
      type: String,
      require: true
    },
    monthly_fees: {
      type: String,
      require: true
    },
    total_fees: {
      type: String,
      require: true
    },
    paid_fees: {
      type: String,
      require: true
    },
    pending_fees: {
      type: String,
      require: true
    },
    start_date: {
      type: String,
      require: true
    },
    end_date: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
);

module.exports=mongoose.model('members',schema);
