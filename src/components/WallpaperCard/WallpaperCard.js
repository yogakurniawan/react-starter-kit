import React from 'react';
import PropTypes from 'prop-types';
import { Popup, Card, Label, Icon, Image } from 'semantic-ui-react';
import Link from '../../components/Link';
import { replaceSpaceWithDash } from '../../utils/common';

function WallpaperCard({ wallpaper, iphoneModels, onImageClick, onLabelClick, onClickLike }) {
  const name = wallpaper.name.length > 45 ?
    `${wallpaper.name.substring(0, 45)} ...` : wallpaper.name;
  const iphoneModel = iphoneModels.find(item => item.id === wallpaper.iphoneModelId);
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
    <Card fluid>
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
        <a>
          <Icon name="like" onClick={onClickLike} />
          {`${wallpaper.total_like}`}
        </a>
        <div style={{ float: 'right' }}>
          <span style={{ marginRight: 10 }}>
            {`${wallpaper.total_download}`} Downloads
          </span>
          <span>
            {`${wallpaper.total_view}`} Views
          </span>
        </div>
      </Card.Content>
      <Card.Content extra>
        <Link
          basic
          size="mini"
          color="teal"
          key={Math.random()}
          as="a"
          onClick={onLabelClick}
          to={`/model/${iphoneModel.meta_route}`}
          component={Label}
        >
          {iphoneModel.name}
        </Link>
      </Card.Content>
    </Card>
  );
}

WallpaperCard.propTypes = {
  iphoneModels: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      code: PropTypes.string,
      meta_route: PropTypes.string,
      total_wallpaper: PropTypes.number,
    })),
  ]),
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
  onClickLike: PropTypes.func,
};

WallpaperCard.defaultProps = {
  iphoneModels: null,
  onImageClick: null,
  onLabelClick: null,
  onClickLike: null,
};

export default WallpaperCard;
