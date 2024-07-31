import { registerSchema, signinSchema } from "../schemas/auth";
import User from "../models/auth";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (request, response) => {
  // lay du lieu user gui len
  //   console.log(request.body);
  const { username, email, password } = request.body;
  // kiem tra tinh hop le cua du lieu
  //   console.log(registerSchema.validate(request.body, { abortEarly: false }));
  const { error } = registerSchema.validate(request.body, {
    abortEarly: false,
  });
  if (error) {
    // console.log(error.details);
    const errorMessage = error.details.map((message) => message.message);
    response.status(400).json(errorMessage);
  }
  // kiem tra xem user da ton tai chua
  const existUser = await User.findOne({ email: email });
  if (existUser) {
    return response.status(400).json({ errorMessage: "Email da ton tai" });
  }

  // ma hoa mat khau
  const hashedPassword = await bcryptjs.hash(password, 10);
  // console.log(hashedPassword);
  // them user vao db
  const user = await User({ username, email, password: hashedPassword }).save();
  // tra ve thong tin user dang ky (khong bao gom mat khau)
  response.status(201).json({ message: "Dang ky thanh cong", user });
};

export const signin = async (request, response) => {
  // lay du lieu user gui len
  const { email, password } = request.body;
  // kiem tra tinh hop le cua du lieu
  const { error } = signinSchema.validate(request.body, { abortEarly: false });
  if (error) {
    const message = error.details.map((message) => message.message);
    return response.status(400).json({ message });
  }
  // kiem tra xem user co ton tai hay khong
  const existUser = await User.findOne({ email: email });
  // neu user khong ton tai thi tra ve thong bao loi
  if (!existUser) {
    return response.status(400).json({ message: "Email khong ton tai" });
  }
  // neu user ton tai thi kiem tra mat khau
  const isValidPassword = await bcryptjs.compare(password, existUser.password);
  // neu mat khau khong dung thi tra ve thong bao loi
  if (!isValidPassword) {
    return response.status(400).json({ message: "Mat khau khong dung" });
  }

  const token = jwt.sign({ id: existUser._id }, "123456", { expiresIn: "30s" });
  response.cookie("token", token, { httpOnly: true });

  // neu mat khau dung thi tra ve thong tin user dang nhap
  existUser.password = undefined;
  response.status(200).json({
    message: "Dang nhap thanh cong",
    user: existUser,
    token,
  });
};
