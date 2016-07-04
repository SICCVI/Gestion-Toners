import './ElementService.html';
import { Template } from 'meteor/templating';
import './ModalEditService.js';

Template.ElementService.onCreated(function(){
});

Template.ElementService.helpers({
});

Template.ElementService.events({
	'click .toggle-editing': function() {
		Meteor.call('toggleEditService', this._id, this.editMode);
	},
	'click .supprimer': function() {
		Meteor.call('services.remove', this._id);
	},
	'submit .add-note'(event) {
        event.preventDefault();
        const target = event.target;
        const addNote = target.note.value;
        const serviceId = this._id;
        Meteor.call('services.note', serviceId, addNote);
    },
});
