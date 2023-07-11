import { Profile } from '../types/Profile.types';
import { ProfileSchema } from '../schemas/Profile.schema';

function readProfiles(): Promise<Profile[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const mongoResponse = await ProfileSchema.find();
      resolve(mongoResponse);
    } catch (error) {
      reject(error);
    }
  });
}


const readProfileById = (id: string) =>{
  return new Promise( async (resolve, reject) => {
    try {
      const mongoResponse = await ProfileSchema.findById(id);

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


const readProfileByName = (name: string) =>{
  return new Promise( async (resolve, reject)=> {
    try {
      const mongoResult = await ProfileSchema.findOne({ name: name });

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


const createProfile = (body: Profile) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Profile = new ProfileSchema(body);
      await Profile.save();
      resolve('Se ha agregado cliente');
    } catch (error) {
      reject(error);
    }
  });
};


const updateProfile = (id: string, body: Profile) => {
  return new Promise( async (resolve, reject) => {
    try {
      const updatedEntity = await ProfileSchema.findByIdAndUpdate( id, body, { new: true} );

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


const deleteProfileById = (id: string) => {
  return new Promise( async (resolve, reject) => {
    try {
      const deletedEntity = await ProfileSchema.findByIdAndRemove(id);

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
  readProfiles,
  readProfileById,
  readProfileByName,
  createProfile,
  updateProfile,
  deleteProfileById
}; // Se exportan las funciones para que puedan ser usada en otros archivos.
