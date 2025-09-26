import express from 'express';
import multer from 'multer';
import {protectRoute} from '../middleware/authMiddleWare.js';
import {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  bulkDeleteCars
} from '../controllers/CarController.js';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'))
});
const upload = multer({ storage });

// Routes
router.post('/createCar', protectRoute, upload.array('images', 5), createCar);
router.get('/getCars', getCars);
router.get('/:id', getCarById);
router.put('/:id', protectRoute, upload.array('images', 5), updateCar);
router.delete('/:id', protectRoute, deleteCar);
router.delete('/deleteCars', protectRoute, bulkDeleteCars);

export default router;
