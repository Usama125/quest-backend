import express from 'express';
import controller from '../controllers/town';
import extractJWT from '../middleware/extractJWT';
import upload from '../functions/multerCloudinary'

const router = express.Router();

router.get('/', extractJWT, controller.getTowns);
router.post('/', upload.single("image"), controller.createTown);
router.put('/:id', upload.single("image"), controller.updateTown);
router.delete('/:id', extractJWT, controller.deleteTown);

export = router;
