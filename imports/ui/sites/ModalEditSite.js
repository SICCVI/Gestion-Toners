import './ModalEditSite.html';
import { Template } from 'meteor/templating';

Template.ModalEditSite.onCreated(function(){
});

Template.ModalEditSite.helpers({
});

Template.ModalEditSite.events({
	'click .toggle-editing': function() {
		Meteor.call('toggleEditSite', this._id, this.editMode);
	},
});
