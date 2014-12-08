
//#region Sampson's huge amount of global vars
///////////////////////////////////// GLOBAL VARS

var smileyFace = "\u263A"
var frownyFace = "☹"
var svgEditWindow = false;
var svg_diagram = null;
var refreshTimer;
var debug_i = 0;
var thewin = null;
var svgNS = "http://www.w3.org/2000/svg";
var tspan_element = document.getElementById('debugtspan');
var removeIntent = false;
var always_showPCN = true;
var region_height = 444; //TODO: need to make this dynamic

//from http://html5-demos.appspot.com/static/a.download.html
var container = document.querySelector('#container');
//var typer = container.querySelector('[contenteditable]');
//var output = container.querySelector('output');
//const MIME_TYPE = 'text/plain';






var pcnbackground = '<defs>'
    + '<marker refY="50" refX="50" markerHeight="10" markerWidth="10" viewBox="0 0 100 100" orient="auto" markerUnits="strokeWidth" id="markerArrow"><path stroke-width="10" stroke="#00007f" fill="#00007f" d="m100,50l-100,40l30,-40l-30,-40l100,40z" /></marker>'
    + '<marker refY="50" refX="80" markerHeight="10" markerWidth="20" viewBox="0 0 100 100" orient="auto" id="markerYes"> <rect height="105" width="76" y="-3" x="-79" stroke-width="5" fill="#ffffff" opacity="0.9"/> <path stroke-width="10" stroke="#00007f" fill="#00007f" d="m100,50l-100,40l30,-40l-30,-40l100,40z" /> <text xml:space="preserve" text-anchor="center" font-family="serif" font-size="60" fill="#FF0000" y="70" x="-90" transform="rotate(-90 -45,47) ">yes</text></marker>'
    + '<marker refY="50" refX="80" markerHeight="10" markerWidth="20" viewBox="0 0 100 100" orient="auto" id="markerNo"> <rect height="105" width="76" y="-3" x="-79" stroke-width="5" fill="#ffffff" opacity="0.7"/> <path stroke-width="10" stroke="#00007f" fill="#00007f" d="m100,50l-100,40l30,-40l-30,-40l100,40z" /> <text xml:space="preserve" text-anchor="center" font-family="serif" font-size="60" fill="#FF0000" y="70" x="-90" transform="rotate(-90 -45,47) ">no</text></marker>'
    + '</defs>'
    + '<title>PCN Diagram</title>'
    + '<g><title>Background</title>'
    + '<path stroke="#00007f" fill="none" stroke-width="2" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" opacity="0.5" d="m0,0l540,120l540,-120m0,120l-1080,0m180,0l0,' + region_height + 'm180,0l0,-' + region_height + 'm360,0l0,' + region_height + 'm180,0l0,-' + region_height + '" id="pcn_header"/>'
    + '</g>';

//var svgStart = '<svg width="1080" height="1120" xmlns="http://www.w3.org/2000/svg" xmlns:se="http://svg-edit.googlecode.com" id="diagram">';
//http://stackoverflow.com/questions/19484707/how-can-i-make-an-svg-scale-with-its-parent-container
var svgStart = '<svg width="100%" viewBox="0 0 1080 1120" xmlns="http://www.w3.org/2000/svg" xmlns:se="http://svg-edit.googlecode.com" id="diagram">';
var svgEnd = '</svg>';

var regions = [1, 2, 3, 4, 5, 6, 7];
var blank_spa = {
    "process": {
        "provider": "provider?",
        "customer": "customer",
        "process": "process?",
        "initial_step": "needs something",
        "final_step": "has something"
    },
    "subject": {
        "name": "John Doe",
        "date": "today",
        "entity": "patient"
    },
    "steps": [
     {
         "order": "1",
         "step": "first step goes here",
         "type": "",
         "region": "r7",
         "value": "",
         "problems": {},
         "number": 1
     }
    ]
};

var newStartingSpa = {
    "meta": {
        "author": "Brian Farnsworth",
        "savename": ""
    },
    "process": {
        "provider": "Dentist",
        "customer": "Customer",
        "process": "Go to the Dentist",
        "initial_step": "First step",
        "final_step": ""
    },
    "subject": {
        "name": "",
        "date": "",
        "entity": ""
    },
    "steps": [{
        "order": "1",
        "step": "Step 1",
        "type": "",
        "domain": "patient",
        "region": "r7",
        "value": "somewhat",
        "inconvenient": "headache",
        "problem_inconvenient": "real pain to get to",
        "problem_likely_to_fail": "forget to show up",
        "number": 1
    },
    {
        "order": "1",
        "step": "Step 2",
        "type": "",
        "domain": "patient",
        "region": "r1",
        "value": "somewhat",
        "inconvenient": "headache",
        "problem_inconvenient": "real pain to get to",
        "problem_likely_to_fail": "forget to show up",
        "number": 2
    }]
};

var spa = newStartingSpa;

var oldStartingSpa = {
    "meta": {
        "author": "Sampson",
        "savename": ""
    },
    "process": {
        "provider": "health clinic",
        "customer": "patient",
        "process": "Make an appointment",
        "initial_step": "needs an appointment",
        "final_step": "has an appointment"
    },
    "subject": {
        "name": "John Doe",
        "date": "today",
        "entity": "patient"
    },
    "steps": [
     {
         "order": "1",
         "step": "need an appointment",
         "type": "",
         "domain": "patient",
         "region": "r7",
         "value": "somewhat",
         "inconvenient": "headache",
         "problem_inconvenient": "real pain to get to",
         "problem_likely_to_fail": "forget to show up",
         "number": 1
     },
     {
         "order": "1",
         "step": "look up the clinic phone number",
         "type": "",
         "other": "411",
         "domain": "patient",
         "region": "r6",
         "value": "necessary",
         "problem_difficult": "hard to do",
         "problem_confusing": "strange language",
         "number": 2,
         "follows": "1:yes",
         'box_dash': 'dash'
     },
     {
         "order": "1",
         "step": "call the clinic",
         "type": "",
         "domain": "patient",
         "region": "r6",
         "value": "",
         "number": 3,
         'box_thick': 'thick'
     },
     {
         "order": "1",
         "step": "wait for someone to answer",
         "type": "wait",
         "domain": "patient",
         "region": "r6",
         "value": "not",
         "number": 4,
         "follows": "start"
     },
     {
         "order": "1",
         "step": "ask about available appointment times",
         "type": "",
         "domain": "patient",
         "region": "r5",
         "value": "necessary",
         "number": 5,
         "skip_rows": 1.5
     },
     {
         "order": "1",
         "step": "select an appointment time",
         "type": "decision",
         "domain": "patient",
         "region": "r4",
         "value": "very",
         "number": 6
     },
     {
         "order": "1",
         "step": "have an appointment",
         "type": "",
         "domain": "patient",
         "region": "r7",
         "value": "very",
         "number": 7
     }
    ]
};


var valueLevels = {
    'very': ':) :) Very valuable',
    'somewhat': ':) Somewhat Valuable',
    'necessary': 'Necessary but not valuable',
    'not': ':( Not necessary nor valuable'
};


var regionSelect = '<td xclass="p2"><svg height="20" width="180" id="regFor{_index}"><text font-size="12" fill="#CCCCCC" class="region">'
    + '<tspan x="5" y="15" class="r1 value">[IP]</tspan>'
    + '<tspan x="30" y="15" class="r2 value">[SI]</tspan>'
    + '<tspan x="55" y="15" class="r3 value">[DI]</tspan>'
    + '<tspan x="80" y="15" class="r4 value">[DI]</tspan>'
    + '<tspan x="105" y="15" class="r5 value">[DI]</tspan>'
    + '<tspan x="130" y="15" class="r6 value">[SI]</tspan>'
    + '<tspan x="155" y="15" class="r7 value">[IP]</tspan>'
    + '</text>'
+ '<line x1="28" y1="0" x2="28" y2="20" style="stroke:rgb(255,0,0);stroke-width:1" />'
+ '<line x1="53" y1="0" x2="53" y2="20" style="stroke:rgb(255,0,0);stroke-width:1" />'
+ '<line x1="128" y1="0" x2="128" y2="20" style="stroke:rgb(255,0,0);stroke-width:1" />'
+ '<line x1="153" y1="0" x2="153" y2="20" style="stroke:rgb(255,0,0);stroke-width:1" />'
    + '</svg></td>';

var typeSelect =
    '<td class="type"><input type="radio" name="t{number}" class="regular value" /></td>'
    + '<td class="type"><input type="radio" name="t{number}" class="wait value" /></td>'
    + '<td class="type"><input type="radio" name="t{number}" class="decision value" /></td>';
//	+ '<td class="domain_" bgcolor="yellow"><input type="checkbox" class="_other" xxonClick="store(this);" />{domain_other}</td>';

var valueSelect =
      '<td class="value"><input type="radio" name="v{number}" class="very value" /></td>'
    + '<td class="value"><input type="radio" name="v{number}" class="somewhat value" /></td>'
    + '<td class="value"><input type="radio" name="v{number}" class="necessary value" /></td>'
    + '<td class="value"><input type="radio" name="v{number}" class="not value" /></td>';

//TODO: I think this class p3,p4 stuff is useless, unless it is for setting color - not

var problemSelect =
      '<td class="problem_"><input type="checkbox" class="_inconvenient valuelink" /></td>'
    + '<td class="problem_"><input type="checkbox" class="_confusing valuelink" /></td>'
    + '<td class="problem_"><input type="checkbox" class="_difficult valuelink" /></td>'
    + '<td class="problem_"><input type="checkbox" class="_likely_to_fail valuelink" /></td>';



