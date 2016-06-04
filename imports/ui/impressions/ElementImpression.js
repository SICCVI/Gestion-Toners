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
		// const target = event.target;
		// const id = target.tonerid.value;
		// const test = this.tonerid;
		// console.log('tonerid - ' + test);

		console.log("Id Toner :", this.tonerid);
		const idImpression = event.target.getAttribute('data-id');
		console.log("Id impression : ", idImpression);
		console.log("Id impression Methode 2: ",event.target.dataset.idtoner);

		// const aqw = $(test).data("id");
		// const zsx = $(test).attr("data-id");
		// console.log(aqw);
		// console.log(zsx);
		// Meteor.call('impressions.removetoner', id, this.tonerid);
	},
});
