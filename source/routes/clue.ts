import express from 'express';
import controller from '../controllers/clue';
import extractJWT from '../middleware/extractJWT';
import upload from '../functions/multerCloudinary';

const router = express.Router();

router.get('/:gameId', extractJWT, controller.getGameClues);
router.post('/', upload.single("file"), controller.createClue);
router.put('/:id', upload.single("file"), controller.updateClue);
router.delete('/:id', extractJWT, controller.deleteClue);

export = router;
