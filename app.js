const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const { create , globSource } = require('ipfs-http-client');
const fs = require('fs');
let ejs = require('ejs');

const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
  })

const app = express()
app.set('view engine', 'ejs')

app.get('/',(req, res)=>{
    res.render('index',{data:""})
})
 
app.post('/', upload.single('file'),async function(req, res, next){
    const file = await ipfs.add(globSource(req.file.path, { recursive: true }));
    hash=file.cid
    console.log(hash.toString())
    data='https://ipfs.io/ipfs/'+hash.toString();
    res.render('index',{data:data})
})
app.listen(process.env.PORT,()=>{
    console.log('listening at http://localhost:3000')
})