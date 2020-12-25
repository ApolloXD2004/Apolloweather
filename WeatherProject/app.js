const express = require("express")
const https = require("https")
const bodyParser = require("body-parser");
const ejs = require('ejs')





const app = express()

app.set('view engine', 'ejs')

app.listen(process.env.PORT,()=>{
    console.log("server started on port 3000")

})
app.use(bodyParser.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.post('/',(req,res)=>{
   
    const cityname = (req.body.cityname)
    console.log(cityname)
    const country = req.body.country
    console.log(country);
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+cityname+","+country+"&appid=85630c065976083d2d0f0b0c165fc06d&units=metric"
    const placeurl = "https://maps.googleapis.com/maps/api/place/photo?parameters"


https.get(url,(response)=>{
    console.log(response.statusCode);

    response.on("data",(data)=>{
      const weatherData =  JSON.parse(data)
      const temp = weatherData.main.temp
      const descr = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const ImageURL =  "http://openweathermap.org/img/wn/"+icon+"@2x.png"
    
      res.render('result',{temp:temp,descr:descr,ImageURL:ImageURL})
      console.log(temp);
    })
    
   
    })
    
  

})
