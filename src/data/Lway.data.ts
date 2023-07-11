import { Lway } from '../types/Lway.types';
import { LwaysSchema } from '../schemas/Lway.schema';

const readLways = (): Promise<Lway[]> => {
  return new Promise( async (resolve, reject) => {
    try {
      const mongoResponse = await LwaysSchema.find();
      resolve(mongoResponse);
    } catch (error) {
      reject(error);
    }
  });
};


const readLwaysById = (id: string) =>{
  return new Promise( async (resolve, reject) => {
    try {
      const mongoResponse = await LwaysSchema.findById(id); 
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


const readLwaysByName = (name: string) =>{
  return new Promise( async (resolve, reject)=> {
    try {
      const mongoResult = await LwaysSchema.findOne({ name: name });

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


const createLways = (body: Lway) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Lways = new LwaysSchema(body);
      await Lways.save();
      resolve('Se ha agregado cliente');
    } catch (error) {
      reject(error);
    }
  });
};


const updateLways = (id: string, body: Lway) => {
  return new Promise( async (resolve, reject) => {
    try {
      const updatedEntity = await LwaysSchema.findByIdAndUpdate( id, body, { new: true} );

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


const deleteLwaysById = (id: string) => {
  return new Promise( async (resolve, reject) => {
    try {
      const deletedEntity = await LwaysSchema.findByIdAndRemove(id);

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
  readLways,
  readLwaysById,
  readLwaysByName,
  createLways,
  updateLways,
  deleteLwaysById
}; // Se exportan las funciones para que puedan ser usada en otros archivos.
