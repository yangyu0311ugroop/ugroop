/**
 * Created by stephenkarpinskyj on 5/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { FormattedMessage as M, injectIntl } from 'react-intl';
import { pluralizeText } from 'utils/stringAdditions';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import P, { H5 } from 'viewComponents/Typography';
import { EventHeading, EventIconSublabel } from 'viewComponents/Event';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import m from './messages';
import { CONFIG } from './config';

export class Duration extends React.PureComponent {
  getNightCount = () => {
    const { startTimeValue, endTimeValue } = this.props;
    return NODE_HELPERS.calculateDayDuration(
      startTimeValue,
      endTimeValue,
    ).asDays();
  };

  renderLabelPrefix = () => {
    const { omitPrefix } = this.props;
    return omitPrefix ? null : <M {...m.prefixLabel} />;
  };

  renderLabelSuffix = nightCount => {
    const { intl, omitPrefix } = this.props;
    return omitPrefix
      ? pluralizeText(intl.formatMessage(m.suffixLabel), nightCount, true)
      : null;
  };

  renderLabel = () => {
    const nightCount = this.getNightCount();
    return (
      nightCount >= 0 && (
        <GridItem>
          <GridContainer alignItems="center">
            <GridItem>
              <EventHeading Typography={H5}>
                {this.renderLabelPrefix()}
              </EventHeading>
            </GridItem>
            <GridItem>
              <P dense>
                {nightCount}
                {this.renderLabelSuffix(nightCount)}
              </P>
            </GridItem>
          </GridContainer>
        </GridItem>
      )
    );
  };

  renderLabelValue = () => {
    const nightCount = this.getNightCount();
    return (
      nightCount >= 0 && (
        <EventIconSublabel>
          {`${nightCount} ${pluralizeText('Night', nightCount, true)}`}
        </EventIconSublabel>
      )
    );
  };

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderLabel}
        renderLabelValue={this.renderLabelValue}
      />
    );
  };
}

Duration.propTypes = {
  // hoc
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }),

  // parent
  variant: PropTypes.string,
  id: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  omitPrefix: PropTypes.bool,
  startMode: PropTypes.string,
  endMode: PropTypes.string,

  // resaga value
  startTimeValue: PropTypes.string,
  endTimeValue: PropTypes.string,
};

Duration.defaultProps = {
  variant: null,
  id: null,
  omitPrefix: false,
  startMode: null,
  endMode: null,

  startTimeValue: null,
  endTimeValue: null,
};

export default compose(
  injectIntl,
  resaga(CONFIG),
)(Duration);
