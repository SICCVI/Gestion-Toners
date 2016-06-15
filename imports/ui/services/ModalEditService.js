import './ModalEditService.html';
import { Template } from 'meteor/templating';

Template.ModalEditService.onCreated(function(){
});

Template.ModalEditService.helpers({
});

Template.ModalEditService.events({
	'click .toggle-editing': function() {
		Meteor.call('toggleEditService', this._id, this.editMode);
	},
});
