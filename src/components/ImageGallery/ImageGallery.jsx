import { useState, useEffect } from 'react';
import Loader from "react-loader-spinner";
import PropTypes from 'prop-types';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { imagesApi } from '../../services/images-api';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';

import s from '../ImageGallery/ImageGallery.module.css';

export function ImageGallery({ searchQuery }) {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [totalImages, setTotalImages] = useState(0);
    const [imageCounter, setImageCounter] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [largeImageSrc, setLargeImageSrc] = useState('');
    const [largeImageAlt, setLargeImageAlt] = useState('');

    if (searchQuery !== query) {
        setPage(1);
        setGallery([]);
        setTotalImages(0);
        setImageCounter(0);
        setQuery(searchQuery);  
    }
    
    useEffect(() => {
        
        if (!searchQuery) {
            return;
        }
       
        setLoading(true);

        imagesApi.fetchImages(searchQuery, page)
            .then(data => {
        
                if (data.total === 0) {
                    alert('Oops.. Not found 😟');
                    return;
                }
             
                setGallery(state => [...state, ...data.hits]);
                setTotalImages(data.total);
                scrollToBottom();
            })
            .finally(() => setLoading(false))
                   
    }, [searchQuery, page])
    
    useEffect(() => {
        setImageCounter(totalImages - (page * 12) + 12);
    }, [page, totalImages])

    const handleLoadMoreButtonClick = () => {
        setPage(state => state + 1);
    }

    const handleImageClick = event => {
        if (event.target.nodeName !== 'IMG') {
            return;
        }

        setShowModal(true);
        setLargeImageSrc(event.target.getAttribute('data-large-img-src'));
        setLargeImageAlt(event.target.getAttribute('data-large-img-alt'));
    }

    const closeModal = () => {
        setShowModal(false);
        setLargeImageSrc('');
        setLargeImageAlt('');
    }

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    }

    return (
        <>
            <ul className={s.ImageGallery} onClick={handleImageClick}> 
                {gallery && gallery.map(hits => {
                    return <ImageGalleryItem key={hits.id} imageItem={hits}/>
                    })
                }
            </ul>

            {loading && <Loader type="Hearts" color="#3f51b5" height={80} width={80} className={s.loader} />}

            {imageCounter > 12 && !loading && <Button title="Load more" onClick={handleLoadMoreButtonClick} />}
                
            {showModal &&
                <Modal onClose={closeModal} > 
                    <img src={largeImageSrc} alt={largeImageAlt} />
                </Modal>
            }
        
        </>
    )
}

ImageGallery.propTypes = {
    searchQuery: PropTypes.string.isRequired,
}

