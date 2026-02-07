import { Router } from 'express';
import { upload } from '../middleware/upload';
import {
  getAllTestStripSubmissions,
  getOneTestStripSubmissionById,
  uploadTestStrip,
} from '../controllers/testStrips.controller';
import { ROUTE_GET_ALL, ROUTE_UPLOAD } from '../utils/constants';

const router = Router();
//localhost:3000/api/test-strip/uplaod
router.post(ROUTE_UPLOAD, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json(err);
    }
    uploadTestStrip(req, res); // in case of no error,calling the controller
  });
});

//localhost:3000/api/test-strips?page=1&limit=10
router.get(ROUTE_GET_ALL, getAllTestStripSubmissions);

//localhost:3000/api/test-strip/{id-uuid}
router.get('/:id', getOneTestStripSubmissionById);

export default router;
