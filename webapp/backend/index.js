const express=require('express');
const sqlite3=require('sqlite3').verbose();
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
const port=3000;
//enable cors
app.use(cors());
app.use(bodyParser.json());

const db=new sqlite3.Database('./webshop.db', (err) => {//connect to database
    if(err){
        console.error('Error opening database '+err.message);//error message
    }
        else{
            console.log('Connected to the database.');
        }
    });


app.get('/hello-world-json',(req,res)=>{//message
    res.json({message:'Hello World!'});
});

//Get request to fetch all products
app.get('/api/products',(req,res)=>{
    const sql='SELECT * FROM products';
    db.all(sql,[],(err,rows)=>{
        if(err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json(rows);
    });
});
//     const sql='SELECT * FROM products';
//     db.all(sql,[],(err,rows)=>{
//         if(err){
//             res.status(400).json({"error":err.message});
//             return;
//         }
//         res.json(rows);
//     });

app.post('/api/products',(req,res)=>{
    //Get the data from the request body
    const {name,price,description}=req.body;
    const sql='INSERT INTO products (name,price,description) VALUES (?,?,?)';//Mit dem ? gibt man den Parameter mit
    db.run(sql,[name,price,description],function(err){
        //db.run die datenbank wird gestartet und man gibt die parameter mit in einem array (product.price)
        if(err){//ob wir einen error hbane oder nicht
            console.log(err.message);
            res.status(400).json({"error":err.message});
            
            return;
        }
        res.json({
            message:'New product created',
            data:{
                id:this.lastID,
                name:name,
                price:price,
                description:description
            }
        });
    });
});

app.listen(port,()=>{
    console.log('Server running on port '+port);
});//start server