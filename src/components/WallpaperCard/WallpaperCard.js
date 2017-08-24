import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Popup, Card, Label, Image } from 'semantic-ui-react';
import {
  IPHONE_MODELS,
} from 'constants/index';
import Link from '../../components/Link';
import { replaceSpaceWithDash } from '../../utils/common';

function WallpaperCard({ wallpaper, onImageClick }) {
  const iphoneModels = IPHONE_MODELS[wallpaper.iphoneModelId];
  const name = wallpaper.name.length > 50 ?
                `${wallpaper.name.substring(0, 50)} ...` : wallpaper.name;
  const WallpaperHeader =
    wallpaper.name.length > 50 ?
    (<Popup
      trigger={
        <Card.Header style={{ fontSize: '1em' }}>
          {name}
        </Card.Header>
      }
      content={wallpaper.name}
      basic
    />) :
      (<Card.Header style={{ fontSize: '1em' }}>
        {name}
      </Card.Header>);
  return (
    <Grid.Column
      style={{ marginBottom: 15, paddingRight: 20, paddingLeft: 20 }}
      mobile={16}
      tablet={5}
      computer={4}
    >
      <Card fluid centered>
        <Link
          as="a"
          src={wallpaper.thumbnail}
          onClick={onImageClick}
          to={`/wallpaper/${replaceSpaceWithDash(wallpaper.name)}`}
          component={Image}
        />
        <Card.Content>
          {WallpaperHeader}
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
  onImageClick: PropTypes.func,
};

WallpaperCard.defaultProps = {
  onImageClick: null,
};

export default WallpaperCard;
