// src/plant/plant.middleware.ts
export function imageUploadMiddleware(req, res, next) {
  if (req.originalUrl === '/plant/image/upload') {
    const imageSizeMb = req.body.base64Image.length / 1024 / 1024;
    if (imageSizeMb > (5 * 4) / 3) {
      return res.status(413).send({ message: 'Payload too large (limit: 5Mb)' });
    }
    next();
  } else {
    next();
  }
}
