import './ModalEditFournisseur.html';
import { Template } from 'meteor/templating';

Template.ModalEditFournisseur.onCreated(function(){
});

Template.ModalEditFournisseur.helpers({
});

Template.ModalEditFournisseur.events({
	'click .toggle-editing': function() {
		Meteor.call('toggleEditFournisseur', this._id, this.editMode);
	},
});
