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
	'click .supprimer': function() {
		Meteor.call('contacts.remove', this._id);
	},
	'submit .add-note'(event) {
        event.preventDefault();
        const target = event.target;
        const addNote = target.note.value;
        const contactId = this._id;
        Meteor.call('contacts.note', contactId, addNote);
    },
});
