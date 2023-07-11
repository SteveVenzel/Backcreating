import mongoose from "mongoose";
import { Qualification } from "../types/Qualification.types";



const Qualification = new mongoose.
Schema<Qualification>({
  id: {type: String, required: true},
  Name:{type: String, required: true},
  age:{type: String, required: true},
  Cédula: {type: String, required: true},
  Qualification: {type: String, required: true},

});



const QualificationSchema = mongoose.model("Qualification", Qualification);
export { QualificationSchema };