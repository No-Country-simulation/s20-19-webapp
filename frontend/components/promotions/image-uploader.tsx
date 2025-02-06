"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { PlusCircle, Trash2, Upload } from "lucide-react";

export function ImageUploader() {

    const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const CLOUDINARY_API_URL = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL;
    const [image, setImage] = useState<{ url: string; file: File | null }>({ url: "", file: null });
    const [isUploading, setIsUploading] = useState(false);

    // Manejar la carga de imágenes
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0]; // Solo una imagen
        if (!file) return;

        const url = URL.createObjectURL(file);
        setImage({ url, file });

        await uploadToCloudinary(file);
    }, []);

    // Subir imagen a Cloudinary
    const uploadToCloudinary = async (file: File) => {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET as string);

        try {
        const response = await axios.post(
            CLOUDINARY_API_URL as string,
            formData
        );
        setImage({ url: response.data.secure_url, file: null }); 
        } catch (error) {
        console.error("Error subiendo imagen:", error);
        } finally {
        setIsUploading(false);
        }
    };

    // Eliminar imagen
    const removeImage = () => {
        setImage({ url: "", file: null });
    };

    // Configuración de Dropzone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: false,
    });

    return (
        <div className="border-2 border-gray-300 rounded-md bg-gray-50 text-center cursor-pointer hover:border-gray-400 transition">
        {/* Si no hay imagen, mostrar botón de carga */}
        {!image.url ? (
            <div {...getRootProps()} className="flex flex-col items-center cursor-pointer p-6">
            <input {...getInputProps()} />
            <PlusCircle className="w-10 h-10 text-green-500 mb-2" />
            <span className="text-lg font-semibold text-gray-600">Agregar foto</span>
            <p className="text-sm text-gray-400">
                {isDragActive ? "Suelta la imagen aquí..." : "o arrastrar y soltar"}
            </p>
            </div>
        ) : (
            <div className="relative">
            <img
                src={image.url}
                alt="Imagen subida"
                className="w-full h-48 object-cover rounded-md"
            />
            {/* Botón para eliminar imagen */}
            <button
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
            >
                <Trash2 className="w-4 h-4" />
            </button>
            </div>
        )}

        {/* Indicador de subida */}
        {isUploading && (
            <div className="mt-2 flex items-center justify-center gap-2 text-gray-500">
            <Upload className="w-5 h-5 animate-spin" />
            <span>Subiendo imagen...</span>
            </div>
        )}
        </div>
    );
}
