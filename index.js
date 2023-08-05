const express = require('express');
const fs = require('fs');
const app = express()
const port = 9000;
const path = require('path');
const folderpath = path.join(__dirname,'data')


///Route to acess the fileSystem 
app.get('/',(req,res)=>{
    res.send('Write: /createfile to create the file (OR) Write: /readfile to read the file')
})

//Creating a file inside the folder
app.get('/createfile',(req,res,)=>{
    try{
    const content = new Date().toString().replace(/[:.]/g,'-');
    const filename = `${content}.txt`;
    const fp = path.join(folderpath,filename)
    fs.writeFileSync(fp,content)
    res.json({data:`foldername: ${content} path: ${folderpath}`})
    }
    catch(err){
        res.status(500).json({Error})
    }
})
//Reading the file from the directory 
app.get('/readfile',(req,res)=>{
    try{
        fs.readdir(folderpath,(err,data)=>{
            if(err){
                console.log(err)
                res.status.json({Error})
            }
            else{
                let texts = data.filter((a)=>a)
                res.json({message:texts})
            }
        })
   
    }
    catch(err){
        res.status.json({Error})
    }
})

///Server running port
app.listen(port,err=>{
    if(err) console.log(err);
    else console.log('server running in port ',port)
})