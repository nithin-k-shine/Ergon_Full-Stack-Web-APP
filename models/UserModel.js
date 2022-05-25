const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const User_schema = new mongoose.Schema({
    name:{
        type: 'string',
        required: [true, 'A user must have a name'],
        trim: true,
        maxlength: [40, 'A user name must have less or equal then 40 characters'],
        validate: [validator.isAlpha, 'Name must only contain characters']
    },
    email:{
        type: 'string',
        required: [true, 'A user must have a email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Invalid mail ID']
    },
    photo:{
        type:'string'
    },
    password:{
        type:'string',
        required: [true, 'Password required'],
        minlength: [8, 'Minimum 8 character required'],
        select: false
    },
    passwordChangedAt:{
        type:Date
    },
    role: {
        type:String,
        enum:['Director','Admin','Manager','Team-leader','Team-member']
    }
});

User_schema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,12);
    next();
})

User_schema.methods.PasswordCheck = async function(CandidatePassword,UserPassword){
    return await bcrypt.compare(CandidatePassword,UserPassword);
} 
User_schema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedformattimestamp=parseInt(this.passwordChangedAt.getTime()/1000,10);
        return changedformattimestamp>JWTTimestamp;
    }
    return false
}

const User = mongoose.model('User',User_schema)
module.exports = User;