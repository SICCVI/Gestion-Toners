import './ElementFournisseur.html';
import { Template } from 'meteor/templating';
import './ModalEditFournisseur.js';

Template.ElementFournisseur.onCreated(function(){
});

Template.ElementFournisseur.helpers({
});

Template.ElementFournisseur.events({
	'click .toggle-editing': function() {
		Meteor.call('toggleEditFournisseur', this._id, this.editMode);
	},
	'click .supprimer': function() {
		Meteor.call('fournisseurs.remove', this._id);
	},
});
