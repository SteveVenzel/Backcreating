

import {Lway} from '../types/Lway.types';
import {
  readLways,
  readLwaysById,
  readLwaysByName,
  createLways,
  updateLways,
  deleteLwaysById
} from '../data/Lway.data';



interface ServiceLayerResponse {
  code: number,
  result?: Lway | Lway[],
  message?: string;
  errorMessage?: unknown,
}


const getLways = (): Promise<ServiceLayerResponse> => {

  return new Promise((resolve, reject) => {
    readLways()
      .then((dataLayerResponse: Lway[]) => {
        const localLwaysDB = dataLayerResponse;
        resolve({ code: 200, result: localLwaysDB});
      })
      .catch((error) => {
        reject({code: 500, message: "Error inesperado ", errorMessage: error }); 
      });
  });
};


const getLwayById = (id: string): Promise<ServiceLayerResponse> => {
  return new Promise((resolve, reject) => {
    readLwaysById(id)
      .then((dataLayerResponse) => {
        if((dataLayerResponse as Lway[]).length === 0){
          resolve({ code: 404 , message: 'Cliente no existe' });
        }else{
          resolve({ code: 200, result: dataLayerResponse as Lway });
        }
      })
      .catch(error => {
        reject({code: 500, message: "Error inesperado", errorMessage: error});
      });
  });
};


const getLwayByName = (name: string): Promise<ServiceLayerResponse> => {
  return new Promise((resolve, reject) => {
    readLwaysByName(name)
      .then((dataLayerResponse) => {
        if((dataLayerResponse as Lway[]).length === 0){
          resolve({ code: 404 , message: 'Cliente no existe' });
        }else{
          resolve({ code: 200, result: dataLayerResponse as Lway });
        }
      })
      .catch(error => {
        reject({code: 500, message: "Error inesperado", errorMessage: error});
      });
  });
};


const postLway = (body: Lway): Promise<ServiceLayerResponse> => {
  return new Promise((resolve, reject) => {
    createLways(body)
      .then((dataLayerResponse) => {
        resolve({code: 201, message: dataLayerResponse as string });
      })
      .catch(error => {
        reject({code: 500, message: "Error inesperado", errorMessage: error });
      });
  });
};

const putLway = (id: string, body: Lway): Promise<ServiceLayerResponse> => {
  return new Promise((resolve, reject) => {
    updateLways(id, body)
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


const deleteLway = (id: string): Promise<ServiceLayerResponse>  => {
  return new Promise((resolve, reject) => {
    deleteLwaysById(id)
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
  getLways,
  getLwayById,
  getLwayByName,
  postLway,
  putLway,
  deleteLway
}; // Se exportan la funciones para que pueda ser usada en otros archivos.