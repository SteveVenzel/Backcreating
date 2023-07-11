
import {Course} from '../types/./Course.types';
import {
  readCourses,
  readCourseById,
  readCourseByName,
  createCourse,
  updateCourse,
  deleteCourseById
} from '../data/Course.data';


interface ServiceLayerResponse {
  code: number,
  result?: Course | Course[],
  message?: string;
  errorMessage?: unknown,
}


const getCourses = (): Promise<ServiceLayerResponse> => {

  return new Promise((resolve, reject) => {
    readCourses()
      .then((dataLayerResponse: Course[]) => {

        const localCoursesDB = dataLayerResponse;
        resolve({ code: 200, result: localCoursesDB});
      })
      .catch((error) => {
        reject({code: 500, message: "Error inesperado ", errorMessage: error }); 
      });
  });
};


const getCourseById = (id: string): Promise<ServiceLayerResponse> => {
  return new Promise((resolve, reject) => {
    readCourseById(id)
      .then((dataLayerResponse) => {
        if((dataLayerResponse as Course[]).length === 0){
          resolve({ code: 404 , message: 'Cliente no existe' });
        }else{
          resolve({ code: 200, result: dataLayerResponse as Course });
        }
      })
      .catch(error => {
        reject({code: 500, message: "Error inesperado", errorMessage: error});
      });
  });
};


const getCourseByName = (name: string): Promise<ServiceLayerResponse> => {
  return new Promise((resolve, reject) => {
    readCourseByName(name)
      .then((dataLayerResponse) => {
        if((dataLayerResponse as Course[]).length === 0){
          resolve({ code: 404 , message: 'Cliente no existe' });
        }else{
          resolve({ code: 200, result: dataLayerResponse as Course });
        }
      })
      .catch(error => {
        reject({code: 500, message: "Error inesperado", errorMessage: error});
      });
  });
};


const postCourse = (body: Course): Promise<ServiceLayerResponse> => {
  return new Promise((resolve, reject) => {
    createCourse(body)
      .then((dataLayerResponse) => {
        resolve({code: 201, message: dataLayerResponse as string }); // Se devuelve un código de respuesta 201 y un mensaje.
      })
      .catch(error => {
        reject({code: 500, message: "Error inesperado", errorMessage: error }); // Se devuelve un código de respuesta 500 y el error.
      });
  });
};

// Esta función se encarga de actualizar un cliente. Es una función asíncrona que retorna una promesa y recibe como parámetro el id del cliente y la información del cliente a actualizar.
const putCourse = (id: string, body: Course): Promise<ServiceLayerResponse> => {
  return new Promise((resolve, reject) => {
    updateCourse(id, body) // Se llama la función de la capa de datos.
      .then((dataLayerResponse) => { // Se accede a la respuesta de la capa de datos.
        if(dataLayerResponse === 200)( // Se valida si la respuesta es un código de respuesta 200.
          resolve({code: 200, message: 'Cliente actualizado exitosamente' as string }) // Se devuelve un código de respuesta 200 y un mensaje.
        );
      })
      .catch(error =>{
        if(error === 404){ // Se valida si la respuesta es un código de respuesta 404.
          reject({ code: 404, message: 'Cliente no encontrado'}); // Se devuelve un código de respuesta 404 y un mensaje.
        }else{
          reject({ code: 500, message: 'Unexpected error', errorMessage: error}); // Se devuelve un código de respuesta 500 y el error.
        }
      });
  });
};

// Esta función se encarga de borrar un cliente. Es una función asíncrona que retorna una promesa y recibe como parámetro el id del cliente a borrar.
const deleteCourse = (id: string): Promise<ServiceLayerResponse>  => {
  return new Promise((resolve, reject) => {
    deleteCourseById(id) // Se llama la función de la capa de datos.
      .then((dataLayerResponse) => { // Se accede a la respuesta de la capa de datos.
        if(dataLayerResponse === 200){ // Se valida si la respuesta es un código de respuesta 200.
          resolve({ code: 200, message: "Cliente borrado"}); // Se devuelve un código de respuesta 200 y un mensaje.
        }
      })
      .catch((error) => {
        if(error === 404){ // Se valida si la respuesta es un código de respuesta 404.
          reject({code: 404, message: "Cliente no existe"}); // Se devuelve un código de respuesta 404 y un mensaje.
        }else{
          reject({ code: 500, message: "Error inesperado", errorMessage: error }); // Se devuelve un código de respuesta 500 y el error.
        }
      });
  });
};

export {
  getCourses,
  getCourseById,
  getCourseByName,
  postCourse,
  putCourse,
  deleteCourse
}; // Se exportan la funciones para que pueda ser usada en otros archivos.