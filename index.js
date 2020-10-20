const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs =require('fs') //this is a core module, so you don't need to import it with npm install

app.set('view engine','ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({extended: false})) //body-parser middleware. Says take this form data and put it into the body field of the request object

app.get('/', (req, res)=>{
    res.render('home')
})

// ----> DINO INDEX ROUTE <----
app.get('/dinosaurs',(req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json') //takes the json file and reads it as a string
    let dinoData= JSON.parse(dinosaurs) //turns the string JSON as readable object we can use with EJS... aka converts the string into an array
    let nameFilter = req.query.nameFilter
    if (nameFilter) {
        dinoData= dinoData.filter((dino)=>{
            // return dino.name.toLowerCase() === nameFilter.toLowerCase()
            return dino.name.toLowerCase().includes(nameFilter.toLowerCase()) 
        })
    } //handle a querystring, if there is one
    res.render('index',{dinosaurs: dinoData})

})

// ----> DINO CREATE NEW ROUTE <----
app.get('/dinosaurs/new', (req,res)=>{
    res.render('new')
})

// ----> DINO SHOW ROUTE <----
app.get('/dinosaurs/:idx',(req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData= JSON.parse(dinosaurs) 
    //get array index from URL parameter
    let dinoIndex = req.params.idx //idx is another conventional way to write ID
    res.render('show',{dino: dinoData[dinoIndex], dinoId: dinoIndex})

})

// ----> DINO POST ROUTE <----
app.post('/dinosaurs',(req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData= JSON.parse(dinosaurs) 
    dinoData.push(req.body)
    fs.writeFileSync('./dinosaurs.json',JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})
// this route uses the "app.use(express.urlencoded({extended: false})) " line to work
//writeFileSync is taking in JSON data with the stringify function (JSON string to string)

// ----> PREHISTORIC CREATURES INDEX ROUTE <----
// const prehistoricCreat = require('./controllers/prehistoric_creatures')
// app.use('/prehistoric_creatures',prehistoricCreat)

app.get('/prehistoric_creatures',(req,res)=>{
     let preCreatures= fs.readFileSync('./prehistoric_creatures.json')
     let preData= JSON.parse(preCreatures)

    res.render('prehistoric_creatures/index.ejs',{preCreatures: preData})
})

// ----> PREHISTORIC CREATURES CREATE NEW ROUTE <----
app.get('/prehistoric_creatures/new', (req,res)=>{
    res.render('prehistoric_creatures/new')
})

// ----> PREHISTORIC CREATURES POST ROUTE <----
app.post('/prehistoric_creatures',(req,res)=>{
    let preCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let preData= JSON.parse(preCreatures) 
    preData.push(req.body)
    fs.writeFileSync('./prehistoric_creatures.json',JSON.stringify(preData))
    res.redirect('/prehistoric_creatures')
})

// ----> PREHISTORIC CREATURES SHOW ROUTE <----
app.get('/prehistoric_creatures/:idx',(req,res)=>{
    let preCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let preData= JSON.parse(preCreatures) 
    let preIndex = req.params.idx 
    res.render('prehistoric_creatures/show',{preCreat: preData[preIndex], preId: preIndex})

})




app.listen(8000,()=>{
    console.log('port 8000 is working')
})