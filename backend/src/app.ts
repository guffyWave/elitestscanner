import express from "express";
import cors from "cors";
import testStripsRoutes from "./routes/testStrips.routes";
import healthRoutes from "./routes/health.routes";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/", healthRoutes); 
app.use("/api/test-strips", testStripsRoutes);

export default app;