var parts = [{
    "part": "step",
    "title": "Process steps",
    "bgcolor": "",
    "columns": 2,
    "header": "<td>add</td><td>Enter process steps below (follows)</td>",
    "item": '<td><span class="change ui-icon ui-icon-close" title="delete step" onClick="removeStep(this);" style="float: left;">&times;</span><span class="change" title="insert step" onClick="insertstepat(this);">&rArr;</span></td><td nowrap align="left"><span class="itemno" title="reorder">{number}.</span><input type="text" size="40" value="{step}" onKeyUp="updatestep(this);" xonClick="show_properties(this);" tabindex="{number}" id="input_{number}"/><span onClick="show_properties(this);" class="ui-icon ui-icon-wrench" style="float:right; cursor:help;" title="this step follows {follows}">?</span><span class="itemfollows" title="click to change" onClick="stepfollows(this);">{follows}</span></td>',
    "itemPlugs": ["number", "step", "follows"]
},
{
    "part": "type",
    "title": "Step type",
    "bgcolor": "yellow",
    "columns": 3,
    "header": "<td class='p1'>regular</td><td class='p1'>wait</td><td class='p1'>decision</td>",
    //<td class='p1'>other entity</td>",
    "item": typeSelect,
    "itemPlugs": ["number", "domain_other"],
    "field": "type"
},
{
    "part": "region",
    "title": "Process Region",
    "bgcolor": "",
    "columns": 1,
    "header": '<td class="p2">'
            + '<svg height="20" width="180">'
            + '<line x1="0" y1="0" x2="90" y2="20" style="stroke:rgb(255,0,0);stroke-width:1" />'
            + '<line x1="90" y1="20" x2="180" y2="0" style="stroke:rgb(255,0,0);stroke-width:1" />'
            + '<line x1="0" y1="20" x2="180" y2="20" style="stroke:rgb(255,0,0);stroke-width:1" />'
            + '<text font-size="12" x="0" y="18">Provider</text>'
            + '<text font-size="12" x="132" y="18">Customer</text>'
            + '</svg></td>',
    "item": regionSelect,
    "itemPlugs": ["_index"]
},
{
    "part": "value",
    "title": "Customer value",
    "bgcolor": "lightgreen",
    "columns": 4,
    "header": "<td class='p3'>&#9786;&#9786;<br/>very<br/>valuable</td><td class='p3'>&#9786;<br/>somewhat<br/>valuable</td><td class='p3'>necessary<br/>but&nbsp;not<br/>valuable</td><td class='p3'>&#9785;&nbsp;not<br/>nec.&nbsp;nor<br/>valuable</td>",
    "item": valueSelect,
    "itemPlugs": ["number"]
},
{
    "part": "problems",
    "title": "Potential problems",
    "bgcolor": "lightpink",
    "columns": 4,
    "header": "<td class='p4'>&#9785;<br />incon-<br />venient</td><td class='p4'>&#9785;<br />confusing</td><td class='p4'>&#9785;<br />difficult</td><td class='p4'>(F)<br />likely<br />to fail</td>",
    "item": problemSelect,
    "itemPlugs": []
},
{
    "part": "follows",
    "title": "Follows",
    "bgcolor": "aqua",
    "columns": 3,
    "header": "<td xclass='follows'>prior</td><td xclass='follows' title='start step'>none</td><td xclass='follows'>step#s<br />[:yes/no]</td>",
    "item": '<td class="follows"><input type="radio" name="{number}f" class="prior value" /></td><td class="follows"><input type="radio" name="{number}f" class="start value" /></td><td class="follows"><input type="radio" name="{number}f" class="_follows{number} valuelink" /><input type="text" id="_follows{number}" class="valueinput" size="2" /></td>',
    "itemPlugs": ["number"]
},
{
    "part": "diagram",
    "title": "On Diagram",
    "bgcolor": "lightgray",
    "columns": 3,
    "header": "<td class='box_' colspan='2'>step-box<br />dash thick</td><td class='skip_rows'>skip<br />step<br />rows</td>",
    "item": '<td class="box_"><input type="checkbox" class="dash value" /></td><td class="box_"><input type="checkbox" class="thick value" /></td><td class="skip_rows"><input type="text" class="valueinput" size="2" /></td>',
    "itemPlugs": ["number"]
}


];


// COLUMN MANAGEMENT FUNCTIONS
var columnCount = parts.length;
var showColumns = [0, parts.length - 1]; //ordered array of the columns to be displayed

var regions = {
    'provider-independent': 1,
    'provider-surrogate': 2,
    'provider-direct': 3,
    'both-direct': 3.5,
    'customer-direct': 4,
    'customer-surrogate': 5,
    'customer-independent': 6,
    'r1': 1,
    'r2': 2,
    'r3': 3,
    'r4': 3.5,
    'r5': 4,
    'r6': 5,
    'r7': 6
};

//#endregion

$(document).ready(function () {

    $(".sidebarColumnSelectItem > input[type='checkbox']").attr("checked", "true")

    $(".sidebarColumnSelectItem > input[type='checkbox']").change(function () {
        if ($(this).is(':checked')) {
            var column = $(this).data('column');
            $("." + column).show();
        } else {
            var column = $(this).data('column');
            $("." + column).hide();
        }
    });

    $(document).on('click', '.deleteButton', function () {
        //var confirmChoice = confirm("Are you sure you want to delete this step?");
        //if (confirmChoice == true) {
        deleteStep($(this).parent().parent().attr("id"));
        //}
    });

    $("#sidebarWrapper").mouseleave(function () {
        toggleSidebar();
    });

    $("#sidebarWrapper").mouseenter(function () {
        toggleSidebar();
    });

    $("#buttonExport").click(function () {
        $("#modalBackground").show("fast");
        $("#exportModal").show("fast");

        $('#exportModal > div.modalContent > textarea').val(JSON.stringify(spa, null, 2));
    });

    $("#buttonImport").click(function () {
        $("#modalBackground").show("fast");
        $("#importModal").show("fast");
    });

    $('#importModal > div.modalFooter > div:nth-child(1)').on('click', function () {
        console.log('fsdfsdf')

        var jsonString = $('#importModal > div.modalContent > textarea').val()
        var json = jQuery.parseJSON(jsonString)

        if (isPCNSpec(json)) {
            console.log('PCNSpec')
            spa = convertPcnSpecToSpa(json)
        } else {
            console.log('!PCNSpec')
            spa = json
            json = convertSpaToTommysJson(json)
        }

        popup(json)
        closeModals();
        doList()
        showPCN(json);
    });

    $("#buttonEditDiagram").click(function () {
        var processName = document.getElementById('Text1').value;
        var provider = document.getElementById('Text2').value;
        var customer = document.getElementById('Text3').value;
        $("#modalBackground").show("fast");
        $("#editDiagramModal").show("fast");
        $(".closeButtonEditDiagram").click(function () {
            document.getElementById('Text1').value = processName;
            document.getElementById('Text2').value = provider;
            document.getElementById('Text3').value = customer;
            closeModals();
        });


    });

    $("#buttonSettings").click(function () {
        $("#modalBackground").show("fast");
        $("#settingsModal").show("fast");
    });



    $("#buttonShowPopup").click(function () {
        //$("#modalBackground").show("fast");
        //$("#settingsModal").show("fast");
        popup()
    });

    $(".closeButton").click(function () {
        closeModals();
    });

    $(".saveButton").click(function () {
        closeModals();
    });

    $(".saveButtonEdit").click(function () {
        var processName = document.getElementById('Text1').value;
        var provider = document.getElementById('Text2').value;
        var customer = document.getElementById('Text3').value;

        document.getElementById('PCNTitle').innerHTML = document.getElementById('Text1').value;
        document.getElementById('PCNSubTitle').innerHTML = '<span class="subtitleItemLabel">Provider:</span> ' + document.getElementById('Text2').value + ' <span class="subtitleItemLabel">Customer:</span> ' + document.getElementById('Text3').value;

        spa.process.provider = provider;
        spa.process.customer = customer;
        spa.process.process = processName;

        closeModals();

        showPCN();
    });

    $(document).on('click', '.editButton', function () {
        var dashVar = document.getElementById('dash').checked;
        var thickVar = document.getElementById('thick').checked;
        var yesVar = document.getElementById('yes').checked;
        var noVar = document.getElementById('no').checked;
        var numberRows = document.getElementById('numberRows').value;
        $("#modalBackground").show("fast");
        $("#editOnDiagramModal").show("fast");
        $(".closeButtonEditOnDiagram").click(function () {
            document.getElementById('dash').checked = dashVar;
            document.getElementById('thick').checked = thickVar;
            document.getElementById('yes').checked = yesVar;
            document.getElementById('no').checked = noVar;
            document.getElementById('numberRows').value = numberRows;
            closeModals();
        });
    });

    $("#modalBackground").click(function () {
        closeModals();
    });

    $("#processStepHeader").click(function () {
        $("#modalBackground").show("fast");
        $("#editDiagramModal").show("fast");
    });

    $("#addStepButton").click(function () {
        addStepRow();
        spa.steps.push({
            "order": "1",
            "step": "",
            "type": "",
            "other": "",
            "domain": "",
            "region": "r1",
            "value": "",
            "problem_difficult": "",
            "problem_confusing": "",
            "number": spa.steps.length,
            "follows": "",
            'box_dash': 'dash'
        });

        showPCN();
    });

    $('body').on('keyup', '.tableColumnStepNameInput', function () {
        updatestep(this);
    });

    $('body').on('change', '.sliderCell > input[type=radio]', function () {
        var rowNum = $(this).parents('.tableRow').index();
        var radioNum = $(this).parents('.sliderCell').index();

        console.log('Row: ' + parseInt(rowNum))
        console.log('Radio: ' + parseInt(radioNum))

        spa.steps[rowNum - 1].region = 'r' + parseInt(radioNum + 1)

        showPCN();

    })

    $('body').on('change', '.tableColumnCustomerValueSelect', function () {
        var rowNum = $(this).parents('.tableRow').index();

        console.log('Row: ' + parseInt(rowNum))

        var stepName = spa.steps[rowNum - 1].step
        spa.steps[rowNum - 1].step = stepName + " " + frownyFace

        showPCN();

    })

    $('body').on('change', '.tableColumnStepTypeSelect', function () {
        var rowNum = $(this).parents('.tableRow').index();

        console.log('Row: ' + parseInt(rowNum))

        spa.steps[rowNum - 1].type = $(this).val().toLowerCase();

        showPCN()
    });

    $('body').on('change', '.segmented-control > input', function () {

        console.log($(this).val())

        if ($(this).val() == 'PCN Wizard SPA Data') {
            $('#exportModal > div.modalContent > textarea').val(JSON.stringify(spa, null, 2))
        } else {
            $('#exportModal > div.modalContent > textarea').val(JSON.stringify(convertSpaToTommysJson(spa), null, 2))
        }

    })

    drSampsonsOldDocumentReady();
});

