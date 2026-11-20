const jwt=require('jsonwebtoken');const User=require('../models/User');
async function auth(req,res,next){try{const token=(req.headers.authorization||'').match(/^Bearer (.+)$/i)?.[1];if(!token)return res.status(401).json({error:'Login required'});const payload=jwt.verify(token,process.env.JWT_SECRET);const user=await User.findById(payload.id).select('-passwordHash');if(!user)return res.status(401).json({error:'Invalid session'});req.user=user;next()}catch(e){res.status(401).json({error:'Invalid or expired session'})}}
function admin(req,res,next){if(req.user.role!=='admin')return res.status(403).json({error:'Admin access required'});next()}
module.exports={auth,admin};
