import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

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
});