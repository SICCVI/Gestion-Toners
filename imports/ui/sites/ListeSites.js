import { Template } from 'meteor/templating';
import { Sites } from '../../api/sitesCollection.js';

import './ListeSites.html';
import './ModalNewSite.html';
import './ElementSite.js';
import './NewSite.js';
import './EditSite.js';

Template.ListeSites.onCreated(function() {
  this.autorun(() => {
    this.subscribe('sites');
  });
});

Template.ListeSites.helpers({
	sites: ()=> {
		return Sites.find({});
	},
	totalCount() {
  		return Sites.find({ _id: {$ne: true }}).count();
  	},
    sitesIndex: function () {
	    return SitesIndex;   
	},
	resultsCount: function () {
      return SitesIndex.getComponentDict().get('count');
    },
});

Template.ListeSites.events({

});
