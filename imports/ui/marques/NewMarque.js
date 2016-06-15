import './NewMarque.html';

import { Template } from 'meteor/templating';

import '../../scripts/disableEnterKey.js';

Template.NewMarque.events({
    'submit .new-site'(event) {
        event.preventDefault();
        const target = event.target;
        const nom = target.nom.value;
        Meteor.call('marques.insert', nom);
        target.nom.value = "";
        target.nom.focus();
    },
});

Template.NewMarque.onCreated(function() {
});

Template.NewMarque.helpers({
});

