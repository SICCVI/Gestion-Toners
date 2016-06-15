import './EditService.html';

import { Template } from 'meteor/templating';

import '../../scripts/disableEnterKey.js';
import '../../scripts/myFunctions.js';
import '../../startup/helpers.js';

Template.EditService.events({
    'submit .update-service'(event) {
        event.preventDefault();
        const target = event.target;
        const updateNom = target.nom.value;
        const serviceId = this._id;
        Meteor.call('services.update', serviceId, updateNom);
        document.getElementById('modalClose-'+this._id).click();
    },
});

Template.EditService.onCreated(function() {
});

Template.EditService.helpers({
});


