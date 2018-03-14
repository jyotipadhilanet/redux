var graphql=require('graphql')
const _=require('lodash')
const axios=require('axios')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLList
}=graphql



const UserType=new GraphQLObjectType({
    name:'user',
    fields:()=>({
        id:{ type:GraphQLInt} ,
        name:{type:GraphQLString},
        username:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString},
        website:{type:GraphQLString},
        posts:{
            type:new GraphQLList(PostType),
            resolve(ParentValue,args){
                return axios.get('http://jsonplaceholder.typicode.com/users/'+ParentValue.id+'/posts')
                    .then((res)=>res.data)
            }
        },
        albums:{
            type:new GraphQLList(AlbumType),
            resolve(ParentValue,args){
                return axios.get('http://jsonplaceholder.typicode.com/users/'+ParentValue.id+'/albums')
                    .then((res)=>res.data)
            }
        },
        todos:{
            type:new GraphQLList(TodoType),
            resolve(ParentValue,args){
                return axios.get('http://jsonplaceholder.typicode.com/users/'+ParentValue.id+'/todos')
                    .then((res)=>res.data)
            }
        },
    })
})

const AlbumType=new GraphQLObjectType({
    name:'album',
    fields:()=>({
        user: {
            type: UserType,
            resolve(ParentValue, args) {
                return axios.get('https://jsonplaceholder.typicode.com/users/'+ParentValue.userId)
                    .then(res => res.data)
            }
        },
        id: {type: GraphQLInt},
        title: {type: GraphQLString},
        photos:{
            type:new GraphQLList(PhotoType),
            resolve(ParentValue,args){
                return axios.get('http://jsonplaceholder.typicode.com/albums/'+ParentValue.id+'/photos')
                    .then((res)=>res.data)
            }
        },
    })
})

const PhotoType=new GraphQLObjectType({
    name:'photos',
    fields:()=>({
        album: {
            type: AlbumType,
            resolve(ParentValue, args) {
                return axios.get('https://jsonplaceholder.typicode.com/albums/'+ParentValue.albumId)
                    .then(res =>res.data)
            }
        },
        id: {type: GraphQLInt},
        title: {type: GraphQLString},
        url: {type: GraphQLString},
        thumbnailUrl:{type:GraphQLString}
    })
})

const TodoType=new GraphQLObjectType({
    name:'todos',
    fields:()=>({
        user: {
            type: UserType,
            resolve(ParentValue, args) {
                return axios.get('https://jsonplaceholder.typicode.com/users/'+ParentValue.userId)
                    .then(res => res.data)
            }
        },
        id: {type: GraphQLInt},
        title: {type: GraphQLString},
        completed: {type: GraphQLBoolean}
    })
})

const PostType=new GraphQLObjectType({
    name:'posts',
    fields:()=>({
        user: {
            type: UserType,
            resolve(ParentValue, args) {
                return axios.get('https://jsonplaceholder.typicode.com/users/'+ParentValue.id)
                    .then(res => res.data)
            }
        },
        id: {type: GraphQLInt},
        title:{type:GraphQLString},
        body: {type: GraphQLString},
        comments:{
            type:new GraphQLList(CommentType),
            resolve(ParentValue,args){
                return axios.get('http://jsonplaceholder.typicode.com/posts/'+ParentValue.id+'/comments')
                    .then((res)=>res.data)
            }
        },
    })
})

const CommentType=new GraphQLObjectType({
    name:'comments',
    fields:()=>({
        post: {
            type: PostType,
            resolve(ParentValue, args) {
                return axios.get('https://jsonplaceholder.typicode.com/posts/'+ParentValue.postId)
                    .then(res => res.data)
            }
        },
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        body: {type: GraphQLString}
    })
})

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user:{
            type:UserType,
            args:{id: {type:GraphQLInt}},
            resolve(ParentValue,args){
                return axios.get('https://jsonplaceholder.typicode.com/users/'+args.id)
                    .then(res=>res.data)
            }
        },
        post:{
            type:PostType,
            args:{id: {type:GraphQLInt}},
            resolve(ParentValue,args){
                return axios.get('https://jsonplaceholder.typicode.com/posts/'+args.id)
                    .then((res)=>res.data)
            }
        },
        todo:{
            type:TodoType,
            args:{id: {type:GraphQLInt}},
            resolve(ParentValue,args){
                return axios.get('https://jsonplaceholder.typicode.com/todos/'+args.id)
                    .then((res)=>res.data)
            }
        },
        album:{
            type:AlbumType,
            args:{id: {type:GraphQLInt}},
            resolve(ParentValue,args){
                return axios.get('https://jsonplaceholder.typicode.com/albums/'+args.id)
                    .then(res=>res.data)
            }
        },
        comment:{
            type:CommentType,
            args:{id: {type:GraphQLInt}},
            resolve(ParentValue,args){
                return axios.get('https://jsonplaceholder.typicode.com/comments/'+args.id)
                    .then((res)=>res.data)
            }
        },
        photo:{
            type:PhotoType,
            args:{id: {type:GraphQLInt}},
            resolve(ParentValue,args){
                return axios.get('https://jsonplaceholder.typicode.com/photos/'+args.id)
                    .then((res)=>res.data)
            }
        },
        allUser:{
            type:new GraphQLList(UserType),
            resolve(ParentValue,args){
                return axios.get('http://jsonplaceholder.typicode.com/users')
                    .then(res=>res.data)
            }}
        },
        allPost:{
            type:new GraphQLList(PostType),
            resolve(ParentValue,args){
                return axios.get('https://jsonplaceholder.typicode.com/posts')
                    .then((res)=>res.data)
            }
        },
        allTodo:{
            type:new GraphQLList(TodoType),
            resolve(ParentValue,args){
                return axios.get('https://jsonplaceholder.typicode.com/todos')
                    .then((res)=>res.data)
            }
        },
        allAlbum:{
            type:new GraphQLList(AlbumType),
            resolve(ParentValue,args){
                return axios.get('https://jsonplaceholder.typicode.com/albums')
                    .then((res)=>res.data)
            }
        },
        allComment:{
            type:CommentType,
            resolve(ParentValue,args){
                return axios.get('https://jsonplaceholder.typicode.com/comments')
                    .then((res)=>res.data)
            }
        },
        allPhoto:{
            type:PhotoType,
            resolve(ParentValue,args){
                return axios.get('https://jsonplaceholder.typicode.com/photos')
                    .then((res)=>res.data)
            }
        }
})

module.exports=new GraphQLSchema({
    query:RootQuery
})
