// import dotenv
require('dotenv').config()

// import express

const express = require('express')

//import cors
const cors = require('cors')

//import router
const router = require('./router')

//import connect
require('./connection') 

//create server
const pfServer = express()

//server using cors
pfServer.use(cors())

//parse the data - gives middleware - which has the ability to parse data
pfServer.use(express.json())

//use router
pfServer.use(router)

//exporting upload folder
pfServer.use('/upload',express.static('./uploads'))

//port
const PORT = 4000 || process.env.PORT

//LISTEN
pfServer.listen(PORT,()=>{
    console.log(`server running successfully at port number ${PORT}`);
    
})

//get

/* pfServer.get('/',(req, res)=>{
    res.send('get request received')
}) 
 */
/*  pfServer.post('/',(req, res)=>{
    res.send('post request received')
})

pfServer.put('/',(req, res)=>{
    res.send('put request received')
})
 */
/* pfServer.delete('/',(req, res)=>{
    res.send('delete request received')
}) */