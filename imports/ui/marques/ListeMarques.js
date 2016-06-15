import { Template } from 'meteor/templating';
import { Marques } from '../../api/marquesCollection.js';

import './ListeMarques.html';
import './ModalNewMarque.html';
import './ElementMarque.js';
import './NewMarque.js';
import './EditMarque.js';

Template.ListeMarques.onCreated(function() {
  this.autorun(() => {
    this.subscribe('marques');
  });
});

Template.ListeMarques.helpers({
	marques: ()=> {
		return Marques.find({});
	},
	totalCount() {
  		return Marques.find({ _id: {$ne: true }}).count();
  	},
  marquesIndex: function () {
	    return MarquesIndex;   
	},
	resultsCount: function () {
      return MarquesIndex.getComponentDict().get('count');
    },
});

Template.ListeMarques.events({
});
