import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const Fournisseurs = new Mongo.Collection('fournisseurs');

Fournisseurs.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

FournisseurSchema = new SimpleSchema({
  nom: {
    type: String,
    label: "Nom",
  },
  siteweb: {
    type: String,
    label: "Site Web",
  },
  adresse: {
    type: String,
    label: "Adresse",
  },
  contact: {
    type: String,
    label: "Contact",
  },
  telephone: {
    type: String,
    label: "Téléphone",
  },
});

Fournisseurs.attachSchema( FournisseurSchema );

Meteor.methods({
  'fournisseurs.remove'(fournisseurId) {
    check(fournisseurId, String);
    Fournisseurs.remove(fournisseurId);
  },
  'fournisseurs.insert'(nom, siteweb, adresse, contact, telephone) {
    check(nom, String);
    check(siteweb, String);
    check(adresse, String);
    check(contact, String);
    check(telephone, String);
    Fournisseurs.insert({
      nom, siteweb, adresse, contact, telephone,
    });
  },
});