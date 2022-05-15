import { Button } from '@mantine/core';
import styles from './ArtistList.module.scss';

const ArtistList = ({ items, selectedArtist, setSelectedArtist }) => {
   // Array to store all artists from list of recent tracks
   let artists = [];

   // Add artist objects to array with id and name
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
            {/* Show list of recent artists, selecting an artist will filter the grid. Selected artist will show in bold. */}
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

         {/* If an artist is selected show a button to clear the selection and unfilter the grid. */}
         {selectedArtist ? (
            <Button
               color='indigo'
               onClick={() => {
                  setSelectedArtist(null);
               }}
            >
               Clear Artist Filter
            </Button>
         ) : null}
      </div>
   );
};

export default ArtistList;
