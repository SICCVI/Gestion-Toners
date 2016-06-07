import { Template } from 'meteor/templating';
import { Toners } from '../../api/tonersCollection.js';

import './ListeToners.html';


Template.ListeToners.onCreated(function() {
  this.autorun(() => {
    this.subscribe('toners');
  });
});

Template.ListeToners.helpers({
	toners: ()=> {
		return Toners.find({}, {sort: { libelle: 1 }});  
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
