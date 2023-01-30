import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { SwitchField } from 'viewComponents/Inputs';
import { useSelector } from 'react-redux';
import { PERSON_STORE_RESELECTORS } from 'datastore/personDataStore/selectorsViaConnect';
import withResaga from 'resaga';

export const NoMedical = memo(props => {
  const { disabled, id, label, tooltip } = props;
  const value = useSelector(state =>
    PERSON_STORE_RESELECTORS.getPersonNoMedical(state, id),
  );

  const onClick = val => {
    PERSON_DETAIL_HELPER.updatePerson(
      {
        personId: id,
        person: {
          noMedical: val,
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
        data-testid="noMedicalCheck"
      />
    </div>
  );
});
NoMedical.propTypes = {
  // hoc props
  // eslint-disable-next-line react/no-unused-prop-types
  resaga: PropTypes.object.isRequired,
  // parent props
  id: PropTypes.number,
  label: PropTypes.any,
  disabled: PropTypes.bool,
  tooltip: PropTypes.string,
};

NoMedical.defaultProps = {
  tooltip: 'No medical conditions advised',
};
// export default NoMedical;
export default withResaga()(NoMedical);
