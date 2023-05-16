import mongoose from "mongoose";

let isConnected = false;

const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Connected already to database");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected.");
  } catch (error) {
    console.error(error);
  }
};

export { connectToDatabase };
