import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Img from 'components/Img/index';
import { Hidden } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { scroller } from 'react-scroll';
import { compose } from 'redux';
import Logo from 'shareAssets/logo-solo-cool.png';
import { navbarScroll, scrollOptions } from 'utils/constant';
import TemplateActionButtons from '../../../../../TemplateHeader/components/TemplateActionButtons';
import styles from './styles';

export class StickyToolbar extends PureComponent {
  onScrollClick = () => {
    scroller.scrollTo(navbarScroll, scrollOptions);
  };

  render = () => {
    const { id, classes, tourTitle } = this.props;

    const buttons = <TemplateActionButtons templateId={id} onStiky />;

    const title = (
      <GridContainer
        onClick={this.onScrollClick}
        className={classes.titleContainer}
        spacing={2}
        alignItems="center"
      >
        <GridItem>
          <Img src={Logo} className={classes.logo} alt="uGroop logo" />
        </GridItem>
        <GridItem>
          <Hidden mdUp>
            <div className={classes.smallHeader}>{tourTitle}</div>
          </Hidden>
          <Hidden smDown>
            <div className={classes.tourTitle}>{tourTitle}</div>
          </Hidden>
        </GridItem>
      </GridContainer>
    );

    const buttonsSection = (
      <GridItem>
        <GridContainer alignItems="center">
          <GridItem className={classes.grow}>{title}</GridItem>
          <GridItem>{buttons}</GridItem>
        </GridContainer>
      </GridItem>
    );
    return <div className={classes.root}>{buttonsSection}</div>;
  };
}

StickyToolbar.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  tourTitle: PropTypes.string,
  // resaga
  // layout: PropTypes.string,
};

StickyToolbar.defaultProps = {
  tourTitle: '',
  // layout: DEFAULT_VIEW_TOUR_PAGE,
};

export default compose(withStyles(styles))(StickyToolbar);
