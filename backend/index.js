import express from "express";
import morgan from "morgan";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./graphql/resolvers/resolvers.js";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";
import cors from "cors";
import {} from "./models/db.js";

import "../frontend/dist";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(
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
  })
);

app.use(cors());

const typeDefs = fs.readFileSync(
  path.join(__dirname, "graphql/schemas/schema.graphql"),
  "utf-8"
);

const userContext = ({ req }) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1] || "";
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      return { user };
    } catch (err) {
      console.log(err);
    }
  }
  return {};
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: userContext,
  cache: "bounded",
  persistedQueries: true,

  formatError: (error) => {
    if (error.originalError instanceof AuthenticationError) {
      return {
        message: error.message,
        statusCode: 400,
      };
    }
    return error;
  },
});

server.start().then(() => {
  server.applyMiddleware({ app, path: "/graphql", cors: true });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
