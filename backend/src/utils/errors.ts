export const ERROR_CODES = {
  IMAGE: {
    NO_IMAGE: {
      code: 1000,
      name: 'No image uploaded',
      description: 'No image was uploaded',
    },
    INVALID_FORMAT: {
      code: 1001,
      name: 'Invalid Image Format',
      description: 'This image format is not supported. Only JPG/PNG allowed.',
    },
    INVALID_SIZE: {
      code: 1002,
      name: 'Invalid Image Size',
      description: 'The image size exceeds the maximum allowed',
    },
    INVALID_DIMENSIONS: {
      code: 1003,
      name: 'Invalid Image Dimensions',
      description: 'The image dimensions are not valid',
    },
  },
  QR: {
    INVALID_QR: {
      code: 2001,
      name: 'Invalid QR Code',
      description: 'The QR code is invalid or corrupted',
    },
    EXPIRED_QR: { code: 2002, name: 'Expired QR Code', description: 'The QR code has expired' },
    NOT_FOUND: {
      code: 2003,
      name: 'QR Code Not Found',
      description: 'No QR code was found in the image',
    },
  },
  FILE: {
    NOT_FOUND: {
      code: 3001,
      name: 'File Not Found',
      description: 'The requested file was not found',
    },
  },
  GENERIC: {
    SOMETHING_WENT_WRONG: {
      code: 4000,
      name: 'Something Went Wrong',
      description: 'An unexpected error occurred, please try again later',
    },
  },
} as const;

export class EliHealthError extends Error {
  code: number;
  name: string;
  description: string;

  constructor(code: number, name: string, description: string) {
    super(description);
    this.code = code;
    this.name = name;
    this.description = description;
  }
}

export class FileNotFound extends EliHealthError {
  constructor() {
    const { code, name, description } = ERROR_CODES.FILE.NOT_FOUND;
    super(code, name, description);
  }
}

export class SomethingWentWrong extends EliHealthError {
  constructor(description?: string) {
    const errorConfig = ERROR_CODES.GENERIC.SOMETHING_WENT_WRONG;
    super(
      errorConfig.code,
      errorConfig.name,
      description ? `${errorConfig.description} ${description}` : errorConfig.description
    );
  }
}

export class NoImageUploaded extends EliHealthError {
  constructor() {
    const { code, name, description } = ERROR_CODES.IMAGE.NO_IMAGE;
    super(code, name, description);
  }
}

export class InvalidImageFormat extends EliHealthError {
  constructor() {
    const { code, name, description } = ERROR_CODES.IMAGE.INVALID_FORMAT;
    super(code, name, description);
  }
}

export class InvalidImageSize extends EliHealthError {
  constructor() {
    const { code, name, description } = ERROR_CODES.IMAGE.INVALID_SIZE;
    super(code, name, description);
  }
}

export class InvalidImageDimensions extends EliHealthError {
  constructor() {
    const { code, name, description } = ERROR_CODES.IMAGE.INVALID_DIMENSIONS;
    super(code, name, description);
  }
}

export class InvalidQRCode extends EliHealthError {
  constructor() {
    const { code, name, description } = ERROR_CODES.QR.INVALID_QR;
    super(code, name, description);
  }
}

export class ExpiredQRCode extends EliHealthError {
  constructor() {
    const { code, name, description } = ERROR_CODES.QR.EXPIRED_QR;
    super(code, name, description);
  }
}

export class QRCodeNotFound extends EliHealthError {
  constructor() {
    const { code, name, description } = ERROR_CODES.QR.NOT_FOUND;
    super(code, name, description);
  }
}
