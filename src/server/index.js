import '@babel/polyfill'
import express from 'express'
import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'
import cors from 'cors'

import schema from '../schemas'

import isAuthenticated from '../middlewares/isAuthenticated'
import { pubsub } from '../utils'

const app = express()

app.use(cors())
app.use(isAuthenticated)

const gqlServer = new ApolloServer({
	schema,
  context: ({ req, res }) => {
    return {
      req,
      res,
      pubsub
    }
  },
})

const {
	DB_USER_USERNAME,
	DB_USER_PASSWORD,
	DB_PROTOCOL,
	DB_PORT,
	DB_HOST,
	DB_NAME,
	NODE_ENV,
	PORT
} = process.env

const hostedEnvs = ['staging', 'production', 'ci']
let mongoURI;

console.log(`NODE_ENV -----------> ${NODE_ENV} <-----------`)

if (!hostedEnvs.some(env => env === NODE_ENV)) {
	mongoURI = `${DB_PROTOCOL}://${DB_HOST}:${DB_PORT}/${DB_NAME}`
} else {
	mongoURI = `${DB_PROTOCOL}://${DB_USER_USERNAME}:${DB_USER_PASSWORD}@cluster0-bnvga.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
	console.log('DB connected')
})
// useFindAndModify was deprecated, so thats why we set it to false
mongoose.set('useFindAndModify', false);

gqlServer.applyMiddleware({
	app
})

const httpServer = createServer(app)

gqlServer.installSubscriptionHandlers(httpServer)

const port = PORT || 7777

httpServer.listen(port, () => {
	console.log(`Server on http://localhost:${port}${gqlServer.graphqlPath}`)
	console.log(`Subscriptions on ws://localhost:${port}${gqlServer.subscriptionsPath}`)
})
