import React from 'react';

import cn from '../../utils/classnames';

import './Image.css';
import { VARS } from '../../utils/constants';

const Image = ({
  id,
  size = 150,
  className = '',
}: {
  id: number;
  size?: number;
  className?: string;
}) => {
  const [src, setSrc] = React.useState<string>(null);

  const url = React.useMemo(() => `${VARS.restBase}wp/v2/media/${id}/`, [id]);

  React.useEffect(() => {
    const controller = new AbortController();
    fetch(url, {
      signal: controller.signal,
    })
      .then((resp) => {
        if (resp.status >= 300) {
          alert(`failed to load URL "${url}"`);
        } else {
          return resp.json();
        }
      })
      .then((data) => {
        setSrc(data.media_details.sizes.thumbnail.source_url);
      })
      .catch((e) => {
        //console.error(e)
      });
    return () => controller.abort();
  }, [url]);

  return (
    <div
      className={cn(className, 'image')}
      style={{ width: size, height: size }}
    >
      {src && (
        <img className="image__img" src={src} height={size} width={size} />
      )}
    </div>
  );
};

export default Image;
