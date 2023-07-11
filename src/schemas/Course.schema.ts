import mongoose from "mongoose";
import { Course } from "../types/Course.types";


const Course = new mongoose.
Schema<Course>({
  id: {type: String, required: true},
  Science: {type: String, required: true},
  Physycal: {type: String, required: true},
  Chemistry: {type: String, required: true},
  Artistic: {type: String, required: true},
  Math: {type: String, required: true},
});


const CourseSchema = mongoose.model("Course", Course);
export { CourseSchema };