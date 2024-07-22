// import { Product } from "../models/product";
import Product from "../models/product";

export const getAllProduct = async (request, response) => {
  try {
    const data = await Product.find().limit(3).sort({ createdAt: -1 });
    response.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
export const getProductById = async (request, response) => {
  try {
    // const data = await Product.findOne({ _id: request.params.id });
    const data = await Product.findById(request.params.id);
    response.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
export const createProduct = async (request, response) => {
  try {
    const data = await Product(request.body).save();
    response.status(201).json(data);
  } catch (error) {
    console.log(error);
  }
  // console.log(request.body);
};
export const updateProduct = async (request, response) => {
  try {
    const data = await Product.findOneAndUpdate(
      { _id: request.params.id },
      request.body,
      { new: true }
    );
    response
      .status(200)
      .json({ dataUpdated: data, message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const deleteProduct = async (request, response) => {
  try {
    const data = await Product.findOneAndDelete({ _id: request.params.id });
    response.status(200).json({ data, message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
