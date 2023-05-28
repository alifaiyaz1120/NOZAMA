const express = require('express')
const app = express();
const port = 9000;
var request = require("request");

const path = require("path");
const collection = require("./mongodb.js");

// path to the frontend folder to pages
const frontendPath = path.join(__dirname, "../frontend/src/pages");

app.use(express.json());
app.set("view engine", "ejs"); // can view javascript files
app.set("views", frontendPath);
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, '../app/build')))

app.post("/account/auth", (req, res) => {
  const data = req.body;

  collection.exists({"name": [data.name], "password": [data.password]})
    .then(result => {
      if(result){
        res.send('found')
      }else{
        res.send('not found')
      }
    })
    .catch(error => {
      console.log(error);
    })
})

app.post("/account/signup", async (req, res) => {
  const data = req.body;
  console.log(data);

  let newUser = new collection(data);

  newUser.save((error) => {
    if(error){
      res.status(500).json({error: 'not saved'});
      return;
    }

    return res.json({msg: 'saved'})
  })
  
})


app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, '../app/build/index.html'))
  console.log("Sending File Path")
})
app.get('/products', (req, res) => {
    request('https://dummyjson.com/products?limit=100', function(error, response, body){
        if(!error && response.statusCode == 200){
            var parsedBody = JSON.parse(body);
            res.send(parsedBody.products)
        }
    }
    );
});
app.get('/item/:id', (req, res) => {
  const params = req.params;
  request(`https://dummyjson.com/products/${params.id}`, function(error, response, body){
      if(!error && response.statusCode == 200){
          var parsedBody = JSON.parse(body);
          res.send(parsedBody)
      }
  }
  );
});
app.get('/listcategories', (req, res) => {
  request(`https://dummyjson.com/products/categories`, function(error, response, body){
      if(!error && response.statusCode == 200){
          var parsedBody = JSON.parse(body);
          res.send(parsedBody)
      }
  }
  );
});
app.get('/searchcategory/:categories', (req, res) => {
  const params = req.params;
  request(`https://dummyjson.com/products/category/${params.categories}`, function(error, response, body){
      if(!error && response.statusCode == 200){
          var parsedBody = JSON.parse(body);
          res.send(parsedBody)
      }
  }
  );
});
app.get('/searchbar/:input', (req, res) => {
  const params = req.params;
  request(`https://dummyjson.com/products/search?q=${params.input}`, function(error, response, body){
      if(!error && response.statusCode == 200){
          var parsedBody = JSON.parse(body);
          res.send(parsedBody)
      }
  }
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})