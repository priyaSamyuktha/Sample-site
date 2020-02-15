var express = require('express');  
var path = require("path");   
var bodyParser = require('body-parser');  
var mongo = require("mongoose");  
var jwt = require('jwt-simple');
var moment = require('moment');
  
var db = mongo.connect("mongodb://localhost:27017/Textiles", function(err, response){  
   if(err){ console.log( "there is a error in connection"); }  
   else{ console.log('Connected to ' + db, ' + ', response); }  
});  


var app = express()  
app.use(bodyParser());  
app.use(bodyParser.json({limit:'5mb'}));   
app.use(bodyParser.urlencoded({extended:true}));  
   
//JWT TOKEN
app.set('jwtTokenSecret', 'textile_sample');

app.use(function (req, res, next) {        
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
     res.setHeader('Access-Control-Allow-Credentials', true);       
     next();  
 });  
  
 var Schema = mongo.Schema;  
  
var UserSchema = new Schema({ 
 mailid: { type: String },     
 name: { type: String   },       
 password: { type: String }
},{ versionKey: false });  

var productSchema = new Schema({
    prodID: { type: String },     
    name: { type: String   },
    price: Number,       
    imgURL: { type: String   }, 
    productCount: {type: Number}  
});

var cartSchema = new Schema({
    mailid: { type: String },     
  
        prodID : String,        
        quantity : Number
              
});

var userProductSchema = new Schema({
    mail: { type: String }, 
    products : [{ 
        prodID : String,        
        quantity : Number,
        paymentStatus : String,
        deliveryStatus : String,
        deliveryDateTime : Date
    }]   
});
   
  
var model = mongo.model('user', UserSchema, 'user');  


app.post("/api/SaveUser",function(req,res){   
 var mod = new model(req.body);  
 
 
   
    mod.save(function(err,data){  
        
      if(err){  
         res.send(err); 
                        
      }  
      else{        
          res.send({data:"Record has been Inserted..!!"});  
          
      }  
 });  

  
 })  
  
 app.post("/api/deleteUser",function(req,res){      
    model.remove({ _id: req.body.id }, function(err) {    
     if(err){    
         res.send(err);    
     }    
     else{      
            res.send({data:"Record has been Deleted..!!"});               
        }    
 });    
   })  
  
  
  
 app.get("/api/getUser",function(req,res){  
    model.find({},function(err,data){  
              if(err){  
                  res.send(err);  
              }  
              else{                
                  res.send(data);  
                  }  
          });  
  })  

  

  app.post("/api/UserLogin",function(req,res){   
    model.findOne ({ 'mailid': req.body.mailid },  
      function(err,user) {  
      if (err) {  
      res.send(401);         
      }  
      if (!user) {
        // incorrect username
        return res.send(401);
      }

    if (user && user.password === req.body.password && user.name === req.body.name){
        var expires = moment().add('days', 7).valueOf();
        var token = jwt.encode({
            iss: user.mailid,
            exp: expires
        }, app.get('jwtTokenSecret'));

        res.json({
         token : token,
            expires: expires,
         user: user.toJSON()
        });
      }
      else{
        return res.send("incorrect credential");
      }
    
    
    });  
     
    })  
  

    //PRODUCT DESIGN

    var productModel = mongo.model('product', productSchema, 'product');  

    app.get("/api/getProducts",function(req,res){  
        productModel.find({},function(err,data){  
                  if(err){  
                      res.send(err);  
                  }  
                  else{                
                      res.send(data);  
                      }  
              });  
      })  

      // User adds product to cart

      var cartModel = mongo.model('cart', cartSchema, 'cart'); 

      app.post("/api/SaveProductsToCart",function(req,res){   
        console.log("save"+ JSON.stringify(req.body));
             
        var cart = new cartModel(req.body);  
           cart.save(function(err,data){  
               
             if(err){  
                res.send(err); 
                               
             }  
             else{        
                 res.send({data:"Product has been Inserted..!!"});  
                 
             }  
             });     
        }) 

        //Get cart items

        app.get("/api/getCart",function(req,res){ 
            
            var token =  req.headers['x-access-token'];

            if (token) {
                try {
                  var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
                  //console.log("In cart" + decoded.iss); 
                
                  if (decoded.exp <= Date.now()) {
                    res.end('Access token has expired', 400);
                  }

                  model.findOne({ mailid: decoded.iss }, function(err, user) {
                    req.user = user;
                  //  console.log("in server"+req.user.mailid);

                        if(req.user.mailid)
                        {
                            cartModel.find({mailid: req.user.mailid},function(err,data){  
                                if(err){  
                                    res.send(err);  
                                }  
                                else{                
                                    res.send(data);  
                                    }  
                            });
                        }
                        else{

                          }
                  });
              
                } catch (err) {
                  return err;
                }
              } else {
                
              }

          /*      cartModel.find({},function(err,data){  
                      if(err){  
                          res.send(err);  
                      }  
                      else{                
                          res.send(data);  
                          }  
                  }); */ 
          })  


          //Remove cart products on delete

          

    app.post("/api/DeleteProductFromCart",function(req,res){   
           
            var token =  req.headers['x-access-token'];
            var prodID = req.body.prodID;
            console.log("id"+ JSON.stringify(req.body));
             
            if (token) {
                try {
                  var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
                                  
                  if (decoded.exp <= Date.now()) {
                    res.end('Access token has expired', 400);
                  }

                  model.findOne({ mailid: decoded.iss }, function(err, user) {
                    req.user = user;
                    
                        if(req.user.mailid)
                        {   
                            cartModel.deleteOne({ prodID: prodID , mailid: req.user.mailid }, function(err) {    
                                if(err){    
                                    res.send(err);    
                                }    
                                else{      
                                       res.send({data:"Record has been Deleted..!!"});               
                                   }    
                            });    
                        }  
                  })
                }
                catch{

                }
            }


           }) 
    
        
        //Load product details based on add to cart

        app.post("/api/LoadProduct",function(req,res){   
            productModel.findOne ({ 'prodID': req.body.prodID },  
              function(err,data) {  
              if (err) {  
              res.send(err);         
              }  
              else{        
                     res.send({data:"Data fetched..!!"});  
                }  
            });  
             
            })
    
  
app.listen(8080, function () {  
    
 console.log('Example app listening on port 8080!')  
})  