import express from 'express';
import morgan from 'morgan';
//cerate a new express app/server object

const app =express();
app.use(morgan('combined'));
app.use(express.json());

app.use(express.json());
app.use(express.text());
//app.use(express.urlencoded());

function mid1(req,res,next){
    console.log('mid1');
    next();
}

function mid2(req,res,next){
    console.log('mid2');
    next();
}

function mid3(req,res,next){
    console.log('mid3');
    next();
}

app.use(commonMiddleware);

function commonMiddleware(req,res,next){
    console.log('commonMiddleware');
    next();
}


const middlewares =[mid1,mid2,mid3];

app.get('/ping' ,middlewares,(req,res)=>{
    console.log("query params: ",req.query);
    console.log("req body: ",req.body);
    return res.json({
        message : 'pong'
    });
});

app.post('/hello',[mid1,mid3] ,(req,res)=>{
    return res.json({
        message : 'world'
    });
});


app.get('/tweets/:tweet_id/comments/:comment_id',(req,res)=>{
    console.log(req.params);
    return res.json({
        message:'tweet details'
    });
});




//defining a PORT and attach it to the express app
app.listen(3000 ,() =>{
    console.log("server is running on port 3000");
})






