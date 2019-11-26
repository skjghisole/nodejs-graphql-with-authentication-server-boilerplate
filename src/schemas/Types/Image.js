import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInputObjectType
} from 'graphql'

const ImageType = new GraphQLObjectType({
	name: 'Image',
	fields: () => ({
		imageSrc: { type: GraphQLString },
		minifiedImageSrc: { type: GraphQLString },
		preloadImageSrc: { type: GraphQLString },
	})
})

const InputImageType = new GraphQLInputObjectType({
	name: 'InputImage',
	fields: () => ({
		imageSrc: { type: GraphQLString },
		minifiedImageSrc: { type: GraphQLString },
		preloadImageSrc: { type: GraphQLString },
	})
})

export {
	ImageType,
	InputImageType
}