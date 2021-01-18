import React from 'react';

import cn from '../../utils/classnames';
import { Notice, NOTICE_TYPES } from '../index';

const FormFeedback = ({
  className = '',
  type = Object.values(NOTICE_TYPES)[0],
  children,
}: {
  className?: string;
  type?: string;
  children?: any;
}) => (
  <tr className={cn(className, 'form-feedback')}>
    <td colSpan={2}>
      <Notice type={type}>{children}</Notice>
    </td>
  </tr>
);

export default FormFeedback;
