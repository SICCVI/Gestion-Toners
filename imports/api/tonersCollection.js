import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const Toners = new Mongo.Collection('toners');

Toners.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});


TonerSchema = new SimpleSchema({
  marque: {
    type: String
  },
  reference: {
    type: String
  },
/*  couleur: {
    type: String,
    optional: true,
  },
  stock: {
    type: String,
    optional: true,
  },
  statut: {
    type: String,
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

Toners.attachSchema( TonerSchema );

Meteor.methods({
  'toners.remove'(tonerId) {
    check(tonerId, String);
    Toners.remove(tonerId);
  },
 'toners.insert'(marque, reference) {
    check(marque, String);
    check(reference, String);
    Toners.insert({
      marque, reference,
    });
  },
});