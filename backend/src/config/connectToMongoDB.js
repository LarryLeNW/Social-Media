import mongoose from "mongoose";

const connectToMongoDB = async () => {
  console.log("Starting connect to db...");
  await mongoose.connect(process.env.MONGO_DB_URI);
};

export default connectToMongoDB;
