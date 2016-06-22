import "./Modules.html";

import "./ModuleToner.js";
import "./ModuleImpression.js";
import "./ModuleSite.js";
import "./ModuleContact.js";
import "./ModuleService.js";

import '../../scripts/myFunctions.js';

Template.Modules.events({
    'click #ToSectionFin':function(evt){
        $('#ResultatToner').val($('#ChoixToner').val());
        $('#ResultatImpression').val($('#ChoixImpression').val());
        $('#ResultatSite').val($('#ChoixSite').val());
        $('#ResultatContact').val($('#ChoixContact').val());
        $('#ResultatService').val($('#ChoixService').val());
        $('#ResultatTonerId').val($('#ChoixTonerId').val());
        $('#ResultatImpressionId').val($('#ChoixImpressionId').val());
        $('#ResultatSiteId').val($('#ChoixSiteId').val());
        $('#ResultatContactId').val($('#ChoixContactId').val());
        $('#ResultatServiceId').val($('#ChoixServiceId').val());
    },
    'click #ToValidation'(event) {
        event.preventDefault();
        if ( $('#ResultatTonerId').val() != "" || $('#ResultatImpressionId').val() != "" || $('#ResultatSiteId').val() != "" || $('#ResultatContactId').val() != "" || $('#ResultatServiceId').val() != "" ) {
            const tonerId = $('#ResultatTonerId').val();
            const impressionId = [$('#ResultatImpressionId').val()];
            const siteId = $('#ResultatSiteId').val();
            const contactId = $('#ResultatContactId').val();
            const serviceId = $('#ResultatServiceId').val();
            const index = [ $('#ResultatToner').val(), $('#ResultatImpression').val(), $('#ResultatSite').val(), $('#ResultatContact').val(), $('#ResultatService').val()];
            Meteor.call('stocks.insert', tonerId, impressionId, siteId, contactId, serviceId, index);
            $('#ResultatTonerId').val("");
            $('#ResultatImpressionId').val("");
            $('#ResultatSiteId').val("");
            $('#ResultatContactId').val("");
            $('#ResultatServiceId').val("");
        }
    },
});