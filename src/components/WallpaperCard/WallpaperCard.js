import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, Label, Image } from 'semantic-ui-react';
import {
  IPHONE_MODELS,
} from 'constants/index';

function WallpaperCard({ wallpaper }) {
  const iphoneModels = IPHONE_MODELS[wallpaper.iphoneModelId];
  const name = wallpaper.name.length > 50 ? `${wallpaper.name.substring(0, 50)} ...`
                : wallpaper.name;
  return (
    <Grid.Column style={{ marginBottom: 15 }} mobile={16} tablet={5} computer={4}>
      <Card centered>
        <Image src={wallpaper.thumbnail} />
        <Card.Content>
          <Card.Header style={{ fontSize: '1em' }}>
            {name}
          </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Label.Group size="mini" color="teal">
            {
              iphoneModels.map(model => (
                <Label as="a" key={model}>{model}</Label>
              ))
            }
          </Label.Group>
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
