const multer  = require('multer')

//DiskStorage - The disk storage engine gives you full control on storing files to disk.

const storage = multer.diskStorage ({
    destination:(req, file, callback)=>{
        callback(null , './uploads')
    },
    filename:(req, file, callback)=>{
        const filename = `image- ${Date.now()}-${file.originalname}` //now - Returns the number of milliseconds elapsed since midnight, January 1, 1970 Universal Coordinated Time (UTC).
        callback(null , filename)

    }

})

//filefilter

const fileFilter = (req, file, callback)=>{
    if(file.mimetype=='image/png' || file.mimetype=='image/jpg' || file.mimetype=='image/jpeg'){
        callback(null, true)
    }
    else{
        callback(null, false)
        return callback(new Error('Only png, jpg, jpeg files are allowed'))
    }
}

//create multer config
const multerConfig = multer({
    storage,
    fileFilter
})

//export
module.exports = multerConfig