

const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const printModalBtn = document.getElementById('printModalBtn');
const mainContent = document.getElementById('mainContent');

let nndate; 
let nnclient;
let thecontent; 

// execute: 
function executejs(){
    const apiURL = 'https://p22.gigamanager.com/css/ws/vente/ws_get_info_bl.php?nb_prod=20';
     
    
    thecontent = `
    <html>
     <head>
      
       <link rel="stylesheet" href="style.css">
   
              
   </head>
   <style>
     .brimg{
     width:90px!important;
     }
           @media print {
           .prix{text-align:right!important;}
           .total-section{padding-right:20px;}
          .imgbarcode{text-align:center;}
          .imgbarcode img{width:90px!important;}
           .table>:not(caption)>*>*{padding: .49rem .5rem!important; text-align:center;}
           .sname{padding-left:100px !important;}
           .second-titling-section{height:80px;}
          .second-titling-section td:nth-child(1) {
   padding-left: 100px !important;
   text-align: left;
 }.
 second-titling-section td:nth-child(2) {
   text-align: center;
 }
   .second-titling-section td:nth-child(3) {
   text-align: right;
   padding-right: 50px !important;
 }
           .gap{height:35px;}
           tbody{font-size:14px}
            .theader{
       display:none!important;}
        .imprbtn{display: none!important;visibility: hidden!important;}
         .table{border:transparent!important;}

     @page{
     .imprmodal {
     size: auto; /* Set page size to A4 portrait */
     margin-left: 10.16mm !important; /* Remove all margins */
     padding: 0;
     margin-right: 5mm---------------------------------------- !important;
     margin-top: 18mm !important;
     overflow: visible !important;
     .brimg{
       width:70px!important;
     }
      
   }
     }
   }
     </style>
   <body>
     <div class="imprbody">
   `;
      // Ajax Jquery
      $.ajax({
          url: apiURL,  
          "default":{
            "dataType": "jsonp",
          "type": "GET",
          "contentType": "Application/json",
          "crossDomain": true,
          "Access-Control-Allow-Origin": "*",},
          // API URL
          type: 'GET',   
          dataType: 'json',  
          success: function (data) {
           
            let dataasarray = Object.values(data);
            display(dataasarray);
          
        },
          error: function(error) {
              
              $('#dataContainer').html('Error!');
          }
      });

      // display data: 
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
        const totalcontainer = $('#totals'); 
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
        nnclient = data[12]; 
        nndate = data[11];
       
        thecontent = thecontent+`
                          <table class="table imprmodal table-container">
                           <tr class="second-titling-section">
                        <td colspan="5" class="sname">`+data[12]+`</td>
                        <td colspan="3" class="imgbarcode">
                            <img class="brimg" src="https://barcode.tec-it.com/barcode.ashx?data=ABC-abc-1234&code=Code128&translate-esc=on" width='90'/>
                        </td>
                        <td colspan="4">`+data[11]+`</td>
    
                    </tr>
                          </table>
                   <div class="table-responsive">
                      <table class="table table-container">
                        <thead class="theader">
                          <th><div class="oeil">Oeil</div></th>
                          <th><div class="iitem">Cyl</div></th>
                          <th><div class="iitem">Sph</div></th>
                          <th><div class="iitem">Axe</div></th>
                          <th><div class="iitem">Add</div></th>
                          <th><div class="designation">Désignation</div></th>
                          <th><div class="quantite">Quantité</div></th>
                          <th><div class="iitem">PrixU</div></th>
                          <th><div class="iitem">Total</div></th>
                        </thead> `; 
    
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
    
        let count = 0; 
        for (let index = 0; index < OEILS.length; index++) {
            count++; 
            
            // Append the regular table row
            // return data: 
        
            testing.append(`
                
                <tr>
                    <td><div class="oeil">` + OEILS[index] + `</div></td>
                    <td><div class="iitem">` + CYLS[index] + `</div></td>
                    <td><div class="iitem">` + SPH[index] + `</div></td>
                    <td><div class="iitem">` + AXES[index] + `</div></td>
                    <td><div class="iitem">` + ADDS[index] + `</div></td>
                    <td><div class="designation">` + DESIGNATIONS[index] + `</div></td>
                    <td><div class="quantite">` + QTES[index] + `</div></td>
                    <td><div class="iitem">` + PUS[index] + `</div></td>
                    <td><div class="iitem">` + TOTALS_PROD[index] + `</div></td>
                </tr>
            `);
            thecontent = thecontent+ `  <tr>
                    <td><div class="oeil">` + OEILS[index] + `</div></td>
                    <td><div class="iitem">` + CYLS[index] + `</div></td>
                    <td><div class="iitem">` + SPH[index] + `</div></td>
                    <td><div class="iitem">` + AXES[index] + `</div></td>
                    <td><div class="iitem">` + ADDS[index] + `</div></td>
                    <td><div class="designation">` + DESIGNATIONS[index] + `</div></td>
                    <td><div class="quantite">` + QTES[index] + `</div></td>
                    <td><div class="prix">` + PUS[index] + `</div></td>
                    <td><div class="iitem">` + TOTALS_PROD[index] + `</div></td>
                </tr>`; 
                
           
             
            
            // if count reached exactly 10 and still data to find ( add *** to price)
            if (count === 10 && index != OEILS.length -1) {
                // Append a row with the total section and gap after 12th row
                testing.append(`
                    <tr>
                        <td colspan="9">
                            <div class="total-section" style="text-align:right">
                                <p>***</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="9">
                            <div class="gap"></div>
                        </td>
                    </tr>
                    <tr class="second-titling-section">
                        <td colspan="5">`+data[12]+`</td>
                        <td colspan="3" class="imgbarcode">
                            <img class="brimg" src="https://barcode.tec-it.com/barcode.ashx?data=ABC-abc-1234&code=Code128&translate-esc=on" />
                        </td>
                        <td colspan="4">`+data[11]+`</td>
    
                    </tr>
                `);
                thecontent = thecontent + `<tr>
                        <td colspan="9">
                            <div class="total-section" style="text-align:right">
                                <p>***</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="9">
                            <div class="gap"></div>
                        </td>
                    </tr>
                    <tr class="second-titling-section">
                        <td colspan="5">`+data[12]+`</td>
                        <td colspan="3" class="imgbarcode">
                            <img class="brimg" src="https://barcode.tec-it.com/barcode.ashx?data=ABC-abc-1234&code=Code128&translate-esc=on" />
                        </td>
                        <td colspan="4">`+data[11]+`</td>
    
                    </tr>`; 
                    
               
                // Reset the count
                count = 0;
            }
            // if counter reached 10 or division of 10 ( max paper) and no more data ( return price)
            if (count % 10 == 0 && index === OEILS.length-1) {
                // Append a row with the total section and gap after 12th row
                testing.append(`
                    <tr>
                        <td colspan="9">
                            <div class="total-section">
                                <p>`+data[10]+`</p>
                            </div>
                        </td>
                        
                    </tr>
                    
                    <tr>
                        <td colspan="9">
                            <div class="gap"></div>
                        </td>
                    </tr>
                `);
                thecontent = thecontent + `
                    <tr>
                        <td colspan="9">
                            <div class="total-section" style="text-align:right">
                                <p>`+data[10]+`</p>
                            </div>
                           
                        </td>
                    </tr>
                    <tr>
                        <td colspan="9">
                            <div class="gap"></div>
                        </td>
                    </tr>
                `; 
                
               
                // Reset the count
                count = 0;
            }
            // if data reached the end but not less than 10 ( not full paper)
            if(index === OEILS.length-1 && count%10 != 0){
             
                totalcontainer.html(
                    `<div class="price"><p>`+ data[10]+`</p></div>`
                ); 
                thecontent = thecontent + `<td colspan='9' style="text-align:right;">`+ data[10]+`</td></tr>`
                
            }
          
           
        }
    
        thecontent = thecontent + `<tr><td><button class="imprbtn btn btn-success" onclick='window.print();'>Imprimer</button></td></tr></div>`;
       
        /* end code */ 
    
    
    }
}

// open 
function opentmodal() {
    executejs();
    const newWindow = window.open('', '_blank', 'width=1000,height=600');
    newWindow.document.open();
    newWindow.document.write(thecontent);
    newWindow.document.close();
    newWindow.onload = function () {
    newWindow.print();
    }
    newWindow.onafterprint = function () {
        newWindow.close();
    };
        }