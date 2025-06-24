const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username : {type:String,required:true},
    email : {type:String,required:true,unique:true},
    password : {type:String,required:true},
},{timestamps : true});

userSchema.pre('save',async function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password,salt);
        user.password = hashedPassword;
        next();
    }
    catch(err)
    {
        next(err);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
}

module.exports = mongoose.model('User',userSchema);