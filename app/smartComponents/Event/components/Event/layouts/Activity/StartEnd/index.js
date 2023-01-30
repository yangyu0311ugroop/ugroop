/**
 * Created by stephenkarpinskyj on 19/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import resaga from 'resaga';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { H4, H5 } from 'viewComponents/Typography';
import { EventHeading } from 'viewComponents/Event';
import { Section } from 'ugcomponents/DialogForm/Complex';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import {
  EventStartTime,
  EventEndTime,
  EventDuration,
  EventBatchCreate,
} from 'smartComponents/Event/components/Event/parts';
import m from './messages';
import { CONFIG } from './config';

export class ActivityStartEnd extends React.PureComponent {
  isCreating = () => {
    const { dataId } = this.props;
    return !dataId;
  };

  renderPart = (Component, props = {}) => (
    <Component {...this.props} {...props} />
  );

  renderEditableHeading = label => (
    <GridItem>
      <EventHeading Typography={H5}>
        <M {...label} />
      </EventHeading>
    </GridItem>
  );

  renderEditable = () => (
    <React.Fragment>
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          {this.renderEditableHeading(
            LOGIC_HELPERS.ifElse(
              this.props.hideEndDate,
              m.sectionLabel,
              m.startSectionLabel,
            ),
          )}
          {this.renderPart(EventStartTime)}
        </GridContainer>
      </GridItem>
      {!this.props.hideEndDate && (
        <GridItem>
          <GridContainer direction="column" spacing={0}>
            {this.renderEditableHeading(m.endSectionLabel)}
            {this.renderPart(EventEndTime)}
          </GridContainer>
        </GridItem>
      )}
      {this.renderPart(EventDuration, {
        variant: EVENT_CONSTANTS.VARIANTS.label,
      })}
    </React.Fragment>
  );

  renderFieldTitle = () => <M {...m.sectionLabel} />;

  renderFieldRowTitle = title =>
    title && (
      <H4 dense weight="bold" fontStyle="italic">
        {title}
      </H4>
    );

  renderFieldRow = (title, value, noTitle = false) => (
    <GridItem xs={12}>
      <GridContainer alignItems="baseline">
        {!noTitle && (
          <GridItem sm={2}>{this.renderFieldRowTitle(title)}</GridItem>
        )}
        <GridItem xs={12} sm>
          {value}
        </GridItem>
      </GridContainer>
    </GridItem>
  );

  renderFieldBatchCreate = () =>
    this.isCreating() &&
    this.renderFieldRow(null, <EventBatchCreate {...this.props} />);

  renderField = () => {
    const { hideEndDate } = this.props;
    return (
      <React.Fragment>
        <Section title={this.renderFieldTitle()}>
          <GridContainer spacing={3}>
            {this.renderFieldRow(
              <M {...m.startSectionLabel} />,
              this.renderPart(EventStartTime),
              hideEndDate,
            )}
            {this.renderFieldBatchCreate()}
            {!hideEndDate &&
              this.renderFieldRow(
                <M {...m.endSectionLabel} />,
                this.renderPart(EventEndTime),
              )}
          </GridContainer>
        </Section>
      </React.Fragment>
    );
  };

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderEditable}
        renderField={this.renderField}
      />
    );
  };
}

ActivityStartEnd.propTypes = {
  // parent
  variant: PropTypes.string,
  dataId: PropTypes.number,
  hideEndDate: PropTypes.bool,

  // resaga
  subtype: PropTypes.string,
};

ActivityStartEnd.defaultProps = {
  variant: null,
  dataId: null,
  hideEndDate: false,
};

export default resaga(CONFIG)(ActivityStartEnd);
