const mongoose = require('mongoose')
const { stringify } = require('qs')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        minlength:5
    },
    email:{
        type:String,
        // validate:{
        //     validator:function(v){
        //         return /^$|^\$d{10}$/.test(v)
        //     },
        //     message: props => `${props.message} is not valid`
        // }
    },
    adminId:{
        type:mongoose.Types.ObjectId, ref:'Admin'
    },
    weathers:[
        {
            type:mongoose.Schema.Types.ObjectId, ref:'Weather'
        }
    ]
})

module.exports = mongoose.model('User', userSchema)