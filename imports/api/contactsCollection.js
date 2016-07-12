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
  mobile: {
    type: String,
    label: "Mobile",
  },
  note : {
    type: String,
    label: "Note",
    optional: true,
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
  'contacts.insert'(nom, prenom, telephone, mobile) {
    check(nom, String);
    check(prenom, String);
    check(telephone, String);
    check(mobile, String);
    Contacts.insert({
      nom, prenom, telephone, mobile,
    });
  },
  'contacts.alt-insert'(nom, prenom, telephone, mobile) {
    check(nom, String);
    check(prenom, String);
    check(telephone, String);
    check(mobile, String);
    const newElement = Contacts.insert({
      nom, prenom, telephone, mobile,
    });
    return newElement;
  },
  'contacts.update'(contactId, updateNom, updatePrenom, updateTelephone, updateMobile) {
    check(contactId, String);
    check(updateNom, String);
    check(updatePrenom, String);
    check(updateTelephone, String);
    check(updateMobile, String);
    Contacts.update(contactId, {
    $set: {
      nom: updateNom,
      prenom: updatePrenom,
      telephone: updateTelephone,
      mobile: updateMobile,
    }});
  },
    'contacts.note'(contactId, updateNote) {
    check(contactId, String);
    check(updateNote, String);
    Contacts.update(contactId, {
    $set: {
      note: updateNote,
    }});
  },
  'toggleEditContact'(contactId, currentState) {
    check(contactId, String);
    check(currentState, Boolean);
    Contacts.update(contactId, {
      $set: {
        editMode: !currentState
      }});
  }
});


ContactsIndex = new EasySearch.Index({
  collection: Contacts,
  fields: ['nom', 'prenom', 'telephone', 'mobile', 'note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 25}
});

ModuleContactsIndex = new EasySearch.Index({
  collection: Contacts,
  fields: ['nom', 'prenom', 'telephone', 'mobile', 'note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 5}
});