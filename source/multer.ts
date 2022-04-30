import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: function (req: any, file: any, cb: any) {
		cb(null, path.resolve(__dirname, './uploads'))
	},
	filename: function (req: any, file: any, cb: any) {
		cb(null, file.originalname);
	}
})


const fileFilter = (req: any, file: any, cb: any) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true)
	} else {
		//reject file
		cb({ message: 'Unsupported file format' }, false)
	}
}

const multipleUpload = multer({
	storage: storage,
	limits: { fileSize: 10024 * 10024 },
	// fileFilter: fileFilter
})

export default multipleUpload;
