import express, { json, urlencoded } from "express";
import { middleware as cache } from 'apicache';
import controller from "~/controller";

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cache("1 week"));
app.get("/", controller.index);

app.listen(3000, () =>
  console.log(`Server running on http://localhost:${3000}`)
);
