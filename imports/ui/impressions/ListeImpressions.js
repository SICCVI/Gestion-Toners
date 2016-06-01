import { Template } from 'meteor/templating';
import { Impressions } from '../../api/impressionsCollection.js';

import './ListeImpressions.html';
import './ElementImpression.js';
import './NewImpression.js';
import './EditImpression.js';

Template.ListeImpressions.onCreated(function() {
  this.autorun(() => {
    this.subscribe('impressions');
  });
});

Template.ListeImpressions.helpers({
	impressions: ()=> {
		return Impressions.find({});
	},
	totalCount() {
  		return Impressions.find({ _id: {$ne: true }}).count();
  },
});

Template.ListeImpressions.events({

});
