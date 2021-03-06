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
	'click .supprimer': function() {
		Meteor.call('sites.remove', this._id);
	},
	'submit .add-note'(event) {
        event.preventDefault();
        const target = event.target;
        const addNote = target.note.value;
        const siteId = this._id;
        Meteor.call('sites.note', siteId, addNote);
    },
});
