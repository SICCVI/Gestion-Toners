import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const Marques = new Mongo.Collection('marques');

Marques.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

MarqueSchema = new SimpleSchema({
  nom: {
    type: String,
    label: "Nom",
  },
/*	site: {
		type: String,
		label: "Site",
    optional: true,
	},
	information: {
		type: String,
		label: "Information",
    optional: true,
	},
  active: {
    type: Boolean,
    defaultValue: false,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },*/
});

Marques.attachSchema( MarqueSchema );

Meteor.methods({
  'marques.remove'(marqueId) {
    check(marqueId, String);
    Marques.remove(marqueId);
  },
/*  'marques.insert'(nom, site, information, active) {
    check(nom, String);
    check(site, String);
    check(information, String);
    check(active, Boolean);
    Marques.insert({
      nom, site, information, active,
    });
  },*/
  'marques.add'(nom) {
    check(nom, String);
    Marques.insert({
      nom,
    });
  },
});