const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://karan:connectme@cluster0-ggog5.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
.then(()=>{
    console.log('Mongo CONNECTED');
})
.catch(()=>{
    console.log('Mongo FAILED');
})