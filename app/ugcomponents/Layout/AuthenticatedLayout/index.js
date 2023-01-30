/**
 * Created by Yang on 17/1/17.
 */
import { withStyles } from '@material-ui/core';
import { URL_HELPERS } from 'appConstants';
import Container from 'components/Container';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import resaga from 'resaga';
import FooterLinks from 'ugcomponents/Footer/components/FooterLinks';
import Content from 'ugcomponents/Layout/AuthenticatedLayout/Content/index';
import Header from 'ugcomponents/Layout/AuthenticatedLayout/Header/index';
import {
  drawerKeepOpen as drawerKeepOpenSelector,
  chatDrawerKeepOpen,
} from 'ugcomponents/NaviBar/AdminNavBar/components/LeftMenu/config';
import UGSnackbar from 'ugcomponents/SnackBar';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Scroll from 'react-scroll/modules';
import Sticky from 'react-stickynode';
import { parseQueryParam } from '../../../utils/helpers/url';

const style = {
  root: {
    minHeight: '100vh',
    backgroundColor: '#f6f8fa',
  },
  chatRoot: {
    backgroundColor: '#f6f8fa',
  },
  adminBackground: {
    background: 'white',
    height: '100%',
    // not sure why we set it as 480 before, but this causes problem for mobile devices, i.e. iphone X w: 375, galaxy s8 w: 360
    minWidth: 360,
  },
  backgroundgrey: {
    backgroundColor: '#f6f8fa',
  },
  drawerKeepOpen: {
    marginLeft: 324,
  },
  chatDrawKeepOpen: {
    marginLeft: 324,
  },
};

export class AuthenticatedLayout extends PureComponent {
  state = {
    background: '', // only option currently is `grey`
  };

  setBackground = background => this.setState({ background });

  render = () => {
    const {
      children,
      classes,
      drawerKeepOpen,
      chatDrawKeepOpen,
      match,
      location,
      ...props
    } = this.props;

    const { search } = location || {};
    const parsedQuery = parseQueryParam(search);
    const isMessengerOpen = parsedQuery && parsedQuery.messenger === 'true';
    const { background } = this.state;
    const setBackgroundGray = !URL_HELPERS.isPersonalSettingPages(match)
      ? classes.adminBackground
      : classes.backgroundgrey;

    return (
      <div
        className={classnames(
          setBackgroundGray,
          classes[`background${background}`],
          LOGIC_HELPERS.ifElse(drawerKeepOpen, classes.drawerKeepOpen),
          LOGIC_HELPERS.ifElse(chatDrawKeepOpen, classes.chatDrawKeepOpen),
        )}
      >
        {drawerKeepOpen ? (
          <Header {...props} />
        ) : (
          <Scroll.Element name="scrollToTop">
            <Sticky id="appBar" innerZ={1099}>
              <div id="stickyAppBar">
                <Header {...props} />
              </div>
            </Sticky>
          </Scroll.Element>
        )}

        <Content>
          <UGSnackbar />

          <div
            className={!isMessengerOpen ? classes.root : classes.chatRoot}
            id="LayoutContent"
          >
            {LOGIC_HELPERS.ifFunction(
              children,
              [{ setBackground: this.setBackground }],
              children,
            )}
          </div>

          {!isMessengerOpen && (
            <Container>
              <FooterLinks />
            </Container>
          )}
        </Content>
      </div>
    );
  };
}

AuthenticatedLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  classes: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object,

  drawerKeepOpen: PropTypes.bool,
  chatDrawKeepOpen: PropTypes.bool,
};

AuthenticatedLayout.defaultProps = {
  classes: {},
  match: {},
};

export default resaga({
  value: {
    drawerKeepOpen: drawerKeepOpenSelector,
    chatDrawKeepOpen: chatDrawerKeepOpen,
  },
})(withStyles(style, { name: 'AuthenticatedLayout' })(AuthenticatedLayout));
