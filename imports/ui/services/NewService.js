import './NewService.html';

import { Template } from 'meteor/templating';

import '../../scripts/disableEnterKey.js';

Template.NewService.events({
    'submit .new-site'(event) {
        event.preventDefault();
        const target = event.target;
        const nom = target.nom.value;
        Meteor.call('services.insert', nom);
        target.nom.value = "";
        target.nom.focus();
    },
});

Template.NewService.onCreated(function() {
});

Template.NewService.helpers({
});

