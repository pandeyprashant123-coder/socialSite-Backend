import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import User from '../models/user.js'

export const signin = async(req,res)=>{
    const {email,password} = req.body
    try {
        const existingUser = await User.findOne({email})

        if(!existingUser) return res.status(404).json({message:'user doesnot exists'})
        
        const isPassword = await bcrypt.compare(password,existingUser.password)

        if(!isPassword) return res.status(400).json({msg:'invalid credentitals.'})

        const token = jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:'1h'})

        res.status(200).json({result:existingUser,token})
    } catch (error) {
        res.status(500).json({message:error})
    }
}

export const signup = async(req,res)=>{
    const {email,password,firstName,lastName,confirmPassword} =req.body
    try {
        const existingUser = await User.findOne({email})
        console.log(existingUser)
        if(existingUser) return res.status(400).json({message:'user already exists'})
        if(password!==confirmPassword) return res.status(400).json({message:'passoword donot match'})

        const hashedPassword = await bcrypt.hash(password,12)

        const result = await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`})

        const token = jwt.sign({email:result.email,id:result._id},'test',{expiresIn:'1h'})

        res.status(200).json({result:result,token})
    } catch (error) {
        res.status(500).json({message:error})
    }
}
