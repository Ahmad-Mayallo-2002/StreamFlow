import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { randomUUID } from 'crypto';

@Injectable()
export class CloudinaryService {
  constructor() {
    v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  createVideoUploadSignature(userId: string) {
    const timestamp = Math.floor(Date.now() / 1000);
    const publicId = `videos/${userId}/${randomUUID()}`;
    const paramsToSign = {
      timestamp,
      public_id: publicId,
    };

    const signature = v2.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!,
    );

    return {
      signature,
      timestamp,
      publicId,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_NAME,
    };
  }
}
