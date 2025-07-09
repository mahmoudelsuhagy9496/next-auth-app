// import { z } from "zod";
// export const LoginSchema=z.object({
// email:z.string().email({message:"Invalid email"}),
// password:z.string().min(6,{message:"Password must be at least 6 characters long"})
// })

import { z } from "zod";
// logi schema 
export const LoginSchema = z.object({
  email: z.string().email({ message: "Invaild email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
// register schema
export const RegisterSchema = z.object({
  name: z
    .string({
      required_error: "Name is Required",
      invalid_type_error: "Name  must be of type string",
    })
    .min(2, { message: "Name must be at least 2 characters long " }),
  email: z.string().email({ message: "Invaild email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
