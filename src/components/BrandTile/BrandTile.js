import React, { PropTypes } from 'react';
import H4 from './H4';
import Img from './Img';
import RoundedBox from './RoundedBox';
import Overlay from './Overlay';

function Component({ item }) {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
      <RoundedBox className="row" href={`/devices/${encodeURIComponent(item.title)}?page=1`}>
        <div className="col-xs-12">
          <Img src={item.logoUrl} />
          <H4 color="primary">{item.title}</H4>
          <Overlay className="overlay">
            <H4 color="white">{item.title}</H4>
            <H4 color="white">{item.totalProducts} devices</H4>
          </Overlay>
        </div>
      </RoundedBox>
    </div>
  );
}

Component.propTypes = {
  item: PropTypes.node,
};

Component.defaultProps = {
  item: null,
};

export default Component;
