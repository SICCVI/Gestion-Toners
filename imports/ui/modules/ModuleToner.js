import { Template } from 'meteor/templating';
import { Toners } from '../../api/tonersCollection.js';

import './ModuleToner.html';

Template.SelectionToner.onCreated(function() {
  this.autorun(() => {
    this.subscribe('toners');
  });
});

Template.SelectionToner.helpers({
	toners: ()=> {
		return Toners.find({});
	},
	totalCount() {
  		return Toners.find({ _id: {$ne: true }}).count();
  	},
    tonersIndex: function () {
	    return ModuleTonersIndex;   
	},
	resultsCount: function () {
      return ModuleTonersIndex.getComponentDict().get('count');
    },
});


Template.SelectionToner.events({
    'click .table-donnees .row-donnees':function(evt){
        if (!$(evt.currentTarget).hasClass("highlight")) {
          $(evt.currentTarget).addClass('highlight').siblings().removeClass("highlight");
          $('#ChoixToner').val(this.libelle + "   //   " + this.constructeur + " " + this.referenceC + " ( " + this.couleur + " )");
          $('#ChoixTonerId').val(this._id);
        }
        else {
          $(evt.currentTarget).removeClass('highlight');
          $('#ChoixToner').val("");
          $('#ChoixTonerId').val("");
        }
    },
});
