import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { compose } from 'redux';
import classnames from 'classnames';
import resaga from 'resaga';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import { CONFIG } from './config';
import styles from './styles';

export class Hashkey extends PureComponent {
  state = {
    copied: false,
  };

  copy = () => {
    this.setState({ copied: true });
  };

  resetCopy = () => {
    this.setState({ copied: false });
  };

  generatePublicTemplateLink = hashkey => {
    const { origin } = window.location;
    return `${origin}/public/template/${hashkey}`;
  };

  render = () => {
    const { component: Component, classes, hashkey, expand } = this.props;
    const { copied } = this.state;

    if (!hashkey) return null;

    const title = LOGIC_HELPERS.ifElse(
      copied,
      'Copied to clipboard',
      'Click to copy shareable link',
    );

    return (
      <Component>
        <CopyToClipboard
          text={this.generatePublicTemplateLink(hashkey)}
          onCopy={this.copy}
        >
          <Button
            color="primary"
            title={title}
            className={classnames(
              classes.hashkey,
              LOGIC_HELPERS.ifElse(expand, classes.hashkeyExpand),
            )}
            onMouseLeave={this.resetCopy}
          >
            <GridContainer alignItems="center" spacing={0} wrap="nowrap">
              <GridItem>
                <Icon
                  size="xsmall"
                  bold={!expand}
                  icon="lnr-share2"
                  paddingRight={expand}
                />
              </GridItem>
              {expand && (
                <GridItem>
                  <JText>{'SHARE ON>'}</JText>
                </GridItem>
              )}
            </GridContainer>
          </Button>
        </CopyToClipboard>
      </Component>
    );
  };
}

Hashkey.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  component: PropTypes.any,
  expand: PropTypes.bool,

  // resaga props
  hashkey: PropTypes.string,
};

Hashkey.defaultProps = {
  component: 'span',
};

export default compose(
  withStyles(styles, { name: 'Hashkey' }),
  resaga(CONFIG),
)(Hashkey);
