import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().required().trim().min(3).messages({
    "any.required": "Username la truong bat buoc",
    "string.empty": "Username khong duoc de trong",
    "string.trim": "Username khong duoc chua khoang trang",
    "string.min": "Username phai co it nhat 3 ky tu",
  }),
  email: Joi.string().required().trim().email().messages({
    "any.required": "Email la truong bat buoc",
    "string.empty": "Email khong duoc de trong",
    "string.trim": "Email khong duoc chua khoang trang",
    "string.email": "Email khong hop le",
  }),
  password: Joi.string().required().min(6).messages({
    "any.required": "Password la truong bat buoc",
    "string.empty": "Password khong duoc de trong",
    "string.min": "Password phai co it nhat 6 ky tu",
  }),
  confirmPassword: Joi.string()
    .required()
    .min(6)
    .valid(Joi.ref("password"))
    .messages({
      "any.required": "Confirm Password la truong bat buoc",
      "any.only": "Confirm Password phai trung voi Password",
      "string.empty": "Confirm Password khong duoc de trong",
      "string.min": "Confirm Password phai co it nhat 6 ky tu",
    }),
});
