import './ElementImpression.html';
import { Template } from 'meteor/templating';
import './ModalEditImpression.js';
import './ModalAddToner.js';

Template.ElementImpression.onCreated(function () {
});

Template.ElementImpression.helpers({});

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
		console.log("Id Toner :", this.tonerid);
		console.log("Id Impression : ", idImpression);
		//console.log("Id impression Methode 2: ", target.dataset.id);
		Meteor.call('impressions.removetoner', idImpression, this.tonerid);
	},
});
