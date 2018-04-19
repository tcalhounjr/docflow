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

// Database variables
var database = initializeDatabase();
var programKey = "";
// var programRef = 

// DOM Variables
var modalSubmitHTML = '#modal-submit';
var programNameHTML = '#program-name';
var programDescHTML = '#program-description';


$(document).ready(function() {

    $('#programModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var action = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        modal.find('.modal-title').text(action + ' Program')
        modal.find('.modal-body input').val(action)

        $(modalSubmitHTML).on('click', function(event) {
            var actions = {
                Create() {
                    console.log('you chose ' + action);
                    var programName = modal.find(programNameHTML).val();
                    var programDesc = modal.find(programDescHTML).val();
                    console.log('the program name is ', programName);
                    console.log('the program description is ', programDesc);
                    var program = new Program(programName, programDesc);
                    programKey = database.ref().push(program);
                },
            
                Update() {
            
                },
            
                View() {
    
                }
            };
            actions[action]();
        });
    });
});