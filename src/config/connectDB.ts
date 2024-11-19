import mongoose from "mongoose";
export const connectDB = async () => {
  const MONGO_URI = process.env.DATABESE || "";

//  await mongoose
//     .connect(MONGO_URI, {
//       // useNewUrlParser: true,
//       // useUnifiedTopology: true,
//     })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.error("Could not connect to MongoDB", err));
try {
    await mongoose.connect(MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};


// module.exports = connectDB;
