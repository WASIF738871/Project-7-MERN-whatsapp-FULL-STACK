// importing
import express from 'express';
import mongoose from 'mongoose';
import path,{ dirname }from 'path';
import messageRouter from './routes/messageRoute.js';
// import Pusher  from 'pusher';
import cors from "cors";

//app config
import dotenv from 'dotenv';
dotenv.config();
const {PORT, CONNECTION_URL} = process.env;
// const {appId, key,secret, cluster, useTLS } = process.env;

const app = express();

// middleware
app.use(express.json());
app.use(express.static(path.join(dirname + "/public")));
app.use(cors());

// app.use((req, res, next)=>{
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     next();
// });

app.use("/" , messageRouter);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.set('strictQuery', false);
mongoose.connect(CONNECTION_URL, options)
.then(() => console.log("MongoDB is CONNECTED"))
.catch(err => console.log(err.message));


// ?????

// api routes
// app.get('/', (req,res)=>{
//     res.status(200).send({status:true, message:'Hello World'})
// });

// listen
app.listen(PORT, ()=>{
    console.log(`Backend Server is running at http://localhost:${PORT}`);
});