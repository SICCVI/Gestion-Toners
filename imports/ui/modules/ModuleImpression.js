import { Template } from 'meteor/templating';
import { Impressions } from '../../api/impressionsCollection.js';

import './ModuleImpression.html';

Template.SelectionImpression.onCreated(function() {
  this.autorun(() => {
    this.subscribe('impressions');
  });
});

Template.SelectionImpression.helpers({
	impressions: ()=> {
		return Impressions.find({});
	},
	totalCount() {
  		return Impressions.find({ _id: {$ne: true }}).count();
  	},
    impressionsIndex: function () {
	    return ModuleImpressionsIndex;   
	},
	resultsCount: function () {
      return ModuleImpressionsIndex.getComponentDict().get('count');
    },
});


Template.SelectionImpression.events({
    'click .table-donnees .row-donnees':function(evt){
        if (!$(evt.currentTarget).hasClass("highlight")) {
          $(evt.currentTarget).addClass('highlight').siblings().removeClass("highlight");
          $('#ChoixImpression').val(this.gabarit + "   //   " + this.marque + " " + this.modele);
          $('#ChoixImpressionId').val(this._id);
        }
        else {
          $(evt.currentTarget).removeClass('highlight');
          $('#ChoixImpression').val("");
          $('#ChoixImpressionId').val("");
        }
    },
});

import { Marques } from '../../api/marquesCollection.js';
import { reporterSelect } from '../../scripts/myFunctions.js';

Template.CreationImpression.events({
    'submit .new-impression'(event) {
        event.preventDefault();
        const target = event.target;
        const gabarit = target.gabarit.value;
        const marque = target.marque.value;
        const uppermarque = marque.toUpperCase();
        const modele = target.modele.value;
        const nombretoner = Number(target.nombretoner.value);
        Meteor.call('impressions.alt-insert', gabarit, uppermarque, modele, nombretoner, function(error, result){
        $('#ChoixImpressionId').val(result);
        });
        $('#ChoixImpression').val("[ " + gabarit + " ] " + marque + " " + modele);
        const verification = Marques.find({nom: uppermarque}, {limit: 1}).count()>0;
        if (verification === true) {
            throw new Meteor.Error('Cette marque existe déjà dans la collection et ne sera donc pas insérée.');
        }
        else {
            Meteor.call('marques.add', uppermarque);
        }
    },
});

Template.CreationImpression.onCreated(function() {
  this.autorun(() => {
    this.subscribe('marques');
  });
});

Template.CreationImpression.helpers({
    marques: ()=> {
        return Marques.find({}, {sort: { nom: 1 }}); 
    },
});