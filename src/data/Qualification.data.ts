
import { Qualification } from '../types/Qualification.types';
import { QualificationSchema } from '../schemas/Qualification.schema'; 

const readQualifications = (): Promise<Qualification[]> => {
  return new Promise( async (resolve, reject) => {
    try {
      const mongoResponse = await QualificationSchema.find();
      resolve(mongoResponse);
    } catch (error) {
      reject(error);
    }
  });
};


const readQualificationById = (id: string) =>{
  return new Promise( async (resolve, reject) => {
    try {
      const mongoResponse = await QualificationSchema.findById(id);

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


const readQualificationByName = (name: string) =>{
  return new Promise( async (resolve, reject)=> {
    try {
      const mongoResult = await QualificationSchema.findOne({ name: name });

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


const createQualification = (body: Qualification) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Qualification = new QualificationSchema(body);
      await Qualification.save();
      resolve('Se ha agregado cliente');
    } catch (error) {
      reject(error);
    }
  });
};


const updateQualification = (id: string, body: Qualification) => {
  return new Promise( async (resolve, reject) => {
    try {
      const updatedEntity = await QualificationSchema.findByIdAndUpdate( id, body, { new: true} );

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


const deleteQualificationById = (id: string) => {
  return new Promise( async (resolve, reject) => {
    try {
      const deletedEntity = await QualificationSchema.findByIdAndRemove(id);

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
  readQualifications,
  readQualificationById,
  readQualificationByName,
  createQualification,
  updateQualification,
  deleteQualificationById
}; // Se exportan las funciones para que puedan ser usada en otros archivos.
