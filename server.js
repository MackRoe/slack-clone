const { ApolloServer, gql, PubSub } = require('apollo-server');

const pubsub = new PubSub();

const typeDefs = gql`
	type Post {
		message: String!
		date: String!
	}

	type Query {
		posts: [Post!]!
	}

	type Mutation {
		addPost(message: String!): Post!
	}

	type Subscription {
		newPost: Post!
	}`

const data = [
	{ message: 'hello world', date: new Date() }
]

const resolvers = {
	Query: {
		// Query types
        posts: () => {
			return data
        }
	},
    // Query: {
    //     user(parent, args, context, info) {
	// 		return users.find(user => user.id === args.id);
    //     }
    // },
	Mutation: {
		// Mutation types
        addPost: (parent, args, context, info) => {
			const post = { message, date: new Date() }
			data.push(post)
			pubsub.publish('NEW_POST', { newPost: post }) // Publish!
			return post
		}
	},
	Subscription: {
		// Subscription types
        newPost: {
			subscribe: () => pubsub.asyncIterator('NEW_POST')
    		}
    	}
    }

const server = new ApolloServer({
	typeDefs,
	resolvers
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
