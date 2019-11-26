import {
	GraphQLSchema,
} from 'graphql'

import query from './Queries/Root'
import mutation from './Mutations/Root'

export default new GraphQLSchema({
	query,
	mutation,
})