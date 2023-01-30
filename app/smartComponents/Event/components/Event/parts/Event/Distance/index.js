import { USER_API_HELPERS } from 'apis/components/User/helpers';
import { USER_PREFERENCE } from 'appConstants';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { withStyles } from '@material-ui/core/styles';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { CONVERTERS } from 'utils/converter';
import { EditableSelectForm } from 'smartComponents/Editables';
import { H6, H5 } from 'viewComponents/Typography';

import { CONFIG, GET_PREFERRED_MEASUREMENT } from './config';
import m from './messages';
import styles from './styles';

export class Distance extends PureComponent {
  handleSubmit = ({ onSuccess, onError, model }) => {
    const { userId } = this.props;

    USER_API_HELPERS.updateUserPreference(
      this.props.resaga,
      USER_PREFERENCE.PREFERRED_DISTANCE_MEASUREMENT,
      model[USER_PREFERENCE.PREFERRED_DISTANCE_MEASUREMENT],
      userId,
      onSuccess,
      onError,
    )();
  };

  renderValue = () => {
    const { eventDistance, measurement } = this.props;

    return eventDistance !== 0
      ? `${CONVERTERS.unitOfDistanceCoverter(
          eventDistance,
          measurement,
        )} ${measurement}`
      : null;
  };

  renderLabelValueStacked = () => {
    const value = this.renderValue();
    return value ? (
      <React.Fragment>
        <H6 weight="bold">Distance: </H6>
        <H6 weight="bold">{this.renderValue()}</H6>
      </React.Fragment>
    ) : null;
  };

  renderLabelValue = () => {
    const { classes } = this.props;
    const value = this.renderValue();
    return value ? (
      <div className={classes.labelValue}>
        <H5 weight="bold">Distance: </H5>
        <H5>
          &nbsp;
          {this.renderValue()}
        </H5>
      </div>
    ) : null;
  };

  renderEditable = () => {
    const { eventDistance, measurement } = this.props;

    if (eventDistance < 1) return null;

    return (
      <GridItem>
        <EditableSelectForm
          label={<M {...m.label} />}
          renderValue={this.renderValue}
          onSubmit={this.handleSubmit}
          value={measurement}
          name={USER_PREFERENCE.PREFERRED_DISTANCE_MEASUREMENT}
          options={[
            {
              value: 'km',
              children: 'Kilometers/km',
            },
            {
              value: 'mi',
              children: 'Miles/mi',
            },
          ]}
        />
      </GridItem>
    );
  };

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderEditable}
        renderValueOnly={this.renderValue}
        renderLabelValue={this.renderLabelValue}
        renderLabelValueStacked={this.renderLabelValueStacked}
      />
    );
  };
}

Distance.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  dataId: PropTypes.number,
  variant: PropTypes.string,

  // resaga props
  userId: PropTypes.number,
  eventDistance: PropTypes.number,
  formDistance: PropTypes.number,
  measurement: PropTypes.string,
};

Distance.defaultProps = {
  variant: '',
  eventDistance: 0,
  formDistance: 0,
  measurement: 'km',
};

export default compose(
  withStyles(styles, { name: 'Distance' }),
  resaga(CONFIG),
  resaga(GET_PREFERRED_MEASUREMENT),
)(Distance);
