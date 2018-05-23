import * as express from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import Cat from './models/cat';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();

  const Nexmo = require('nexmo');

  const nexmo = new Nexmo({
    apiKey: '53811259',
    apiSecret: 'btLAh2llHejRP2vW'
  });

  // Messages 
  router.post('/text', (req, res) => {
    // res.send({text: 'fucker'});
    console.log(req.body);
    const from = '12018993734';
    const to = req.body.number;
    const text = req.body.message;


nexmo.message.sendSms(from, to, text, (error, response) => {
  if (error) {
    throw error;
  } else if (response.messages[0].status !== '0') {
    console.error(response);
    throw response.messages[0].status;
  } else {
    console.log(response);
    console.log(response.messages);
  }
});
  });
  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
