import './ModalEditToner.html';
import './EditToner.js';
import { Template } from 'meteor/templating';

Template.ModalEditToner.onCreated(function(){
});

Template.ModalEditToner.helpers({
});

Template.ModalEditToner.events({
	'click .toggle-editing': function() {
		Meteor.call('toggleEditToner', this._id, this.editMode);
	},
});