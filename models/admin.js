const mongoose = require('mongoose')
const { stringify } = require('qs')

const adminSchema = mongoose.Schema({
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
    users:[
        {
            type:mongoose.Schema.Types.ObjectId, ref:'User'
        }
    ]
})

module.exports = mongoose.model('Admin', adminSchema)