function deleteStep(id) {

    removeStep($('#' + id).index());

    $('#' + id)
    .children('div')
    .animate({ padding: 0 })
    .wrapInner('<div />')
    .children()
    .slideUp("slow", function () {
        $('#' + id).remove();
    });

    showPCN();
}

function toggleSidebar() {
    $("#sidebar").toggleClass('sidebarShrunk');
    $("#sidebarHint").hide(100);
    $(".sidebarControl").toggleClass('sidebarControlShrunk');
    $(".mainContent").toggleClass('mainContentExpanded');
    if ($("#sidebar").hasClass('sidebarShrunk')) {
        $(".sidebarHideShowLabel").html("&gt;");
    } else {
        $(".sidebarHideShowLabel").html("&lt;");
    }
}

function closeModals() {
    $("#modalBackground").hide("fast");
    $(".modal").hide("fast");
}

function addStepRow() {
    var stepNum = $("#addStepButton").data('id');
    $("#table").append('<div class="tableRow" id="rowStep' + stepNum + '"></div>');

    //$("#rowStep" + stepNum).append($("#appendContent").html());
    $(".tableRow").last().append($("#appendContent").html());
    //var x = document.getElementById("rowStep" + stepNum).getElementsByTagName("*");
    var x = $(".tableRow").last().getElementsByTagName("*");
    for (var i = 0; i < x.length; ++i) {
        if (x[i].type == 'radio') {
            x[i].setAttribute("name", "tableColumnProcessingRegionRadio" + stepNum);
        }
    }
    //tableColumnProcessRegion
    //$('.tableColumnPotentialProblems').css('display','none')
    //tableColumnCustomerValue
    //$('.tableColumnCustomerValue').css('display', 'none')
    //tableColumnPotentialProblems
    //$('.tableColumnFollows').css('display', 'none')

    $("#addStepButton").data('id', stepNum + 1);
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// OLD CODE (with modifications to work with new site) ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function XXsetProblem(item) {
    var number = item.parentElement.parentElement.id;
    //		alert(number);
    var problem = item.classList[0];
    var check = item.checked;
    if (typeof spa.steps[number].problems == 'undefined') {
        spa.steps[number].problems = [];	//prevent error below
    }
    if (check) {
        var step = spa.steps[number].step;
        var what = window.prompt("What is " + problem + " about the '" + step + "' step?");
        //TODO: let them edit what
        spa.steps[number].problems[problem] = what;
    } else {
        spa.steps[number].problems[problem] = "";
    }
    alert("set " + number + " " + problem + " to " + what);
}
function XXsetValue(item) {
    var number = item.parentElement.parentElement.id;
    if (number == "dialog") {
        number = $("#dialog_stepno").val();
    }
    var value = item.classList[0];
    //console.log("setValue(" + number + ") to " + value);
    spa.steps[number].value = value;
    //		alert("set "+number+" to "+spa.steps[number].type);
}
function XXsetType(item) {
    var number = item.parentElement.parentElement.id;
    if (number == "dialog") {
        number = $("#dialog_stepno").val();
    }
    var type = item.classList[0];
    var check = item.checked;

    if (check) {
        spa.steps[number].type = type;
    } else {
        spa.steps[number].type = "";
    }
}
function store(item) {
    //for step [id of grandparent]
    //sets step.[class of parent] or step.[class of parent_class of the item]
    //to the class of the item, or to field #_class
    var number = item.parentElement.parentElement.id;
    var property = item.parentElement.classList[0];
    if (number == "dialog") {
        number = $("#dialog_stepno").val();
    } else {
        number = numberFrom(number);
    }
    var value = item.classList[0];
    if (/_$/.test(property)) {
        property = property + value;	//tack value on the end, eg box_thick = thick
    }
    if (/^_/.test(value)) {
        //			//console.log($('#'+value,item.parentElement).length);
        if ($('#' + value, item.parentElement).length > 0) // if that other field exists
        {
            $('#' + value, item.parentElement).focus();	//set focus on other item
            ans = $('#' + value, item.parentElement).val();	//get the value from another item
            if (ans) value = ans;
        } else {
            var ans = window.prompt("What is " + value.replace('_', '') + "?");
            if (ans) {
                value = ans;
                if (!item.title) {
                    item.title = ans;
                    //						//console.log("Set title="+ans);
                }
            }
        }
    }

    //get rid of double __ in property
    if (/__/.test(property)) {
        property = property.replace('__', '_');
    }

    //console.log('For step ' + number + ' [' + Object.prototype.toString.call(item).slice(8, -1) + '] storing ' + property + ' = ' + value);
    //		var itemIsA = Object.prototype.toString.call(item).slice(8,-1); //HTMLInputElement or SVGTSpanElement

    if (property == "region")			//need to change highlighting
    {
        //clear prior region
        var rowRegion = item.parentElement;
        //		alert(rowRegion.children);
        for (var ts in rowRegion.children) {
            if (rowRegion.children[ts].nodeName == "tspan") {
                rowRegion.children[ts].style.fill = "#CCCCCC";
            }
        }
        item.style.fill = "#0000FF";
    }

    if (item.type == 'checkbox' && !item.checked) {
        //clear property, http://stackoverflow.com/questions/3455405/how-to-remove-a-key-from-a-javascript-object
        //was			spa.steps[number][property] = "";
        delete spa.steps[number][property];	//actually delete it
        //console.log('Removed ' + property + ' for step ' + number);
    } else if (item.type == 'text') {
        if (item.value) {
            value = item.value;
        }
        //keep what have			else {}
        spa.steps[number][property] = value;
        //console.log('Stored step ' + number + ' ' + property + '=' + value);
    } else {
        spa.steps[number][property] = value;
        //console.log('Stored step ' + number + ' ' + property + '=' + value);
    }
}
function setOther(item) {
    var number = item.parentElement.parentElement.id;
    //		alert(number);
    var check = item.checked;

    if (check) {
        var step = spa.steps[number].step;
        var who = window.prompt("What other entity is involved in the '" + step + "' step?");
        spa.steps[number].other = who;
    } else {
        spa.steps[number].other = "";
    }
    //		alert("set "+number+" to "+spa.steps[number].type);
    doList();	//refresh this one
}
function XXsetRegion(regItem) {
    var number = regItem.parentElement.parentElement.parentElement.parentElement.id;
    var region = regItem.classList[0];

    //clear prior region
    var rowRegion = regItem.parentElement;
    //		alert(rowRegion.children);
    for (var ts in rowRegion.children) {
        if (rowRegion.children[ts].nodeName == "tspan") {
            rowRegion.children[ts].style.fill = "#CCCCCC";
        }
    }

    regItem.style.fill = "#0000FF";

    spa.steps[number].region = region;
    //		alert("set "+number+" to "+region);
    //no longer necessary		showPCN();
    //	refreshPCN();	//just in case
}
function setColumns(based_on, part2add, part2remove) {
    //sets showColumns based on sortable based_on
    showColumns = [];
    $(based_on).children().each(function (index, element) {
        var id = $('input', this).attr('id');
        var part = numberFrom(id);	// was /\d/.exec(id)[0];
        if (part == part2remove) // && $(this).has('input').length && ! $('input',this).is(":checked"))
        {
            //skip it
        } else {
            showColumns.push(part * 1);
        }
        //			//console.log(based_on+" child "+index+" has parts "+showColumns);

    });

    //make sure showColumns has 0 in it
    if (showColumns.indexOf(0) == -1) {
        showColumns.unshift(0);	//tack on beginning
    }
    // add new part if specified
    if (part2add && part2add >= 0 && part2add < columnCount) {
        if (showColumns[0] == 0) //if steps is first
        {
            showColumns.splice(1, 0, part2add); //add it after steps
        } else {
            showColumns.splice(showColumns.indexOf(0) + 1, 0, part2add); //add it after steps
        }
    }

    //console.log(based_on + " has parts " + showColumns);

    //populate hidden parts
    $("#hiddenParts").empty().append("<td>Columns:</td>");

    for (var i = 1; i < columnCount; i++) {
        if (showColumns.indexOf(i) == -1) //not showing
        {
            $("#hiddenParts").append("<td bgcolor=\"" + (parts[i].bgcolor || 'white') + "\" onClick=\"setColumns('#header_row1'," + i + ");\">" + i + ". " + parts[i].title + "<span class='ui-icon ui-icon-arrowthickstop-1-s' style='float:right; cursor: pointer;' title='click to show'></span></td>");
            //not setColumns('#header_row1');
            //not showColumns.splice(1,0,"+i+");doList();
        }
    }

    doList();	//refresh
}

