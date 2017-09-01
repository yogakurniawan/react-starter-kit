import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LoadingIndicator.css'; // eslint-disable-line

const LoadingIndicator = () => (
  <div className={s.wrapper}>
    <div className={s.circle} />
    <div className={`${s.circle} ${s.circle1}`} />
    <div className={`${s.circle} ${s.circle2}`} />
    <div className={`${s.circle} ${s.circle3}`} />
    <div className={`${s.circle} ${s.circle4}`} />
    <div className={`${s.circle} ${s.circle5}`} />
    <div className={`${s.circle} ${s.circle6}`} />
    <div className={`${s.circle} ${s.circle7}`} />
    <div className={`${s.circle} ${s.circle8}`} />|
    <div className={`${s.circle} ${s.circle9}`} />
    <div className={`${s.circle} ${s.circle10}`} />
    <div className={`${s.circle} ${s.circle11}`} />
  </div>
);

export default withStyles(s)(LoadingIndicator);
