import { Router } from 'express';
import cityRoutes from './cityRoutes';
import categoryRoutes from './categoryRoutes';
import subcategoryRoutes from './subcategoryRoutes';
import experienceRoutes from './experience-routes';
import thingsToDoRoutes from './things-to-do-routes';
import categoryPageRoutes from './category-page-routes';
import subcategoryPageRoutes from './subcategory-page-routes';
import faqRoutes from './faq.routes';
import reviewRoutes from './review.routes';

const router = Router();

// API routes
router.use('/api/v1/cities', cityRoutes);
router.use('/api/v1/categories', categoryRoutes);
router.use('/api/v1/subcategories', subcategoryRoutes);
router.use('/api/v1/experiences', experienceRoutes);
router.use('/api/v1/things-to-do', thingsToDoRoutes);
router.use('/api/v1/category-page', categoryPageRoutes);
router.use('/api/v1/subcategory-page', subcategoryPageRoutes);
router.use('/api/v1/faqs', faqRoutes);
router.use('/api/v1/reviews', reviewRoutes);

// Health check route
router.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Fly-FIM Server with ConvexDB!' });
});

export default router;
