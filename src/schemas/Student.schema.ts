import mongoose from "mongoose";
import { Student } from "../types/Student.types";


const Student = new mongoose.
Schema<Student>({
  id: {type: String, required: true},
  Name:{type: String, required: true},
  age:{type: String, required: true},
  Cédula: {type: String, required: true},
  email:{type: String, required: true},
  address:{type: String, required: true},
  phonenumber:{type: String, required: true},
  civil: {type: String, required: true},
  bloodtype:{type: String, required: true},
});




const StudentSchema = mongoose.model("Student", Student);
export { StudentSchema };