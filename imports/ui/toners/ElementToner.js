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
		return Toners.find({}/*, {sort: { gabarit: 1 }}*/);  
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
});
