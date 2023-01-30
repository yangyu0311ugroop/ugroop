import { useEffect, useState } from 'react';
import { GET_TEMPLATE_FEATURED_LIST, TEMPLATE_API } from '../apis/constants';
export function useCheckFeaturedTour(props) {
  const [isFeatured, setIsFeatured] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { resaga, templateId } = props;
  useEffect(() => {
    resaga.dispatchTo(TEMPLATE_API, GET_TEMPLATE_FEATURED_LIST, {
      onSuccess: res => {
        if (res.raw) {
          const ids = res.raw.map(o => o.id);
          if (ids.includes(templateId)) {
            setIsFeatured(true);
          }
        }
        setIsLoading(false);
      },
    });
  }, []);

  return { isFeatureTours: isFeatured, isLoading };
}

export default useCheckFeaturedTour;
