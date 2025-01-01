import React, { useState } from "react";
import { images } from "../data/images";
import { cutText } from "../functions/cutText";
import { Storage } from "../functions/Storage";

const ImageInput = ({ type, imageInputRef, disableImageInput, isProfile }) => {
    const [imageName, setImageName] = useState("");
    const [imagePreview, setImagePreview] = useState({});

    async function updateImage(image) {
        setImageName(image.value);

        const file = image.files[0];
        const base64String = await toBase64(file);
        setImagePreview(base64String);

        function toBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(file);
            });
        }
    }

    function uploadImage() {
        disableImageInput();

        if(isProfile) {
            Storage.updateProfile({ [type]: imagePreview });
            Storage.update("USERS", 1, { [type]: imagePreview });
        }
    }
    
    function getImageName() {
        const imageArray = imageName.split("\\");
        return cutText(imageArray[imageArray.length - 1], 30);
    }
    
    return(
        <div className="image-input" ref={imageInputRef}>
            <img
                src={images.xIcon}
                alt="X"
                className="image-input-x"
                onClick={disableImageInput}
            />
            
            <div className="image-input-content-holder">
                <img
                    src={imageName ? imagePreview : images.imageIcon}
                    alt="IMAGE"
                    className={imageName ? "image-input-preview-image" : ""}
                />
                
                <strong>{imageName ? getImageName() : "Click to upload the image"}</strong>
            </div>
            
            <input
                type="file"
                accept="image/*"
                onChange={e => updateImage(e.target)}
            />

            <button
                id={imageName ? "image-input-button-active" : ""}
                onClick={uploadImage}
            >done</button>
        </div>
    );
}

export default ImageInput;