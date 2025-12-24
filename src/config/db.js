import { Pool } from "pg";
import config from ".";
// Db
export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

const initDB = async () => {
      try {
    await pool.query("SELECT 1");
    console.log(" PostgreSQL connected");
  } catch (error) {
    console.error(" PostgreSQL error:", error.message);
  }
 
};
export default initDB;
