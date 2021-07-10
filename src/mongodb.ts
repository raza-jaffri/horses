const mongoose = require("mongoose")

export class MongoDb {
  public async connect() {
    var mongoDB = "mongodb://127.0.0.1:27017/horse"
    mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    var db = mongoose.connection
    db.once("open", function () {
      console.log("Connected!")
    })

    const breedsSchema = new mongoose.Schema(
      { name: String },
      { autoCreate: true }
    )
    const Breed = mongoose.model("Breed21", breedsSchema)
    const breed1 = new Breed({ name: "horses" })
    console.log(breed1.name)
    await Breed.createCollection()
  }
}
