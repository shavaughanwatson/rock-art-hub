import { useState, useContext } from 'react';
import { MainHeaderContext } from '../RootLayout';
import axios from 'axios';
import { API_KEY } from '../util';

function PostForm({ setArtworks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [Media, setMedia] = useState(null);

  const login = useContext(MainHeaderContext);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setMedia(null);
  };

  const handleArtworkSubmit = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({ title, description, author: login.user.user.username })
      );
      if (Media) {
        formData.append('files.Media', Media);
      }
      console.log(formData);
      const response = await axios.post(
        'http://localhost:1337/api/artworks',
        formData,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
          params: {
            populate: '*',
          },
        }
      );

      console.log(response.data.data);

      setArtworks(artwork => [response.data.data, ...artwork]);
      resetForm();
    } catch (error) {
      console.error('Error submitting artwork:', error);
      resetForm();
    }
  };

  return (
    <div>
      <form onSubmit={handleArtworkSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image</label>
          <input type="file" onChange={e => setMedia(e.target.files[0])} />
        </div>
        <button type="submit"> Create Artwork</button>
      </form>
    </div>
  );
}

export default PostForm;
