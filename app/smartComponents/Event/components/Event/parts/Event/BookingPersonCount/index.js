import { ability } from 'apis/components/Ability/ability';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import JText from 'components/JText';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import { EditableTextForm } from 'smartComponents/Editables';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { Number as NumberInput } from 'smartComponents/Inputs';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { PARTICIPANT } from 'utils/modelConstants';
import { pluralizeText } from 'utils/stringAdditions';
import inputs from './inputs';
import m from './messages';

export class BookingPersonCount extends React.PureComponent {
  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchEvent(obj, this.props);
  };

  renderEditableValue = value =>
    `${value} ${pluralizeText('people', Number.parseInt(value, 10), true)}`;

  renderEditable = () => {
    const { value, dataId, readOnly, label, placeholder } = this.props;
    return (
      <GridItem>
        <EditableTextForm
          value={value}
          renderValue={this.renderEditableValue}
          TextComponent={NumberInput}
          label={label}
          placeholder={placeholder}
          {...inputs.personCount}
          onSubmit={this.handleSubmit}
          readOnly={readOnly}
        >
          <EventPatchData dataId={dataId} subtype />
        </EditableTextForm>
      </GridItem>
    );
  };

  renderField = () => {
    const { value, label } = this.props;
    return (
      <GridItem xs={12} sm={7}>
        <NumberInput value={value} label={label} {...inputs.personCount} />
      </GridItem>
    );
  };

  renderValueOnly = () => {
    const { component: Component, value, className, isFood } = this.props;

    return (
      value && (
        <Component className={className}>
          <GridContainer alignItems="center" spacing={0} wrap="nowrap">
            {/* <GridItem> */}
            {/*  <Icon icon="lnr-users2" size="small" color="gray" paddingRight /> */}
            {/* </GridItem> */}
            <GridItem>
              <JText gray paddingRight>
                {value}{' '}
                {LOGIC_HELPERS.ifElse(
                  isFood,
                  LOGIC_HELPERS.ifElse(value > 1, 'people', 'person'),
                  `guest${LOGIC_HELPERS.ifElse(value > 1, 's')}`,
                )}
              </JText>
            </GridItem>
          </GridContainer>
        </Component>
      )
    );
  };

  render = () => {
    const { variant } = this.props;
    if (!ability.can('execute', PARTICIPANT)) return null;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderEditable}
        renderField={this.renderField}
        renderValueOnly={this.renderValueOnly}
      />
    );
  };
}

BookingPersonCount.propTypes = {
  // parent props
  variant: PropTypes.string,
  dataId: PropTypes.number,
  readOnly: PropTypes.bool,
  label: PropTypes.node,
  placeholder: PropTypes.string,
  component: PropTypes.string,
  className: PropTypes.string,
  isFood: PropTypes.bool,

  // resaga props
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

BookingPersonCount.defaultProps = {
  variant: '',
  component: 'span',
  dataId: null,
  readOnly: false,
  label: <M {...m.label} />,
  placeholder: 'Click to specify total people booked',
};

export default compose(
  EVENT_STORE_HOC.selectEventProp({ path: EVENT_PATHS.bookingPersonCount }),
)(BookingPersonCount);
