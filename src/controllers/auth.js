import { registerSchema } from "../schemas/auth";
import User from "../models/auth";
import bcryptjs from "bcryptjs";

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

export const signin = (request, response) => {
  // lay du lieu user gui len
  // kiem tra tinh hop le cua du lieu
  // kiem tra xem user co ton tai hay khong
  // neu user khong ton tai thi tra ve thong bao loi
  // neu user ton tai thi kiem tra mat khau
  // neu mat khau khong dung thi tra ve thong bao loi
  // neu mat khau dung thi tra ve thong tin user dang nhap
};
