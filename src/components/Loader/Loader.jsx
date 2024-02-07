import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => (
  <div className={css.loader}>
    <ThreeCircles type="ThreeDots" color="#3F51B5" height={50} width={50} />
  </div>
);

export default Loader;
