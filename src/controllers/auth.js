import { registerSchema } from "../schemas/auth";

export const signup = (request, response) => {
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
  // ma hoa mat khau
  // them user vao db
  // tra ve thong tin user dang ky (khong bao gom mat khau)
};

export const signin = (request, response) => {
  console.log("Dang nhap");
};
