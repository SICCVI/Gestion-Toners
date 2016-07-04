import './ElementToner.html';
import { Template } from 'meteor/templating';
import './ModalEditToner.js';
import { Fournisseurs } from '../../api/fournisseursCollection.js';

Template.ElementToner.onCreated(function () {
	this.autorun(() => {
    	this.subscribe('toners');
  	});
  	this.autorun(() => {
    	this.subscribe('fournisseurs');
  	});
});

Template.ElementToner.helpers({
	toners: ()=> {
		return Toners.find({});  
	},
	getFournisseur: function(id) {
        return Fournisseurs.findOne({_id: id});
    },
  	tonersIndex: function () {
	    return TonersIndex;   
	},
	resultsCount: function () {
      return TonersIndex.getComponentDict().get('count');
    },
});

Template.ElementToner.events({
	'click .toggle-editing': function () {
		Meteor.call('toggleEditToner', this._id, this.editMode);
	},
	'click .supprimer': function () {
		Meteor.call('toners.remove', this._id);
	},
	'click .remove-fournisseur': function (event) {
		event.preventDefault();
		const target = event.target;
		const idToner = target.getAttribute('data-id');
		console.log('this : '+this);
		console.log('idToner : '+idToner);
		//const idToner2 = target.dataset.id;
		//console.log("Id toner Methode 2: ", target.dataset.id);
		Meteor.call('toners.remove-fournisseur', idToner, this.fournisseurId, this.referenceF);
	},
	'submit .add-note'(event) {
        event.preventDefault();
        const target = event.target;
        const addNote = target.note.value;
        const tonerId = this._id;
        Meteor.call('toners.note', tonerId, addNote);
    },
});
