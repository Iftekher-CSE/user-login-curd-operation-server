const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { query } = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());

// mongodb connection

const uri = "mongodb+srv://curd_operation_redux_user:YEuTc8X6fRtkjsV0@cluster0.ia1gz29.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

async function run() {
    try {

        // Collections
        const usersCollection = client.db("reduxCurdOperation").collection("users");

        // add new user, update old user, provide jwt
        app.put("/user/:email", async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user,
            };
            const result = usersCollection.updateOne(filter, updateDoc, options);

            res.send( result);
        });

    } finally {
    }
}

run().catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("CURN operation Server is running");
});

app.listen(port, () => {
    console.log(`CURN operation Server is running on ${port}`);
});