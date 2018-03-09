var graphql=require('graphql')
const _=require('lodash')
const axios=require('axios')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
          }=graphql

const CompanyType=new GraphQLObjectType({
    name:'company',
    fields:{
        id:{ type:GraphQLInt} ,
        name:{type:GraphQLString},
        description:{type:GraphQLString}
    }
})

const UserType=new GraphQLObjectType({
    name:'user',
    fields:{
       id:{ type:GraphQLInt} ,
       name:{type:GraphQLString},
        age:{type:GraphQLInt},
        companyId:{
           type:CompanyType,
            resolve(ParentValue,args){
                return axios.get('http://localhost:3000/company/'+ParentValue.companyId)
                    .then((res)=>{res.data})
            }
        }
    }
})

const user=[
    {id:1, name:"Jyoti", age:21},
    {id:2, name:"Rashika", age:22},
    {id:3, name:"Priya", age:22},
]

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user:{
            type:UserType,
            args:{id: {type:GraphQLInt}},
            resolve(ParentValue,args){
               // return _.find(user,{id:args.id})
                return axios.get('http://localhost:3000/user/'+args.id)
                    .then((res)=>res.data)
            }}}})
module.exports=new GraphQLSchema({
    query:RootQuery
})
