const mongoose = require("mongoose");
const MONGO_URI = "mongodb+srv://will:admin@cluster0.zgghm.mongodb.net/somethingelse?retryWrites=true&w=majority"

mongoose.set('useFindAndModify', false);

//talk to DB with mongoose
mongoose
    //connect to DB
    .connect(MONGO_URI, {
        //options for connect method to parse URI
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
        dbName: "dtiys",
    })
    .then(() => console.log('Connected to Mongo'))
    .catch((err) => console.log(err));

//make schema
const Schema = mongoose.Schema
const postSchema = new Schema({
    author: String,
    createDate: String,
    updateDate: String,
    image: String,
    discussion: [
        {author: String, text: String}
    ]
})

const subPostSchema = new Schema({
    subPostId: String,
    author: String,
    createDate: String,
    updateDate: String,
    image: String,
    discussion: [
        {author: String, text: String}
    ]
})

//make model from schema
const Post = mongoose.model('post', postSchema)
const SubPost = mongoose.model('subPost', subPostSchema)

//export model
module.exports = {
    Post,
    SubPost
}