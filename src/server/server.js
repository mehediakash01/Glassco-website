import express from "express";
import config from "@/config";
import initDB from "@/config/db";

const app = express();
const port = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


initDB();

// Test route
app.get("/", (req, res) => {
  res.send("Ronaldo is the Goat!");
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

export default app;
