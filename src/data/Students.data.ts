/* eslint-disable no-async-promise-executor */

/*
  En este archivo se definen las funciones que se encargan de interactuar con la base de datos.}
  Se usa mongoose para interactuar con la base de datos.
*/
import { Student } from '../types/Student.types';
import { StudentSchema } from '../schemas/Student.schema'; 


const readStudents = (): Promise<Student[]> => {
  return new Promise( async (resolve, reject) => {
    try {
      const mongoResponse = await StudentSchema.find();
      resolve(mongoResponse);
    } catch (error) {
      reject(error);
    }
  });
};


const readStudentById = (id: string) =>{
  return new Promise( async (resolve, reject) => {
    try {
      const mongoResponse = await StudentSchema.findById(id); 

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


const readStudentByName = (name: string) =>{
  return new Promise( async (resolve, reject)=> {
    try {
      const mongoResult = await StudentSchema.findOne({ name: name });

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


const createStudent = (body: Student) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Student = new StudentSchema(body);
      await Student.save();
      resolve('Se ha agregado cliente');
    } catch (error) {
      reject(error);
    }
  });
};


const updateStudent = (id: string, body: Student) => {
  return new Promise( async (resolve, reject) => {
    try {
      const updatedEntity = await StudentSchema.findByIdAndUpdate( id, body, { new: true} );

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


const deleteStudentById = (id: string) => {
  return new Promise( async (resolve, reject) => {
    try {
      const deletedEntity = await StudentSchema.findByIdAndRemove(id);

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
  readStudents,
  readStudentById,
  readStudentByName,
  createStudent,
  updateStudent,
  deleteStudentById
}; // Se exportan las funciones para que puedan ser usada en otros archivos.
