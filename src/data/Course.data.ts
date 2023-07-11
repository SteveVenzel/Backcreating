import { Course } from '../types/Course.types';
import { CourseSchema } from '../schemas/Course.schema';


const readCourses = (): Promise<Course[]> => {
  return new Promise( async (resolve, reject) => {
    try {
      const mongoResponse = await CourseSchema.find();
      resolve(mongoResponse);
    } catch (error) {
      reject(error);
    }
  });
};


const readCourseById = (id: string) =>{
  return new Promise( async (resolve, reject) => {
    try {
      const mongoResponse = await CourseSchema.findById(id);

      if(mongoResponse === null){
        reject(404);
      }else{
        resolve(mongoResponse);
      }
    } catch (error) {
      reject(error);
    }
  });
};


const readCourseByName = (name: string) =>{
  return new Promise( async (resolve, reject)=> {
    try {
      const mongoResult = await CourseSchema.findOne({ name: name });

      if(mongoResult === null){
        reject(404);
      } else {
        resolve(mongoResult);
      }
    } catch (error) {
      reject(error);
    }
  });
};


const createCourse = (body: Course) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Course = new CourseSchema(body);
      await Course.save();
      resolve('Se ha agregado cliente');
    } catch (error) {
      reject(error);
    }
  });
};


const updateCourse = (id: string, body: Course) => {
  return new Promise( async (resolve, reject) => {
    try {
      const updatedEntity = await CourseSchema.findByIdAndUpdate( id, body, { new: true} );

      if(updatedEntity === null){
        reject(404);
      }else{
        resolve(200);
      }
    } catch (error) {
      reject(error);
    }
  });
};


const deleteCourseById = (id: string) => {
  return new Promise( async (resolve, reject) => {
    try {
      const deletedEntity = await CourseSchema.findByIdAndRemove(id);

      if(deletedEntity === null){
        reject(404);
      }else{
        resolve(200);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export {
  readCourses,
  readCourseById,
  readCourseByName,
  createCourse,
  updateCourse,
  deleteCourseById
}; // Se exportan las funciones para que puedan ser usada en otros archivos.
