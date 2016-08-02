//IMPORT
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

//EXPORT
export const ContactsCollection = new Mongo.Collection('contacts');

//PERMISSIONS
ContactsCollection.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

//SCHEMA
ContactSchema = new SimpleSchema({
  contact_nom: {
    type: String,
    label: "Nom",
    optional: true,
  },
  contact_prenom: {
    type: String,
    label: "Prénom",
  },
  contact_telephone: {
    type: String,
    label: "Téléphone",
    optional: true,
  },
  contact_mobile: {
    type: String,
    label: "Mobile",
    optional: true,
  },
  contact_note : {
    type: String,
    label: "Note",
    optional: true,
  },
  contact_editMode: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
  contact_createdAt: {
    type: Date,
    label: "Créé le",
    autoValue: function() {
      return new Date()
    },
    autoform: {
      type: "hidden",
    }
  },
  contact_modifiedAt: {
    type: Date,
    label: "Dernière modification le",
    autoValue: function() {
      return new Date()
    },
    autoform: {
      type: "hidden",
    }
  },
});
ContactsCollection.attachSchema( ContactSchema );

//INDEX EASY SEARCH
//INDEX POUR LA BIBLIOTHEQUE DE DONNEES
ContactsIndex = new EasySearch.Index({
  collection: ContactsCollection,
  fields: ['contact_nom', 'contact_prenom', 'contact_telephone', 'contact_mobile', 'contact_note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 7}
});
//INDEX POUR LE MODULE D'ASSOCIATION
ModuleContactsIndex = new EasySearch.Index({
  collection: ContactsCollection,
  fields: ['contact_nom', 'contact_prenom', 'contact_telephone', 'contact_mobile', 'contact_note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 5}
});

//METHODES
Meteor.methods({
  //SUPPRESSION
  'contacts.remove'(contactId) {
    check(contactId, String);
    ContactsCollection.remove(contactId);
  },
  //INSERTION
  'contacts.insert'(nom, prenom, telephone, mobile) {
    check(nom, String);
    check(prenom, String);
    check(telephone, String);
    check(mobile, String);
    const newID = ContactsCollection.insert({
      nom, prenom, telephone, mobile,
    });
    return newID;
  },
  //UPDATE
  'contacts.update'(contactId, updateNom, updatePrenom, updateTelephone, updateMobile) {
    check(contactId, String);
    check(updateNom, String);
    check(updatePrenom, String);
    check(updateTelephone, String);
    check(updateMobile, String);
    const updateDate = new Date();
    ContactsCollection.update(contactId, {
      $set: {
        contact_nom: updateNom,
        contact_prenom: updatePrenom,
        contact_telephone: updateTelephone,
        contact_mobile: updateMobile,
        contact_modifiedAt: updateDate,
      }
    });
  },
  //AJOUT DE NOTE
  'contacts.note'(contactId, updateNote) {
    check(contactId, String);
    check(updateNote, String);
    ContactsCollection.update(contactId, {
      $set: {
        contact_note: updateNote,
      }
    });
  },
  //MODE EDITION
  'contacts.toggle_editMode'(contactId, currentState) {
    check(contactId, String);
    check(currentState, Boolean);
    ContactsCollection.update(contactId, {
      $set: {
        contact_editMode: !currentState
      }
    });
  }
});
