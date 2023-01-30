import { withStyles } from '@material-ui/core/styles';
import { PRODUCTION } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import FooterBottom from 'ugcomponents/Footer';
import { AVATAR_CONFIG } from './config';
import FooterTop from './FooterTop/index';
import stylesheet from './style';

export class PublicFooter extends PureComponent {
  render() {
    const { classes } = this.props;

    let version = `uGroop@${process.env.APP_VERSION}.${process.env.BUILD_NUM}`;
    let diff = '';

    if (process.env.CI && process.env.BRANCH !== PRODUCTION) {
      const stableBranch = process.env.STABLE_BRANCH || 'stage';
      const branch = process.env.BRANCH === stableBranch ? 'Stable' : 'Latest';
      diff = (
        <a href={process.env.COMPARE_URL} target="_blank">
          GitHub Commits
        </a>
      );

      version = (
        <span>
          Version {process.env.APP_VERSION} -{' '}
          <a href={process.env.BUILD_URL} target="_blank">
            Build {process.env.BUILD_NUM} ({branch})
          </a>
        </span>
      );
    }

    return (
      <div className={classes.root}>
        <div className={classes.footerContent}>
          <GridContainer spacing={0} className={classes.container}>
            <GridItem>
              <FooterBottom
                footerClassName={classes.footerClass}
                rootClassName={classes.footerBottom}
                items={[version, diff]}
              />
            </GridItem>
            <GridItem className={classes.grow}>
              <FooterTop />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

PublicFooter.propTypes = {
  // hoc
  classes: PropTypes.object,
  // parent props
  // eslint-disable-next-line react/no-unused-prop-types
  templateId: PropTypes.number,
  // resaga props
};
PublicFooter.defaultProps = {};

export default compose(
  withStyles(stylesheet, { name: 'PublicFooter' }),
  resaga(AVATAR_CONFIG),
)(PublicFooter);
