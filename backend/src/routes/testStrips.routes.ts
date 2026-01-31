import { Router } from 'express';
import { upload } from '../middleware/upload';
import * as ctrl from '../controllers/testStrips.controller';

const router = Router();

//router.post('/upload', upload.single('image'), ctrl.uploadTestStrip);

router.post('/upload', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json(err);
    }
    // IF NO ERROR, call your controller
    ctrl.uploadTestStrip(req, res);
  });
});
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);

export default router;
