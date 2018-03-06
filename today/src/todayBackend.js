var express=require('express')
var app=express()

var mongoose=require('mongoose')
mongoose.Promise=global.Promise;
var url='mongodb://localhost:27017/mydb'

var bodyparse=require('body-parser')
app.use(bodyparse.json())
app.use(bodyparse.urlencoded({extended:true}))

var cors=require('cors')
app.use(cors())

//for validation
var bcrypt=require('bcryptjs')
var jwt=require('jsonwebtoken')
var validator=require('validator')
var expvalidator=require('express-validator')
app.use(expvalidator())

//for file upload
var fileupload=require('express-fileupload')
app.use(fileupload())
app.use(express.static(__dirname+'/'))

//for mongoose schema
var state=mongoose.model('state',{
    _id:{type:Number},
    name:{type:String}
})

var city=mongoose.model('city',{
    stateid:{type:Number},
    name:{type:String}
})

var stud=mongoose.model('test',{
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        validate:{
            validator:validator.isEmail,
            message:'{VALUE} is not email'
        }
    },
    contact:{
        type:Number,
        require:true
    },
    hobby:{
        type:Array,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        require:true
    },
    dob:{
        type:Date,
        require:true
    },
    flag:{
        type:Number,
        require:true
    },
    tokens:[{
        access:{
            type:String,
            require:true
        },
        token:{
            type:String,
            require:true
        }
    }]
})


//for passport
var passport=require('passport')
var LocalStrategy=require('passport-local').Strategy
app.use(passport.initialize())

passport.serializeUser((user,done)=>{
    return done(null,user)
})
passport.deserializeUser((user,done)=>{
    return done(null,user)
})

passport.use(new LocalStrategy((username,password,done)=>{
    stud.findOne({name:username}).then((user)=>{
        if(bcrypt.compareSync(password,user.password)){
          return done(null,user)
        }
        else
            return done(null,false)
    })
}))

app.post('/login',passport.authenticate('local',{
    successRedirect:'/suc',
    failureRedirect:'/fail'
}))

app.get('/suc',(req,res)=>{
    res.send("success")
})
app.get('/fail',(req,res)=>{
    res.send("success")
})


//CRUD Operation
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/')
})

app.post('/insert',(req,res)=>{
    var samplefile=req.files.photo
    samplefile.mv(__dirname+'/upload/'+samplefile.name)
    var dt=new Date(req.body.dob)

    var newstud=new stud(req.body)
    newstud.password=bcrypt.hashSync(req.body.password,10)
    newstud.flag=1
    newstud.photo=samplefile.name
    newstud.dob=dt
    newstud.save().then(()=>{
        var access='auth'
        var token=jwt.sign({_id:newstud._id},'abc123').toString()
        newstud.tokens.push({access,token})
        return newstud.save().then((token)=>
                {return token})
    }).then((token)=>{
        console.log(newstud)
        res.send(token)
    }).catch((err)=>{
        res.send(err)
    })
})

app.post('/update',(req,res)=> {
    var dt = new Date(req.body.dob)
    stud.findById(req.body.id).then((p) => {
        p.name = req.body.name
        p.password = bcrypt.hashSync(req.body.password, 10)
        p.age = req.body.age
        p.state = req.body.state
        p.city = req.body.city
        p.email = req.body.email
        p.contact = req.body.contact
        p.hobby = req.body.hobby
        p.gender = req.body.gender
        p.dob = dt
        if (req.files != null) {
            var samplefile = req.files.photo
            samplefile.mv(__dirname + '/upload/' + samplefile.name)
            p.photo = samplefile.name
        }
        p.save().then((info) => {
            console.log(info)
            res.send(info)
        }).catch((err) => {
            res.send(err)
        })
    }).catch((err) => {
        res.send(err)
    })
})

    app.post('/delete/:id',(req,res)=> {
        stud.findById(req.params.id).then((p) => {
            p.flag = 0
            p.save().then((info) => {
                console.log(info)
                res.send(info)
            }).catch((err) => {
                res.send(err)
            })
        }).catch((err) => {
            res.send(err)
        })
    })

    app.get('/fetchData',(req,res)=>{
    stud.find({flag:1}).sort({_id:-1}).then((info)=>{
     res.send(info)
    }).catch((err)=>{
      res.send(err)
    })
    })

app.get('/stateData',(req,res)=>{
    state.find().then((info)=>{
        res.send(info)
    }).catch((err)=>{
        res.send(err)
    })
})
app.get('/cityData/:statenm',(req,res)=>{
    state.find({name:req.params.statenm}).then((info)=>{
        city.find({stateid:info[0]._id}).then((info)=>{
            res.send(info)
        })
    }).catch((err)=>{
        res.send(err)
    })
})

app.listen(5000,()=>{
    console.log("connected to server 5000")
    mongoose.connect(url)
    console.log("connected to Database")
})
