require("dotenv").config();
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const { UserInputError, AuthenticationError } = require("apollo-server");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const SECRET = process.env.SECRET;

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

        pubsub.publish("BOOK_ADDED", { bookAdded: newBook });

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
    bookCount: async (root, args, { loaders }) =>
      await loaders.bookCount.load(root.id),
    // bookCount: async (root) => {
    //   const booksFromAuthor = await Book.countDocuments({ author: root.id });
    //   return booksFromAuthor;
    // },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
