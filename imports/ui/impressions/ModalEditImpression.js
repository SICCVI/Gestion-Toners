import './ModalEditImpression.html';
import './EditImpression.js';
import { Template } from 'meteor/templating';

Template.ModalEditImpression.onCreated(function(){
});

Template.ModalEditImpression.helpers({
});

Template.ModalEditImpression.events({
	'click .toggle-editing': function() {
		Meteor.call('toggleEditImpression', this._id, this.editMode);
	},
});
