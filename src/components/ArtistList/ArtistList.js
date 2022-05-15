import React from 'react';
import styles from './ArtistList.module.scss';

const ArtistList = ({ items, selectedArtist, setSelectedArtist }) => {
   // Get list of all artists from recent tracks
   let artists = [];

   // Return array of artist objects with id and name
   for (let item of items) {
      for (let artist of item.track.artists) {
         // Check if artist already exists in array
         if (artists.filter((e) => e.name === artist.name).length === 0) {
            artists.push({ id: artist.id, name: artist.name });
         }
      }
   }

   return (
      <div className={styles['artist-list']}>
         <h1>Recent Artists</h1>
         <ul>
            {artists.map((item) => (
               <li
                  key={item.id}
                  onClick={() => {
                     setSelectedArtist(item.id);
                  }}
                  className={item.id === selectedArtist ? styles['selected'] : ''}
               >
                  {item.name}
               </li>
            ))}
         </ul>

         {selectedArtist ? (
            <button
               onClick={() => {
                  setSelectedArtist();
               }}
            >
               Clear Artist Filter
            </button>
         ) : null}
      </div>
   );
};

export default ArtistList;
