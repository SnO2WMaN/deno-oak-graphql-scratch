import {
  GraphQLFieldConfig,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

export const UserType = new GraphQLObjectType<{ id: string }>({
  name: "User",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const TagType = new GraphQLObjectType({
  name: "Tag",
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve(source, _args, context) {
        return source.name;
      },
    },
  },
});

export const ArticleType = new GraphQLObjectType<{
  id: string;
  tags: string[];
}>({
  name: "Article",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    tags: {
      type: new GraphQLNonNull(new GraphQLList(TagType)),
      resolve({ tags }) {
        return tags.map((tagId) => ({ id: tagId, name: tagId }));
      },
    },
  },
});

export const GetUser: GraphQLFieldConfig<
  unknown,
  { accessToken: string },
  { id: string }
> = {
  type: new GraphQLNonNull(UserType),
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(_, args, ctx) {
    console.dir(ctx);
    return { name: "?" };
  },
};

export const QueryType = new GraphQLObjectType({
  name: "Query",

  fields: {
    user: GetUser,
    users: {
      type: new GraphQLNonNull(new GraphQLList(UserType)),
      resolve(_, args) {
        return [];
      },
    },
    articles: {
      type: new GraphQLNonNull(new GraphQLList(ArticleType)),
      resolve(_source, _args, context) {
        return [
          { id: "1", title: "a", tags: ["1", "2"] },
        ];
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
});
