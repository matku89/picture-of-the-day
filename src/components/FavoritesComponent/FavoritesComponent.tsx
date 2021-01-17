import React, { FC, Fragment, ReactElement } from "react"

import './style.scss';


interface FavoritesProps {
    images: Array<any>
}

const FavoritesComponent: FC<FavoritesProps> = (props): ReactElement => {
    const { images } = props;


    return (
    <div className="gallery">
        {images.map(image => (
            <div className="image-wrapper">
                {image.media_type === "video" ? (
                    <iframe width="420" height="315" src={image.url}  />
                ) : 
                (
                    <img alt="random image" src={image.url}  />
                )}
            </div>
        ))}
    </div>
    )
}

export default FavoritesComponent;