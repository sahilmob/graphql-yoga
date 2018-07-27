const {GraphQLServer} = require('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

let idCount = links.length

const resolvers = {
    Query : {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links
    },
        Link: {
            id: (root) => root.id,
            description: (root) => root.description,
            url: (root) => root.url,
        },
        Mutation: {
            post: (root, args)=>{
                const link = {
                    id: `link-${idCount++}`,
                    description: args.description,
                    url: args.url
                }
                links.push(link);
                return link;
            },
            updateLink: (root, args) =>{
                const link = links.find((el)=>el.id === args.id)
                link.description = args.description
                link.url = args.url
                return link
            },
            deleteLink: (root, args) =>{
                const link = links.find((el)=>el.id === args.id)
                links.splice(links.indexOf(link,1))
                return link
            }
        }
    }



const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(()=>{
    console .log(`Server is running on http://localhost:4000`)
})