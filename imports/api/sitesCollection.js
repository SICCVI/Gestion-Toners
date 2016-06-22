import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

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
  editMode: {
    type: Boolean,
    defaultValue: false,
    optional: true,
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
  'sites.alt-insert'(nom, adresse, codepostal, ville, telephone) {
    check(nom, String);
    check(adresse, String);
    check(codepostal, String);
    check(ville, String);
    check(telephone, String);
    const newElement = Sites.insert({
      nom, adresse, codepostal, ville, telephone,
    });
    return newElement;
  },
  'sites.update'(siteId, updateNom, updateAdresse, updateCodepostal, updateVille, updateTelephone) {
    check(siteId, String);
    check(updateNom, String);
    check(updateAdresse, String);
    check(updateCodepostal, String);
    check(updateVille, String);
    check(updateTelephone, String);
    Sites.update(siteId, {
    $set: {
      nom: updateNom,
      adresse: updateAdresse,
      codepostal: updateCodepostal,
      ville: updateVille,
      telephone: updateTelephone,
    }});
  },
  'toggleEditSite'(siteId, currentState) {
    check(siteId, String);
    check(currentState, Boolean);
    Sites.update(siteId, {
      $set: {
        editMode: !currentState
      }});
  },
});

SitesIndex = new EasySearch.Index({
  collection: Sites,
  fields: ['nom', 'adresse', 'codepostal', 'ville', 'telephone'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 25}
});

ModuleSitesIndex = new EasySearch.Index({
  collection: Sites,
  fields: ['nom', 'adresse', 'codepostal', 'ville', 'telephone'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 5}
});