const mongoose = require('mongoose');
const mongoURI = 'mongodb://ak832038:Akash2001@ac-v2nyy9y-shard-00-00.shvwmwn.mongodb.net:27017,ac-v2nyy9y-shard-00-01.shvwmwn.mongodb.net:27017,ac-v2nyy9y-shard-00-02.shvwmwn.mongodb.net:27017/GoFoodMERN?ssl=true&replicaSet=atlas-13awiz-shard-0&authSource=admin&retryWrites=true&w=majority'

 mongoose.set('strictQuery', true);
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("connected");

            // u can fetch/read data from mongodb using this step
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;

                    }

                })
                // if(err)console.log(err);
                // else {
                //     global.food_items=data;

                // }
            })
        }
    });
}

module.exports = mongoDB;