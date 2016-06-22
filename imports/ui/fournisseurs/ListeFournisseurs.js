import { Template } from 'meteor/templating';
import { Fournisseurs } from '../../api/fournisseursCollection.js';

import './ListeFournisseurs.html';
import './ModalNewFournisseur.html';
import './ElementFournisseur.js';
import './NewFournisseur.js';
import './EditFournisseur.js';

Template.ListeFournisseurs.onCreated(function() {
  this.autorun(() => {
    this.subscribe('fournisseurs');
  });
});

Template.ListeFournisseurs.helpers({
	fournisseurs: ()=> {
		return Fournisseurs.find({});
	},
	totalCount() {
  		return Fournisseurs.find({ _id: {$ne: true }}).count();
  	},
    fournisseursIndex: function () {
	    return FournisseursIndex;   
	},
	resultsCount: function () {
      return FournisseursIndex.getComponentDict().get('count');
    },
});

Template.ListeFournisseurs.events({

});
