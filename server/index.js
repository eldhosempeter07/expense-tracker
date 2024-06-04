import express from "express";
import {} from "./models/db.js";
import morgan from "morgan";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./graphql/resolvers/resolvers.js";

const app = express();

morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});

app.use(morgan("dev"));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const typeDefs = fs.readFileSync(
  path.join(__dirname, "graphql/schemas/schema.graphql"),
  "utf-8"
);

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app, path: "/graphql", cors: true });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
