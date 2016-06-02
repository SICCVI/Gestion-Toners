import './ElementContact.html';
import { Template } from 'meteor/templating';
import './ModalEditContact.js';

Template.ElementContact.onCreated(function(){
});

Template.ElementContact.helpers({
});

Template.ElementContact.events({
	'click .toggle-editing': function() {
		Meteor.call('toggleEditContact', this._id, this.editMode);
	},
	'click .glyphicon-trash': function() {
		Meteor.call('contacts.remove', this._id);
	},
});
