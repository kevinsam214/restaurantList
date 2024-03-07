const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurant')
})



app.get('/restaurant',(req,res)=>{
  const keyword = req.query.search?.trim() ;
  const matchedRestaurant = keyword ? 
  restaurants.filter(restaurant => {
  return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
  }
  )
  : restaurants ; //意思是如果keyword不存在的話 keyword就不會傳入matchedRestaurant  而matchedRestaurant會等於restaurants  而下面res.render()內的matchedRestaurant變成restaurants 這樣才不會有bug
  res.render('index',{restaurants:matchedRestaurant,keyword})
  
})


app.get('/restaurants/:id' , (req,res) =>{
  const id = req.params.id
  const restaurant = restaurants.find((rs) => rs.id.toString() === id)
  res.render('detail' , {restaurant : restaurant})
} )

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})

