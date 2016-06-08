const SelectContacts = new Mongo.Collection('test');

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

export const Items = new Mongo.Collection('item');

Items.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

Meteor.methods({
  'items.insert'(item) {
    Items.insert({
      item,
    });
  },
});
