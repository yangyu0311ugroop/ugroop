/**
 * Created by stephenkarpinskyj on 26/4/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import UGLink from 'components/Link';
import { padFacadeURL } from 'utils/helpers/request';
import { formatBytes } from 'utils/filesizeUtils';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import IconButton from 'ugcomponents/Buttons/IconButton';
import Icon from 'ugcomponents/Icon';
import Text from 'ugcomponents/Inputs/ValidationTextField';
import DataField from 'ugcomponents/Inputs/DataField';
import style from './style';

export class AttachmentField extends React.PureComponent {
  state = {
    url: null,
  };

  handleLinkUrlChange = value => {
    this.setState({ url: value });
  };

  renderRemoveButton = () => {
    const { onRemove } = this.props;
    return onRemove ? (
      <GridItem xs={1}>
        <IconButton tooltip="Remove" onClick={onRemove}>
          <Icon icon="lnr-trash2" />
        </IconButton>
      </GridItem>
    ) : null;
  };

  renderDomLink = (className, to, content) =>
    to ? (
      <UGLink className={className} to={to} target="_blank">
        {content}
      </UGLink>
    ) : (
      content
    );

  renderAttachment = (
    type,
    info,
    description,
    data,
    hackInfoPadding = true,
  ) => {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={1} classes={{ typeItem: classes.paddingHack }}>
          {type}
        </GridItem>
        <GridItem
          xs={5}
          classes={hackInfoPadding ? { typeItem: classes.paddingHack } : null}
        >
          {info}
        </GridItem>
        <GridItem xs>{description}</GridItem>
        {data}
        {this.renderRemoveButton()}
      </GridContainer>
    );
  };

  renderFile = () => {
    const {
      classes,
      values: { id, type, url, name, size, description },
      onTypeInputs,
      onUrlInputs,
      onNameInputs,
      onSizeInputs,
      onDescriptionInputs,
    } = this.props;
    const displayName = name;
    const formattedSize = formatBytes(size);
    const fullUrl = padFacadeURL(url);
    const typeIcon = <Icon icon="lnr-paperclip" color="lavender" />;
    return this.renderAttachment(
      <div align="center">
        {this.renderDomLink(classes.fileType, fullUrl, typeIcon)}
      </div>,
      <React.Fragment>
        {this.renderDomLink(classes.fileName, fullUrl, displayName)}
        <span className={classes.fileSize}>{formattedSize}</span>
      </React.Fragment>,
      <Text {...onDescriptionInputs(id)} value={description} />,
      <React.Fragment>
        <DataField {...onTypeInputs(id)} value={type} />
        <DataField {...onUrlInputs(id)} value={url} />
        <DataField {...onNameInputs(id)} value={name} />
        <DataField {...onSizeInputs(id)} value={size} />
      </React.Fragment>,
    );
  };

  renderLink = () => {
    const {
      classes,
      readOnly,
      values: { id, type, url: propUrl, description },
      onTypeInputs,
      onUrlInputs,
      onDescriptionInputs,
    } = this.props;
    const { url } = this.state;
    const currentUrl = url || propUrl;
    const typeIcon = <Icon icon="lnr-link" color="lavender" />;
    const showLinkHideField = readOnly && !!currentUrl;
    return this.renderAttachment(
      <div align="center">
        {this.renderDomLink(classes.fileType, currentUrl, typeIcon)}
      </div>,
      <React.Fragment>
        <Text
          {...onUrlInputs(id)}
          type={showLinkHideField ? 'hidden' : 'text'}
          value={propUrl || 'http://'}
          onChange={this.handleLinkUrlChange}
        />
        {showLinkHideField &&
          this.renderDomLink(classes.fileName, currentUrl, currentUrl)}
      </React.Fragment>,
      <Text {...onDescriptionInputs(id)} value={description} />,
      <DataField {...onTypeInputs(id)} value={type} />,
      showLinkHideField,
    );
  };

  renderUnknown = () => {
    const {
      classes,
      values: { id, type, description },
      onTypeInputs,
      onDescriptionInputs,
    } = this.props;
    const fullUrl = null;
    const typeIcon = <Icon icon="lnr-question" color="lavender" />;
    return this.renderAttachment(
      <div align="center">
        {this.renderDomLink(classes.fileType, fullUrl, typeIcon)}
      </div>,
      this.renderDomLink(null, fullUrl, 'Unknown attachment'),
      <Text {...onDescriptionInputs(id)} value={description} />,
      <DataField {...onTypeInputs(id)} value={type} />,
    );
  };

  render = () => {
    const {
      values: { type },
    } = this.props;

    switch (type) {
      case 'file':
        return this.renderFile();
      case 'link':
        return this.renderLink();
      default:
        return this.renderUnknown();
    }
  };
}

AttachmentField.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  readOnly: PropTypes.bool,
  values: PropTypes.object.isRequired,
  onTypeInputs: PropTypes.func.isRequired,
  onUrlInputs: PropTypes.func.isRequired,
  onNameInputs: PropTypes.func.isRequired,
  onSizeInputs: PropTypes.func.isRequired,
  onDescriptionInputs: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
};

AttachmentField.defaultProps = {
  readOnly: false,
  onRemove: null,
};

export default withStyles(style, { name: 'AttachmentField' })(AttachmentField);
