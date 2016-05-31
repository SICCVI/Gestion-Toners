import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const Impressions = new Mongo.Collection('impressions');

Impressions.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

ImpressionSchema = new SimpleSchema({
  gabarit: {
    type: String,
    label: "Gabarit",
    allowedValues: ['Imprimante', 'Photocopieur'],
  },
  marque: {
    type: String,
    label: "Marque",
  },
	modele: {
		type: String,
		label: "Modèle",
	},
	type: {
		type: String,
		label: "Type",
	},
  nombretoner: {
    type: Number,
    label: "Nombre de toner(s)",
    min: 0,
  },
  active: {
    type: Boolean,
    defaultValue: false,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
});

Impressions.attachSchema( ImpressionSchema );

Meteor.methods({
  'impressions.remove'(impressionId) {
    check(impressionId, String);
    Impressions.remove(impressionId);
  },
  'impressions.insert'(gabarit, marque, modele, type, nombretoner, active) {
    check(gabarit, String);
    check(marque, String);
    check(modele, String);
    check(type, String);
    check(nombretoner, Number);
    check(active, Boolean);
    Impressions.insert({
      gabarit, marque, modele, type, nombretoner, active,
    });
  },
  'impressions.update'(impressionId, updateGabarit, updateMarque, updateModele, updateType, updateNombretoner, updateActive) {
    check(impressionId, String);
    check(updateGabarit, String);
    check(updateMarque, String);
    check(updateModele, String);
    check(updateType, String);
    check(updateNombretoner, Number);
    check(updateActive, Boolean);
    Impressions.update(impressionId, {
    $set: {
      gabarit: updateGabarit,
      marque: updateMarque,
      modele: updateModele,
      type: updateType,
      nombretoner: updateNombretoner,
      active: updateActive
    }});
  },
  'toggleActive'(impressionId, currentState) {
    check(impressionId, String);
    check(currentState, Boolean);
    Impressions.update(impressionId, {
      $set: {
        active: !currentState
      }});
  },
});