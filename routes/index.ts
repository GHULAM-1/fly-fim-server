import { Router } from 'express';
import cityRoutes from './cityRoutes';
import categoryRoutes from './categoryRoutes';
import subcategoryRoutes from './subcategoryRoutes';
import experienceRoutes from './experience-routes';
import faqRoutes from './faq.routes';
import reviewRoutes from './review.routes';

const router = Router();

// API routes
router.use('/api/cities', cityRoutes);
router.use('/api/categories', categoryRoutes);
router.use('/api/subcategories', subcategoryRoutes);
router.use('/api/experiences', experienceRoutes);
router.use('/api/faqs', faqRoutes);
router.use('/api/reviews', reviewRoutes);

// Health check route
router.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Fly-FIM Server with ConvexDB!' });
});

export default router;
