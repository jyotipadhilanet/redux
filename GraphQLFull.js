var graphql=require('graphql')
const _=require('lodash')
const axios=require('axios')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
          }=graphql

const CompanyType=new GraphQLObjectType({
    name:'company',
    fields:()=>({
        id:{ type:GraphQLInt} ,
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        users:{
            type:new GraphQLList(UserType),
            resolve(ParentValue,args){
                return axios.get(`http://localhost:3000/company/${ParentValue.id}/user`)
                    .then(res=>res.data)
            }
        }
    })
})

const UserType=new GraphQLObjectType({
    name:'user',
    fields:{
        id:{ type:GraphQLInt} ,
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        company:{
            type:CompanyType,
            resolve(ParentValue,args){
                console.log(ParentValue.companyId)
                const API = `http://localhost:3000/company/${ParentValue.companyId}`;
                return axios.get(API)
                    .then(res=>res.data)
            }
        }
    }
})

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user:{
            type:UserType,
            args:{id: {type:GraphQLInt}},
            resolve(ParentValue,args){
                return axios.get('http://localhost:3000/user/'+args.id)
                    .then((res)=>res.data)
            }},
        company:{
            type:CompanyType,
            args:{id: {type:GraphQLInt}},
            resolve(ParentValue,args){
                return axios.get('http://localhost:3000/company/'+args.id)
                    .then((res)=>res.data)
            }},
        allUser:{
            type:new GraphQLList(UserType),
            resolve(ParentValue,args){
                return axios.get('http://localhost:3000/user')
                    .then(res=>res.data)
            }}
    }})
module.exports=new GraphQLSchema({
    query:RootQuery
})
