import dotenv from 'dotenv';
import express from 'express';
import { ConvexHttpClient } from 'convex/browser';
import routes from './routes';
import { errorHandler, notFound } from './middleware/errorHandler';
import { convexService } from './services/convexService';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// ConvexDB configuration
const CONVEX_URL = process.env.CONVEX_URL || "";
const convex = new ConvexHttpClient(CONVEX_URL);

// Initialize ConvexDB service (only once!)
convexService.setClient(convex);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routes);


// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
