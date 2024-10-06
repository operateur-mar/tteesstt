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
  const apiURL = 'https://p22.gigamanager.com/css/ws/vente/ws_get_info_bl.php?nb_prod=10';
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // only for localtest

  // Use jQuery to perform an AJAX request
  $.ajax({
      url: apiURL,  
      headers: {  'Access-Control-Allow-Origin': 'http://127.0.0.1:5500' },
      // API URL
      type: 'GET',   // HTTP method
      dataType: 'json',  // Specify that we're expecting JSON data
      success: function(data) {
          // Call function to display data in HTML
          displayData(data);
      },
      error: function(error) {
          // Handle error here
          $('#dataContainer').html('Error loading data');
      }
  });

  // Function to display data in HTML
  function displayData(data) {
      const dataContainer = $('#dataContainer');
      dataContainer.empty(); // Clear previous content

      // Loop through the data and append each item to the container
      data.forEach(function(item) {
          const postElement = `<div>
              <h3>${item}</h3>
              <p>${item.ERREUR}</p>
          </div>`;
          dataContainer.append(postElement);
      });
  

    /**** End handling data */

}

// Call the fetchData function when the page loads

});