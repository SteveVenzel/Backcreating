
import {Profile} from '../types/Profile.types';
import {
  readProfiles,
  readProfileById,
  readProfileByName,
  createProfile,
  updateProfile,
  deleteProfileById
} from '../data/Profile.data';



interface ServiceLayerResponse {
  code: number,
  result?: Profile | Profile[],
  message?: string;
  errorMessage?: unknown,
}


const getProfiles = (): Promise<ServiceLayerResponse> => {

  return new Promise((resolve, reject) => {
    readProfiles()
      .then((dataLayerResponse: Profile[]) => {

        const localProfilesDB = dataLayerResponse;
        resolve({ code: 200, result: localProfilesDB});
      })
      .catch((error) => {
        reject({code: 500, message: "Error inesperado ", errorMessage: error });
      });
  });
};

const getProfileById = (id: string): Promise<ServiceLayerResponse> => {
  return new Promise((resolve, reject) => {
    readProfileById(id)
      .then((dataLayerResponse) => {
        if((dataLayerResponse as Profile[]).length === 0){
          resolve({ code: 404 , message: 'Cliente no existe' });
        }else{
          resolve({ code: 200, result: dataLayerResponse as Profile });
        }
      })
      .catch(error => {
        reject({code: 500, message: "Error inesperado", errorMessage: error});
      });
  });
};


const getProfileByName = (name: string): Promise<ServiceLayerResponse> => {
  return new Promise((resolve, reject) => {
    readProfileByName(name)
      .then((dataLayerResponse) => {
        if((dataLayerResponse as Profile[]).length === 0){
          resolve({ code: 404 , message: 'Cliente no existe' });
        }else{
          resolve({ code: 200, result: dataLayerResponse as Profile });
        }
      })
      .catch(error => {
        reject({code: 500, message: "Error inesperado", errorMessage: error});
      });
  });
};


const postProfile = (body: Profile): Promise<ServiceLayerResponse> => {
  return new Promise((resolve, reject) => {
    createProfile(body)
      .then((dataLayerResponse) => {
        resolve({code: 201, message: dataLayerResponse as string });
      })
      .catch(error => {
        reject({code: 500, message: "Error inesperado", errorMessage: error });
      });
  });
};

const putProfile = (id: string, body: Profile): Promise<ServiceLayerResponse> => {
  return new Promise((resolve, reject) => {
    updateProfile(id, body)
      .then((dataLayerResponse) => {
        if(dataLayerResponse === 200)(
          resolve({code: 200, message: 'Cliente actualizado exitosamente' as string })
        );
      })
      .catch(error =>{
        if(error === 404){
          reject({ code: 404, message: 'Cliente no encontrado'});
        }else{
          reject({ code: 500, message: 'Unexpected error', errorMessage: error});
        }
      });
  });
};

const deleteProfile = (id: string): Promise<ServiceLayerResponse>  => {
  return new Promise((resolve, reject) => {
    deleteProfileById(id)
      .then((dataLayerResponse) => {
        if(dataLayerResponse === 200){
          resolve({ code: 200, message: "Cliente borrado"});
        }
      })
      .catch((error) => {
        if(error === 404){
          reject({code: 404, message: "Cliente no existe"});
        }else{
          reject({ code: 500, message: "Error inesperado", errorMessage: error });
        }
      });
  });
};

export {
  getProfiles,
  getProfileById,
  getProfileByName,
  postProfile,
  putProfile,
  deleteProfile
}; // Se exportan la funciones para que pueda ser usada en otros archivos.