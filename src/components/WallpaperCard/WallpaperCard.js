import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, Image } from 'semantic-ui-react';

function WallpaperCard({ wallpaper }) {
  return (
    <Grid.Column width={4}>
      <Card>
        <Image src={wallpaper.thumbnail} />
        <Card.Content>
          <Card.Header style={{ fontSize: '1em' }}>
            {wallpaper.name}
          </Card.Header>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}

WallpaperCard.propTypes = {
  wallpaper: PropTypes.shape({
    name: PropTypes.string,
    thumbnail: PropTypes.string,
    original: PropTypes.string,
    categoryId: PropTypes.string,
    iphoneModelId: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default WallpaperCard;
