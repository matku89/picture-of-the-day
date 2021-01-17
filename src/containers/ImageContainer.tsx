import React, { useEffect, useState, FC } from 'react';
import moment from 'moment';
import ImageComponent from '../components/ImageComponent/ImageComponent';
import * as constants from '../constants.json';
import { Image } from '../ImageInterface';

const ImageContainer: FC = () =>  {
    const [image, setImage] = useState<Image>({});
    useEffect(() => {
        fetchImage();
    }, [])

    const addItemToStorage = (name: any, value: any) => {
        let store: any = localStorage.getItem(name);
        
        store = store ? JSON.parse(store) : [];

        store.push(value);
        
        localStorage.setItem(name, JSON.stringify(store));
    }

    const randomDate  = () => {
        return moment(new Date(+(new Date()) - Math.floor(Math.random()*100000000000)))
        .format('YYYY-MM-DD');
    }

    const uniqDate = (viewedImages: Array<string>):string => {
        const receivedRandomDate = randomDate();
        
        if(viewedImages.includes(receivedRandomDate)) {
            return uniqDate(viewedImages);
        }
        return receivedRandomDate;
    }

    const getUniqDate = () => {
        let viewedImages: any = localStorage.getItem('viewedImages');

        viewedImages = viewedImages ? JSON.parse(viewedImages) : [];

        return uniqDate(viewedImages)
    }

    const fetchImage = () => {
        fetch(`${constants.API_URL}&date=${getUniqDate()}`, {
            headers: {'Content-Type': 'application/json'},
          })
          .then(res => res.json())
          .then(jsonResponse => {
            addItemToStorage('viewedImages', jsonResponse.date)
            setImage(jsonResponse);
            
        });
    }

    const saveImage = () => {
        addItemToStorage('savedImages',image.date);
    }


    return image ? (
        <ImageComponent
            image={image}
            nextImage={fetchImage}
            saveImage={saveImage}
        />

    ) : null
}

export default ImageContainer;