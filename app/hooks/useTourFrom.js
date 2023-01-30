import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { useSelector } from 'react-redux';
import { makeSelectNodeOrgId } from '../datastore/nodeStore/selectorsViaConnect';
import { TourFrom } from '../appConstants';
/* eslint-disable no-param-reassign */

function useTourFrom(props) {
  const [tourFrom, setTourFrom] = useImmer({
    from: TourFrom.PERSONAL,
    orgId: null,
  });

  const orgId = useSelector(state =>
    makeSelectNodeOrgId(state, { id: props.templateId }),
  );
  useEffect(() => {
    if (orgId) {
      setTourFrom(draft => {
        draft.from = TourFrom.ORGANISATION;
        draft.orgId = orgId;
      });
    }
  }, [orgId]);
  return tourFrom;
}

export default useTourFrom;
