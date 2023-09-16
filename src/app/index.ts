import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import { GraphQlContext } from "../types/graphQlContext";
import JwtService from "../services/jw";

// all typeDefs
import { user } from "../graphQl/user";
import { tweet } from "../graphQl/tweet";

export const initServer = async () => {
  const app = express();
  app.use(cors(), bodyParser.json(), cookieParser());
  // graphQl-server
  const server = new ApolloServer<GraphQlContext>({
    typeDefs: `#graphql
       ${user.type}
       ${tweet.type}
        type Query{
           ${user.queries}
           ${tweet.queries}
        }
        type  Mutation {
          ${user.mutation}
          ${tweet.mutation}
        }
        `,
    resolvers: {
      Query: {
        ...user.resolvers.Query,
        ...tweet.resolvers.Query,
      },
      Mutation: {
        ...user.resolvers.Mutation,
        ...tweet.resolvers.Mutation,
      },
      User: {
        ...user.resolvers.User,
      },
      Tweet: {
        ...tweet.resolvers.Tweet,
      },
    },
  });

  //  starting server
  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const { _Twitter_Token } = req.cookies && req.cookies;
        const token = _Twitter_Token ? _Twitter_Token : undefined;

        return {
          user: token ? await JwtService.decodeUserToken(token) : undefined,
          req,
          res,
        };
      },
    })
  );

  return app;
};
