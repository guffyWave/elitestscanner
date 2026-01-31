import multer from 'multer';
import path from 'path';
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE } from '../utils/constants';
import { InvalidImageFormat } from '../utils/errors';

//@note todo -  test cases

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, fileFilterCallback) => {
    // const allowed = ['image/jpeg', 'image/png'];
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return fileFilterCallback(new InvalidImageFormat());
    }
    fileFilterCallback(null, true);
  },
});
