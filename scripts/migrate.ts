import { db } from "../server/db";
import { DatabaseStorage } from "../server/DatabaseStorage";

async function main() {
  console.log("Running database migrations...");
  
  try {
    // Initialize sample data
    console.log("Initializing sample data...");
    const dbStorage = new DatabaseStorage();
    await dbStorage.initSampleData();
    
    console.log("Database migrations completed successfully!");
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
  
  process.exit(0);
}

main();