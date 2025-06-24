import mongoose, { Mongoose } from "mongoose";

declare global {
  var dbConnection: Promise<Mongoose>;
}

const MONGODB_URI: string =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mini-auth-nextjs";

const connectToDb = (): Promise<Mongoose | undefined> => {
  if (process.env.NODE_ENV === "production") {
    globalThis.dbConnection = mongoose.connect(MONGODB_URI);
    return globalThis.dbConnection;
  } else {
    if (!globalThis.dbConnection) {
      globalThis.dbConnection = mongoose.connect(MONGODB_URI);
      return globalThis.dbConnection;
    }
    return globalThis.dbConnection;
  }
};

export default connectToDb;
