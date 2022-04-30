import express from 'express';
import controller from '../controllers/clue';
import extractJWT from '../middleware/extractJWT';
import upload from '../functions/multerCloudinary';
import multipleUpload from '../multer';

const router = express.Router();

router.get('/:gameId', extractJWT, controller.getGameClues);
router.get('/getSingle/:id', extractJWT, controller.getClueDetail);
router.post('/', multipleUpload.array('file', 20), controller.createClue);
router.delete('/deleteClueFile/:clueId/:fileId', extractJWT, controller.deleteClueFile);
router.put('/:id', multipleUpload.array('file', 20), controller.updateClue);
router.delete('/:id', extractJWT, controller.deleteClue);

// router.post("/check", multipleUpload.array('image', 2), controller.check)

export = router;
