import React, { useContext } from 'react';
import { AppContext } from '../App';
import styles from './Table.module.scss';
import classnames from 'classnames';

function Table() {
  const currentContext = useContext(AppContext);

  return <div className={classnames(styles.table, { [styles.table_show]: currentContext?.showTable })}>asdf</div>;
}

export default Table;
