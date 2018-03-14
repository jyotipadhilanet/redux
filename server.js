var express=require('express')
var expGraphQL=require('express-graphql')
var schema=require('./schema/schema')
var app=express()
app.use('/graphql',expGraphQL({
    schema,
    graphiql:true
}))
app.listen(4000,()=>{
    console.log("server connected on port 4000");
})
