import express from 'express';
import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudents,
  getSummary,
  updateStudent
} from '../controllers/studentController.js';

const router = express.Router();

router.get('/stats/summary', getSummary);
router.get('/', getStudents);
router.get('/:id', getStudent);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;
