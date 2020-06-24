var mongoose = require("mongoose");
var schema = mongoose.Schema({
    username:{
        type: String,
      require: true
    },
    password:{
        type:String,
        require:true
    },
    userType:{
        type:String,
        require:true
    }
},
{ timestamps: true }
);

module.exports=mongoose.model('users',schema);
