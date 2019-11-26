import {
	GraphQLObjectType,
	GraphQLID
} from 'graphql'

const TokenType = new GraphQLObjectType({
	name: "JWT",
	fields: () => ({
		token: {
			type: GraphQLID
		}
	})
})

export default TokenType