import { withStyles } from '@material-ui/core/styles';
import { DEFAULT, SUB_TITLE, TEXT, TITLE } from 'appConstants';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import classnames from 'classnames';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import TextField from 'ugcomponents/Inputs/ValidationTextField';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import { H1, P } from 'viewComponents/Typography';
import { CONFIG } from './config';
import { ORGNAME_FORM_NAME } from './constants';
import m from './messages';
import styles from './styles';
import OrganisationPhoto from '../Photo';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from '../../../File/types/Photo/constants';

export class Name extends PureComponent {
  getInputLabelProps = {
    shrink: true,
  };

  getStrippedOwnProps = () =>
    omit(this.props, ['resaga', 'name', 'id', 'classes', 'variant']);

  renderTextField = () => (
    <TextField
      name={ORGNAME_FORM_NAME}
      value={this.props.name}
      label={this.props.intl.formatMessage(m.label)}
      InputLabelProps={this.getInputLabelProps}
      {...this.getStrippedOwnProps()}
      required
    />
  );

  renderTextOnly = () => {
    const { name } = this.props;
    return <P {...this.getStrippedOwnProps()}>{name}</P>;
  };

  renderSpanOnly = () => {
    const { name } = this.props;
    return <span {...this.getStrippedOwnProps()}>{name}</span>;
  };

  renderText = () => {
    const { id, name, className } = this.props;
    return (
      <span className={className} title={name}>
        {name || `Organisation ${id}`}
      </span>
    );
  };

  renderTitle = () => {
    const { classes } = this.props;
    return <span className={classes.title}>{this.renderText()}</span>;
  };

  renderSubtitle = () => {
    const {
      name,
      className,
      classes,
      ellipsisClassName,
      prefix,
      component: Component,
    } = this.props;

    if (!name) return null;

    return (
      <Component
        className={classnames(classes.subtitle, className, ellipsisClassName)}
      >
        <span
          className={classnames(
            LOGIC_HELPERS.ifElse(ellipsisClassName, classes.ellipsis),
          )}
        >
          {prefix}
          {this.renderText()}
        </span>
      </Component>
    );
  };

  renderStringOnly = () => this.props.name;

  renderDefault = () => {
    const { classes, name } = this.props;
    return (
      <React.Fragment>
        <div className={classes.lineIndicator} />
        <H1
          className={classnames('j-text-ellipsis', classes.name)}
          noMargin
          {...this.getStrippedOwnProps()}
        >
          {name}
        </H1>
      </React.Fragment>
    );
  };

  renderAvatar = () => {
    const { id, name, letterAvatar } = this.props;
    const photoProps = {
      shape: IMAGE_VARIANTS_CONSTANTS.SQUARE,
      variant: VARIANTS.READ_ONLY,
      size: IMAGE_SIZES_CONSTANTS.XXS,
      squareSm: true,
    };
    return (
      <OrganisationPhoto
        id={id}
        {...photoProps}
        avatarProps={photoProps}
        name={name}
        letterAvatar={letterAvatar}
      />
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [ORG_FIELD_VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [ORG_FIELD_VARIANTS.TEXT_FIELD]: this.renderTextField,
      [VARIANTS.STRING_ONLY]: this.renderStringOnly,
      [VARIANTS.SPAN_ONLY]: this.renderSpanOnly,
      [VARIANTS.AVATAR_ONLY]: this.renderAvatar,
      [TITLE]: this.renderTitle,
      [SUB_TITLE]: this.renderSubtitle,
      [TEXT]: this.renderText,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Name.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  variant: PropTypes.string,
  className: PropTypes.string,
  ellipsisClassName: PropTypes.string,
  prefix: PropTypes.string,
  letterAvatar: PropTypes.bool,

  // resaga props
  name: PropTypes.string,

  // customisable props
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
};

Name.defaultProps = {
  variant: ORG_FIELD_VARIANTS.TEXT_ONLY,
  name: '',
  component: 'span',
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'Name' }),
  resaga(CONFIG),
)(Name);
