import { BadRequestException } from '@nestjs/common';
import { v2, UploadApiResponse } from 'cloudinary';
import {} from 'multer';

v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function upload(
  file: Express.Multer.File,
): Promise<UploadApiResponse> {
  if (!file) throw new BadRequestException('File is not exist');
  return await new Promise((resolve, reject) => {
    const stream = v2.uploader.upload_stream(
      {
        folder: 'youtube_clone',
        chunk_size: 20 * 1024 * 1024,
        resource_type: 'auto',
      },
      (error, result) => {
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        if (error) return reject(error);
        if (result) {
          console.log('Done');
          return resolve(result);
        }
      },
    );

    stream.end(file.buffer);
  });
}
