/*
 *
 * UGHomePageIndex
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import HomeLayout from 'ugcomponents/Layout/LandingLayout';
import GridItem from 'components/GridItem';
import TourganizerBlock from './components/TourganizerBlock';
import DoNotWorryBlock from './components/DoNotWorryBlock';
import PlansBlock from './components/PlansBlock';
import CompaniesBlock from './components/CompaniesBlock';

export function UGHomePageIndex(props) {
  return (
    <HomeLayout location={props.location}>
      <GridItem>
        <TourganizerBlock />
        <DoNotWorryBlock />
        <PlansBlock />
        <CompaniesBlock />
      </GridItem>
    </HomeLayout>
  );
}

UGHomePageIndex.propTypes = {
  location: PropTypes.object,
};
UGHomePageIndex.defaultProps = {};

export default UGHomePageIndex;
