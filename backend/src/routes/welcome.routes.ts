import { Router } from 'express';
import { version } from 'os';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello from eli-test-scanner backend!',
    version: version(),
    developer: 'Gufran Khurshid',
    phone: '+1 437-322-8442',
    emailId: 'khurshid.gufran@gmail.com',
  });
});

export default router;
