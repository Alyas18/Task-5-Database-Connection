const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient

const connectionUrl = 'mongodb://127.0.0.1:27017'

const dbname = "23-3-2024"

mongoClient.connect(connectionUrl, (error, res1) => {
    if (error) {
        return console.log('error has occured')
    }
    console.log('All Perf')

    const db = res1.db(dbname)

    // insertOne 2
    // db.collection('users').insertOne({
    //     name: 'Aliaa',
    //     age: 22
    // }, (error, res) => {
    //     if (error) {
    //         console.log('Unable to insert user')
    //     }
    // })

    // db.collection('users').insertOne({
    //     name: 'Reem',
    //     age: 29
    // }, (error, res) => {
    //     if (error) {
    //         console.log('Unable to insert user')
    //     }
    // })

    // // insertMany 10 users (5 of them have the same age 27 y)
    // db.collection('users').insertMany(
    //     [
    //         { name: 'Aya', age: 27 },
    //         { name: 'Menna', age: 20 },
    //         { name: 'Mai', age: 27 },
    //         { name: 'Mariam', age: 35 },
    //         { name: 'Merna', age: 27 },
    //         { name: 'Sara', age: 57 },
    //         { name: 'Sama', age: 27 },
    //         { name: 'Shada', age: 41 },
    //         { name: 'Jana', age: 27 },
    //         { name: 'Rana', age: 41 }
    //     ], (error, res) => {
    //         if (error) {
    //             console.log('Unable to insert user')
    //         }
    //     }

    // )

    //  find   match  27 y 
    // db.collection('users').find({ age: 27 }).toArray((error, users) => {
    //     if (error) {
    //         return console.log('error has occured')
    //     }
    //     console.log(users)
    // })

    //  limit first 3    27y
    // db.collection('users').find({ age: 27 }).limit(3).toArray((error, users) => {
    //     if (error) {
    //         return console.log('error has occured')
    //     }
    //     console.log(users)
    // })

    // Find the first 4 users
    db.collection('users')
        .find({})
        .limit(4)
        .toArray((error, users) => {
            if (error) {
                return console.log('Error occurred while fetching users');
            }

            // Extract the _id values of the first 4 users
            const userIDs = users.map((user) => user._id);

            // Update the name for the first 4 users  $set name
            db.collection('users')
                .updateMany(
                    { _id: { $in: userIDs } },
                    { $set: { name: 'ali' } }
                )
                .then((res) => {
                    console.log(res.modifiedCount);
                })
                .catch((error) => {
                    console.log('Error occurred while updating users', error);
                });



            // Update the age for the first 4 users, increment by 1 $inc age
            db.collection('users')
                .updateMany(
                    { _id: { $in: userIDs } },
                    { $inc: { age: 1 } }
                )
                .then((res) => {
                    console.log(res.modifiedCount);


                    // Update the age for the first user, increment by 5
                    db.collection('users')
                        .updateOne(
                            { _id: userIDs[0] },
                            { $inc: { age: 5 } }
                        )
                        .then((res) => {
                            console.log(res.modifiedCount);


                            // Update the age for the first 5 users, increment by 10
                            db.collection('users')
                                .updateMany(
                                    { _id: { $in: userIDs.slice(0, 5) } },
                                    { $inc: { age: 10 } }
                                )
                                .then((res) => {
                                    console.log(res.modifiedCount);


                                    // Delete the documents with age 41
                                    db.collection('users')
                                        .deleteMany({ age: 41 })
                                        .then((res) => {
                                            console.log(`Deleted ${res.deletedCount} documents`);
                                        })
                                        .catch((error) => {
                                            console.log('Error occurred while deleting documents', error);
                                        });
                                })
                                .catch((error) => {
                                    console.log('Error occurred while updating users', error);
                                });
                        })
                        .catch((error) => {
                            console.log('Error occurred while updating user', error);
                        });
                })
                .catch((error) => {
                    console.log('Error occurred while updating users', error);
                });
        });

});













