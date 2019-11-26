import {
	GraphQLObjectType,
} from 'graphql'

import {
	UserQueries,
} from './'

const fields = {
	...UserQueries,
}

const QueryType = new GraphQLObjectType({
	name: 'QueryType',
	fields,
})

export default QueryType