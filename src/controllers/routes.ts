import express from 'express';

import StudentControllers from './Student.controller';
import CoursesControllers from './Course.controller';
import QualificationsControllers from './Qualifications.controller';
import LwaysControllers from './Lway.controller';
import ProfilesControllers from './Profile.controller';

function routerApi(app: express.Application){
  // const router = express.Router();

  app.use('/Course', CoursesControllers);
  app.use('/Profile', ProfilesControllers);
  app.use('/Qualification', QualificationsControllers);
  app.use('/Lway', LwaysControllers);
  app.use('/Student', StudentControllers);

}

export { routerApi };