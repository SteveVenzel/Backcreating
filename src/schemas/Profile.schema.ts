import mongoose from "mongoose";
import { Profile } from "../types/Profile.types";


const Profile = new mongoose.
Schema<Profile>({
  id: {type: String, required: true},
  Name: {type: String, required: true},
  age: {type: String, required: true},
  Cédula: {type: String, required: true},
  percent: {type: String, required: true},
  level: {type: String, required: true},
});



const ProfileSchema = mongoose.model("Profile", Profile);
export { ProfileSchema };