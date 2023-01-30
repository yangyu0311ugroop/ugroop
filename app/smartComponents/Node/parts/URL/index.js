import { withStyles } from '@material-ui/core';
import isURL from 'validator/lib/isURL';
import PropTypes from 'prop-types';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import {
  NODE_PROP,
  URL,
  DEFAULT,
  LINK,
  URL_HELPERS,
  RENDER_PROP,
  TEXT,
  TITLE,
} from 'appConstants';
import React, { PureComponent } from 'react';
import classnames from 'classnames';
import resaga from 'resaga';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Icon from 'ugcomponents/Icon';
import { compose } from 'redux';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import styles from './styles';
import { CONFIG } from './config';

export class Url extends PureComponent {
  renderNodeProp = () => {
    const {
      id,
      editable,
      viewComponentProps,
      viewingClassName,
      classes,
      noContent,
      placeholder,
    } = this.props;

    return (
      <NodeProp
        id={id}
        variant={LINK}
        valueKey={URL}
        component={GridItem}
        viewComponentProps={viewComponentProps}
        viewingClassName={viewingClassName}
        editableClassName={classes.editableClassName}
        className={viewingClassName}
        placeholder={placeholder}
        noContent={noContent}
        editable={editable}
        showEmpty={editable}
        isCustomData
        gridSpacing={1}
        url
      />
    );
  };

  renderLink = () => {
    const { url, viewingClassName, editable } = this.props;
    if (editable) {
      return this.renderNodeProp();
    }

    if (!url) {
      return null;
    }

    // for some reason, the url is being formatted incorrectly whenever
    // the user enters a string without https:// or http://
    const formattedUrl = URL_HELPERS.makeUrl(url);

    return (
      <GridContainer alignItems="center" wrap="nowrap">
        <GridItem>
          <Icon icon="lnr-link" size="small" />
        </GridItem>
        <GridItem>
          {isURL(formattedUrl) ? (
            <a
              href={`//${formattedUrl}`}
              className={classnames('j-text-ellipsis', viewingClassName)}
              target="_blank"
            >
              {url}
            </a>
          ) : (
            this.renderTextOnly()
          )}
        </GridItem>
      </GridContainer>
    );
  };

  renderTitle = () => {
    const { url, viewingClassName } = this.props;
    if (!url) {
      return null;
    }

    return (
      <GridContainer wrap="nowrap">
        <GridItem>
          <Icon icon="lnr-link" size="small" />
        </GridItem>
        <GridItem className={viewingClassName}>{url}</GridItem>
      </GridContainer>
    );
  };

  renderTextOnly = () => {
    const { url, viewingClassName, editable } = this.props;
    if (editable) {
      return this.renderNodeProp();
    }

    if (!url) {
      return null;
    }
    const formattedUrl = URL_HELPERS.makeUrl(url);

    return <div className={viewingClassName}>{formattedUrl}</div>;
  };

  renderProp = () => {
    const { children, url } = this.props;

    return children(url);
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [NODE_PROP]: this.renderNodeProp,
      [LINK]: this.renderLink,
      [TEXT]: this.renderTextOnly,
      [RENDER_PROP]: this.renderProp,
      [TITLE]: this.renderTitle,
      [DEFAULT]: this.renderNodeProp,
    });
  };
}

Url.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  variant: PropTypes.node,
  editable: PropTypes.bool,
  children: PropTypes.func,
  noContent: PropTypes.string,
  placeholder: PropTypes.string,

  // customisable props
  viewComponentProps: PropTypes.object,
  viewingClassName: PropTypes.string,

  // resaga props
  url: PropTypes.string,
};

Url.defaultProps = {
  id: 0,
  variant: DEFAULT,
  editable: false,
  noContent: 'Add a URL',
  placeholder: 'Add a URL',
};

export default compose(
  withStyles(styles, { name: 'NodeURL' }),
  resaga(CONFIG),
)(Url);
