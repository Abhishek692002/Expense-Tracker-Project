import { API_PATHs } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post(
            API_PATHs.IMAGE.UPLOAD_IMAGE,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data", //set header for file upload
                },
            }
        );
        return response.data; //Return response data
    } catch (error) {
        console.error("Error uploading the message", error);
        throw error;
    }
};

export default uploadImage;
