import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { GraphQLError } from 'graphql';
import { expressMiddleware } from '@apollo/server/express4';
import { PrismaClient } from "@prisma/client";
import pkg from 'body-parser';
import express from 'express';
import http from 'http';
import cors from 'cors';
const { json } = pkg;
const app = express();

const db = new PrismaClient()

// let topics = [
//   {id:1, title:'html', body:'html is ...'},
//   {id:2, title:'css', body:'css is ...'},
//   {id:3, title:'js', body:'js is ...'}
// ]

const typeDefs = `#graphql
  type Topic{
    id:Int
    title:String
    body:String
  }
  type Query {
    topics:[Topic]
    getTopic(id: Int):Topic
  }
  type Mutation {
    createTopic(title: String, body: String): Topic
    deleteTopic(id: Int): Topic
    updateTopic(id: Int, title: String, body: String): Topic
  }
`
const resolvers = {
  Query: {
    topics: (root, args, context) => {
      return db.topic.findMany()
    },
    getTopic: (root, {id}, context) => {
      return db.topic.findUnique({
        where: {id}
      })
    }
  },
  Mutation: {
    createTopic: (root, {title, body}, context) => {
      const newTopic = db.topic.create({
        data: {
          title,
          body
        }
      })
      return newTopic
    },
    deleteTopic: (root, {id}, context) => {
      const deletedTopic = db.topic.delete({
        where: {id}
      })
      return deletedTopic
    },
    updateTopic: (root, {id, title, body}, context) => {
      const foundTopic = db.topic.update({
        where: {id},
        data: {
          title,
          body
        }
      })
      return foundTopic
    }
  }
}

const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
});
await server.start();

app.use(
  cors(),
  json(),
  expressMiddleware(server)
);
app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000`))