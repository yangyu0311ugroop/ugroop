/**
 * Created by stephenkarpinskyj on 20/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { EVENT_HELPERS } from 'utils/helpers/events';
import GridItem from 'components/GridItem';
import { H6 } from 'viewComponents/Typography';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { Data } from 'ugcomponents/Inputs';
import EditableHeading from './components/EditableHeading';
import inputs from './inputs';
import { CONFIG } from './config';

export class Type extends React.PureComponent {
  renderType = Component => () => (
    <Component {...this.props} {...inputs.type} />
  );

  renderLabelValue = () => {
    const { value } = this.props;
    const type = EVENT_HELPERS.getEventTypeConstants(value).name;
    return (
      <GridItem>
        <H6 dense weight="bold">
          {type}
        </H6>
      </GridItem>
    );
  };

  renderData = () => {
    const { value } = this.props;
    return <Data value={value} {...inputs.type} />;
  };

  renderValueOnly = () => {
    const { component: Component, value, className } = this.props;

    const type = EVENT_HELPERS.getEventTypeConstants(value).name;

    return <Component className={className}>{type}</Component>;
  };

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderEditableHeading={this.renderType(EditableHeading)}
        renderLabelValue={this.renderLabelValue}
        renderData={this.renderData}
        renderValueOnly={this.renderValueOnly}
      />
    );
  };
}

Type.propTypes = {
  // parent
  variant: PropTypes.string,
  component: PropTypes.string,
  className: PropTypes.string,

  // resaga value
  value: PropTypes.string,
};

Type.defaultProps = {
  variant: null,
  component: 'span',

  value: EVENT_CONSTANTS.EVENTS.ACTIVITY.type,
};

export default compose(resaga(CONFIG))(Type);
