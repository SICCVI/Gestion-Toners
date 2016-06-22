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

Template.CreationSite.events({
    'submit .new-site'(event) {
        event.preventDefault();
        const target = event.target;
        const nom = target.nom.value;
        const adresse = target.adresse.value;
        const codepostal = target.codepostal.value;
        const ville = target.ville.value;
        const telephone = target.telephone.value;
        Meteor.call('sites.alt-insert', nom, adresse, codepostal, ville, telephone, function(error, result){
        $('#ChoixSiteId').val(result);
        });
        $('#ChoixSite').val(nom + "   //   " + codepostal + " " + ville + " ( " + telephone + " )");
    },
});