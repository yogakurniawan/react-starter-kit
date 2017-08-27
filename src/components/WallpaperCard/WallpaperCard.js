import React from 'react';
import PropTypes from 'prop-types';
import { Popup, Card, Label, Image } from 'semantic-ui-react';
import {
  IPHONE_MODELS,
} from 'constants/index';
import Link from '../../components/Link';
import { replaceSpaceWithDash } from '../../utils/common';

function WallpaperCard({ wallpaper, onImageClick, onLabelClick }) {
  const iphoneModels = IPHONE_MODELS[wallpaper.iphoneModelId];
  const name = wallpaper.name.length > 45 ?
                `${wallpaper.name.substring(0, 45)} ...` : wallpaper.name;
  const WallpaperHeader =
    wallpaper.name.length > 45 ?
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
              <Link
                key={Math.random()}
                as="a"
                onClick={onLabelClick}
                to={`/model/${replaceSpaceWithDash(model)}-${wallpaper.code}`}
                component={Label}
              >
                {model}
              </Link>
            ))
          }
        </Label.Group>
      </Card.Content>
    </Card>
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
  onLabelClick: PropTypes.func,
};

WallpaperCard.defaultProps = {
  onImageClick: null,
  onLabelClick: null,
};

export default WallpaperCard;
