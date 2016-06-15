import './ElementMarque.html';
import { Template } from 'meteor/templating';
import './ModalEditMarque.js';

Template.ElementMarque.onCreated(function(){
});

Template.ElementMarque.helpers({
});

Template.ElementMarque.events({
	'click .toggle-editing': function() {
		Meteor.call('toggleEditMarque', this._id, this.editMode);
	},
	'click .supprimer': function() {
		Meteor.call('marques.remove', this._id);
	},
});
