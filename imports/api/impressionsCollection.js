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
	information: {
		type: String,
		label: "Information",
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
  },
  editMode: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
});

Impressions.attachSchema( ImpressionSchema );

Meteor.methods({
  'impressions.remove'(impressionId) {
    check(impressionId, String);
    Impressions.remove(impressionId);
  },
  'impressions.insert'(gabarit, marque, modele, information, nombretoner, active) {
    check(gabarit, String);
    check(marque, String);
    check(modele, String);
    check(information, String);
    check(nombretoner, Number);
    check(active, Boolean);
    Impressions.insert({
      gabarit, marque, modele, information, nombretoner, active,
    });
  },
  'impressions.update'(impressionId, updateGabarit, updateMarque, updateModele, updateInformation, updateNombretoner, updateActive) {
    check(impressionId, String);
    check(updateGabarit, String);
    check(updateMarque, String);
    check(updateModele, String);
    check(updateInformation, String);
    check(updateNombretoner, Number);
    check(updateActive, Boolean);
    Impressions.update(impressionId, {
    $set: {
      gabarit: updateGabarit,
      marque: updateMarque,
      modele: updateModele,
      type: updateInformation,
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
  'toggleEdit'(impressionId, currentState) {
    check(impressionId, String);
    check(currentState, Boolean);
    Impressions.update(impressionId, {
      $set: {
        editMode: !currentState
      }});
  },
});