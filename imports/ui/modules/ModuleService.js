import { Template } from 'meteor/templating';
import { Services } from '../../api/servicesCollection.js';

import './ModuleService.html';


Template.SelectionService.onCreated(function() {
  this.autorun(() => {
    this.subscribe('services');
  });
});

Template.SelectionService.helpers({
	services: ()=> {
		return Services.find({});
	},
	totalCount() {
  		return Services.find({ _id: {$ne: true }}).count();
  	},
    servicesIndex: function () {
	    return ModuleServicesIndex;   
	},
	resultsCount: function () {
      return ModuleServicesIndex.getComponentDict().get('count');
    },
});


Template.SelectionService.events({
    'click .table-donnees .row-donnees':function(evt){
        if (!$(evt.currentTarget).hasClass("highlight")) {
          $(evt.currentTarget).addClass('highlight').siblings().removeClass("highlight");
          $('#ChoixService').val(this.nom);
          $('#ChoixServiceId').val(this._id);
        }
        else {
          $(evt.currentTarget).removeClass('highlight');
          $('#ChoixService').val("");
          $('#ChoixServiceId').val("");
        }
    },
});