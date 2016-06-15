import { Template } from 'meteor/templating';
import { Historiques } from '../../api/historiquesCollection.js';

import './ListeHistoriques.html';


Template.ListeHistoriques.onCreated(function() {
  this.autorun(() => {
    this.subscribe('historiques');
  });
});

Template.ListeHistoriques.helpers({
	historiques: ()=> {
		return Historiques.find({}, {sort: { date: 1 }});  
	},
	totalCount() {
  		return Historiques.find({ _id: {$ne: true }}).count();
  	},
  	historiquesIndex: function () {
	    return HistoriquesIndex;   
	},
	resultsCount: function () {
      return HistoriquesIndex.getComponentDict().get('count');
    },
});

Template.ListeHistoriques.events({

});