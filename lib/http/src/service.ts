import express from "express";
import { Service } from "../../service/src/index";

const PORT = 3000;

export async function start(service: Service) {
  if (service.connect) await service.connect();

  // Setup handler routes
  const app = express();
  Object.keys(service.handlers).forEach((key) => {
    const handler = service.handlers[key];
    app.post(`/${key}`, async (req, res, next) => {
      const result = await handler.fn(req.body);
      res.json(result);
    });
  });

  app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
  return app;
}
