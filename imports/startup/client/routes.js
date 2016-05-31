import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/MainLayout.js';

import '../../ui/impressions/ListeImpressions.js';
/*import '../../ui/toners/ListeToners.js';*/

FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Home'})
	}
});

FlowRouter.route('/impression', {
	name: 'impression',
	action() {
		BlazeLayout.render('MainLayout', {main: 'ListeImpressions'});
	}
});

FlowRouter.route('/impression/:id', {
	name: 'impression',
	action() {
		BlazeLayout.render('MainLayout', {main: 'DetailImpression'});
	}
});

/*FlowRouter.route('/marque', {
	name: 'marque',
	action() {
		BlazeLayout.render('MainLayout', {main: 'ListeMarques'});
	}
});

FlowRouter.route('/marque/:id', {
	name: 'marque',
	action() {
		BlazeLayout.render('MainLayout', {main: 'DetailMarque'});
	}
});

FlowRouter.route('/toner', {
	name: 'toner',
	action() {
		BlazeLayout.render('MainLayout', {main: 'ListeToners'});
	}
});

FlowRouter.route('/toner/:id', {
	name: 'toner',
	action() {
		BlazeLayout.render('MainLayout', {main: 'DetailToner'});
	}
});*/