import {Router} from 'express';
import {createUser,loginUser,logoutController} from '../controllers/userController.js';
import {addRecord,getAgencyTotal,getAgencyRecordByAgencyId,updateAgencyRecord} from '../controllers/agencyMainController.js';
import auth from '../middleware/auth.js';


const routes = Router();
routes.post('/user/register',createUser)
routes.post('/user/login',loginUser)
routes.get('/user/logout',auth,logoutController)
routes.post('/addrecord',auth,addRecord);
routes.get("/totaldetails",auth,getAgencyTotal)
routes.get("/recordbyagencyid",getAgencyRecordByAgencyId)
routes.post("/updaterecord",auth,updateAgencyRecord)
export default routes;