

import {Student} from '../types/Student.types';
import {
  readStudents,
  readStudentById,
  readStudentByName,
  createStudent,
  updateStudent,
  deleteStudentById
} from '../data/Students.data';



interface ServiceLayerResponse {
  code: number,
  result?: Student | Student[],
  message?: string;
  errorMessage?: unknown,
}


const getStudents = (): Promise<ServiceLayerResponse> => {

  return new Promise((resolve, reject) => {
    readStudents()
      .then((dataLayerResponse: Student[]) => {
        const localStudentsDB = dataLayerResponse;
        resolve({ code: 200, result: localStudentsDB});
      })
      .catch((error) => {
        reject({code: 500, message: "Error inesperado ", errorMessage: error }); 
      });
  });
};


const getStudentById = (id: string): Promise<ServiceLayerResponse> => {
  return new Promise((resolve, reject) => {
    readStudentById(id)
      .then((dataLayerResponse) => {
        if((dataLayerResponse as Student[]).length === 0){
          resolve({ code: 404 , message: 'Cliente no existe' });
        }else{
          resolve({ code: 200, result: dataLayerResponse as Student });
        }
      })
      .catch(error => {
        reject({code: 500, message: "Error inesperado", errorMessage: error});
      });
  });
};


const getStudentByName = (name: string): Promise<ServiceLayerResponse> => {
  return new Promise((resolve, reject) => {
    readStudentByName(name)
      .then((dataLayerResponse) => {
        if((dataLayerResponse as Student[]).length === 0){
          resolve({ code: 404 , message: 'Cliente no existe' });
        }else{
          resolve({ code: 200, result: dataLayerResponse as Student });
        }
      })
      .catch(error => {
        reject({code: 500, message: "Error inesperado", errorMessage: error});
      });
  });
};


const postStudent = (body: Student): Promise<ServiceLayerResponse> => {
  return new Promise((resolve, reject) => {
    createStudent(body)
      .then((dataLayerResponse) => {
        resolve({code: 201, message: dataLayerResponse as string });
      })
      .catch(error => {
        reject({code: 500, message: "Error inesperado", errorMessage: error });
      });
  });
};

const putStudent = (id: string, body: Student): Promise<ServiceLayerResponse> => {
  return new Promise((resolve, reject) => {
    updateStudent(id, body)
      .then((dataLayerResponse) => {
        if(dataLayerResponse === 200)(
          resolve({code: 200, message: 'Cliente actualizado exitosamente' as string }) // 
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


const deleteStudent = (id: string): Promise<ServiceLayerResponse>  => {
  return new Promise((resolve, reject) => {
    deleteStudentById(id)
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
  getStudents,
  getStudentById,
  getStudentByName,
  postStudent,
  putStudent,
  deleteStudent
}; // Se exportan la funciones para que pueda ser usada en otros archivos.