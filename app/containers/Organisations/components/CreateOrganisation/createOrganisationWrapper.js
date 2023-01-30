import React, { useState } from 'react';
import Location from '../../../../ugcomponents/Inputs/Location';
import CreateOrganisation from './index';
import { usePlanContext } from '../../../../smartComponents/Plan/context/planStateContext';

function CreateOrganisationWrapper() {
  const [placeId, setPlaceId] = useState(0);
  const [, dispatchState] = usePlanContext();
  const onSelectLocation = data => {
    const { place_id: id } = data;
    setPlaceId(id);
  };

  const location = (
    <Location
      editing
      locationKey="address"
      locationLabel="Address"
      onSelect={onSelectLocation}
    />
  );

  return (
    <CreateOrganisation placeId={placeId} dispatchState={dispatchState}>
      {location}
    </CreateOrganisation>
  );
}

export default CreateOrganisationWrapper;
