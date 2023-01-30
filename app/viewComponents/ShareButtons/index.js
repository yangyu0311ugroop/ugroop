import React from 'react';
import { FACEBOOK, TWITTER, MAIL, WHATSAPP } from 'appConstants';
import ShareButton from './components/ShareButton';

export const Facebook = props => <ShareButton type={FACEBOOK} {...props} />;
export const Twitter = props => <ShareButton type={TWITTER} {...props} />;
export const Mail = props => <ShareButton type={MAIL} {...props} />;
export const WhatsApp = props => <ShareButton type={WHATSAPP} {...props} />;
