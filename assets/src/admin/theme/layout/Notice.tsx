import React from 'react';

import cn from '../../utils/classnames';

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
  children,
}: {
  className?: string;
  type?: string;
  alt?: boolean;
  children?: any;
}) => (
  <div
    className={cn(className, 'notice', `notice-${type}`, {
      'notice-alt': alt,
    })}
  >
    {typeof children === 'string' ? <p>{children}</p> : children}
  </div>
);

export default Notice;
