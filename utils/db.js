import * as SQLite from "expo-sqlite";

// Open the database
const db = SQLite.openDatabaseSync(
  {
    name: "smashscore.db",
    location: "default",
  },
  () => {
    console.log("Database opened");
  },
  (error) => {
    console.error("Error opening database: ", error);
  }
);

export default db;
