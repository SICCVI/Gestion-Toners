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
  'click .supprimer': function() {
    Meteor.call('historiques.remove', this._id);
  },
  'click .show-commandes': function(event, template) {
    template.showCommandes.set(!template.showCommandes.get());
  },
  'click .show-entrees': function(event, template) {
    template.showEntrees.set(!template.showEntrees.get());
  },
  'click .show-sorties': function(event, template) {
    template.showSorties.set(!template.showSorties.get());
  },
  'submit .add-note'(event) {
        event.preventDefault();
        const target = event.target;
        const addNote = target.note.value;
        const historiqueId = this._id;
        Meteor.call('historiques.note', historiqueId, addNote);
    },
});

Template.ListeHistoriques.onCreated(function(){
  this.showCommandes = new ReactiveVar(true);
  this.showEntrees = new ReactiveVar(true);
  this.showSorties = new ReactiveVar(true);
});

Template.ListeHistoriques.helpers({
    showCommandes: function() {
    return Template.instance().showCommandes.get();
  },
    showEntrees: function() {
    return Template.instance().showEntrees.get();
  },
    showSorties: function() {
    return Template.instance().showSorties.get();
  },
});