import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

export const UserType = new GraphQLObjectType<{ id: string }>({
  name: "User",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: new GraphQLNonNull(UserType),
      args: { id: { type: GraphQLString } },
      resolve(_, args) {
        console.dir(args);
        return { name: "?" };
      },
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(UserType)),
      resolve(_, args) {
        return [];
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
});
