import ImageGallery from 'react-image-gallery';
import React from 'react';
import "react-image-gallery/styles/css/image-gallery.css";
const images = [
    {
        original: 'car.jpg',
        thumbnail: 'car.jpg',
    },
    {
        original: 'car1.jpg',
        thumbnail: 'car1.jpg',
    },
    {
        original: 'car2.jpg',
        thumbnail: 'car2.jpg',
    },
    {
        original: 'car1.jpg',
        thumbnail: 'car1.jpg',
    },
    {
        original: 'car2.jpg',
        thumbnail: 'car2.jpg',
    },
    {
        original: 'car.jpg',
        thumbnail: 'car.jpg',
    },
    {
        original: 'car1.jpg',
        thumbnail: 'car1.jpg',
    },
    {
        original: 'car2.jpg',
        thumbnail: 'car2.jpg',
    },
    
];

export default function MyGallery(props) {
    return (
        <ImageGallery {...props} items={images} showFullscreenButton={false} showPlayButton={false} slideOnThumbnailOver={true} />
    )
}