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
          <M {...m.intellectualPropertyTitle} />
        </P>
        <P>
          <M {...m.intellectualProperty} />
        </P>
        <P weight="bold" className={classes.paragraphTitle}>
          <M {...m.terminationTitle} />
        </P>
        <P>
          <M {...m.termination} />
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
          <M {...m.limitedLicenseTitle} />
        </P>
        <P>
          <M {...m.limitedLicense} />
        </P>
        <P weight="bold" className={classes.paragraphTitle}>
          <M {...m.limitationOfLiabilityTitle} />
        </P>
        <P>
          <M {...m.limitationOfLiability} />
        </P>
        <P weight="bold" className={classes.paragraphTitle}>
          <M {...m.warrantyDisclaimerTitle} />
        </P>
        <P>
          <M {...m.warrantyDisclaimerFirstPart} />
        </P>
        <P>
          <M {...m.warrantyDisclaimerSecondPart} />
        </P>
        <P weight="bold" className={classes.paragraphTitle}>
          <M {...m.governingLawTitle} />
        </P>
        <P>
          <M {...m.governingLaw} />
        </P>
        <P weight="bold" className={classes.paragraphTitle}>
          <M {...m.changesToAgreementTitle} />
        </P>
        <P>
          <M {...m.changesToThisAgreementFirstPart} />
        </P>
        <P>
          <M {...m.changesToThisAgreementSecondPart} />
        </P>
        <P weight="bold" className={classes.paragraphTitle}>
          <M {...m.contactUsTitle} />
        </P>
        <P className={classes.lastParagraph}>
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
