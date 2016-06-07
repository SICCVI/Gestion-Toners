import './AddToner.html';

import { Template } from 'meteor/templating';
import { Toners } from '../../api/tonersCollection.js';

Template.AddToner.events({
    'submit .add-toner'(event) {
        event.preventDefault();
        const target = event.target;
        const addToner = target.toner.value;
        const impressionId = this._id;
        if (addToner !== "") {
            Meteor.call('impressions.addtoner', impressionId, addToner);
        }
        target.toner.value = "";
    },
});

Template.AddToner.onCreated(function() {
  this.autorun(() => {
    this.subscribe('toners');
  });
});

Template.AddToner.helpers({
    toners: ()=> {
        return Toners.find({}, {sort: { libelle: 1 }}); 
    },
});