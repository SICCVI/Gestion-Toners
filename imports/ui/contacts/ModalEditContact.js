import './ModalEditContact.html';
import { Template } from 'meteor/templating';

Template.ModalEditContact.onCreated(function(){
});

Template.ModalEditContact.helpers({
});

Template.ModalEditContact.events({
	'click .toggle-editing': function() {
		Meteor.call('toggleEditContact', this._id, this.editMode);
	},
});
