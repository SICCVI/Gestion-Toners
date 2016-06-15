import './ModalEditMarque.html';
import { Template } from 'meteor/templating';

Template.ModalEditMarque.onCreated(function(){
});

Template.ModalEditMarque.helpers({
});

Template.ModalEditMarque.events({
	'click .toggle-editing': function() {
		Meteor.call('toggleEditMarque', this._id, this.editMode);
	},
});
