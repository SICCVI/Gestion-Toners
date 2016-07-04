import './NewService.html';

import { Template } from 'meteor/templating';
import { Services } from '../../api/servicesCollection.js';

import '../../scripts/disableEnterKey.js';

Template.NewService.events({
    'submit .new-service'(event) {
        event.preventDefault();
        const target = event.target;
        const nom = target.nom.value;
		const verification = Services.find({nom: nom}, {limit: 1}).count()>0;
        if (verification === true) {
            throw new Meteor.Error('Cette élément existe déjà dans la collection et ne sera donc pas insérée.');
        }
        else {
            Meteor.call('services.insert', nom);
        }
        target.nom.value = "";
        target.nom.focus();
        $("#closeModalNew").click();
    },
});

Template.NewService.onCreated(function() {
});

Template.NewService.helpers({
});

