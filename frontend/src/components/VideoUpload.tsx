import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import CustomButton from "./CustomButton";

interface VideoUploadProps {
    onVideoUpload?: (videoUrl: string) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onVideoUpload }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [video, setVideo] = useState<string | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);

    useEffect(() => {
        api.get("/videos/latest")
            .then(res => setVideo(res.data.videoUrl))
            .catch(() => setVideo(null));
    }, []);

    const handleChangeVideo = () => {
        setVideo(null)
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("video", file);

        try {
            const response = await api.post<{ videoUrl: string }>("/videos/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const uploadedVideoUrl = response.data.videoUrl;
            setVideo(uploadedVideoUrl);
            onVideoUpload?.(uploadedVideoUrl);
        } catch (error) {
            console.error("Error uploading video:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 items-end justify-center w-full mt-5">
            <label
                htmlFor="dropzone-video"
                className="flex flex-col items-center justify-center w-full h-[25rem] border-2 border-gray-700 border-dashed rounded-lg cursor-pointer dark:bg-blackPrimary bg-whiteSecondary dark:hover:border-gray-600 hover:border-gray-500"
            >
                {uploading ? (
                    <p className="text-sm text-gray-500">Uploading...</p>
                ) : video ? (
                    <video controls className="h-full w-full object-cover rounded-lg">
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-4 text-blackPrimary dark:text-whiteSecondary"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-blackPrimary dark:text-whiteSecondary">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs dark:text-whiteSecondary text-blackPrimary">
                            MP4, AVI, MOV (MAX. 500MB)
                        </p>
                    </div>
                )}
                <input ref={fileInputRef} id="dropzone-video" type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
            </label>
            <div className="flex flex-row justify-end">
                <CustomButton
                    textSize="lg"
                    width="48"
                    py="2"
                    text="Change Video"
                    disabled={uploading}

                    onClick={handleChangeVideo}
                >
                </CustomButton>
            </div>
        </div>
    );
};

export default VideoUpload;
