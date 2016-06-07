import './ElementImpression.html';
import { Template } from 'meteor/templating';
import './ModalEditImpression.js';
import './ModalAddToner.js';

import { Toners } from '../../api/tonersCollection.js';

Template.ElementImpression.onCreated(function () {
	this.autorun(() => {
    	this.subscribe('toners');
  	});
});

Template.ElementImpression.helpers({
	impressions: ()=> {
		return Impressions.find({}/*, {sort: { gabarit: 1 }}*/);  
	},
	getToner: function(id) {
        return Toners.findOne({_id: id});
    },
  	impressionsIndex: function () {
	    return ImpressionsIndex;   
	},
	resultsCount: function () {
      return ImpressionsIndex.getComponentDict().get('count');
    },
});

Template.ElementImpression.events({
	'click .toggle-editing': function () {
		Meteor.call('toggleEditImpression', this._id, this.editMode);
	},
	'click .glyphicon-trash': function () {
		Meteor.call('impressions.remove', this._id);
	},
	'click .remove-toner': function (event) {
		event.preventDefault();
		const target = event.target;
		const idImpression = target.getAttribute('data-id');
		//const idImpression2 = target.dataset.id;
		//console.log("Id impression Methode 2: ", target.dataset.id);
		Meteor.call('impressions.removetoner', idImpression, this.tonerid);
	},
});
