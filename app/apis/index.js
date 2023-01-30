import React, { Component, Fragment } from 'react';
import FileContainer from './components/FileContainer';
import Folder from './components/Folder';
import Geocodes from './components/Geocodes';
import Invitation from './components/Invitation';
import Node from './components/Node';
import NodeShare from './components/NodeShare';
import Organisation from './components/Organisation';
import OrgInvitation from './components/OrgInvitation';
import PersonDetail from './components/PersonDetail';
import Pub from './components/Pub';
import Template from './components/Template';
import TemplateTab from './components/TemplateTab';
import User from './components/User';
import Products from './components/Products';
import Plans from './components/Plans';
import Subscription from './components/Subscription';
import Customer from './components/Customer';
import SubscriptionSchedule from './components/SubscriptionSchedule';
import Cards from './components/Cards';
import PaymentMethod from './components/PaymentMethod';
import Invoice from './components/Invoice';
import ChargesAPI from './components/Charges';
import CouponAPI from './components/Coupon';
import EventsApi from './components/Events';
import MarketApi from './components/Market';
export Ability from './components/Ability';

export class API extends Component {
  shouldComponentUpdate = () => false;

  render = () => (
    <Fragment>
      <FileContainer />
      <Node />
      <Folder />
      <Invitation />
      <Template />
      <User />
      <Organisation />
      <NodeShare />
      <PersonDetail />
      <Pub />
      <TemplateTab />
      <OrgInvitation />
      <Geocodes />
      <Products />
      <Plans />
      <Subscription />
      <SubscriptionSchedule />
      <Customer />
      <Cards />
      <PaymentMethod />
      <Invoice />
      <ChargesAPI />
      <CouponAPI />
      <EventsApi />
      <MarketApi />
    </Fragment>
  );
}

API.propTypes = {};
API.defaultProps = {};

export default API;
