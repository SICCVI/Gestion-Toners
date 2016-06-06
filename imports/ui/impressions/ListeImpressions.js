import { Template } from 'meteor/templating';
import { Impressions } from '../../api/impressionsCollection.js';

import './ListeImpressions.html';

import './ModalNewImpression.js';
import './ElementImpression.js';
import './NewImpression.js';

Template.ListeImpressions.onCreated(function() {
  this.autorun(() => {
    this.subscribe('impressions');
  });
});

Template.ListeImpressions.helpers({
	impressions: ()=> {
		return Impressions.find({}/*, {sort: { gabarit: 1 }}*/);  
	},
	totalCount() {
  		return Impressions.find({ _id: {$ne: true }}).count();
  	},
  	impressionsIndex: function () {
	    return ImpressionsIndex;   
	},
	resultsCount: function () {
      return ImpressionsIndex.getComponentDict().get('count');
    },
});

Template.ListeImpressions.events({

});
