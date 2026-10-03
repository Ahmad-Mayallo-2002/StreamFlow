export const port = process.env.PORT ?? 3000;

export const mainEndPoint = `http://localhost:${port}/`;

export const endPoints = {
  api: mainEndPoint + 'api',
  public: mainEndPoint + 'public/',
};
export const staticFilesLinks = {
  images: endPoints.public + 'images/',
  videos: endPoints.public + 'videos/',
};
