import express from 'express';
import controller from '../controllers/quest';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/', extractJWT, controller.getQuests);
router.post('/', extractJWT, controller.createQuest);
router.put('/:id', extractJWT, controller.updateQuest);
router.delete('/:id', extractJWT, controller.deleteQuest);

export = router;
