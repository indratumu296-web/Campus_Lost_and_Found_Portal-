const mongoose=require('mongoose');
const schema=new mongoose.Schema({item:{type:mongoose.Schema.Types.ObjectId,ref:'Item',required:true},claimant:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},message:{type:String,required:true,trim:true,maxlength:1500},status:{type:String,enum:['pending','approved','rejected'],default:'pending'}},{timestamps:true});
schema.index({item:1,claimant:1},{unique:true});module.exports=mongoose.model('Claim',schema);
