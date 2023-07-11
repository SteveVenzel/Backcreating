
import {Qualification} from '../types/Qualification.types';
import {
  readQualifications,
  readQualificationById,
  readQualificationByName,
  createQualification,
  updateQualification,
  deleteQualificationById
} from '../data/Qualification.data';



interface ServiceLayerResponse {
  code: number,
  result?: Qualification | Qualification[],
  message?: string;
  errorMessage?: unknown,
}


const getQualifications = (): Promise<ServiceLayerResponse> => {

  return new Promise((resolve, reject) => {
    readQualifications()
      .then((dataLayerResponse: Qualification[]) => {

        const localQualificationsDB = dataLayerResponse;
        resolve({ code: 200, result: localQualificationsDB});
      })
      .catch((error) => {
        reject({code: 500, message: "Error inesperado ", errorMessage: error });
      });
  });
};

const getQualificationById = (id: string): Promise<ServiceLayerResponse> => {
  return new Promise((resolve, reject) => {
    readQualificationById(id)
      .then((dataLayerResponse) => {
        if((dataLayerResponse as Qualification[]).length === 0){
          resolve({ code: 404 , message: 'Cliente no existe' });
        }else{
          resolve({ code: 200, result: dataLayerResponse as Qualification });
        }
      })
      .catch(error => {
        reject({code: 500, message: "Error inesperado", errorMessage: error});
      });
  });
};


const getQualificationByName = (name: string): Promise<ServiceLayerResponse> => {
  return new Promise((resolve, reject) => {
    readQualificationByName(name)
      .then((dataLayerResponse) => {
        if((dataLayerResponse as Qualification[]).length === 0){
          resolve({ code: 404 , message: 'Cliente no existe' });
        }else{
          resolve({ code: 200, result: dataLayerResponse as Qualification });
        }
      })
      .catch(error => {
        reject({code: 500, message: "Error inesperado", errorMessage: error});
      });
  });
};

const postQualification = (body: Qualification): Promise<ServiceLayerResponse> => {
  return new Promise((resolve, reject) => {
    createQualification(body)
      .then((dataLayerResponse) => {
        resolve({code: 201, message: dataLayerResponse as string });
      })
      .catch(error => {
        reject({code: 500, message: "Error inesperado", errorMessage: error });
      });
  });
};

const putQualification = (id: string, body: Qualification): Promise<ServiceLayerResponse> => {
  return new Promise((resolve, reject) => {
    updateQualification(id, body)
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


const deleteQualification = (id: string): Promise<ServiceLayerResponse>  => {
  return new Promise((resolve, reject) => {
    deleteQualificationById(id)
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
  getQualifications,
  getQualificationById,
  getQualificationByName,
  postQualification,
  putQualification,
  deleteQualification
}; // Se exportan la funciones para que pueda ser usada en otros archivos.