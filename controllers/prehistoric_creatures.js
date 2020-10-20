const express = require('express')
const router = express.Router()

// ----> PREHISTORIC CREATURES INDEX ROUTE <----
router.get('/prehistoric_creatures/',(req,res)=>{
    //let preCreatures= fs.readFileSync('./prehistoric_creatures.json')
    //let preData= JSON.parse(preCreatures)

    //res.render('prehistoric_creatures/index.ejs')//,{preCreatures: preData})
    res.send('HELLO PREHIST')
})

// app.get('/dinosaurs',(req,res)=>{
//     let dinosaurs = fs.readFileSync('./dinosaurs.json') //takes the json file and reads it as a string
//     let dinoData= JSON.parse(dinosaurs) //turns the string JSON as readable object we can use with EJS... aka converts the string into an array
//     res.render('index',{dinosaurs: dinoData})

// })

module.exports = router;