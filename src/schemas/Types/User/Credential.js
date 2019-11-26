import {
	GraphQLString,
	GraphQLObjectType,
	GraphQLInputObjectType
} from 'graphql'

const credentialProperties = {
	fields: () => ({
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		email: { type: GraphQLString },
		phone: { type: GraphQLString }
	})
}

const CredentialType = new GraphQLObjectType({
	name: 'UserCredential',
	...credentialProperties
})

const CredentialInputType = new GraphQLInputObjectType({
	name: 'UserCredentialInput',
	...credentialProperties
})

export {
	CredentialType,
	CredentialInputType
}
