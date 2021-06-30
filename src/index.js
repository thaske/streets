import express, { json, urlencoded } from "express";
import controller from "~/controller";

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.get("/", controller.index);

app.listen(3000, () =>
  console.log(`Server running on http://localhost:${3000}`)
);
