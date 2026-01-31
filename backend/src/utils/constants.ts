export const ROUTE_UPLOAD = '/upload';
export const ROUTE_GET_ALL = '/';
export const ROUTE_GET_ONE = '/:id';

export const FILE_PATH_UPLOADS = 'uploads';
export const FILE_PATH_THUMBNAILS = 'thumbnails';

export const IMAGE_FORMAT_JPEG = 'jpeg';
export const IMAGE_FORMAT_JPG = 'jpg';
export const IMAGE_FORMAT_PNG = 'png';

export const MIME_TYPE_JPG = 'image/jpg';
export const MIME_TYPE_JPEG = 'image/jpeg';
export const MIME_TYPE_PNG = 'image/png';
export const ALLOWED_MIME_TYPES = [MIME_TYPE_JPG, MIME_TYPE_JPEG, MIME_TYPE_PNG];

export const ALLOWED_FILE_TYPES = ['jpg', 'jpeg', 'png'];
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
export const MAX_THUMBNAIL_WIDTH = 200;
export const MAX_THUMBNAIL_HEIGHT = 200;

// Basic validation (format: ELI-YYYY-XXX)
export const ELI_QR_VALIDATION_REFEX = /^ELI-(\d{4})-[A-Z0-9]+$/;
export const LAST_QR_YEAR_ALLOWED = 2023;

export const RESPONSE_MESSAGE_SUCCESS = "Test strip uploaded and processed successfully.";
export const RESPONSE_MESSAGE_FAILED_QR = "There was an issue with the uploaded test strip.";

