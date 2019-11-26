import { GraphQLObjectType, GraphQLInputObjectType, GraphQLString, GraphQLInt } from 'graphql';

const AddressProperties = {
	fields: () => ({
		mainAddress: {
			type: GraphQLString
		},
		secondaryAddress: {
			type: GraphQLString
		},
		street: {
			type: GraphQLString
		},
		city: {
			type: GraphQLString
		},
		state: {
			type: GraphQLString
		},
		country: {
			type: GraphQLString
		},
		countryCode: {
			type: GraphQLString
		},
		zipCode: {
			type: GraphQLInt
		}
	})
}

const AddressType = new GraphQLObjectType({
	name: 'Address',
	...AddressProperties
})

const AddressInputType = new GraphQLInputObjectType({
	name: 'AddressInput',
	...AddressProperties
})

export {
	AddressType,
	AddressInputType
}