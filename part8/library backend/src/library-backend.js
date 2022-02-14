require("dotenv").config();
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;

console.log("connecting to ", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.estimatedDocumentCount({}),
    authorCount: async () => await Author.countDocuments({}),
    allBooks: async (root, args) => {
      const query = args.author ? { author: args.author } : {};
      args.genre ? (query.genres = { $in: [args.genre] }) : false;
      const books = await Book.find(query).populate("author");
      return books;
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not logged in");
      }

      let author = await Author.findOne({ name: args.author });

      try {
        if (!author) {
          author = new Author({ name: args.author });
          author = await author.save();
        }
        const newBook = new Book({ ...args, author });
        await newBook.save();
        return newBook;
      } catch (error) {
        console.log(error.message);
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not logged in");
      }
      try {
        return await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { runValidators: true, new: true }
        );
      } catch (error) {
        console.log(error.message);
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    createUser: (root, args) => {
      const user = new User({ ...args });
      try {
        return user.save();
      } catch (error) {
        console.log(error.message);
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "exposed") {
        throw new UserInputError("wrong credentials");
      }

      const tokenString = jwt.sign(
        { username: user.username, id: user._id },
        SECRET
      );
      return { value: tokenString };
    },
  },
  Author: {
    bookCount: async (root) => {
      const booksFromAuthor = await Book.countDocuments({ author: root.id });
      return booksFromAuthor;
    },
  },
};

const context = async ({ req }) => {
  const auth = req ? req.headers.authorization : null;
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    const decodedToken = jwt.verify(auth.substring(7), SECRET);
    const currentUser = await User.findById(decodedToken.id);
    return { currentUser };
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
