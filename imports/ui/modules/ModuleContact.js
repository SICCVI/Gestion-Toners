import { Template } from 'meteor/templating';
import { Contacts } from '../../api/contactsCollection.js';

import './ModuleContact.html';
import './../../scripts/pagination.js';
Template.SelectionContact.onCreated(function() {
  this.autorun(() => {
    this.subscribe('contacts');
  });
});

Template.SelectionContact.helpers({
	contacts: ()=> {
		return Contacts.find({});
	},
	totalCount() {
  		return Contacts.find({ _id: {$ne: true }}).count();
  	},
    contactsIndex: function () {
	    return ModuleContactsIndex;   
	},
	resultsCount: function () {
      return ModuleContactsIndex.getComponentDict().get('count');
    },
});

const selected= new Array();

Template.SelectionContact.events({
    'click .table-donnees .row-donnees':function(evt){
        if (!$(evt.currentTarget).hasClass("highlight")) {
          $(evt.currentTarget).addClass('highlight').siblings().removeClass("highlight");
          $('#ChoixContact').val(this.nom + " " + this.prenom + " ( " + this.telephone + " )");
          $('#ChoixContactId').val(this._id);
        }
        else {
          $(evt.currentTarget).removeClass('highlight');
          $('#ChoixContact').val("");
          $('#ChoixContactId').val("");
        }
    },
    'click .envoi-selection1':function(){
      console.log('insertion1');
      Meteor.call('items.insert', selected);
    },
    'click .envoi-selection2':function(){
      console.log('insertion2');
      //selected.forEach (function(item) {
      //    Meteor.call('items.insert', item);
      //});
      let index;
      for (index = 0; index < selected.length; ++index) {
          Meteor.call('items.insert', selected[index]);
      }
    },
    'click .check-selected':function(){
      console.log('********************************');
      console.log(selected);
      console.log('********************************');
    },
        'click .test':function(){
      console.log('********************************');
      let index;
      for (index = 0; index < selected.length; ++index) {
          console.log(index + ' selection > ' + selected[index]._id);
      }
      console.log('********************************');
    },
    'click .envoi-selection3':function(){
      console.log('tous insertionID');
      Meteor.call('items.insert', selected._id);
    },
    'click .envoi-selection4':function(){
      console.log('un par insertionID');
      //selected.forEach (function(item) {
      //    Meteor.call('items.insert', item);
      //});
      let index;
      for (index = 0; index < selected.length; ++index) {
          Meteor.call('items.insert', selected[index]._id);
      }
    },
});
