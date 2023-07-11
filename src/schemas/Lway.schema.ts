import mongoose from "mongoose";
import { Lway } from "../types/Lway.types";


const Lway = new mongoose.
Schema<Lway>({
  id: {type: String, required: true},
  name:{type: String, required: true},
  age:{type: String, required: true},
  Cédula: {type: String, required: true},
  Exercises: {type: String, required: true},
  sounds: {type: String, required: true},
  webpages: {type: String, required: true},
  videos: {type: String, required: true},
  books: {type: String, required: true},
});



const LwaysSchema = mongoose.model("Lways", Lway);
export { LwaysSchema };