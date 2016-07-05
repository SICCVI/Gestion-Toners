import { Template } from 'meteor/templating';
import { Historiques } from '../../api/historiquesCollection.js';

import './NotificationsHistorique.html';


Template.NotificationsHistorique.onCreated(function() {
  this.autorun(() => {
    this.subscribe('historiques');
  });
});

Template.NotificationsHistorique.helpers({
	historiqueComplet: ()=> {
		return Historiques.find({}, {sort: { date: 1 }, limit: 5 });  
	},
	historiqueCommandes: ()=> {
		return Historiques.find({categorie: "Commande"}, {sort: { date: 1 }, limit: 5 });  
	},
	historiqueEntrees: ()=> {
		return Historiques.find({categorie: "Entrée"}, {sort: { date: 1 }, limit: 5 });  
	},
	historiqueSorties: ()=> {
		return Historiques.find({categorie: "Retrait"}, {sort: { date: 1 }, limit: 5 });  
	},
});
