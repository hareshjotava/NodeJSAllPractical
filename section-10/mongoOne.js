const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'testDB'

MongoClient.connect(connectionURL, { useNewUrlParser: true,useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    
    // db.collection('testcollection').insertOne({
    //     name: 'Haresh',
    //     age: 23
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log("Insert One Result : ",result.ops)
    // })

      db.collection('testcollection').findOne({"_id" :new ObjectID("5dd4c400677838990037b47e") }, (error, testcollection) => {
        console.log("Find One Result :",testcollection)
    })

    // db.collection('testcollection').insertMany([
    //     {
    //         name: 'Dharmesh',
    //         age: 28
    //     }, {
    //         name: 'Hitaxi',
    //         age: 21
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents!')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Clean the house',
    //         completed: true
    //     },{
    //         description: 'Renew inspection',
    //         completed: false
    //     },{
    //         description: 'Pot plants',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks!')
    //     }

    //     console.log("Insert many result :",result.ops)
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     console.log("Find Result : ",tasks)
    // })
})