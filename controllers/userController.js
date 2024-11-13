
//register

const users = require("../model/userModel");
const jwt = require("jsonwebtoken")

exports.register = async(req, res)=>{
    //logic
    console.log('inside register function');
    const{username , email ,password} = req.body
    console.log(username ,email, password);
    
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json('User already exists')
        }
        else{
            const newUser = new users({
                username,
                email,
                password,
                profile:'',
                github:'',
                linkedin:''
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    } catch(error){
        res.status(401).json(error)
    }
   
    
}

//login
exports.login = async(req,res)=>{
    const{email, password} = req.body
    console.log(email,password);

    try {
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},'secretkey')
            res.status(200).json({existingUser, token})
        }
        else{
            res.status(406).json("incorrext email or password")
        }
        
    } catch (error) {
        req.status(401).json.error
        
    }
    
}

exports.editProfileController = async(req,res)=>{
    const userId = req.payload
    const {username, email, password, profile, github, linkedin} = req.body
    uploadImg = req.file?req.file.filename:profile

    try {
        const existingUser = await users.findByIdAndUpdate({_id:userId},
            {username,
            email,
            password,
            profile:uploadImg,
            github,
            linkedin},{new:true}
        )
        await existingUser.save()
        res.status(200).json(existingUser)
    } catch (error) {
        res.status(401).json(error)
        
    }
}