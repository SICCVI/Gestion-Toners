import './AddToner.html';

import { Template } from 'meteor/templating';

import { reporterSelect } from '../../scripts/myFunctions.js';

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
        target.toner.focus();  
    },
});