import './ElementSite.html';
import { Template } from 'meteor/templating';
import './ModalEditSite.js';

Template.ElementSite.onCreated(function(){
});

Template.ElementSite.helpers({
});

Template.ElementSite.events({
	'click .toggle-editing': function() {
		Meteor.call('toggleEditSite', this._id, this.editMode);
	},
	'click .glyphicon-trash': function() {
		Meteor.call('sites.remove', this._id);
	},
});
