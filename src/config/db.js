import mongoose from "mongoose";

export const connectDB = async () => {
  //   mongoose
  //     .connect("mongodb://localhost:27017/WD18410")
  //     .then(() => {
  //       console.log("DB connected!");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  try {
    await mongoose.connect("mongodb://localhost:27017/WD18410");
    console.log("DB connected!");
  } catch (error) {
    console.log(error);
  }
};
