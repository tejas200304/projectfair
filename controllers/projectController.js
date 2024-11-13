const projects = require("../model/projectModel");



exports.addProjectController = async(req, res)=>{
    console.log('inside add project controller');

    const {title , language , github , website , overview} = req.body
    console.log(title , language , github , website , overview);

    const projectImage = req.file.filename
    console.log(projectImage);
    const userId =req.payload
    
    try {
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json('Project already exists')
        }
        else{
            const newProject = new projects({
                title , language , github , website , overview , projectImage , userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    
    catch(error){
        res.status(401).json(`project adding faailed due to `,error)
    }
    
    
    
}

//to get all projects

exports.getAllProjects = async(req, res)=>{
    // path parameter = req.params
    // query parameter = req.query
    const searchKey = req.query.search
    console.log(searchKey);
    
    const query = {
        language:{
            $regex:searchKey, $options:"i"
        }
    }
    
    try{
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    }
    catch(error){
        res.status(401).json(error)
    }

}

//get home project

exports.getHomeProjectController = async(req,res)=>{
    try {
        const allProjects = await projects.find().limit(3)
        res.status(200).json(allProjects)
    } catch (error) {
        res.status(401).json(error)       
    }
}

//get user project

exports.getUserProjectController = async(req,res)=>{
    try {
        const userId = req.payload
        const allProjects = await projects.find({userId})
        res.status(200).json(allProjects)
    } catch (error) {
        res.status(401).json(error)  
    }
}

//remove user project 
exports.removeUserProjectController = async(req, res)=>{
    const {id} = req.params

    try {
      await projects.findByIdAndDelete({_id:id}) 
      res.status(200).json('deleted successfully')
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.editProjectController = async(req, res)=>{
    const {id} = req.params
    const userId = req.payload

    const {title, language, github, website, overview, projectImage} = req.body

    const uploadedImage = req.file?req.file.filename:projectImage

    try {
        const existingProject = await projects.findByIdAndUpdate({_id:id},{
            title,
            language,
            github,
            website,
            overview,
            projectImage:uploadedImage,
            userId
        },{new:true})
        await existingProject.save()
        res.status(200).json(existingProject)
    } catch (error) {
        res.status(401).json(error)
    }
}