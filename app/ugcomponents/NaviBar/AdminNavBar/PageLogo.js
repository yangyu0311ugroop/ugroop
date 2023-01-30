/**
 * Created by Yang on 16/2/17.
 */
import Img from 'components/Img/index';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'shareAssets/NewLogoPlanePNG.png';
import FullLogo from 'shareAssets/NewLogoPNG.png';
import Text from 'shareAssets/uGroop2020-LogoText-Bk.png';
import UGLink from 'components/Link';
import { withStyles } from '@material-ui/core/styles';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import JButton from 'viewComponents/Button/variants/JButton';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';

const styleSheet = {
  pageLogo: {
    height: 32,
  },
  bigLogo: {
    height: 60,
  },
  textLogo: {
    height: 12,
  },
  xsLogo: {
    height: 16,
  },
  smLogo: {
    height: 24,
  },
  mdLogo: {
    height: 32,
  },
  lgLogo: {
    height: 48,
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
  customPadding: {
    padding: 0,
  },
};

export const PageLogo = ({
  classes,
  text,
  full,
  xs,
  sm,
  lg,
  link,
  md,
  customText,
}) => {
  let src = LOGIC_HELPERS.ifElse(full, FullLogo, Logo);

  if (text) {
    src = Text;
  }

  const img =
    customText !== '' ? (
      <JButton className={classes.customPadding}>
        <GridContainer
          direction="row"
          spacing={1}
          alignItems="center"
          justify="flex-start"
          wrap="nowrap"
          className={classes.noWrap}
        >
          <GridItem>
            {
              <Img
                src={src}
                className={classnames(
                  classes.pageLogo,
                  text && classes.textLogo,
                  full && classes.bigLogo,
                  xs && classes.xsLogo,
                  LOGIC_HELPERS.ifElse(sm, classes.smLogo),
                  LOGIC_HELPERS.ifElse(md, classes.mdLogo),
                  LOGIC_HELPERS.ifElse(lg, classes.lgLogo),
                )}
                alt="uGroop"
              />
            }
          </GridItem>
          <GridItem>{customText}</GridItem>
        </GridContainer>
      </JButton>
    ) : (
      <Img
        src={src}
        className={classnames(
          classes.pageLogo,
          text && classes.textLogo,
          full && classes.bigLogo,
          xs && classes.xsLogo,
          LOGIC_HELPERS.ifElse(sm, classes.smLogo),
          LOGIC_HELPERS.ifElse(md, classes.mdLogo),
          LOGIC_HELPERS.ifElse(lg, classes.lgLogo),
        )}
        alt="uGroop"
      />
    );

  if (!link) return img;

  return <UGLink to={link}>{img}</UGLink>;
};

PageLogo.propTypes = {
  text: PropTypes.bool,
  xs: PropTypes.bool,
  sm: PropTypes.bool,
  md: PropTypes.bool,
  lg: PropTypes.bool,
  full: PropTypes.bool,
  link: PropTypes.string,
  customText: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

PageLogo.defaultProps = {
  customText: '',
};

const StylePageLogo = withStyles(styleSheet, { name: 'PageLogo' })(PageLogo);
export default StylePageLogo;
