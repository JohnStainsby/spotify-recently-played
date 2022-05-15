import { Grid } from '@mantine/core';
import PropTypes from 'prop-types';
import styles from './TrackGrid.module.scss';

// Display grid for given array of items
const TrackGrid = ({ items, filterOnArtist }) => {
   // Check if we are filtering for a particular artist otherwise show full list
   const filteredList = filterOnArtist
      ? items.filter(
           (item) =>
              item.track.artists.filter((artist) => {
                 return artist.id === filterOnArtist;
              }).length > 0
        )
      : items;

   return (
      <Grid data-testid='track-grid' className={styles['track-grid']}>
         {filteredList.map((item, i) => (
            <Grid.Col data-testid='track-grid-item' key={i}>
               <div className={styles['track-card']}>
                  <div className={styles['image']} style={{ backgroundImage: `url(${item.track.album.images[1].url})` }} />
                  <div className={styles['overlay']} />
                  <div className={styles['content']}>
                     <div>{item.track.name}</div>
                     <div>{item.track.artists[0].name}</div>
                  </div>
               </div>
            </Grid.Col>
         ))}
      </Grid>
   );
};

export default TrackGrid;

TrackGrid.propTypes = {
   // Array of items from api
   items: PropTypes.arrayOf(PropTypes.object).isRequired,
   // ID of selected artist to filter on
   filterOnArtist: PropTypes.string,
};
