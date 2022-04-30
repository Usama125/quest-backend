import cloudinary from 'cloudinary';
import config from '../config/config';

// @ts-ignore
cloudinary.config({
	cloud_name: config.cloudinary.name,
	api_key: config.cloudinary.apiKey,
	api_secret: config.cloudinary.secretKey
})

export const uploads = (file: any, folder: any) => {
	return new Promise(resolve => {
		// @ts-ignore
		cloudinary.uploader.upload(file, (result: any) => {
			resolve({
				url: result.url
			})
		}, {
			resource_type: "auto",
			folder: folder
		})
	})
}