import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Route setup
app.use("/api/auth", AuthRoutes);
app.get('/', (req, res) => {
  res.send('Backend is working!');
});
// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
