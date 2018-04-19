function Program(name, description) {
    this.name = name;
    this.description = description;
}

function CapabilitiesAssessmentReport(array, conclusion, justification) {
    this.gapsList = array;
    this.conclusion = conclusion;
    this.justification = justification;
}

function MissionNeedStatement(statement, array) {
    this.statement = statement;
    this.gapsList = array;
}

function Conops(mns) {
    this.statement = mns.statement
    this.gapsList = mns.gapsList;
}

function AnalysisofAlternatives(mns) {
    this.statement = mns.statement;
}

function OperationalRequirementsDocument(mns) {
    this.statement = mns.statement;
}

function getCopyrightDate() {
    var copyright = document.getElementById('footer-text');
    var todaysDate = new Date();
    copyright.innerHTML = 'Copyright ' + todaysDate.getFullYear() + ' DHS';
}

function initializeDatabase() {
    var config = {
        apiKey: "AIzaSyAPGoG4Ely2k_ql5CyzUffcHNE2eOhY8_o",
        authDomain: "sharktank-docflow.firebaseapp.com",
        databaseURL: "https://sharktank-docflow.firebaseio.com",
        projectId: "sharktank-docflow",
        storageBucket: "sharktank-docflow.appspot.com",
        messagingSenderId: "133287952779"
    };
    firebase.initializeApp(config);
    var db = firebase.database();
    return(db);
}

function createProgram(title, desc) {
    var program = new Program(title, desc);
    database.ref().update(program);
    // console.log('this is the program key ', key);

    var report = new CapabilitiesAssessmentReport(gaps, bottomLIne, rationale);
    var mission = new MissionNeedStatement(needs, gaps);
    var conop = new Conops(mission);
    var aOfA = new AnalysisofAlternatives(mission);
    var ord = new OperationalRequirementsDocument(mission);

    database.ref(title + '/capabilities').set({report});
    database.ref(title + '/missionNeeds').set({mission});
    database.ref(title + '/conops').set({conop});
    database.ref(title + '/alternatives').set({aOfA});
    database.ref(title + '/requirements').set({ord});
    

    return programKey;
}

function updateProgram(newStatement) {
    updateMnsRef.set(newStatement);
    updateConopsRef.set(newStatement);
    updateAlternativesRef.set(newStatement);
    updateRequirementsRef.set(newStatement);
}

function viewProgram() {

}

// DOM Variables
var createSubmitHTML = '#create-modal-submit';
var updateSubmitHTML = '#update-modal-submit';
var programNameHTML = '#program-name';
var programDescHTML = '#program-description';
var updateCarHTML = '#update-capabilities';
var updateMnsHTML = '#update-mission-needs';
var updateConopsHTML = '#update-conops';
var updateAlternativesHTML = '#update-alternatives';
var updateRequirementsHTML = '#update-requirements';

// Application variables
var gaps = ['Lorem ipsum dolor sit amet, consectetur ad','condimentum. Phasellus suscipit placerat','Vestibulum vestibulum lacinia '];
var bottomLIne =    'Aliquam tincidunt ante ut posuere faucibus. Nam pellentesque auctor felis a viverra. Vestibulum ante ipsum primis in faucibus orci \
                    luctus et ultrices posuere cubilia Curae; Aliquam interdum dui eu massa molestie varius. Maecenas in massa in est rhoncus commodo vel in mauris. \
                    Fusce velit nibh, cursus id lorem non, bibendum luctus justo. Mauris suscipit lacus diam, id viverra orci varius vitae.';
var rationale = 'Cras consequat sed turpis vel blandit. Aliquam erat volutpat.';
var needs = 'Sed luctus lorem quis vehicula consectetur. Vestibulum ante ipsum primis in faucibus \
            orci luctus et ultrices posuere cubilia Curae; Morbi augue elit, \
            pellentesque id bibendum vitae, condimentum sed nisl.';
var programTitle = 'JRIS';

// Database variables
var database = initializeDatabase();
var programKey = "";
var updateCarRef = database.ref(programTitle + '/capabilities/report/conclusion');
var updateMnsRef = database.ref(programTitle + '/missionNeeds/mission/statement');
var updateConopsRef = database.ref(programTitle + '/conops/conop/statement');
var updateAlternativesRef = database.ref(programTitle + '/alternatives/aOfA/statement');
var updateRequirementsRef = database.ref(programTitle + '/requirements/ord/statement');


$(document).ready(function() {

    $('#createModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var action = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)

        $(createSubmitHTML).on('click', function(event) {
                    $('createModal').modal('hide');
                    // console.log('you chose ' + action);
                    var programName = modal.find(programNameHTML).val();
                    var programDesc = modal.find(programDescHTML).val();
                    // console.log('the program name is ', programName);
                    // console.log('the program description is ', programDesc);
                    createProgram(programName,programDesc);
                    programTitle = programName;
                    updateCarRef = database.ref(programTitle + '/capabilities/report/conclusion');
                    updateMnsRef = database.ref(programTitle + '/missionNeeds/mission/statement');
                    updateConopsRef = database.ref(programTitle + '/conops/conop/statement');
                    updateAlternativesRef = database.ref(programTitle + '/alternatives/aOfA/statement');
                    updateRequirementsRef = database.ref(programTitle + '/requirements/ord/statement');
        });
    });

    $('#updateModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var action = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)

        updateCarRef.once("value").then(function(snapshot) {
            console.log('capabilities ',snapshot.val());
            modal.find(updateCarHTML).val(snapshot.val());
        })

        updateMnsRef.once("value").then(function(snapshot) {
            console.log('needs statement ',snapshot.val());
            modal.find(updateMnsHTML).val(snapshot.val());
        })

        updateConopsRef.once("value").then(function(snapshot) {
            console.log('conops statement ',snapshot.val());
            modal.find(updateConopsHTML).val(snapshot.val());
        })

        updateAlternativesRef.once("value").then(function(snapshot) {
            console.log('alternatives statement ',snapshot.val());
            modal.find(updateAlternativesHTML).val(snapshot.val());
        })

        updateRequirementsRef.once("value").then(function(snapshot) {
            console.log('requirements statement ',snapshot.val());
            modal.find(updateRequirementsHTML).val(snapshot.val());
        })


        $(updateSubmitHTML).on('click', function(event) {
                    $('updateModal').modal('hide');
                    var update = modal.find(updateMnsHTML).val();
                    updateProgram(update);
        });

    });
});