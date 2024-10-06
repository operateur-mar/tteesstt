$(document).ready(function(){
    // printing screen: 
function printScreen() {
    window.print();  // Trigger the browser's print dialog
}

// hide content on screen: 
 // Get the button, modal, and main content elements
 const openModalBtn = document.getElementById('openModalBtn');
 const closeModalBtn = document.getElementById('closeModalBtn');
 const printModalBtn = document.getElementById('printModalBtn');
 const mainContent = document.getElementById('mainContent');
 const modal = document.getElementById('myModal');

 // Show the modal and hide the main content
 openModalBtn.addEventListener('click', function() {
  //   mainContent.classList.add('hidden-content');  // Hide main content
     var myModal = new bootstrap.Modal(modal);    // Show modal
     myModal.show();
 });

 // When the modal is closed, show the main content again
 closeModalBtn.addEventListener('click', function() {
     //mainContent.classList.remove('hidden-content');  // Show main content
 });

 // Print only the modal content when the Print button is clicked
 printModalBtn.addEventListener('click', function() {
     window.print();  // Trigger the print dialog
 });

 /***** Handling Data */
  // URL of the API (Example API for placeholder data)
  const apiURL = 'https://p22.gigamanager.com/css/ws/vente/ws_get_info_bl.php?nb_prod=5';

  // Use jQuery to perform an AJAX request
  $.ajax({
      url: apiURL,  
      "default":{
        "dataType": "jsonp",
	    "type": "GET",
	    "contentType": "Application/json",
	    "crossDomain": true,
	    "Access-Control-Allow-Origin": "*",},
      // API URL
      type: 'GET',   // HTTP method
      dataType: 'json',  // Specify that we're expecting JSON data
      success: function(response) {
        console.log(JSON.stringify(response));
        display(JSON.stringify(response));
    },
      error: function(error) {
          // Handle error here
          $('#dataContainer').html('Error loading data');
      }
  });

  // Function to display data
  function display(data) {
    // setting containers
    const oeilscontainer = $('#OEILS'); 
    const cylscontainer = $('#CYLS'); 
    const sphscontainer = $('#SPHS'); 
    const axescontainer = $('#AXES'); 
    const addscontainer = $('#ADDS'); 
    const descontainer = $('#DES'); 
    const qtescontainer = $('#QTES'); 
    const puscontainer = $('#PUS'); 
    const totalcontainer = $('#TOTALS_PROD'); 


    // clear containers
    oeilscontainer.empty(); 
    cylscontainer.empty(); 
    sphscontainer.empty(); 
    axescontainer.empty(); 
    addscontainer.empty(); 
    qtescontainer.empty(); 
    //descontainer.empty(); 
    puscontainer.empty(); 
    totalcontainer.empty(); 

    //parsing data
    const parsedData = JSON.parse(data);
  
    /* FILL MODAL CONTENT */
    parsedData['OEILS'].forEach(element => {
        oeilscontainer.append('<div class="elementitem">'+element+'</div></br>')
     });

    parsedData['CYLS'].forEach(element => {
        cylscontainer.append('<div class="elementitem">'+element+'</div></br>')
    });
    parsedData['SPHS'].forEach(element => {
        sphscontainer.append('<div class="elementitem">'+element+'</div></br>')
    });
    parsedData['AXES'].forEach(element => {
        axescontainer.append('<div class="elementitem">'+element+'</div></br>')
    });
    parsedData['ADDS'].forEach(element => {
        addscontainer.append('<div class="elementitem">'+element+'</div></br>')
    });
    parsedData['DESIGNATIONS'].forEach(element => {
        descontainer.append('<div class="elementitem">'+element+'</div></br>')
    });
    parsedData['QTES'].forEach(element => {
        qtescontainer.append('<div class="elementitem">'+element+'</div></br>')
    });
    parsedData['PUS'].forEach(element => {
        puscontainer.append('<div class="elementitem">'+element+'</div></br>')
    });
    parsedData['TOTALS_PROD'].forEach(element => {
        totalcontainer.append('<div class="elementitem">'+element+'</div></br>')
    });


  

    /**** End handling data */

}

// Call the fetchData function when the page loads

});