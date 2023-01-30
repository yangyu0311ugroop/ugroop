import React from 'react';
import PropTypes from 'prop-types';
import Footer from 'components/Footer';
import FooterLists from 'ugcomponents/Footer/FooterLists';
import FooterItems from 'ugcomponents/Footer/FooterLists/footerItem';
import Grid from '@material-ui/core/Grid';

export function UGFooter(props) {
  return (
    <Grid item className={props.rootClassName}>
      <Footer className={props.footerClassName}>
        <FooterLists
          className={props.footerListClassName}
          component={FooterItems}
          items={props.items}
        />
      </Footer>
    </Grid>
  );
}

UGFooter.propTypes = {
  items: PropTypes.array.isRequired,
  rootClassName: PropTypes.string,
  footerClassName: PropTypes.string,
  footerListClassName: PropTypes.string,
};

export default UGFooter;
