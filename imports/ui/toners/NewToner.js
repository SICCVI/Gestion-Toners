import './NewToner.html';

import { Template } from 'meteor/templating';
import { Marques } from '../../api/marquesCollection.js';
import { Fournisseurs } from '../../api/fournisseursCollection.js';

import '../../scripts/disableEnterKey.js';
import { reporterSelect } from '../../scripts/myFunctions.js';

Template.NewToner.events({
    'submit .new-toner'(event) {
        event.preventDefault();
        let tonerId;
        const target = event.target;
        const modele = target.modele.value;
        const constructeur = target.constructeur.value;
        const constructeurUpper = constructeur.toUpperCase();
        const referenceC = target.referenceC.value;
        const couleur = target.couleur.value;
        const verification = Marques.find({nom: constructeurUpper}, {limit: 1}).count()>0;

        Meteor.call('toners.insert-simple', modele, constructeurUpper, referenceC, couleur);
        target.modele.value="";
        target.constructeur.value="";
        $("#insert-selectmarque").val("");
        target.referenceC.value="";
        target.couleur.value="";
        $("#closeModalNew").click();
            if (verification === true) {
                throw new Meteor.Error('Cette élément existe déjà dans la collection et ne sera donc pas insérée.');
            }
            else {
                Meteor.call('marques.add', constructeurUpper);
            }
    },
/*    'click .selection-fournisseur'(event) {
        event.preventDefault();
        const target = event.target;
        const table = document.getElementById("TableFournisseur");
        const row = table.insertRow(0);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = $("#SelectFournisseur").find(':selected').text();
        cell2.innerHTML = $("#InputFournisseur").val();
        cell3.innerHTML = "<label hidden>"+ $("#SelectFournisseur").val() +"</label>";
    },
    'click .delete-selection-fournisseur'(event) {
        event.preventDefault();
        document.getElementById("TableFournisseur").deleteRow(0);
    }*//*,
    'click #CHECK' (event) {
        event.preventDefault();
        var oTable = document.getElementById('TableFournisseur');
        var rowLength = oTable.rows.length;   
        for (i = 0; i < rowLength; i++) { 
           var oCells = oTable.rows.item(i).cells;
           var cellLength = oCells.length;
           for(var j = 0; j < cellLength; j++){
                  var cell1 = oCells.item(0).innerHTML;
                  var cell2 = oCells.item(1).innerHTML;
                  var cell3 = oCells.item(2).textContent;
            }
            console.log("NOM = " + cell1);
                  console.log("REF = " + cell2);
                  console.log("ID  = " + cell3);
        }
    }*/
});
/*
function savedata1() { 

var obj = $('#myTable tbody tr').map(function() {
var $row = $(this);
var t1 = $row.find(':nth-child(1)').text();
var t2 = $row.find(':nth-child(2)').text();
var t3 = $row.find(':nth-child(3)').text();
return {
    td_1: $row.find(':nth-child(1)').text(),
    td_2: $row.find(':nth-child(2)').text(),
    td_3: $row.find(':nth-child(3)').text()
   };
}).get();
*/
Template.NewToner.onCreated(function() {
  this.autorun(() => {
    this.subscribe('marques');
  });
/*  this.autorun(() => {
    this.subscribe('fournisseurs');
  });*/
});

Template.NewToner.helpers({
    marques: ()=> {
        return Marques.find({}, {sort: { nom: 1 }}); 
    },
/*    fournisseurs: ()=> {
        return Fournisseurs.find({}, {sort: { nom: 1 }}); 
    },*/
});

