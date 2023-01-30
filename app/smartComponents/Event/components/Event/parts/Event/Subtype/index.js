/**
 * Created by stephenkarpinskyj on 12/7/18.
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { EVENT_HELPERS } from 'utils/helpers/events';
import GridItem from 'components/GridItem';
import { H6, H5 } from 'viewComponents/Typography';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { Data } from 'ugcomponents/Inputs';
import Icon from 'ugcomponents/Icon';
import EditableHeading from './components/EditableHeading';
import EditableHeadingForm from './components/EditableHeadingForm';
import inputs from './inputs';
import { CONFIG } from './config';
import styles from './styles';

export class Subtype extends React.PureComponent {
  getValue = () => {
    const { formValue, value } = this.props;
    return value === '' ? formValue : value;
  };

  renderSubtype = Component => () => {
    const { value, ...props } = this.props;
    return <Component value={this.getValue()} {...props} {...inputs.subtype} />;
  };

  renderLabelValue = () => {
    const { type } = this.props;
    const { name: subtype, colors } = EVENT_HELPERS.getEventSubtypeConstants(
      type,
      this.getValue(),
    );
    const style = { color: colors.icon.background.default };
    return (
      <React.Fragment>
        <GridItem>
          <Icon size="xsmall" icon="chevron-right" />
        </GridItem>
        <GridItem>
          <H6 dense weight="bold">
            <span style={style}>{subtype}</span>
          </H6>
        </GridItem>
      </React.Fragment>
    );
  };

  renderLabel = () => {
    const { type, classes } = this.props;
    const { name: subtype, colors } = EVENT_HELPERS.getEventSubtypeConstants(
      type,
      this.getValue(),
    );
    const style = { color: colors.icon.background.default };
    return (
      <GridItem className={classes.noPaddingBottom}>
        <H5 dense weight="bold">
          <span style={style}>{subtype}</span>
        </H5>
      </GridItem>
    );
  };

  renderData = () => <Data value={this.getValue()} {...inputs.subtype} />;

  renderValueOnly = () => {
    const { component: Component, type, className } = this.props;

    const { name } = EVENT_HELPERS.getEventSubtypeConstants(
      type,
      this.getValue(),
    );

    return <Component className={className}>{name}</Component>;
  };

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderEditableHeading={this.renderSubtype(EditableHeading)}
        renderEditableHeadingForm={this.renderSubtype(EditableHeadingForm)}
        renderLabelValue={this.renderLabelValue}
        renderLabel={this.renderLabel}
        renderData={this.renderData}
        renderValueOnly={this.renderValueOnly}
      />
    );
  };
}

Subtype.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  variant: PropTypes.string,
  component: PropTypes.string,
  className: PropTypes.string,

  // resaga value
  value: PropTypes.string,
  type: PropTypes.string,
  formValue: PropTypes.string,
};

Subtype.defaultProps = {
  variant: null,
  component: 'span',

  type: '',
  value: '',
  formValue: '',
};

export default compose(
  withStyles(styles, { name: 'EventSubtype' }),
  resaga(CONFIG),
)(Subtype);
