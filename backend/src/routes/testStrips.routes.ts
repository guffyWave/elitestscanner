import { Router } from 'express';
import { upload } from '../middleware/upload';
import { getAll, getOne, uploadTestStrip } from '../controllers/testStrips.controller';
import { ROUTE_GET_ALL, ROUTE_UPLOAD } from '../utils/constants';

const router = Router();

//router.post('/upload', upload.single('image'), ctrl.uploadTestStrip);

router.post(ROUTE_UPLOAD, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json(err);
    }
    // in case of no error , calling the  controller
    uploadTestStrip(req, res);
  });
});
router.get(ROUTE_GET_ALL, getAll);
router.get('/:id', getOne);

export default router;