////////////////// show list table ////////////////////
function doList() {

    //this should be changed based on the UI input, but hard-coding it for now.
    showColumns = [0, 1, 2, 3, 4, 5, 6]

    //set the some of the attributes for the overall process
    $('#set_process').val(spa.process.process);
    $('#set_provider').val(spa.process.provider);
    $('#set_customer').val(spa.process.customer);

    var steps = spa.steps;

    //make sure showColumns has 0 in it (redundant from setColumns() but better safe than sorry)
    //aka, there should always be at least one column; the step name column
    if (showColumns.indexOf(0) == -1) {
        showColumns.unshift(0);	//tack on beginning
    }

    for (var stepNo in spa.steps) {
        var step = spa.steps[stepNo];	//grab the current step

        spa.steps[stepNo]._index = stepNo;
        spa.steps[stepNo].number = numberFrom(stepNo) + 1; //stepNo*1+1;	//set number

        if (spa.steps[stepNo].follows == "prior") delete spa.steps[stepNo].follows; //nothing

        for (var i in showColumns) {

            //#region not sure what all this is for -Brian 
            partNo = showColumns[i];
            var item = parts[partNo].item;
            //plug as necessary
            var plugs = parts[partNo].itemPlugs;
            for (var plugNo in plugs) {
                //					alert('replacing {'+plugs[plugNo]+'}');
                //replaceAll from http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
                if (typeof step[plugs[plugNo]] == "undefined") {
                    item = item.replace(new RegExp('{' + plugs[plugNo] + '}', 'g'), '');
                } else {
                    item = item.replace(new RegExp('{' + plugs[plugNo] + '}', 'g'), step[plugs[plugNo]]);
                }
            }
            //#endregion

            var selectorPrefix = '#rowStep' + (+stepNo + 1) + ' > '

            switch (partNo) {
                case 0:
                    $(selectorPrefix + 'div.tableColumnStepName > input').val(step.step)
                    break;
                case 1:
                    var type = step.type || "regular";
                    //console.log("Step " + stepNo + " type=" + type);
                    $(selectorPrefix + 'div.tableColumnStepType > select').val(type.capitalize())

                    if (type && type.length > 0) {
                        //console.log("Replacing: " + item);
                        item = item.replace(type + ' value"', type + ' value" CHECKED');
                    }
                    var other = step.other;
                    if (other && other.length > 0) {
                        item = item.replace('_other"', type + '" CHECKED');
                    }
                    break;
                case 2:
                    var region = step.region;

                    if (region) {
                        var regionNum = region.substring(1, 2);
                    }

                    //this will work when I get Grant's code
                    $(selectorPrefix + 'div.tableColumnProcessRegion > div > div:nth-child(2) > div:nth-child(' + regionNum + ') > input[type="radio"]').prop("checked", true)


                    if (region && region.length > 0) {
                        item = item.replace(region + ' value', region + ' value" fill="#0000FF');
                    }
                    break;
                case 3:
                    var value = valueLevels[step.value];

                    $(selectorPrefix + 'div.tableColumnCustomerValue > select').val(value)

                    if (value && value.length > 0) {
                        item = item.replace(value + ' value"', value + ' value" CHECKED');
                    }
                case 4:
                    //this one is kind of broken because of the UI...there are supposed to be multiple you can leave selected
                    var problems = ["inconvenient", "confusing", "difficult", "likely_to_fail"];
                    for (var p in problems) {
                        var problem = problems[p];
                        if (what = step["problem_" + problem]) {
                            //							//console.log("Step "+stepNo+" problem_"+problem+"="+what);
                            //							//console.log("ITEM:"+item);

                            item = item.replace(problem + ' valuelink"', problem + ' valuelink" CHECKED title="' + what + '"');
                        }
                    }
                case 5:
                    //still need to figure this part out.  -Brian
                    var value = step.follows || 'prior';
                    //					//console.log("Step "+stepNo+" follows="+value);
                    if (value && value.length > 0) {
                        //						//console.log("item:"+item);
                        if (/\d/.test(value)) {
                            item = item.replace(' valuelink"', ' valuelink" CHECKED');
                            item = item.replace('valueinput"', 'valueinput" value="' + value + '"');
                        } else {
                            item = item.replace(value + ' value"', value + ' value" CHECKED');
                        }
                    }
                case 6:
                    //this part will require setting the value in the popup box
                    if (step.box_dash) {
                        item = item.replace('dash value"', 'dash value" CHECKED');
                    }
                    if (step.box_thick) {
                        item = item.replace('thick value"', 'thick value" CHECKED');
                    }
                    if (step.skip_rows) {
                        item = item.replace('valueinput"', 'valueinput" value="' + step.skip_rows + '"');
                    }
            }
        }

        var rowCount = $('.tableRow').length
        if (rowCount != spa.steps.length) {
            addStepRow();
        }
    };

}

//http://stackoverflow.com/questions/14911157/renumbering-input-tag-name-fields-after-using-jqueuy-sortable
function reorderSteps($list, number) {
    //reorders spa.steps after a drag and drop

    //from upstep()...
    var movedstep = spa.steps[number]; //save it
    spa.steps.splice(number, 1);	//remove it


    $list.find('tr').each(function (idx) {
        //console.log("->element " + idx + " was element " + $(this).attr('id')); //indexes 0..7 of table rows
        if ($(this).attr('id') == number) {
            //TODO: The following could be replaced with one line...
            if (number < idx) //moving an item down the list
            {
                //console.log("  MOVED DOWN");
                spa.steps.splice(idx, 0, movedstep); //restore it
            } else {
                //console.log("  MOVED UP (or stayed the same)");
                spa.steps.splice(idx, 0, movedstep); //restore it
            }
            doList();
            //might as well break out of this each loop!
        }
        //			var rowno = $(this).id();
        //			var $inp = $(this).find('input');
        //			$inp.each(function () {
        //				this.name = this.name.replace(/(\[\d\])/, '[' + idx + ']');            
        //			})
    });
}

