import React, { PropTypes } from 'react';
import s from './FilterBrand.css';

function Component({ onChange }) {
  return (
    <div className={`${s.wrapper} row start-xs`}>
      <div className={`${s.inputGroup} col-xs-12 col-sm-6 col-md-4 col-lg-4`}>
        <input className={s.input} onChange={onChange} type="search" placeholder="Filter Brand" />
        <span className={`${s.inputGroupButton} fa fa-search`} />
      </div>
    </div>
  );
}

Component.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Component;
