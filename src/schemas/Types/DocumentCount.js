import {
	GraphQLObjectType,
	GraphQLInt
} from 'graphql'

const DocumentCountType = new GraphQLObjectType({
	name: 'DocumentCount',
	fields: () => ({
		count: { type: GraphQLInt }
	})
})

export {
	DocumentCountType,
}