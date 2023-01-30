/**
 * Created by stephenkarpinskyj on 3/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { withStyles } from 'components/material-ui';
import { SIZE_CONSTANTS } from 'sizeConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Icon from 'viewComponents/Icon';
import { H6 } from 'viewComponents/Typography';
import { Checkbox } from 'ugcomponents/Inputs';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import DayRange from './components/DayRange';
import inputs from './inputs';
import { CONFIG } from './config';
import m from './messages';

const style = {
  infoContainer: {
    backgroundColor: '#eef2b9',
    padding: '4px 4px',
    borderRadius: 16,
  },
};

export class BatchCreate extends React.PureComponent {
  handleChange = (_, checked) => {
    this.props.resaga.setValue({ formBatchCreate: checked });
  };

  renderDayRangeData = () => {
    const { formBatchCreate } = this.props;
    return formBatchCreate && <DayRange />;
  };

  renderInfoText = () => {
    const { classes, formBatchCreate } = this.props;
    return (
      formBatchCreate && (
        <GridItem xs={12} sm={8}>
          <GridContainer
            alignItems="center"
            wrap="nowrap"
            className={classes.infoContainer}
          >
            <GridItem>
              <Icon
                icon="lnr-notification-circle"
                color="lavender"
                size="large"
              />
            </GridItem>
            <GridItem>
              <H6 weight="bold" dense lavender fontStyle="italic">
                <M {...m.infoLabel} />
              </H6>
            </GridItem>
          </GridContainer>
        </GridItem>
      )
    );
  };

  renderField = () => {
    const { formBatchCreate } = this.props;
    return (
      <GridItem>
        <GridContainer direction="column" spacing={2}>
          <GridItem>
            <Checkbox
              value={false}
              currentValue={formBatchCreate}
              onChange={this.handleChange}
              compact
              size={SIZE_CONSTANTS.SM}
              {...inputs.batchCreate}
            />
          </GridItem>
          {this.renderInfoText()}
          {this.renderDayRangeData()}
        </GridContainer>
      </GridItem>
    );
  };

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant variant={variant} renderField={this.renderField} />
    );
  };
}

BatchCreate.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent
  variant: PropTypes.string,

  // resaga value
  formBatchCreate: PropTypes.bool,
};

BatchCreate.defaultProps = {
  variant: null,

  formBatchCreate: false,
};

export default compose(
  withStyles(style, { name: 'Event/parts/Event/BatchCreate' }),
  resaga(CONFIG),
)(BatchCreate);
