import { withStyles } from '@material-ui/core/styles';
import Container from 'components/Container';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Header from 'containers/Templates/TemplateManagement/components/TemplateContent/components/Header';
import TemplateDetailReadMode from 'containers/Templates/TemplateManagement/components/TemplateHeader/components/TemplateDetails/templateDetailReadMode';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import Scroll from 'react-scroll';
import { compose } from 'redux';
import resaga from 'resaga';
import { parseQueryParam } from 'utils/helpers/url';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './defines/config';
import styles from './styles';
import { ability } from '../../../../../apis/components/Ability/ability';
import { TAB_OTHER } from '../../../../../utils/modelConstants';

export class TemplateHeader extends PureComponent {
  componentDidMount = () => {
    const { layout, location } = this.props;
    const parsedSearch = parseQueryParam(location.search);

    if (layout !== parsedSearch.dayView) {
      this.props.resaga.setValue({
        layout: parsedSearch.dayView,
      });
    }
  };

  canExecuteTab = () => ability.can('execute', TAB_OTHER);

  tabId = () => {
    const {
      location,
      visibleChildren,
      hiddenIds,
      privateIds,
      peopleTabId,
    } = this.props;

    const { search } = location;
    const parsedQuery = parseQueryParam(search);

    let tabId;
    let activeTab;

    if (parsedQuery.tabId || parsedQuery.participant) {
      // tabId = parseInt(parsedQuery.tabId, 10);
      if (!parsedQuery.tabId && parsedQuery.participant && !!peopleTabId) {
        tabId = peopleTabId;
      } else {
        tabId = parseInt(parsedQuery.tabId, 10);
      }
      const ids = [
        ...visibleChildren,
        ...hiddenIds,
        ...LOGIC_HELPERS.ifElse(this.canExecuteTab(), privateIds, []),
      ];
      if (!ids.includes(tabId)) {
        if (ids.length > 0) {
          // go to the first available tab if query string doesnt exists
          tabId = ids[0];
          activeTab = tabId;
        } else {
          // Otherwise show empty
          tabId = 0;
        }
      }
    } else {
      activeTab = parseInt(parsedQuery.tab || 0, 10);
      tabId = visibleChildren[activeTab];
    }
    return { activeTab, tabId };
  };

  render = () => {
    const { id, classes, publicView, isMessengerOpen, printView } = this.props;

    const { tabId } = this.tabId();

    return (
      <div>
        <Scroll.Element name={`Template:${id}`}>
          <div className={!printView && classes.tabHeader}>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <Container padding={false}>
                  <GridContainer direction="column" spacing={0}>
                    {isMessengerOpen ? null : (
                      <GridItem>
                        <TemplateDetailReadMode
                          templateId={id}
                          printView={printView}
                          publicView={publicView}
                          canUpdate={this.canExecuteTab()}
                        />
                      </GridItem>
                    )}
                  </GridContainer>
                </Container>
              </GridItem>
              {!printView && (
                <GridItem xs>
                  <Header id={id} tabId={tabId} isPublic={publicView} />
                </GridItem>
              )}
            </GridContainer>
          </div>
        </Scroll.Element>
      </div>
    );
  };
}

TemplateHeader.propTypes = {
  // from HoC
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,

  // from parent
  id: PropTypes.number.isRequired,
  publicView: PropTypes.bool,
  printView: PropTypes.bool,
  isMessengerOpen: PropTypes.bool,

  // from resaga value
  layout: PropTypes.string,
  visibleChildren: PropTypes.array,
  hiddenIds: PropTypes.array,
  privateIds: PropTypes.array,
  peopleTabId: PropTypes.number,
};

TemplateHeader.defaultProps = {
  publicView: false,
  printView: false,
  isMessengerOpen: false,
  visibleChildren: [],
  hiddenIds: [],
  privateIds: [],
};

export default compose(
  withRouter,
  resaga(CONFIG),
  withStyles(styles, { name: 'Header' }),
)(TemplateHeader);
