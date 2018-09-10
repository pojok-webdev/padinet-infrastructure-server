var express = require('express'),
app = express(),
con = require('./js/connections.js'),
query = require('./js/queries.js'),
bodyParser = require('body-parser');
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/getnodes',(req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("getnodes invoked");
    con.getdata(query.getnodes(),function(result){
        console.log('Result', result);
        res.send(result);
    })
});
app.get('/getedges',(req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("getEdges invoked");
    con.getdata(query.getEdges({}),function(result){
        //console.log('Result', result);
        res.send(result);
    })
});
app.get('/getedges/:node_id',(req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("getEdges invoked",req.params);
    con.getdata(query.getEdges(req.params),function(result){
        //console.log('Result', result);
        res.send(result);
    })
});
app.post('/savenode',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    console.log('save node invoked',req.body)
    con.getdata(query.saveNode(req.body),result => {
        console.log("savenode result",result)
        res.send(result)
    })
})
app.post('/saveedge',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    console.log('save Edge invoked',req.body)
    con.getdata(query.saveEdge(req.body),result => {
        console.log("saveEdge result",result)
        res.send(result)
    })
})
app.post('/updateedge',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    console.log('update Edge invoked',req.body)
    con.getdata(query.updateEdge(req.body),result => {
        console.log("updateEdge result",result)
        res.send(result)
    })
})
app.post('/updatenode',(req,res) => {
    res.header("Access-Control-Allow-Origin","*")
    con.getdata(query.updateNode(req.body),result => {
        console.log("updatenode",result)
        res.send(result)
    })
})
app.get('/removenode/:id',(req,res) => {
    res.header("Access-Control-Allow-Origin","*")
    con.getdata(query.removeNode(req.params),result => {
        console.log("removenode",result)
        res.send(result)
    })
})
app.get('/removeedge/:id',(req,res) => {
    res.header("Access-Control-Allow-Origin","*")
    con.getdata(query.removeEdge(req.params),result => {
        console.log("removeedge",result)
        res.send(result)
    })
})
app.get('/getneighbours/:id',(req,res) => {
    res.header("Access-Control-Allow-Origin","*")
    con.getdata(query.getneighbours(req.params),result => {
        console.log("getneighbour",result)
        res.send(result)
    })
})
app.get('/getlinktypes',(req,res) => {
    res.header("Access-Control-Allow-Origin","*")
    con.getdata(query.getLinkTypes(),result => {
        console.log("getlinktypes",result)
        res.send(result)
    })
})
app.get('/getvendors',(req,res) => {
    res.header("Access-Control-Allow-Origin","*")
    con.getdata(query.getVendors(),result => {
        console.log("getvendors",result)
        res.send(result)
    })
})

app.listen(process.env.PORT || 1948);
