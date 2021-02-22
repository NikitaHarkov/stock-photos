import React, { useState } from 'react';
import { FaSearch } from 'react-icons';
import Photo from './Photo';

const mainUrl = 'https://api.unsplash.com/photos/';
const searchUrl = 'https://api.unsplash.com/search/photos/';

function App() {
  return (
    <div>
      <h2>Hello</h2>
      <Photo />
    </div>
  );
}

export default App;
