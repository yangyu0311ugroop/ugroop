import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { SwitchField } from 'viewComponents/Inputs';
import { useSelector } from 'react-redux';
import { PERSON_STORE_RESELECTORS } from 'datastore/personDataStore/selectorsViaConnect';
import withResaga from 'resaga';

export const NoDietary = memo(props => {
  const { disabled, id, label, tooltip } = props;
  const value = useSelector(state =>
    PERSON_STORE_RESELECTORS.getPersonNoDietary(state, id),
  );

  const onClick = val => {
    PERSON_DETAIL_HELPER.updatePerson(
      {
        personId: id,
        person: {
          noDietary: val,
        },
      },
      props,
    );
  };
  return (
    <div title={tooltip}>
      <SwitchField
        value={value}
        onChange={onClick}
        disabled={disabled}
        label={label}
        data-testid="noDietaryCheck"
      />
    </div>
  );
});
NoDietary.propTypes = {
  // hoc props
  // eslint-disable-next-line react/no-unused-prop-types
  resaga: PropTypes.object.isRequired,
  // parent props
  id: PropTypes.number,
  label: PropTypes.any,
  disabled: PropTypes.bool,
  tooltip: PropTypes.string,
};

NoDietary.defaultProps = {
  tooltip: 'No dietary requirements advised',
};
export default withResaga()(NoDietary);
