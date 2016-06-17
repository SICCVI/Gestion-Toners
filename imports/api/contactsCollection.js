import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

export const Contacts = new Mongo.Collection('contacts');

Contacts.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

ContactSchema = new SimpleSchema({
  nom: {
    type: String,
    label: "Nom",
  },
  prenom: {
    type: String,
    label: "Prénom",
  },
  telephone: {
    type: String,
    label: "Téléphone",
  },
  editMode: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
});

Contacts.attachSchema( ContactSchema );

Meteor.methods({
  'contacts.remove'(contactId) {
    check(contactId, String);
    Contacts.remove(contactId);
  },
  'contacts.insert'(nom, prenom, telephone) {
    check(nom, String);
    check(prenom, String);
    check(telephone, String);
    Contacts.insert({
      nom, prenom, telephone,
    });
  },
  'contacts.update'(contactId, updateNom, updatePrenom, updateTelephone) {
    check(contactId, String);
    check(updateNom, String);
    check(updatePrenom, String);
    check(updateTelephone, String);
    Contacts.update(contactId, {
    $set: {
      nom: updateNom,
      prenom: updatePrenom,
      telephone: updateTelephone,
    }});
  },
  'toggleEditContact'(contactId, currentState) {
    check(contactId, String);
    check(currentState, Boolean);
    Contacts.update(contactId, {
      $set: {
        editMode: !currentState
      }});
  },
});


ContactsIndex = new EasySearch.Index({
  collection: Contacts,
  fields: ['nom', 'prenom', 'telephone'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 25}
});

ModuleContactsIndex = new EasySearch.Index({
  collection: Contacts,
  fields: ['nom', 'prenom', 'telephone'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 5}
});