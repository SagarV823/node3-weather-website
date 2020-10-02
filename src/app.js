const geocode=require('../src/utils/geocode')
const forecast=require('../src/utils/forecast')

const path=require('path')
const express = require('express')
const hbs=require('hbs')

//setup express
const app = express()

//define paths for express config
const publicDirectory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:"Sagar"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About me",
        name:"Sagar"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        message:"Please save us!",
        name:'Sagar'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'No address given!'
        })
    }
    const address=req.query.address
    geocode(address, (error, {latitude,longitude,location}={}) => {

        if (error) {
            return res.send({
                "Error":error
            })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    "Error":error
                })
            }
            res.send({
                "Address":address,
                "location":location,
                "Forecast":forecastdata
            })
        })
    })
    
})

app.get('/products',(req,res)=>{
    console.log(req.query.search)
    if(!req.query.search){
        return res.send({
            error:'You must provide search term!'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Error',
        message:'help article not found!',
        name:'Sagar'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error',
        message:'not found!',
        name:'Sagar'
    })})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})