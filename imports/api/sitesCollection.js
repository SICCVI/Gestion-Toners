import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const Sites = new Mongo.Collection('sites');

Sites.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

SiteSchema = new SimpleSchema({
  nom: {
    type: String,
    label: "Nom",
  },
  adresse: {
    type: String,
    label: "Adresse",
  },
  codepostal: {
    type: String,
    label: "Code Postal",
  },
  ville: {
    type: String,
    label: "Ville",
  },
  telephone: {
    type: String,
    label: "Téléphone",
  },
});

Sites.attachSchema( SiteSchema );

Meteor.methods({
  'sites.remove'(siteId) {
    check(siteId, String);
    Sites.remove(siteId);
  },
  'sites.insert'(nom, adresse, codepostal, ville, telephone) {
    check(nom, String);
    check(adresse, String);
    check(codepostal, String);
    check(ville, String);
    check(telephone, String);
    Sites.insert({
      nom, adresse, codepostal, ville, telephone,
    });
  },
});