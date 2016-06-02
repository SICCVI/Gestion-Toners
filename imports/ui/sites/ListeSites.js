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
});

Template.ListeSites.events({

});
