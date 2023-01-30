/**
 * Created by stephenkarpinskyj on 26/4/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from 'viewComponents/Tooltip';
import Dropzone from 'react-dropzone';
import classnames from 'classnames';

import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Button from 'viewComponents/Button';
import Icon from 'ugcomponents/Icon';
import { VARIANTS } from 'variantsConstants';
import { get } from 'lodash';
import style from './style';

export class FileDropzone extends React.PureComponent {
  handleDrop = acceptedFiles => {
    const { onDrop } = this.props;
    if (acceptedFiles.length > 0) {
      onDrop(acceptedFiles);
    }
  };

  renderContent = (classes, text, props) => (
    <GridContainer
      alignItems="center"
      wrap="nowrap"
      classes={{ root: classes.containerRoot }}
    >
      {!props.compact && (
        <GridItem>
          <div className={classes.browseIconBorder}>
            <Icon className={classes.browseIcon} icon="lnr-paperclip" />
          </div>
        </GridItem>
      )}
      <GridItem
        className={classnames(classes.text, {
          [classes.withTextWidth]: props.hasTextWidth,
        })}
      >
        {text}
      </GridItem>
    </GridContainer>
  );

  renderText = () => {
    const { text, compactText, compact } = this.props;
    return compact ? compactText : text;
  };

  handlePaste = e => {
    const { allowPaste } = this.props;
    if (!allowPaste) return;
    const item = get(e, 'clipboardData.items.0');
    if (!item || typeof item.getAsFile !== 'function') return;
    const file = item.getAsFile();
    if (file && typeof file === 'object') {
      const { type } = file;
      if (type && type.includes('image')) {
        e.preventDefault();
        e.stopPropagation();
        this.handleDrop([file]);
      }
    }
  };

  render = () => {
    const {
      classes,
      text,
      compactText,
      containerHasNoStyle,
      hasTextWidth,
      compact,
      showClear,
      onDrop,
      onClear,
      children,
      droppedIds,
      droppedFiles,
      ...props
    } = this.props;

    if (typeof children === 'function' || props.simple) {
      return (
        <div onPaste={this.handlePaste}>
          <Dropzone onDrop={this.handleDrop} type="hidden" {...props}>
            {children}
          </Dropzone>
        </div>
      );
    }

    return (
      <div
        className={classnames({
          [classes.root]: !containerHasNoStyle && !compact,
        })}
      >
        <GridContainer
          alignItems="stretch"
          wrap="nowrap"
          direction="row-reverse"
        >
          <GridItem xs className={classes.detailsContainer}>
            <Tooltip title="Upload Forms & Attachments">
              <Dropzone
                className={classnames(classes.dropzone)}
                onDrop={this.handleDrop}
                type="hidden"
                {...props}
              >
                {this.renderContent(classes, this.renderText(), {
                  hasTextWidth,
                  compact,
                })}
              </Dropzone>
            </Tooltip>
          </GridItem>
          {showClear && (
            <GridItem>
              <Button
                className={classes.clearButton}
                iconButton
                size="extraSmall"
                icon="lnr-broom"
                variant={VARIANTS.OUTLINE}
                color="black"
                dense
                verySquare
                onClick={onClear}
              />
            </GridItem>
          )}
        </GridContainer>
      </div>
    );
  };
}

FileDropzone.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  onDrop: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  text: PropTypes.any,
  compactText: PropTypes.any,
  containerHasNoStyle: PropTypes.bool,
  hasTextWidth: PropTypes.bool,
  compact: PropTypes.bool,
  showClear: PropTypes.bool,
  children: PropTypes.func,
  droppedIds: PropTypes.any,
  droppedFiles: PropTypes.any,
  allowPaste: PropTypes.bool,
};

FileDropzone.defaultProps = {
  onClear: () => {},
  text: 'Drag and drop the files you want to upload or click to select them.',
  compactText: 'Click to upload',
  containerHasNoStyle: false,
  hasTextWidth: true,
  compact: false,
  showClear: false,
};

export default withStyles(style, { name: 'components/File/Dropzone' })(
  FileDropzone,
);
