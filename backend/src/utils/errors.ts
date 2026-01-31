export const ERROR_CODES = {
  IMAGE: {
    INVALID_FORMAT: {
      code: 1001,
      name: 'Invalid Image Format',
      description: 'The image format is not supported',
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
} as const;

class EliHealthError extends Error {
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
