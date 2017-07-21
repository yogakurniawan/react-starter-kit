import React, { PropTypes } from 'react';
import Img from 'components/Img';
import s from './BrandTile.css';

function Component({ item }) {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
      <div className={`${s.roundedBox} row`} to={`/devices/${encodeURIComponent(item.title)}?page=1`}>
        <div className="col-xs-12">
          <Img style={{ width: 117, height: 40 }} src={item.logoUrl} />
          <h4 className={s.orangeH4}>{item.title}</h4>
          <div className={`${s.overlay} ${s.roundedBox}`}>
            <h4 className={s.whiteH4}>{item.title}</h4>
            <h4 className={s.whiteH4}>{item.totalProducts} devices</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

Component.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    logoUrl: PropTypes.string,
    totalProducts: PropTypes.string,
  }).isRequired,
};

export default Component;
