import './ElementImpression.html';
import { Template } from 'meteor/templating';
import './ModalEditImpression.js';

Template.ElementImpression.onCreated(function(){
});

Template.ElementImpression.helpers({
});

Template.ElementImpression.events({
	'click .toggle-editing': function() {
		Meteor.call('toggleEditImpression', this._id, this.editMode);
	},
	'click .glyphicon-trash': function() {
		Meteor.call('impressions.remove', this._id);
	},
});
