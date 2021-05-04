const { ApolloServer, gql, PubSub } = require('apollo-server');

const pubsub = new PubSub();

const typeDefs = gql`
	type Post {
		message: String!
		date: String!
	}

    type Channel {
        name: String!
        posts: [Post]
    }

	type Mutation {
		addPost(channel: String!, message: String!): Post!
        addChannel(name: String!): [Channel]!
	}

	type Subscription {
		newPost: Post!
        newChannel: Channel!
	}

    type Query {
		posts(channel: String!): [Post!]!
        getChannels: [Channel]
	}`

const data = [
	{ message: 'hello world', date: new Date() }
]
const channels = [
    { name: "Main",
      posts: data
    }
]

const resolvers = {
	Query: {
		// Query types
        posts: () => {
			return data
        },
        getChannels: () => {
            return channels
        }
	},
	Mutation: {
		// Mutation types
        addPost: (_, { message }) => {
			const post = { message, date: new Date() }
			data.push(post)
			pubsub.publish('NEW_POST', { newPost: post }) // Publish!
			return post
		},
        addChannel: (_, { name }) => {
            const channel = { name }
            channels.push(channel)
            pubsub.publish('NEW_CHANNEL', { newChannel: channel })
            return channels
        }
	},
	Subscription: {
		// Subscription types
        newPost: {
			subscribe: () => pubsub.asyncIterator('NEW_POST')
        },
        newChannel: {
            subscribe: () => pubsub.asyncIterator('NEW_CHANNEL')
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
