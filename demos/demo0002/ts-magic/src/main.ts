import "reflect-metadata";
import express, { Request, Response } from "express";
import { UserController } from "./controllers/user.contoller";

const app = express();
const port = 3000;

// Creamos instancia del controller
const controller = new UserController();

// Obtenemos el prefijo del controlador
const prefix: string = Reflect.getMetadata("prefix", UserController) || "";

// Obtenemos los nombres de los métodos del prototipo (menos el constructor)
const methods = Object.getOwnPropertyNames(UserController.prototype).filter(
  (m) => m !== "constructor"
);

methods.forEach((methodName) => {
  // 👇 Aquí casteamos a any porque estamos haciendo metaprogramación dinámica
  const routeFn = (controller as any)[methodName];

  if (typeof routeFn !== "function") {
    return;
  }

  const httpMethod: string | undefined = Reflect.getMetadata("method", routeFn);
  const path: string | undefined = Reflect.getMetadata("path", routeFn);

  if (httpMethod && path) {
    // 👇 Casteamos app a any porque el nombre del método (get/post/put...) viene como string
    (app as any)[httpMethod.toLowerCase()](
      prefix + path,
      (req: Request, res: Response) => {
        const result = routeFn.call(controller);

        // Soportamos tanto sync como async
        if (result instanceof Promise) {
          result
            .then((data: any) => res.json(data))
            .catch((err: any) => {
              console.error(err);
              res.status(500).json({ error: "Internal server error" });
            });
        } else {
          res.json(result);
        }
      }
    );
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
