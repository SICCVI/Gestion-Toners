import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/MainLayout.js';

import '../../ui/impressions/ListeImpressions.js';
import '../../ui/toners/ListeToners.js';
import '../../ui/marques/ListeMarques.js';

import '../../ui/contacts/ListeContacts.js';
import '../../ui/sites/ListeSites.js';
import '../../ui/services/ListeServices.js';

import '../../ui/stocks/ListeStocks.js';
import '../../ui/historiques/ListeHistoriques.js';


FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Home'})
	}
});

FlowRouter.route('/impressions', {
	name: 'impressions',
	action() {
		BlazeLayout.render('MainLayout', {main: 'ListeImpressions'});
	}
});

/*FlowRouter.route('/impression/:id', {
	name: 'impression',
	action() {
		BlazeLayout.render('MainLayout', {main: 'DetailImpression'});
	}
});*/

FlowRouter.route('/marques', {
	name: 'marques',
	action() {
		BlazeLayout.render('MainLayout', {main: 'ListeMarques'});
	}
});

FlowRouter.route('/toners', {
	name: 'toners',
	action() {
		BlazeLayout.render('MainLayout', {main: 'ListeToners'});
	}
});

FlowRouter.route('/contacts', {
	name: 'contacts',
	action() {
		BlazeLayout.render('MainLayout', {main: 'ListeContacts'});
	}
});

FlowRouter.route('/sites', {
	name: 'sites',
	action() {
		BlazeLayout.render('MainLayout', {main: 'ListeSites'});
	}
});

FlowRouter.route('/stocks', {
	name: 'stocks',
	action() {
		BlazeLayout.render('MainLayout', {main: 'ListeStocks'});
	}
});

FlowRouter.route('/historiques', {
	name: 'historiques',
	action() {
		BlazeLayout.render('MainLayout', {main: 'ListeHistoriques'});
	}
});

FlowRouter.route('/services', {
	name: 'services',
	action() {
		BlazeLayout.render('MainLayout', {main: 'ListeServices'});
	}
});