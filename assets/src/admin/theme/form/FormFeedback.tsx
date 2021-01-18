import React from 'react';

import cn from '../../utils/classnames';
import { Notice, NOTICE_TYPES } from '../index';

const FormFeedback = ({
  className = '',
  type = Object.values(NOTICE_TYPES)[0],
  message,
}: {
  className?: string;
  type?: string;
  message: string;
}) => (
  <tr className={cn(className, 'form-feedback')}>
    <td colSpan={2}>
      <Notice type={type} message={message} />
    </td>
  </tr>
);

export default FormFeedback;
