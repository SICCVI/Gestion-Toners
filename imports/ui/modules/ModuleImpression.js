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
