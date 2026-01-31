import { Router } from 'express';
import { upload } from '../middleware/upload';
import {
  getAllTestStripSubmissions,
  getOneTestStripSubmissionById,
  uploadTestStrip,
} from '../controllers/testStrips.controller';
import { ROUTE_GET_ALL, ROUTE_UPLOAD } from '../utils/constants';

const router = Router();

//router.post('/upload', upload.single('image'), ctrl.uploadTestStrip);

router.post(ROUTE_UPLOAD, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json(err);
    }
    // in case of no error , calling the controller
    uploadTestStrip(req, res);
  });
});
//localhost:3000/api/test-strips?page=1&limit=10
router.get(ROUTE_GET_ALL, getAllTestStripSubmissions);
router.get('/:id', getOneTestStripSubmissionById);

export default router;
