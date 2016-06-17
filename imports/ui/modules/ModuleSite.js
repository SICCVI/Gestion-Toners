import { Template } from 'meteor/templating';
import { Sites } from '../../api/sitesCollection.js';

import './ModuleSite.html';

Template.SelectionSite.onCreated(function() {
  this.autorun(() => {
    this.subscribe('sites');
  });
});

Template.SelectionSite.helpers({
	sites: ()=> {
		return Sites.find({});
	},
	totalCount() {
  		return Sites.find({ _id: {$ne: true }}).count();
  	},
    sitesIndex: function () {
	    return ModuleSitesIndex;   
	},
	resultsCount: function () {
      return ModuleSitesIndex.getComponentDict().get('count');
    },
});


Template.SelectionSite.events({
    'click .table-donnees .row-donnees':function(evt){
        if (!$(evt.currentTarget).hasClass("highlight")) {
          $(evt.currentTarget).addClass('highlight').siblings().removeClass("highlight");
          $('#ChoixSite').val(this.nom + "   //   " + this.codepostal + " " + this.ville + " ( " + this.telephone + " )");
          $('#ChoixSiteId').val(this._id);
        }
        else {
          $(evt.currentTarget).removeClass('highlight');
          $('#ChoixSite').val("");
          $('#ChoixSiteId').val("");
        }
    },
});
