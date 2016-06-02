import { Template } from 'meteor/templating';
import { Contacts } from '../../api/contactsCollection.js';

import './ListeContacts.html';
import './ModalNewContact.html';
import './ElementContact.js';
import './NewContact.js';
import './EditContact.js';

Template.ListeContacts.onCreated(function() {
  this.autorun(() => {
    this.subscribe('contacts');
  });
});

Template.ListeContacts.helpers({
	contacts: ()=> {
		return Contacts.find({});
	},
	totalCount() {
  		return Contacts.find({ _id: {$ne: true }}).count();
  },
});

Template.ListeContacts.events({

});