//TODO: is it better to do this with store()...
function updatestep(stepinput) {
    var rowIndex = $(stepinput.parentElement.parentElement).index();
    var number = rowIndex - 1;
    var typingID = stepinput.id; //save the id since doList will change the DOM
    spa.steps[number].step = stepinput.value;
    //check if we still need a new one at the end
    if (spa.steps[spa.steps.length - 1].step != "") {
        //doList();	//force add a new item at the end and redraw
        //of course, that wipes out the DOM, so need to find the one
        //			alert(typingID);
        var typingat = document.getElementById(typingID);
        //			alert(typingat);
        if (typingat != null) {
            //				alert(typingat.value.length);
            typingat.focus();
            typingat.selectionStart = typingat.value.length;
            typingat.selectionEnd = typingat.value.length;
        }
    }
    if (always_showPCN) {
        showPCN();
    }
}
function setPropertyDialog(stepNumber) {
    //sets the property Dialog for spa.step[stepNumber]

    //console.log("setPropertyDialog(" + stepNumber + ")");

    //clear highlight in list table if showing
    //		$(".stepdata.property .step > .valueinput").css('background-color','white');	//set them in mass

    var prior_stepNumber = numberFrom($(".dialog_step_div").attr('id'));
    //$("#dialog_stepno").val();
    if (prior_stepNumber >= 0) {
        $("#input_" + (1 * prior_stepNumber + 1)).css('background-color', 'white');
        //console.log("Left (and whitened) " + "#input_" + prior_stepNumber);
    }

    $("#input_" + (1 * stepNumber + 1)).css('background-color', 'yellow');

    //		var oldtitle = $("#dialog").dialog("option","title");
    var newtitle = spa.steps[stepNumber].step;
    //		//console.log("Oldtitle="+oldtitle);
    //		//console.log("Newtitle="+newtitle);

    //		var old_stepno = $("#dialog_stepno").val();
    //		var new_stepno = stepNumber;
    //		//console.log("Dialog changing from step "+old_stepno+" to step "+new_stepno);

    //		//save old - no saves as it goes!

    //show new
    var step = spa.steps[stepNumber];
    $("#dialog_stepno").val(stepNumber); //tells which it is
    $(".dialog_step_div").attr('id', 'showing' + stepNumber); //for benefit of store()
    //		$('#dialog :radio').prop('checked',false);

    $("#dialog").dialog({ title: step.step });

    if (/(regular|wait|decision)/.test(step.type)) //valid step.type
    {
        $('#dialog #type_' + step.type).prop('checked', true);
    } else {
        $('#dialog #type_regular').prop('checked', true); //default
    }
}
function showPropertyDialog(stepNumber) {
    if (!$("#dialog").dialog("isOpen")) {
        $("#dialog").dialog("open").dialog("moveToTop");
        //console.log("REOPEN");

    }
    $("#dialog").dialog("moveToTop");
}
function show_properties(stepChild) {
    var stepNo = numberFrom(stepChild.parentElement.parentElement.id);
    setPropertyDialog(stepNo);
    showPropertyDialog(stepNo);
}
function OLD_show_properties(stepChild) {
    //		if (! $('#always_showPCN').is(":checked")) { return; } //HUH???TK

    stepinput = $('input:text', stepChild.parentElement).get(0);	//get the input field

    //		$(".step_step").css('background-color','white');	//set them in mass

    stepinput.style.backgroundColor = 'yellow';
    //		$('input:text',stepinput.parentElement).css("background-color","yellow");

    var number = stepinput.parentElement.parentElement.id;
    var old_stepno = $("#dialog_stepno").val();
    if (old_stepno >= 0) {
        $("#input_" + (1 * old_stepno + 1)).css('background-color', 'white');
        //console.log("Left (and whitened) " + "#input_" + old_stepno);
    }

    var typingID = stepinput.id; //save the id since doList will change the DOM
    //		//console.log("Showing properties for step "+number);
    //		//console.log($("#dialog").dialog("isOpen"));

    var oldtitle = $("#dialog").dialog("option", "title");
    var newtitle = stepinput.value;
    //		//console.log("Oldtitle="+oldtitle);
    //		//console.log("Newtitle="+newtitle);

    //		var old_stepno = $("#dialog_stepno").val();
    var new_stepno = number;
    //console.log("Dialog changing from step " + old_stepno + " to step " + new_stepno);

    //		//save old
    //		if (old_stepno >= 0)
    //		{
    //			var oldstep = spa.steps[old_stepno];
    //			var set_type = $( "#dialog input:radio[name=step_type]:checked" ).val();
    //			if (set_type && step_type != oldstep.type)
    //			{
    //				//console.log("Type changed from "+oldstep.type+" to "+set_type);
    //				oldstep.type = set_type;
    //			}
    //		}

    //show new
    var newstep = spa.steps[number];
    $("#dialog_stepno").val(new_stepno);
    //		$('#dialog :radio').prop('checked',false);
    if (/(regular|wait|decision)/.test(newstep.type)) {
        $('#dialog #type_' + newstep.type).prop('checked', true);
    } else {
        $('#dialog #type_regular').prop('checked', true);
    }


    if (!$("#dialog").dialog("isOpen")) {
        $("#dialog").dialog("open").dialog("moveToTop");
        //console.log("REOPEN");

    }

    if (newtitle != oldtitle) {
        $("#dialog").dialog({ title: newtitle });
        //console.log("Changed title.");
    }
    $("#dialog").dialog("moveToTop");
    $("#dialog").dialog({ title: stepinput.value });
}
function blankstepatend() {
    //		alert(spa.steps.length);
    if (spa.steps[spa.steps.length - 1].step != "") {
        spa.steps.push({ "step": "", "domain": "patient" });
    }
}
function removeStep(rowIndex) {
    console.log(rowIndex)
    var number = rowIndex - 1;//getNumberFromRowId(rowId);
    //get confirmation unless blank
    if (spa.steps[number].step == "" || !$("#confirm_delete").is(':checked') || window.confirm("Delete the '" + spa.steps[number].step + "' step?")) {
        spa.steps.splice(number, 1);
        //doList();


    }
}

