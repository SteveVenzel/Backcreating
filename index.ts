import express from 'express';
import mongoose from 'mongoose';

import { routerApi } from './src/controllers/routes';

const app = express(); // Esta es la creación de la instancia.
const PORT = 3000; // Se declara una variable para el puerto. Es una buena práctica que sea una constante.

app.use(express.json()); //Esto es un middleware. En este caso es necesario para poder usar el body que existe dentro de la petición http.

// Se establece la conexión a mongodb. Se usa el método connect de mongoose, pasándole la url de conexión.

// no conecta mongo atlas con mi cuenta lo deje en el arreglo general no alcance a terminarlo con mongo db

mongoose.connect('mongodb+srv://Admin:<steve>@cluster0.wdbdev2.mongodb.net/')
    .then(() =>{
        console.log("Conexión a mongo establecida"); // Si la conexión es exitosa, se imprime un mensaje en consola.
    })
    .catch(() => {
        console.log("Error de conexión con mongo"); // Si la conexión falla, se imprime un mensaje en consola.
    });

routerApi(app);

app.listen(PORT, function () {
    console.log("La aplicación es está ejecutando en: http://localhost:" + PORT);
});
