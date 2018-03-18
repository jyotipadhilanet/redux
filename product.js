  app.post('/api/category/add',category.createCategory)
    app.get('/api/category/list',category.getCategory)
    app.delete('/api/category/delete',category.deleteCategory)
    
      app.post('/api/inventoryUsers/add',user.createInventoryUser);
    app.get('/api/inventoryUsers/get',user.getInventoryUser);

exports.getCategory=(req,res)=>{
    let query="select * from category where isDelete=false"
    con.query(query,(err,result)=>{
        if(err)
        {
            console.log('error',err)
            res.json({"Error" : true, "Message" : "Error in executing MySQL query"});
        }
        if(result)
        {
            console.log('response',result)
            res.send(result)
        }
    })
};


exports.getInventoryUser=(req,res)=>{
    let query="select * from user where userType='inventoryUser' and isDelete=false"
    con.query(query,(err,result)=>{
        if(err)
        {
            console.log('error',err)
            res.json({"Error" : true, "Message" : "Error in executing MySQL query"});
        }
        if(result)
        {
            console.log('response',result)
            res.send(result)
        }
    })
};



