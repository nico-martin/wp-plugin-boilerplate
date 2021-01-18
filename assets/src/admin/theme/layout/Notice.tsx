import React from 'react';

import cn from '../../utils/classnames';

import styles from './Notice.css';

export const NOTICE_TYPES = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success',
};

const Notice = ({
  className = '',
  type = Object.values(NOTICE_TYPES)[0],
  alt = false,
  message,
}: {
  className?: string;
  type?: string;
  alt?: boolean;
  message: string;
}) => (
  <div
    className={cn(className, 'notice', `notice-${type}`, styles.notice, {
      'notice-alt': alt,
    })}
    dangerouslySetInnerHTML={{ __html: message }}
  />
);

export default Notice;
