import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});



// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null
//         // upload the file on cloudinary
//         const response = await cloudinary.uploader.upload(localFilePath,{ folder: "Ecommerce" }, {
//             resource_type: 'auto'
//         })
//         // file has been uploaded successfully
//         // console.log("file is uploaded on cloudinary", response.url);
//         console.log("file is uploaded on cloudinary", response);
//         fs.unlinkSync(localFilePath)
//         return response;
//     } catch (error) {
//         fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
//         return null;
//     }
// }
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            public_id: `Ecommerce/${Date.now()}`,
            resource_type: 'auto',
            quality: 'auto',
            width: 620,
            height: 620,
            crop: 'scale'
        });
        // file has been uploaded successfully
        console.log("file is uploaded on cloudinary", response.url);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
};

const deleteFromCloudinary = async (publicId) => {
    try {
        let result = await cloudinary.uploader.destroy(`Ecommerce/${publicId}`);
        console.log('Deleting file from Cloudinary', result);
        return result;
    } catch (err) {
        console.log('Error deleting image from Cloudinary', err);
        return false;
    }
} 

export { uploadOnCloudinary, deleteFromCloudinary };

