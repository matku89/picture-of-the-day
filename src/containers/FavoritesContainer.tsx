import React, { useEffect, useState } from 'react';
import FavoritesComponent from '../components/FavoritesComponent/FavoritesComponent';
import * as constants from '../constants.json';
import { Image } from '../ImageInterface';

const FavoritesContainer = () => {
    const [gallery, setGallery] = useState<Array<Image>>([]);

    useEffect(() => {
        const addedImages: Array<string> = JSON.parse(localStorage.getItem('savedImages') || '[]');
        Promise.all(addedImages.map((addedImageDate: any) => {
            return fetch(`${constants.API_URL}&date=${addedImageDate}`, {
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json());
        }))
        .then(response => setGallery(response));
    }, [])

    return (
        <FavoritesComponent
            images={gallery}
        />
    )
}

export default FavoritesContainer;