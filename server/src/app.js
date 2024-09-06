import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from './config/config.js';
import routes_v1 from './routes/index.routes.js';
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(helmet()); // Enhance security by setting various HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Configure CORS policy
app.use(morgan("common")); // Log HTTP requests
app.use(cors({ origin: JSON.parse(config.origin_url_list), credentials: true })); // Configure CORS for allowed origins


app.get("/", (req, res) => {
  res.status(200).json("Authentication Server is running...");
});

app.use('/api/', routes_v1);


export default app
