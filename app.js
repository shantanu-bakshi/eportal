require('./passport');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const User = require("./model/user");
const Post = require("./model/post");
const apiRouter = require('./router/api');
const Policy = require("./model/policy");
const Department = require("./model/department");


const app = express();


const uri = "mongodb+srv://m001-student:shantanu261@sandbox.epdsf.mongodb.net/mydb?retryWrites=true&w=majority";
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));


async function populate(){
    const posts = [
        {
            postname : "post1",
            postcontent : "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem",
            postauthor : "user1"
        },
        {
            postname : "post1",
            postcontent : "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem",
            postauthor : "user1"
        },
        {
            postname : "post1",
            postcontent : "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem",
            postauthor : "user1"
        },
        {
            postname : "post1",
            postcontent : "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem",
            postauthor : "user1"
        }

    ]

    const err = await Post.insertMany(posts);
    if(err){
        console.log(err);
    }
    else{
        console.log("sucess");
    }

    const docs = await Post.find({});
    console.log(docs);

}

async function populate2(){
    const policies = [
        {
            date : '2022-07-12',
            department : "Human resources",
            maintext : "The current HR policy was issued in 2021. It provides Guidance to employees working in SHOTT Glass India Pvt. Ltd regarding information on working conditions,employee benefits, recruitment,Attendence, Leave,Travel, Code of conduct, Greivance,Health and other legal topics."
        },
        {
            date : '2022-07-12',
            department : "Quality",
            maintext : "The current Quality policy of Business unit tubing was issued in 2020. It is based on requirements and expectations of customers and SCHOTT Strategy. The policy is process oriented and it shows the commitment to ensure constant improvement in the overall performance of business unit tubing. "    
        },
        {
            date : '2022-07-12',
            department : "EHS (Environment Health & Safety)",
            maintext : "The current Safety,Health and Environment policy was issued 2021. It aspires to attain excellence in establishing safe and environment friendly process for manufacturing pharma tubing glass and provide a safe work environment without risk to health of employees, contractors and General public."
        }
        // {
        //     title : "Production",
        //     image : "./i3.jpg",
        //     description : "The Production department is responsible for production of glass tubing.The raw materials like silica sand and others are mixed in batch house and sent to furnaces. The molten glass is processed to form tubes and paked in pallets. The quality is ensured by strict process control and online measuremets on 100% tubes.",
        // },
        // {
        //     title : "Maintenance",
        //     image : "./i4.jpg",
        //     description : "The equipment used for mixing raw material, furnaces and production of glass tubes are maintained by the maintenance department. The department consists of Mechanical, electrical, instrumentation, Utilities and civil functions. The Preventive maintenance plans are followed to avoid breakdowns.",
        // },
        // {
        //     title : "IT",
        //     image :  "./it.jpeg",
        //     description : "IT department maintains the IT resources required in the production for continuous monitoring of the process and also for the Offices. Maintenance of servers is very important task performed by IT."
        // },
        // {
        //     title : "Human resources, Administration and EHS",
        //     image : "./hr.png",
        //     description : "HR is responsible for the recruitment ,legal and Training processes. The recruitment of personnel is done by an established process, advertisement are given in news papers . The Liaison with Government agencies are done for factory licenses etc. Training plans are followed for regular training of the personnel."
        // },
        // {
        //     title : "Quality Management",
        //     image : "./i4.jpg",
        //     description : "The Quality Management Department monitors and controls the Quality related matters in the orgnization in coordination with production and Supplychain. It handles the customer complaints and conducts the audits at suppliers and internal audit in the plant to ensure the compliance with the ISO 9001:2015 Quality management system"
        // },
        // {
        //     title : "Supplychain",
        //     image : "./i4.jpg",
        //     description : "The Supplychain department is responsible for Procurement of Material, storage of Materials and Finished goods, Despatch of finished goods. The materials are procured as per Production requirement and Finished goods are despatched as per customer requirements"
        // }
    ];

    const err = await Policy.insertMany(policies);
    if(err){
        console.log(err);
    }
    else{
        console.log("sucess");
    }

    const docs = await Policy.find({});
    console.log(docs);

}

// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));


app.use(cors());

app.get("/", (req,res)=>{
    res.send("hi mom");
    // populate2();
})

app.use("/api", apiRouter);

app.listen(3000, ()=> console.log("hi mom"));