import { Template } from 'meteor/templating';
import { Historiques } from '../../api/historiquesCollection.js';
import { Toners } from '../../api/tonersCollection.js';
import { Sites } from '../../api/sitesCollection.js';
import { Services } from '../../api/servicesCollection.js';
import './ListeHistoriques.html';


Template.ListeHistoriques.onCreated(function() {
  this.autorun(() => {
    this.subscribe('historiques');
  });
  this.autorun(() => {
    this.subscribe('toners');
  });
  this.autorun(() => {
    this.subscribe('sites');
  });
  this.autorun(() => {
    this.subscribe('services');
  });
  this.filtreToggle = new ReactiveVar(false);
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
    toners: ()=> {
    return Toners.find({}, {sort: { constructeur: 1 }});  
  },
    sites: ()=> {
    return Sites.find({}, {sort: { nom: 1 }});  
  },
  services: ()=> {
    return Services.find({}, {sort: { nom: 1 }});  
  },
  filtreToggle: function() {
    return Template.instance().filtreToggle.get();
  },
});

Template.ListeHistoriques.events({
  'click .supprimer': function() {
    Meteor.call('historiques.remove', this._id);
  },
  'submit .add-note'(event) {
        event.preventDefault();
        const target = event.target;
        const addNote = target.note.value;
        const historiqueId = this.__originalId;
        Meteor.call('historiques.note', historiqueId, addNote);
    },
    'change .category-filter': function (e) {
      HistoriquesIndex.getComponentMethods()
        .addProps('categoryFilter', $(e.target).val())
      ;
    },
    'change .site-filter': function (e) {
      HistoriquesIndex.getComponentMethods()
        .addProps('siteFilter', $(e.target).val())
      ;
    },
    'change .service-filter': function (e) {
      HistoriquesIndex.getComponentMethods()
        .addProps('serviceFilter', $(e.target).val())
      ;
    },
    'change .toner-filter': function (e) {
      HistoriquesIndex.getComponentMethods()
        .addProps('tonerFilter', $(e.target).val())
      ;
    },
    'click .filtre-toggle': function(event, template) {
    template.filtreToggle.set(!template.filtreToggle.get());
  },
});

Template.ListeHistoriques.onCreated(function(){
});

Template.ListeHistoriques.helpers({
});