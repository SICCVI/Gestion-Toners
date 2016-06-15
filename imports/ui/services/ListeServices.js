import { Template } from 'meteor/templating';
import { Services } from '../../api/servicesCollection.js';

import './ListeServices.html';
import './ModalNewService.html';
import './ElementService.js';
import './NewService.js';
import './EditService.js';

Template.ListeServices.onCreated(function() {
  this.autorun(() => {
    this.subscribe('services');
  });
});

Template.ListeServices.helpers({
	services: ()=> {
		return Services.find({});
	},
	totalCount() {
  		return Services.find({ _id: {$ne: true }}).count();
  	},
  servicesIndex: function () {
	    return ServicesIndex;   
	},
	resultsCount: function () {
      return ServicesIndex.getComponentDict().get('count');
    },
});

Template.ListeServices.events({

});
