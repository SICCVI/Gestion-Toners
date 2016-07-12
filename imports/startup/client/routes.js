import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/MainLayout.js';

import '../../ui/impressions/ListeImpressions.js';
import '../../ui/toners/ListeToners.js';
import '../../ui/marques/ListeMarques.js';
import '../../ui/fournisseurs/ListeFournisseurs.js';

import '../../ui/contacts/ListeContacts.js';
import '../../ui/sites/ListeSites.js';
import '../../ui/services/ListeServices.js';

import '../../ui/stocks/ListeStocks.js';

import '../../ui/historiques/ListeHistoriques.js';

import '../../ui/modules/Modules.js';


FlowRouter.route('/', {
	name: 'home',
	triggersEnter: [trackRouteEntry],
	action() {
		BlazeLayout.render('MainLayout', {main: 'Home'})
	}
});

FlowRouter.route('/impressions', {
	name: 'impressions',
	triggersEnter: [trackRouteEntry],
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
	triggersEnter: [trackRouteEntry],
	action() {
		BlazeLayout.render('MainLayout', {main: 'ListeMarques'});
	}
});

FlowRouter.route('/toners', {
	name: 'toners',
	triggersEnter: [trackRouteEntry],
	action() {
		BlazeLayout.render('MainLayout', {main: 'ListeToners'});
	}
});

FlowRouter.route('/fournisseurs', {
	name: 'fournisseurs',
	triggersEnter: [trackRouteEntry],
	action() {
		BlazeLayout.render('MainLayout', {main: 'ListeFournisseurs'});
	}
});

FlowRouter.route('/contacts', {
	name: 'contacts',
	triggersEnter: [trackRouteEntry],
	action() {
		BlazeLayout.render('MainLayout', {main: 'ListeContacts'});
	}
});

FlowRouter.route('/sites', {
	name: 'sites',
	triggersEnter: [trackRouteEntry],
	action() {
		BlazeLayout.render('MainLayout', {main: 'ListeSites'});
	}
});

FlowRouter.route('/stocks', {
	name: 'stocks',
	triggersEnter: [trackRouteEntry],
	action() {
		BlazeLayout.render('MainLayout', {main: 'ListeStocks'});
	}
});

FlowRouter.route('/historiques', {
	name: 'historiques',
	triggersEnter: [trackRouteEntry],
	action() {
		BlazeLayout.render('MainLayout', {main: 'ListeHistoriques'});
	}
});

FlowRouter.route('/services', {
	name: 'services',
	triggersEnter: [trackRouteEntry],
	action() {
		BlazeLayout.render('MainLayout', {main: 'ListeServices'});
	}
});


FlowRouter.route('/modules', {
	name: 'modules',
	triggersEnter: [trackRouteEntry],
	action() {
		BlazeLayout.render('MainLayout', {main: 'Modules'});
	}
});

function trackRouteEntry() {
  // context is the output of `FlowRouter.current()`
    $('#Content').hide().fadeIn("slow");
}

function trackRouteClose(context) {
}