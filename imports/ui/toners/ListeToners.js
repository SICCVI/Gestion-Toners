import { Template } from 'meteor/templating';
import { Toners } from '../../api/tonersCollection.js';

import './ListeToners.html';

import './ModalNewToner.js';
import './ElementToner.js';
import './NewToner.js';
import './ModalAddFournisseur.js';

Template.ListeToners.onCreated(function() {
  this.autorun(() => {
    this.subscribe('toners');
  });
});

Template.ListeToners.helpers({
	toners: ()=> {
		return Toners.find({});  
	},
	totalCount() {
  		return Toners.find({ _id: {$ne: true }}).count();
  	},
  	tonersIndex: function () {
	    return TonersIndex;   
	},
	resultsCount: function () {
      return TonersIndex.getComponentDict().get('count');
    },
});

Template.ListeToners.events({

});
