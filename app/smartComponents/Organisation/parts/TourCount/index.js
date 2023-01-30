import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import classnames from 'classnames';
import { DEFAULT, TITLE } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Tooltip from 'viewComponents/Tooltip';
import resaga from 'resaga';
import { P } from 'viewComponents/Typography';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import omit from 'lodash/omit';
import { CONFIG } from './config';
import styles from './styles';

export class TourCount extends PureComponent {
  getStrippedOwnProps = () => omit(this.props, ['variant']);

  renderWithLabel = () => {
    const { withLabel, childrenArray } = this.props;
    if (!withLabel) return childrenArray.length;

    if (childrenArray.length === 0) return 'No tours';

    return `${childrenArray.length} ${
      childrenArray.length === 1 ? 'tour' : 'tours'
    }`;
  };

  renderWithOrgName = () => {
    const { childrenArray, name, classes } = this.props;

    return (
      <GridContainer>
        <GridItem
          className={classnames(classes.nameGridItem, 'j-text-ellipsis')}
        >
          {name}
        </GridItem>
        {childrenArray.length !== 0 ? (
          <Tooltip
            title={`There ${childrenArray.length === 1 ? 'is' : 'are'} ${
              childrenArray.length
            } ${
              childrenArray.length === 1 ? 'tour' : 'tours'
            } in this organisation`}
          >
            <GridItem className={classes.countGridItem}>
              {childrenArray.length}
            </GridItem>
          </Tooltip>
        ) : null}
      </GridContainer>
    );
  };

  renderOrgCountOnly = () => {
    const { childrenArray } = this.props;
    return `${childrenArray.length}`;
  };

  renderWithOrgNameStringOnly = () => {
    const { childrenArray, name } = this.props;
    return `${name} - ${childrenArray.length}`;
  };

  renderTextOnly = () => (
    <P {...this.getStrippedOwnProps()}>{this.renderWithLabel()}</P>
  );

  renderSpanOnly = () => (
    <span {...this.getStrippedOwnProps()}>{this.renderWithLabel()}</span>
  );

  renderStringOnly = () => this.renderWithLabel();

  renderTitle = () => {
    const { classes } = this.props;
    return <span className={classes.title}>{this.renderWithLabel()}</span>;
  };

  renderProp = () => {
    const { children, childrenArray } = this.props;

    return children({ count: childrenArray.length });
  };

  renderDefault = () => this.props.childrenArray.length;

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [ORG_FIELD_VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.STRING_ONLY]: this.renderStringOnly,
      [VARIANTS.SPAN_ONLY]: this.renderSpanOnly,
      [VARIANTS.WITH_NAME]: this.renderWithOrgName,
      [VARIANTS.COUNT_ONLY]: this.renderOrgCountOnly,
      [VARIANTS.WITH_NAME_STRING_ONLY]: this.renderWithOrgNameStringOnly,
      [VARIANTS.RENDER_PROP]: this.renderProp,
      [TITLE]: this.renderTitle,
      [DEFAULT]: this.renderDefault,
    });
  };
}

TourCount.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // resaga
  childrenArray: PropTypes.array,
  name: PropTypes.string,

  // parent
  withLabel: PropTypes.bool,
  children: PropTypes.any,
  variant: PropTypes.string,
};

TourCount.defaultProps = {
  childrenArray: [],
  withLabel: false,
};

export default compose(
  withStyles(styles, { name: 'OrgTourCount' }),
  resaga(CONFIG),
)(TourCount);
