import { useState } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';

import './App.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleFormSubmit = searchQuery => setSearchQuery( searchQuery );
  
  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchQuery={searchQuery} />        
    </div>
  );
  
}
