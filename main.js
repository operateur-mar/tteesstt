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
  const apiURL = 'https://p22.gigamanager.com/css/ws/vente/ws_get_info_bl.php?nb_prod=7';
  const proxy = 'https://cors-anywhere.herokuapp.com/'; 

  // Use jQuery to perform an AJAX request
  $.ajax({
      url: proxy + apiURL,  
      "default":{
        "dataType": "jsonp",
	    "type": "GET",
	    "contentType": "Application/json",
	    "crossDomain": true,
	    "Access-Control-Allow-Origin": "*",},
      // API URL
      type: 'GET',   // HTTP method
      dataType: 'json',  // Specify that we're expecting JSON data
      success: function (data) {
        // Assuming the API response is an array of objects
        // Convert JSON object data into an array of values (for demo purposes)
        let dataasarray = Object.values(data);
        display(dataasarray)
      
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
    const nclient = $('#nclient'); 
    let date = $('#date'); 
    const testing = $('#thiis'); 
    testing.empty(); 

    // clear containers
    oeilscontainer.empty(); 
    cylscontainer.empty(); 
    sphscontainer.empty(); 
    axescontainer.empty(); 
    addscontainer.empty(); 
    qtescontainer.empty(); 
    descontainer.empty(); 
    puscontainer.empty(); 
    totalcontainer.empty(); 
    nclient.empty(); 
    //date.empty(); 

    nclient.append(data[12]); 
    date.append(data[11]);
    console.log("data is = "+date)
    /** GET DATE and CLIENT */
    //
    /** HANDLING DATA */
    let rows = []; 
    /* FILL MODAL CONTENT */
   for (let index = 0; index < 10; index++) {
    let row = data[index];
    rows.push(row)
    
   }
   let OEILS = rows[1]; 
   let CYLS = rows[2]; 
   let SPH = rows[3]; 
   let AXES = rows[4]; 
   let ADDS = rows[5]; 
   let DESIGNATIONS = rows[6]; 
   let QTES = rows[7]; 
   let PUS = rows[8]; 
   let TOTALS_PROD = rows[9]; 
   
    /**** End handling data */

    /** DISPLAYING DATA */

   for (let index = 0; index < OEILS.length; index++) {
    
    testing.append(`
      
        <tr>
        <td > <div class="oeil">` + OEILS[index] + `</div></td>
        <td > <div class="iitem">` + CYLS[index] + `</div></td>
        <td > <div class="iitem">` + SPH[index] + `</div></td>
        <td > <div class="iitem">` + AXES[index] + `</div></td>
        <td > <div class="iitem">` + ADDS[index] + `</div></td>
        <td ><div  class="designation">` + DESIGNATIONS[index] + `</div></td>
        <td > <div class= "quantite">` + QTES[index] + `</div></td>
        <td > <div class="iitem">` + PUS[index] + `</div></td>
        <td > <div class="iitem">` + TOTALS_PROD[index] + `</div></td>

        </tr>`)
   }

    /** END DISPLAYING DATA */


}

// Call the fetchData function when the page loads

});