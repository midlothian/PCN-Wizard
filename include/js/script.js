function deleteStep(id) {
    $('#'+id)
    .children('div')
    .animate({ padding: 0 })
    .wrapInner('<div />')
    .children()
    .slideUp("slow", function() { 
        $("#rowStep"+id).remove();
    });   
}

$(document).ready(function () {
    $(".sidebarColumnSelectItem > input[type='checkbox']").attr("checked", "true")
    
    $(".sidebarColumnSelectItem > input[type='checkbox']").change(function () {
        if ($(this).is(':checked')) {
            var column = $(this).data('column');
            $("."+column).show();
        } else {
            var column = $(this).data('column');
            $("."+column).hide();
        }
    });
    
    $(document).on('click', '.deleteButton', function() {
        var confirmChoice = confirm("Are you sure you want to delete this step?"); 
        if (confirmChoice == true) {
            deleteStep($(this).parent().parent().attr("id"));
        }
    });
    
    $("#sidebarWrapper").mouseleave(function() {
        toggleSidebar();
    });
    
     $("#sidebarWrapper").mouseenter(function() {
        toggleSidebar();
    });
    
    $("#buttonExport").click(function() {
        $("#modalBackground").show("fast");
        $("#exportModal").show("fast");
    });
    
    $("#buttonImport").click(function() {
        $("#modalBackground").show("fast");
        $("#importModal").show("fast");
    });
    
    $("#buttonEditDiagram").click(function() {
        $("#modalBackground").show("fast");
        $("#editDiagramModal").show("fast");
    });
    
    $(".closeButton").click(function() {
        closeModals();
    });
    
    $("#modalBackground").click(function() {
        closeModals();
    });
    
    $(document).on('click', '.editButton', function() {
        $("#modalBackground").show("fast");
        $("#editOnDiagramModal").show("fast");
    });
    
    $("#processStepHeader").click(function() {
        $("#modalBackground").show("fast");
        $("#editDiagramModal").show("fast");
    });
    
    $("#addStepButton").click(function() {
        addStepRow();
    });
    
});

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
    $("#table").append('<div class="tableRow" id="rowStep'+stepNum+'"></div>');
    $("#rowStep"+stepNum).append($("#appendContent").html());
    $("#addStepButton").data('id', stepNum+1);
}

