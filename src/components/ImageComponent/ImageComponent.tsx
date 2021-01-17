import React, { FC, Fragment, ReactElement, useEffect, useState } from "react";

import './style.scss';

interface ImageComponentInitialValues {
    image: any,
    nextImage: any,
    saveImage: any
}

const ImageComponent: FC<ImageComponentInitialValues> = (props): ReactElement => {
    const {image, nextImage, saveImage} = props;

    const [loading, setLoading] = useState(true);
    const [saveButtonEnabled, setSaveButtonEnabledStatus] = useState(true);

    const getNewImage = () => {
        nextImage();
        setLoading(true);
    }

    const imageLoaded = () => {
        setLoading(false);
    }

    const addToFavorites = (image: any) => {
        saveImage(image);
        setSaveButtonEnabledStatus(false);
    }

    const moveToNext = () => {
        getNewImage();
        setSaveButtonEnabledStatus(true);
    }

    return (
        <Fragment>
            <div style={{display: loading ? "block" : "none"}}>
                <h2>Ładuję</h2>
            </div>
            <div style={{display: loading ? "none" : "block"}}>
            {image.media_type === "video" ? (
                    <iframe width="420" height="315" src={image.url} onLoad={imageLoaded} />
                ) : 
                (
                    <img alt="random image" src={image.url} onLoad={imageLoaded} />
                )
                }
                <div>
                    <h2>Szczególy:</h2>
                    <p>Tytuł: {image.title}</p>
                    <p>Data: {image.date}</p>
                    <p className="justified">Opis: {image.explanation}</p>
                </div>
                <div>
                    <button onClick={moveToNext}>Następne</button>
                    <button disabled={!saveButtonEnabled} onClick={image => addToFavorites(image)}>Zapisz</button>
                </div>
            </div>
        </Fragment>
    )
}

export default ImageComponent;