// <span title="move up" onClick="upstep(this);">&uArr;</span><span title="move down" onClick="downstep(this);">&dArr;</span>
//TODO: no longer need the following two functions (have drag and drop)...
function upstep(item) {
    var number = item.parentElement.parentElement.id;
    if (number < 1) {
        alert('already at top');
    } else {
        var movedstep = spa.steps[number]; //save it
        spa.steps.splice(number, 1);	//remove it
        spa.steps.splice(number - 1, 0, movedstep); //restore it
        doList();
    }
}
function downstep(item) {
    var number = item.parentElement.parentElement.id * 1;	//must convert to number so can add 1 below
    if (number > spa.steps.length - 1) {
        alert('already at bottom');
    } else {
        var movedstep = spa.steps[number]; //save it
        spa.steps.splice(number, 1);	//remove it
        spa.steps.splice(number + 1, 0, movedstep); //restore it
        doList();
    }
}
function insertstepat(item) {
    var number = item.parentElement.parentElement.id;
    var movedstep = spa.steps[number]; //save it
    spa.steps.splice(number, 0, { "step": "", "domain": "patient" });
    doList();
}
function stepfollows(item) {
    //determine what step follows this item
    var number = item.parentElement.parentElement.id;
    var follows = spa.steps[number].follows; //save it
    follows = window.prompt("What step(s) does this step directly follow?\nEnter 0 for none (a starting step)\nEnter " + follows + ":yes or " + follows + ":no for arrow label", follows);
    spa.steps[number].follows = follows;
    doList();
}
function generateDiagram() { //returns an SVG diagram jquery object

    var steps = spa.steps;
    var setup = spa.process;

    var top_height = 120;
    var region_width = 180;
    var diagram_width = region_width * 6;

    region_height = spa.steps.length * 100 - 100;	//subtract 100 for the blank one
    //		//console.log("region_height="+region_height);

    //		var diagram = $('#diagram');
    var diagram = $(svgStart.replace("1120", (region_height + 120)) + svgEnd);

    //		diagram.empty();
    diagram.append(pcnbackground.replace(/444/g, region_height));

    var row = "";

    //PCN HEADERS
    row = '<text xml:space="preserve" text-anchor="middle" font-family="serif" font-size="24" id="st_process" y="40" x="540" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#00007f" fill="#000000">' + setup.process + '</text>';
    diagram.append(row);

    row = '<text xml:space="preserve" text-anchor="middle" font-family="serif" font-size="24" id="st_process" y="80" x="540" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#00007f" fill="#000000">PCN Diagram</text>';
    diagram.append(row);

    row = '<text xml:space="preserve" text-anchor="start" font-family="serif" font-size="24" id="st_provider" y="100" x="10" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#00007f" fill="#000000">' + setup.provider + ' process domain</text>';
    diagram.append(row);

    row = '<text xml:space="preserve" text-anchor="end" font-family="serif" font-size="24" id="st_provider" y="100" x="' + (diagram_width - 10) + '" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#00007f" fill="#000000">' + setup.customer + ' process domain</text>';
    diagram.append(row);


    var x1 = 0;	//coordinates of last step
    var y1 = top_height + 25 - 60; //step 0 is 100 up
    var last_step_number = 999; //should not use 999
    var step_box = false;	//always delays steps for layers over lines

    for (var stepNo in spa.steps) {
        spa.steps[stepNo].number = stepNo * 1 + 1;	//set number
        if (!spa.steps[stepNo].diagram) {
            spa.steps[stepNo].diagram = {}; //prevent errors below
        }

        var step = spa.steps[stepNo];	//grab the current step

        if (typeof step.step == "undefined" || step.step.length == 0) continue; //skip blank steps

        var x = 1;
        if (step.region && regions[step.region] > 0) {
            x = (regions[step.region] - 1) * region_width + 10;
        } else {
            x = 1;
        }

        var follows = step.follows;
        //			var y = top_height + 25 + 100 * stepNo;
        var y = y1 + 100;

        if (!follows) {
            y = y1 + 60;
        }
        else if (follows == 0 || follows == "start") {
            y = top_height + 25;	//top
        }
        else if (follows && follows > 0 && spa.steps[follows] && spa.steps[follows].diagram.y) {
            y = spa.steps[follows].diagram.y + 100;	//just below what it follows
        } else {
            y = y1 + 60;
        }
        //			//console.log("Step "+step.number+" checking "+step.skip_rows+" skip_rows");
        if (step.skip_rows && (no = numberFrom(step.skip_rows))) {
            y += 100 * no;	//if skipping rows
            //				//console.log("Step "+step.number+" Skipping "+step.skip_rows+" rows which is "+no);
        }

        spa.steps[stepNo].diagram.y = y;	//save it so can use later

        //			//console.log("y="+y+" for step:"+step.step);

        //			alert(step.region+"="+regions[step.region]+" gives x="+x+" y="+y);

        //CONNECTOR LINE
        var x2 = x + 90; //coordinates of end point
        var y2 = y + 40;
        //			alert("x2="+x2+" y2="+y2);
        if (follows == 0 || follows == "start") {
            //				//console.log("NO ARROW");
        } else
            if (x1 > 0) {
                //				diagram.append('<line id="svg_5" y2="'+y2+'" x2="'+x2+'" y1="'+y1+'" x1="'+x1+'" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" marker-mid="url(#markerArrow)" stroke-width="2" stroke="#00007f" fill="none"/>');

                var x1a = (x1 * 1 + x2 * 1) / 2;
                var y1a = (y1 * 1 + y2 * 1) / 2;

                //did not work... var linegroup = $('<g></g>');
                var marker = "markerArrow";
                var follows = step.follows || '';
                if (/yes/.test(follows)) {
                    //					//console.log("marker:yes");
                    marker = 'markerYes';
                } else if (/no/.test(follows)) {
                    marker = 'markerNo';
                }

                diagram.append('<polyline stroke="#00007f" marker-mid="url(#' + marker + ')" id="svg_line' + step.number + '" fill="none" stroke-width="2" points="' + x1 + ' ' + y1 + ' ' + x1a + ' ' + y1a + ' ' + x2 + ' ' + y2 + '" se:connector="svg_' + last_step_number + ' svg_' + step.number + '" />');

            }
        x1 = x2;
        y1 = y2;
        last_step_number = step.number; //in case we wind up skipping a step


        //STEP BOX
        if (step_box) diagram.append(step_box);

        var stroke_width = 2;
        if (step.box_thick) stroke_width = 4;
        var stroke_dash = 'null';
        if (step.box_dash) stroke_dash = '5,5';
        var clickPopup = ' onclick="setPropertyDialog(' + stepNo + ');" style="cursor:help;"';
        //new step box
        step_box = $('<g></g>');	//always delays steps for layers over lines
        if (step.type == "wait") {
            step_box.append('<path id="svg_' + step.number + '" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="' + stroke_dash + '" stroke-width="' + stroke_width + '" stroke="#00007f" fill="#fffff0" d="m'
            + x + ',' + y +
            ' m-5,0 l170,0 l-10,60 l-150,0 z" />');
        } else if (step.type == "decision") {
            step_box.append('<path id="svg_' + step.number + '" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="' + stroke_dash + '" stroke-width="' + stroke_width + '" stroke="#00007f" fill="#fffff0" d="m'
            + x + ',' + y +
            ' m10,0 l140,0 l10,10 l0,40 l-10,10 l-140,0 l-10,-10 l0,-40 z" />');
        } else {
            step_box.append('<rect id="svg_' + step.number + '" height="60" width="' + (region_width - 20) + '" y="' + y + '" x="' + x + '" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="' + stroke_dash + '" stroke-width="' + stroke_width + '" stroke="#00007f" fill="#fffff0"' + clickPopup + ' />');
        }

        var textx = x * 1 + 5;
        var texty = y * 1 + 5 + 10;

        //put text in the box
        //old			step_box.append('<foreignObject x="'+textx+'" y="'+texty+'" width="'+(region_width-30)+'" height="80"><p style="font-size:large; text-align:center" xmlns="http://www.w3.org/1999/xhtml">'+step.step+'</p></foreignObject>');

        step_box.append(textWrapSVG(step.step, textx, texty, region_width - 30));

        var value_symbols = { 'very': '&#9786;&#9786;', 'somewhat': '&#9786;', 'not': '&#9785;' };

        //the following PREVENTS svg-edit from loading data
        if ($('#show_smileys').is(':checked') && step.value) {
            var symbol = value_symbols[step.value];
            if (typeof symbol != 'undefined') {
                step_box.append('<text id="value_' + step.number + '" x="' + (x + region_width - 22) + '" y="' + (y + 56) + ' stroke="#007700" font-size="24" font-weight="normal" fill="#007f00" text-anchor="end">'
                + symbol
                + '</text>');
            }
        }


    }

    diagram.append(step_box);	//append the last step box

    //debugger
    //    var f = '12px arial'; 
    //
    //    var tspan_element = document.createElementNS(svgNS, "tspan");
    //		tspan_element = document.getElementById('debugtspan');
    //		tspan_element.style.fontFamily = 'Cursive';
    //		tspan_element.style.fontSize = 'large';
    //		tspan_element.style.font = f;
    //		tspan_element.x = 100;
    //		tspan_element.y = 100;
    //		tspan_element.innerHTML = 'Hello World';
    //
    //    alert(tspan_element.getComputedTextLength());
    //		var j1 = $(tspan_element);
    //		alert(j1.width());

    return diagram;
};
function textWrapSVG(text, textx, texty, width) { //returns SVG text jQuery object
    //		textx += width/2;	//for centering

    var textObject = $('<text font-family="Serif" font-size="large" fill="#ff0000" text-anchor="left" x="' + textx + '" y="' + texty + '" width="' + width + '" height="80"></text>');

    //TODO: This function has a lot of stuff that is never used, and should be removed

    //		var tspan_element = document.createElementNS(svgNS, "tspan");   // Create first tspan element
    //		tspan_element.x = 0;
    //		tspan_element.style.fontFamily = 'Cursive';
    //		tspan_element.style.fontSize = 'large';

    //		tspan_element.setAttributeNS(null, "dy", 18);

    var allwords = text.split(' ');
    allwords.push('~DUMMY~');	//dummy marker to show the end - simplifies
    var nextword = allwords.shift();
    var nextwordlen = nextword.length;
    var line = nextword;	//grab the first word
    var tspan_element = document.getElementById('debugtspan');
    tspan_element.innerHTML = line;
    var dx = 0;

    //		//console.log('Wrapping '+text+' (width='+width+')');

    var linecount = 0;

    for (var i = 0; i < allwords.length; i++) {
        nextword = allwords[i];
        nextwordlen = nextword.length;
        // Add next word
        var len = tspan_element.innerHTML.length;             // Find number of letters previously
        tspan_element.innerHTML = line + " " + nextword;
        //				tspan_element.innerHTML += " " + tspan_element.style.fontSize + tspan_element.getComputedTextLength();

        //				//console.log('  line='+line);
        //				//console.log('  length='+tspan_element.getComputedTextLength());

        if (tspan_element.getComputedTextLength() > width || nextword == '~DUMMY~') {
            tspan_element.innerHTML = line;
            linewidth = tspan_element.getComputedTextLength();
            linehalf = -Math.round(linewidth / 2);
            if (dx == 0) { //first line
                //						textObject.append(('<tspan>'+line+'</tspan>')); //tack it on
                textObject.append(('<tspan dx="' + (width / 2 + linehalf) + '">' + line + '</tspan>')); //tack it on
            } else {
                dx += linehalf; //subtract half of the current line
                textObject.append(('<tspan dx="' + dx + '" dy="20">' + line + '</tspan>')); //tack it on
            }
            //					var tspan_line = $('<tspan dx="'+dx+'" dy="20">'+line+'</tspan>'); //make a generic tspan
            dx = linehalf;
            //					//console.log('  spit='+line);
            tspan_element.innerHTML = nextword;    // use leftover word
            line = nextword;	//start next line
            //						tspan_element.setAttributeNS(null, "x", 10);	//set next position
            //						tspan_element.setAttributeNS(null, "dy", 18);
            linecount++;
        } else {
            line += ' ' + nextword;
        }
    }
    //		//console.log('  leftover='+line);
    //		tspan_element.innerHTML = line;
    //		linewidth = tspan_element.getComputedTextLength();
    //		linehalf = -Math.round(linewidth/2);
    //		if (dx != 0) dx += linehalf; //subtract half of the current line
    //		var tspan_line = $('<tspan dx="'+dx+'" dy="20">'+line+'</tspan>'); //make a generic tspan
    //		textObject.append(tspan_line); //tack it on

    //set the vertical drop
    textObject.attr('y', texty + 30 - (linecount * 10));

    return textObject;

}

