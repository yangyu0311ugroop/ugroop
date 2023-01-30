import { MARKET_API, USE_TEMPLATE, GET_PUBLISHER_IDS } from 'apis/constants';
import { DATASTORE_UTILS } from 'datastore';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import { useInjectReducer } from 'utils/injectReducer';

import { CONFIG } from './config';

function Market(props) {
  useEffect(() => {
    props.resaga.analyse(props, {
      [USE_TEMPLATE]: { onSuccess: updateAbility },
      [GET_PUBLISHER_IDS]: { onSuccess: props.resaga.setValue },
    });
  }, [props]);

  const addAbility = id => {
    const { tourOwnerAbilities } = props;

    if (!tourOwnerAbilities.length) {
      return null;
    }
    // add owner abilities to newly created `id`
    return props.resaga.setValue({
      tours: DATASTORE_UTILS.upsertArray(`${id}`, tourOwnerAbilities),
    });
  };

  const updateAbility = ({ cloneId }) => addAbility(cloneId);

  useInjectReducer({ key: MARKET_API, reducer: reducer(MARKET_API) });
  return false;
}

Market.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  tourOwnerAbilities: PropTypes.array,
};

export default compose(resaga(CONFIG))(React.memo(Market));
