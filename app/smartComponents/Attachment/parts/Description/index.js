import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import classNames from 'classnames';
import resaga from 'resaga';
import { DEFAULT, EMPTY_RTE } from 'appConstants';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { withStyles } from 'components/material-ui';
import GridItem from 'components/GridItem';
import { SimpleRTE } from 'ugcomponents/Inputs';
import RichTextEditor from 'ugcomponents/RichTextEditor';
import { Text } from 'smartComponents/Inputs';
import { CONFIG } from './config';
import inputs from './inputs';
import style from './style';

export class AttachmentDescription extends React.PureComponent {
  getValue = () => {
    const { description } = this.props;
    return description || '';
  };

  getRTEValue = () => {
    const { description } = this.props;
    return description || EMPTY_RTE;
  };

  getRTEClassName = () => {
    const { classes, width } = this.props;
    return classNames({
      [classes.rte]: true, // TODO: Find out why SimpleRTE is incompatible with grid (adds padding when 0-1 characters long)
      [classes[`${width}Width`]]: !!width,
    });
  };

  getTextClassName = () => {
    const { classes, width } = this.props;
    return width ? classes[`${width}Width`] : null;
  };

  renderTextField = () => {
    const { richText, classes } = this.props;
    return richText ? (
      <SimpleRTE
        className={this.getRTEClassName()}
        value={this.getRTEValue()}
        {...inputs.base}
      />
    ) : (
      <GridItem className={classes.descriptionContainer}>
        <Text
          className={this.getTextClassName()}
          value={this.getValue()}
          attachmentTextField
          {...inputs.base}
        />
      </GridItem>
    );
  };

  renderTextOnly = () => {
    const { classes, id, richText, description, compact } = this.props;
    return richText ? (
      <RichTextEditor
        wrapperClassname={compact ? classes.compact : null}
        readOnly
        initContent={description}
        toolBarId={`attachmentDescription${id}`}
      />
    ) : (
      this.getValue()
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [DEFAULT]: this.renderTextOnly,
    });
  };
}

AttachmentDescription.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  richText: PropTypes.bool,
  width: PropTypes.oneOf([SIZE_CONSTANTS.XXS, null]),
  compact: PropTypes.bool,

  // resaga value
  description: PropTypes.string,
};

AttachmentDescription.defaultProps = {
  id: null,
  variant: null,
  richText: false,
  width: null,
  compact: false,

  description: null,
};

export default compose(
  withStyles(style, { name: 'smartComponents/Attachment/parts/Description' }),
  resaga(CONFIG),
)(AttachmentDescription);