//googled "jquery force redraw svg"
//THANK YOU http://jcubic.wordpress.com/2013/06/19/working-with-svg-in-jquery/
$.fn.xml = function () {
    return (new XMLSerializer()).serializeToString(this[0]);
};
$.fn.DOMRefresh = function () {
    return $($(this.xml()).replaceAll(this));
};
function showPCN(tommysJson) {
    //var diag = generateDiagram();
    var json = tommysJson || convertSpaToTommysJson(spa);
    var diag = getPcnChart(json);

    //		//console.log("Counter="+(debug_i++)+" Steps="+spa.steps.length+" region_height="+region_height +" Diagram height = " +$("#diagram").height());

    //done in generateDiagram()		$("#diagram").height(region_height+120);
    //		$("#dump").replaceWith("Counter="+(debug_i++)+" Steps="+spa.steps.length+" Diagram height = "+$("#diagram").height());
    //		//console.log(" region_height="+region_height +" Diagram height = " +$("#diagram").height());

    if (thewin && thewin.document) {
        //console.log("updating popup");
        //			thewin.document.write('<br>GREETINGS');
        $(thewin.document.body).html(diag); //this REPLACES whatever was there before
        var svgGuts = $(thewin.document.body).html();	//get it in HTML format
        //refresh... http://stackoverflow.com/questions/10333128/svg-update-through-jquery-works-in-ff-but-not-in-safari-any-ideas
        $(thewin.document.body).html(svgGuts);
        //			$(thewin.document.body).DOMRefresh();  //crash

    }


    //Brian commented out the if statement below
    //if ($("#show_pcn_below").is(":checked")) {
    //also show it below
    //console.log("updating diagram below");
    $("#diagram").replaceWith(diag);
    //refresh... 
    $("#diagram").DOMRefresh(); //works - function declared above
    //}

    //http://stackoverflow.com/questions/10333128/svg-update-through-jquery-works-in-ff-but-not-in-safari-any-ideas
    //		$("#diagram").html($("#diagram").html());		//works with Chrome, but not Firefox
    //		$("#diagram").hide();
    //		$("#diagram").show();
    //		var diag = document.getElementById("diagram"); //go to provider field
    //		diag.style.webkitTransform = 'scale(1)';
}
function refreshPCN() {
    if (true || $('#always_showPCN').is(":checked"))	//TK hard-coded always
    {
        clearTimeout(refreshTimer);	//stop prior one
        refreshTimer = setTimeout(showPCN(), 1000);
    }
}
function pcnBelow() {
    //toggle whether show the PCN below the steps table
    if ($("#show_pcn_below").is(":checked")) {
        showPCN(); //just refresh it
    }
    else {
        //make it disappear by replacing it with a SVG DOM element (using a blank strick caused error)
        $("#diagram").replaceWith('<svg width="1080" height="100" xmlns="http://www.w3.org/2000/svg" id="diagram"></svg>');
    }
}
function popup(json) {

    if (!json) {
        json = convertSpaToTommysJson(spa);
    }

    var diag = pcnchart(json);

    //console.log("thewin=" + thewin);
    if (!thewin || !thewin.document || !thewin.window) {
        //console.log("opening thewin");
        thewin = window.open('', 'popup', 'toolbar=yes,location=no,status=no,menubar=yes,scrollbars=yes,resizable=yes,width=1100,height=800,left=200,screenX=200');

        //,'width=1100,height=900,left=100,top=20,menubar=1,status=0,resizable=yes');
        //		
    }

    thewin.focus();
    //		thewin.document.write('<pre id="it">');
    thewin.document.write('GREETINGS');	//have to write SOMETHING at the start to add to the bottom
    //		thewin.document.write('</pre>');
    //		thewin.document.close();

    //see http://stackoverflow.com/questions/3841100/write-content-to-new-window-with-jquery
    $(thewin.document.body).html(diag); //this REPLACES whatever was there before
    var svgGuts = $(thewin.document.body).html();	//get it in HTML format
    //refresh... http://stackoverflow.com/questions/10333128/svg-update-through-jquery-works-in-ff-but-not-in-safari-any-ideas
    $(thewin.document.body).html(svgGuts);

    thewin.document.body.classList.add('popup')

    $(thewin.document.head).append('<link rel="stylesheet" href="include/css/style.css">')
    //		alert($(thewin.document.body).html());
    if (false)	//interesting and works
    {
        thewin.document.write("<br />SVG:<br /><textarea rows='10' cols='100'>");
        thewin.document.write(diag.html());
        //			thewin.document.write(svgStart+diag.html()+svgEnd);
        thewin.document.write("</textarea>");
        thewin.document.write("<br />JSON:<br /><textarea rows='10' cols='100'>");
        thewin.document.write(JSON.stringify(spa, null, '\t'));
        thewin.document.write("</textarea>");
    }
    thewin.document.close();
}
function svgEdit() {
    //		alert(svgEditWindow);
    //		if (!svgEditWindow || !svgEditWindow.svgCanvas) //not created, or not loaded

    try //to populate
    {
        //			alert("populating svg edit");
        //			alert(svgEditWindow.svgCanvas);
        //			alert(svgEditWindow.svgCanvas.setSvgString);

        //			var testjunk = '<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><g> <title>Layer 1</title> <rect id="svg_1" height="105" width="174" y="50" x="40" stroke-width="5" stroke="#000000" fill="#00ff7f"/> </g> </svg>';

        svgEditWindow.focus();
        //			var diag = generateDiagram();
        //replaces are necessary if svg-edit is to read the line markers
        var diag = svgStart + generateDiagram().html()
        .replace('markerheight=', 'markerHeight=')
        .replace('markerwidth=', 'markerWidth=')
        .replace('viewbox=', 'viewBox=')
        .replace('refx=', 'refX=')
        .replace('refy=', 'refY=') + svgEnd;

        var reply = svgEditWindow.svgCanvas.setSvgString(diag);
        //			alert(reply);
        svgEditWindow.svgCanvas.zoomChanged(svgEditWindow, 'canvas'); //zoop to canvas,selection,layer,content
    }
    catch (e) {
        alert("This opens the diagram editor.\n\nClick the [Edit PCN Diagram] button again to\nload or reload your diagram in the editor.");
        //'http://services.byu.edu/svg/svg-editor.html'
        svgEditWindow = window.open('../svg/svg-editor.html', 'svgedit', 'toolbar=yes,location=no,status=no,menubar=yes,scrollbars=yes,resizable=yes,width=1100,height=1200,left=200,screenX=200');
        //,'width=1100,height=900,left=100,top=20,menubar=1,status=0,resizable=yes');
        svgEditWindow.focus();
    }
}
function loadPCN() {
    var temp;
    try {
        spa = JSON.parse($("#json2load").val());
        doList();
    }
    catch (err) {
        alert("The Service Process Analsis data has errors so was NOT loaded.");	//+err.message
    }
}
function putSVG() {
    var diag = generateDiagram().html()
    .replace('markerheight=', 'markerHeight=')
    .replace('markerwidth=', 'markerWidth=')
    .replace('viewbox=', 'viewBox=')
    .replace('refx=', 'refX=')
    .replace('refy=', 'refY=');

    //		//console.log('load '+diag.html());

    $("#svg2load").val(svgStart + diag + svgEnd);
}
function new_spa() {
    if (confirm("Clear all data and start anew?")) {
        //did not work			spa = $(blank_spa).clone();
        spa = JSON.parse(JSON.stringify(blank_spa));
        doList();
        //			showPCN(); //better to just show it if it is already showing, or hide it.
        $("#diagram").empty(); //clear out any showing diagram
        var focusfield = document.getElementById("set_provider"); //go to provider field
        if (focusfield) {
            focusfield.focus();
            focusfield.selectionStart = 0; //select everything typingat.selectionEnd;
        }
    }
}
function numberFrom(idString) { //extracts number from an id string
    if (/\d+/.test(idString)) {
        //			//console.log("numberFrom("+idString+") returns "+parseFloat(1*(/[-+\d\.]+/.exec(idString)[0])));
        return 1 * (/[-+\d\.]+/.exec(idString)[0]);	//TODO: add error checking
    } else {
        //console.log("numberFrom(" + idString + ") returned null");
        return null;
    }
}
function hideColumn(headingChild) {
    //		alert("DO NOT HIDE");
    var partNo = numberFrom(headingChild.parentElement.id);	//must convert to number so can add 1 below
    setColumns("#header_row1", null, partNo);
}
function firstColumn(headingChild) {
    var partno = numberFrom(headingChild.parentElement.id);	//must convert to number so can add 1 below
    //moves that item to the first
    if (partno > 0 && partno < columnCount) {
        showColumns = [0];	//always show 0
        //bad, i is string!			for (var i in [0,1,2,3]) {
        for (var i = 0; i < 4; i++) {
            var part = ((partno - 1 + i) % 4) + 1;
            showColumns.push(part);
        }
        doList();	//refresh
    }
}
function drSampsonsOldDocumentReady() {
    $("#dialog").dialog({
        autoOpen: false,
        show: {
            effect: "drop",
            duration: 200
        },
        hide: {
            effect: "drop",
            duration: 200
        }
    });

    $("#help").dialog({ autoOpen: false });

    // no need for ok because it saves as you make changes
    //		$( "#dialog" ).dialog(
    //		{ buttons: [
    //				{ text: "Ok", click: function() { $( this ).dialog( "close" ); } } ] }
    //		);

    //    $( "#opener" ).click(function() {
    //      $( "#dialog" ).dialog( "open" );
    //    });

    $("#showcols").dialog({
        autoOpen: false,
        show: {
            effect: "clip",
            duration: 200
        },
        hide: {
            effect: "clip",
            duration: 200
        }
    });

    $("#cols2show").sortable({
        placeholder: "ui-state-highlight",
        update: function (event, ui) { setColumns("#cols2show"); }
    }).disableSelection();

    $("#hiddenParts").sortable({
        placeholder: "ui-state-highlight",
        update: function (event, ui) { setColumns("#header_row1"); }
    }).disableSelection();


    //This line was in his "other" on document ready function.  I consolidated the two functions. --Brian
    $("#mainMenu").menu({ position: { at: "left bottom" } });

    setColumns("#header_row1", columnCount - 1); //has	doList();	//this needs to be at the bottom or in onLoad
    $("#dataMenu").hide();
    $("#svgMenu").hide();
    $("#serverData").hide();

};
var cleanUp = function (a) {
    a.textContent = ''; //'Downloaded';
    a.dataset.disabled = true;

    // Need a small delay for the revokeObjectURL to work properly.
    setTimeout(function () {
        window.URL.revokeObjectURL(a.href);
    }, 1500);
};
var downloadFile = function () {
    window.URL = window.webkitURL || window.URL;

    var prevLink = output.querySelector('a');
    if (prevLink) {
        window.URL.revokeObjectURL(prevLink.href);
        output.innerHTML = '';
    }

    var a = document.createElement('a');
    //savename stuff added by SES...
    var savename = "";
    if (container.querySelector('input[type="text"]')) {
        savename = container.querySelector('input[type="text"]').value;
    }
    if (!savename) {
        var guess = spa.meta.savename || spa.process.process.toLowerCase().replace(/\s/g, "_");
        savename = window.prompt("Save file name?", guess);
        if (!savename) {
            return;
        }
    }
    if (! /.txt$/i.test(savename)) {
        savename = savename + '.txt';
    }
    spa.meta.savename = savename;	//save it for later
    //moved from above so will reflect savename...
    var bb = new Blob([JSON.stringify(spa, null, " ")], { type: MIME_TYPE });

    a.download = savename;
    a.href = window.URL.createObjectURL(bb);
    a.textContent = 'Click here to download';

    a.dataset.downloadurl = [MIME_TYPE, a.download, a.href].join(':');
    a.draggable = true; // Don't really need, but good practice.
    a.classList.add('dragout');

    a.style.color = 'red'; //make it stand out

    output.appendChild(a);

    a.onclick = function (e) {
        if ('disabled' in this.dataset) {
            return false;
        }

        cleanUp(this);
    };
};
function loadSPAdata() {
    var temp;
    var filename = $("#server_data_files").val();
    if (!filename || filename.length < 4) {
        alert("You must select a file first");
        return;
    }
    try {
        $.getJSON("data/" + filename, function (json) {
            //		    //console.log(json); // this will show the info it in firebug console
            spa = json;	//why not just get spa directly?  In case it is not a valid file.	
            doList();

            $("#serverData").slideUp();

        }).fail(function () {
            alert("Sorry, could not load " + filename);
        })
        ;
    }
    catch (err) {
        alert("The Service Process Analsis data has errors so was NOT loaded.");	//+err.message
    }
}
function getDataFilenames() {
    //		//console.log("About to ajax.");
    //NOTE that this assumes that the file list shows up as a bunch of hot links - Apache dependent
    $.ajax({
        url: "data/", // this is just a url that is responsible to return files list 
        success: function (data) {
            //							//console.log("ajax success:"+data);
            $("#server_data_files").empty();
            $(data).find("a").each(function () {
                // will loop through
                var filename = $(this).attr("href");
                if (filename.match(/[-\w].txt/i)) {
                    $("<option>" + filename + "</option>").appendTo("#server_data_files");
                    //console.log("Found a file: " + filename);
                } else {
                    //									//console.log("NOT a data file: " + filename);
                }
            });
        }
    });
    //		//console.log("Done ajax.");
}
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}



