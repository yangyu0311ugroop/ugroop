import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classnames from 'classnames';

import omit from 'lodash/omit';
import DoubleCard from '../../../../smartComponents/Node/types/Template/variants/DoubleCard';

import styles from './styles';

export class TemplateCard extends PureComponent {
  getProps = () => omit(this.props, ['classes']);

  renderDescription = () => {
    const { description } = this.props;

    // just copied this from the old TemplateCard component
    const shortDescription = description
      ? description
          .trim()
          .split('\n')
          .map((line, i, arr) => {
            // since eslint throws error when I directly uses the index of the array
            // i reassigned it to a variable. I need the index since there's no
            // unique string I can assign for the key so I added the line plus
            // the index to make it somehow unique
            const stringLineIndex = i;
            const newLine = (
              <span key={`${line}-${stringLineIndex}`}>{line}</span>
            );
            if (i === arr.length - 1) {
              return newLine;
            }

            return (
              <span key={`${line}-${stringLineIndex}`}>
                {newLine} <br />
              </span>
            );
          })
      : '';

    return shortDescription;
  };

  renderActions = () => {
    const { showActions, renderActions, classes } = this.props;
    const actions = showActions ? (
      <div className={classes.templateItemFooterActions}>{renderActions()}</div>
    ) : (
      ''
    );

    return actions;
  };

  render = () => {
    const { classes, isLoading, rootClassName } = this.props;

    const overflow = isLoading ? (
      <div className={classes.templateOverride} />
    ) : (
      ''
    );
    const loading = isLoading ? (
      <CircularProgress className={classes.templateItemLoading} />
    ) : (
      ''
    );

    return (
      <Grid item xs={12} s={6} md={4} className={classnames(rootClassName)}>
        <div className={`${classes.templateItem}`}>
          {overflow}
          {loading}
          <DoubleCard variant="card" {...this.getProps()} />
        </div>
      </Grid>
    );
  };
}

TemplateCard.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  content: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  rootClassName: PropTypes.string,
  cardImageUrl: PropTypes.string,
  showActions: PropTypes.bool,
  templateQueryParam: PropTypes.string,
  baseUrl: PropTypes.string,
  renderAdditionalContent: PropTypes.node,
  renderActions: PropTypes.func,
  weekDay: PropTypes.number,
  startDate: PropTypes.string,
  duration: PropTypes.number,
  description: PropTypes.string,
  id: PropTypes.number,
  checkFolders: PropTypes.bool,
  isActionBtn: PropTypes.bool,
};

TemplateCard.defaultProps = {
  cardImageUrl: '',
  rootClassName: '',
  showActions: true,
  templateQueryParam: '',
  baseUrl: '',
  renderAdditionalContent: '',
  renderActions: '',
  duration: null,
};

export default withStyles(styles, { name: 'ViewComponentsTemplateCard' })(
  TemplateCard,
);
