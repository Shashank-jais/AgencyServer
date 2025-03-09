import {Router} from 'express';
import {createUser,loginUser} from '../controllers/userController.js';
import {addRecord,getAgencyTotal,getAgencyRecordByAgencyId} from '../controllers/agencyMainController.js';

const routes = Router();
routes.post('/user/register',createUser)
routes.post('/user/login',loginUser)
routes.post('/addrecord',addRecord);
routes.get("/totaldetails",getAgencyTotal)
routes.get("/recordbyagencyid",getAgencyRecordByAgencyId)
export default routes;