/////////Brian's global vars

//for converting between sampson's regions and tommys
var regionTable = {
    'r1': 'independent',
    'r2': 'surrogate',
    'r3': 'direct_leading',
    'r4': 'direct_shared',
    'r5': 'direct_leading',
    'r6': 'surrogate',
    'r7': 'independent',
    'undefined': 'independent'
}

var providerRegionTable = {
    'independent': 'r1',
    'surrogate': 'r2',
    'direct_leading': 'r3',
    'direct_shared': 'r4',
    'undefined': 'independent'
}

var customerRegionTable = {
    'independent': 'r7',
    'surrogate': 'r6',
    'direct_leading': 'r5',
    'direct_shared': 'r4',
    'undefined': 'independent'
}

function convertSpaToTommysJson(spa) {

    //just a dummy json that has most of the other values the script needs, we will change the ones we need
    var json = { "_id": "54829d220423c00800bee2e2", "group": { "_id": "547f72412c404308007d30e0", "user": "547f72042c404308007d30d5", "__v": 0, "members": [{ "firstName": "Brian", "lastName": "Farnsworth", "email": "fakeemail@fake.com", "username": "bkfarns", "displayName": "Brian Farnsworth", "_id": "547f72042c404308007d30d5" }], "created": "2014-12-03T20:27:45.658Z", "name": "Awesome Group" }, "__v": 0, "steps": [{ "id": "91dd9275-4bb5-44f1-eddf-c875c740a26b", "title": "needs pizza", "type": "process", "emphasized": false, "value_specific": 0, "value_generic": 0, "predecessors": [], "domain": { "id": "cbf432a4-49dd-404d-8757-f2c478b02794", "region": { "type": "independent" } }, "problems": [] }, { "id": "6d749563-ba33-4d30-f83b-7dbb923c6bf7", "title": "has pizza", "type": "process", "emphasized": false, "value_specific": 0, "value_generic": 0, "predecessors": [{ "id": "91dd9275-4bb5-44f1-eddf-c875c740a26b", "type": "normal_relationship", "title": "" }], "domain": { "id": "cbf432a4-49dd-404d-8757-f2c478b02794", "region": { "type": "independent" } }, "problems": [] }, { "id": "90cb8795-8c6c-4a17-9392-941a10c06de6", "title": "has to do something", "type": "process", "emphasized": false, "value_specific": 0, "value_generic": 0, "predecessors": [{ "id": "6d749563-ba33-4d30-f83b-7dbb923c6bf7", "type": "normal_relationship", "title": "" }], "domain": { "id": "f145e636-5618-4efc-d7af-effad5952afe", "region": { "type": "independent" } }, "problems": [] }], "created": "2014-12-06T06:07:30.477Z", "domains": [{ "id": "f145e636-5618-4efc-d7af-effad5952afe", "title": "PRovider name", "subtitle": "Provider" }, { "id": "cbf432a4-49dd-404d-8757-f2c478b02794", "title": "customer name", "subtitle": "Customer" }], "metadata": { "author": "Brian Farnsworth", "description": "Some description", "title": "PcnTitle" } }

    //get the domain ids
    var providerId = '1'
    var customerId = '2'

    //set the chart title
    json.metadata.title = spa.process.process

    //add enough steps to 
    json.steps = [];

    //add all the steps in
    for (var i = 0; i < spa.steps.length; i++) {
        var currentJsonStep = json.steps[i];
        var currentSpaStep = spa.steps[i];

        //things you have to change so far:
        //the title
        //the id needs to be unique between each one, so I add i to it. 
        //will need to fix things witht he domain, right now it is always in customer

        if(currentSpaStep.type == "regular") currentSpaStep.type = "process"

        var step = {
            "id": "91dd9275-4bb5-44f1-eddf-c875c740a26b" + i,
            "title": currentSpaStep.step,
            "type": currentSpaStep.type || "process",
            "emphasized": false,
            "value_specific": 0,
            "value_generic": 0,
            "predecessors": [
            ],
            "domain": {
                "id": '',
                "region": {
                    "type": regionTable[currentSpaStep.region],
                    "with_domain": "fdsfdsf"
                }
            },
            "problems": [
            ]
        }

        //add in the predecessors with a relationship type.
        if (i > 0) step.predecessors.push({
            "id": json.steps[i - 1].id,
            "type": "normal_relationship",
            "title": ""
        });

        if (currentSpaStep.region) {
            var regionNum = parseInt(currentSpaStep.region.slice(-1))
            if (regionNum < 4) {
                step.domain.id = providerId;
            } else {
                step.domain.id = customerId;
            }
        } else {
            //just set it to something, doesn't matter what
            step.domain.id = providerId
        }

        json.steps.push(step);
    }

    //add the domains in
    //provider
    json.domains[0] = {
        'id': providerId,
        'title': spa.process.provider,
        'subtitle': 'Provider'
    }

    //customer
    json.domains[1] = {
        'id': customerId,
        'title': spa.process.customer,
        'subtitle': 'Customer'
    }

    return json;
}


function getPcnChart(json) {

    var diag = pcnchart(json);

    //add this to be compatible with most of his code
    diag.id = 'diagram';

    return diag;
}


//returns the zero-based number of the row to be modified
function getNumberFromRowId(rowId) {
    return parseInt(rowId.substring(rowId.length - 1)) - 1;
}


function reassignRowIds() {
    var counter = 1;
    $('.tableRow').each(function () {
        this.id = 'rowStep' + counter;
        counter++;
    })
}

function isPCNSpec(json) {
    if (json._id) {
        return true;
    } else {
        return false;
    }
}


function convertPcnSpecToSpa(json) {

    //just a dummy json that has most of the other values the script needs, we will change the ones we need
    var spaData = { "meta": { "author": "Brian Farnsworth", "savename": "" }, "process": { "provider": "health clinic", "customer": "patient", "process": "Make an appointment", "initial_step": "needs an appointment", "final_step": "has an appointment" }, "subject": { "name": "John Doe", "date": "today", "entity": "patient" }, "steps": [{ "order": "1", "step": "need an appointment", "type": "", "domain": "patient", "region": "r7", "value": "somewhat", "inconvenient": "headache", "problem_inconvenient": "real pain to get to", "problem_likely_to_fail": "forget to show up", "number": 1 }, { "order": "1", "step": "look up the clinic phone number", "type": "", "other": "411", "domain": "patient", "region": "r6", "value": "necessary", "problem_difficult": "hard to do", "problem_confusing": "strange language", "number": 2, "follows": "1:yes", 'box_dash': 'dash' }, { "order": "1", "step": "call the clinic", "type": "", "domain": "patient", "region": "r6", "value": "", "number": 3, 'box_thick': 'thick' }, { "order": "1", "step": "wait for someone to answer", "type": "wait", "domain": "patient", "region": "r6", "value": "not", "number": 4, "follows": "start" }, { "order": "1", "step": "ask about available appointment times", "type": "", "domain": "patient", "region": "r5", "value": "necessary", "number": 5, "skip_rows": 1.5 }, { "order": "1", "step": "select an appointment time", "type": "decision", "domain": "patient", "region": "r4", "value": "very", "number": 6 }, { "order": "1", "step": "have an appointment", "type": "", "domain": "patient", "region": "r7", "value": "very", "number": 7 }, { "step": "", "domain": "patient", "number": 8 }] };

    //get the domain ids
    var providerId = '1'
    var customerId = '2'

    //set the chart title
    spaData.process.process = json.metadata.title;




    //add enough steps to 
    spaData.steps = [];

    //add all the steps in
    for (var i = 0; i < json.steps.length; i++) {
        var currentJsonStep = json.steps[i];
        var currentSpaStep = spaData.steps[i];



        var step = {
            "order": "1",
            "step": currentJsonStep.title,
            "type": "",
            "domain": "patient",
            "region": "",
            "value": "somewhat",
            "inconvenient": "headache",
            "problem_inconvenient": "real pain to get to",
            "problem_likely_to_fail": "forget to show up",
            "number": i + 1
        }

        //figure out the region
        if (currentJsonStep.domain.id == json.domains[0].id) {
            //this is a provider, so r1 through ...
            step.region = providerRegionTable[currentJsonStep.domain.region.type]
        } else {
            //thisi s a customer
            step.region = customerRegionTable[currentJsonStep.domain.region.type]
        }

        spaData.steps.push(step);
    }

    //add the domains in
    //provider
    spaData.process.provider = json.domains[0];

    //customer
    spaData.process.customer = json.domains[1];

    return spaData;
}

function helpSection() {
	$("#modalBackground").show("fast");
    $("#helpModal").show("fast");
}