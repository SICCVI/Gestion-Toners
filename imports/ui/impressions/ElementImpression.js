import './ElementImpression.html';
import { Template } from 'meteor/templating';

Template.ElementImpression.onCreated(function(){
});

Template.ElementImpression.helpers({
});

Template.ElementImpression.events({
	'click .toggle-checked': function() {
		Meteor.call('toggleActive', this._id, this.active);
	},
	'click .glyphicon-trash': function() {
		Meteor.call('impressions.remove', this._id);
	},
});