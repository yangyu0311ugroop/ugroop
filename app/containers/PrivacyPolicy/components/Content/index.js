import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import Icon from 'viewComponents/Icon';
import { H1, P } from 'viewComponents/Typography';
import m from '../../messages';
import styles from './styles';

export class Content extends PureComponent {
  render = () => {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.iconDiv}>
            <Icon icon="ug-logo" size="extraLarge" />
          </div>
          <H1 weight="light" className={classes.h1}>
            <M {...m.title} />
          </H1>
          <P className={classes.subtitle} weight="bold">
            <M {...m.lastModified} />
          </P>
        </div>
        <P>
          <M {...m.firstParagraph} />
        </P>
        <P>
          <M {...m.secondParagraph} />
        </P>
        <P weight="bold" className={classes.paragraphTitle}>
          <M {...m.informationCollectionTitle} />
        </P>
        <P>
          <M {...m.informationCollection} />
        </P>
        <P weight="bold" className={classes.paragraphTitle}>
          <M {...m.logDataTitle} />
        </P>
        <P>
          <M {...m.logData} />
        </P>
        <P weight="bold" className={classes.paragraphTitle}>
          <M {...m.cookiesTitle} />
        </P>
        <P>
          <M {...m.cookiesFirstPart} />
        </P>
        <P>
          <M {...m.cookiesSecondPart} />
        </P>
        <P>
          <M {...m.cookiesThirdPart} />
        </P>
        <P>
          <M {...m.cookiesFourthPart} />
        </P>
        <P weight="bold" className={classes.paragraphTitle}>
          <M {...m.doNotTrackTitle} />
        </P>
        <P>
          <M {...m.doNotTrackFirstPart} />
        </P>
        <P weight="bold" className={classes.paragraphTitle}>
          <M {...m.communicationsTitle} />
        </P>
        <P>
          <M {...m.communications} />
        </P>
        <P weight="bold" className={classes.paragraphTitle}>
          <M {...m.complianceWithLawsTitle} />
        </P>
        <P>
          <M {...m.complianceWithLaws} />
        </P>
        <P weight="bold" className={classes.paragraphTitle}>
          <M {...m.businessTransactionTitle} />
        </P>
        <P>
          <M {...m.businessTransaction} />
        </P>
        <P weight="bold" className={classes.paragraphTitle}>
          <M {...m.securityTitle} />
        </P>
        <P>
          <M {...m.security} />
        </P>
        <P weight="bold" className={classes.paragraphTitle}>
          <M {...m.linksToOtherSitesTitle} />
        </P>
        <P>
          <M {...m.linksToOtherSitesFirstPart} />
        </P>
        <P>
          <M {...m.linksToOtherSitesSecondPart} />
        </P>
        <P weight="bold" className={classes.paragraphTitle}>
          <M {...m.changesToPolicyTitle} />
        </P>
        <P>
          <M {...m.changesToPolicy} />
        </P>
        <P weight="bold" className={classes.paragraphTitle}>
          <M {...m.contactUsTitle} />
        </P>
        <P>
          <M {...m.contactUs} />
        </P>
      </div>
    );
  };
}

Content.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

Content.defaultProps = {};

export default withStyles(styles, { name: 'Content' })(Content);
