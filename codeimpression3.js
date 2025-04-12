
let thecontent; 
    // hide content on screen: 
     // Get the button, modal, and main content elements
     const openModalBtn = document.getElementById('openModalBtn');
     const closeModalBtn = document.getElementById('closeModalBtn');
     const printModalBtn = document.getElementById('printModalBtn');
     const mainContent = document.getElementById('mainContent');
    let nndate; 
    let nnclient; 
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
                       
    
    /* =========== Manage n page content ========== */ 
    
     /***** Handling Data */
      // URL of the API (Example API for placeholder data)
      function opentmodal(urlServ,idBon){
		 // alert("ddddd");
		  thecontent = `
        <html>
         <head>
          
           <link rel="stylesheet" href="style.css">
       		<title>Bon de livraison `+idBon+` </title>
                  
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
       padding-left: 50px !important;
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
        const apiURL = 'https://'+urlServ+'/css/ws/vente/ws_get_info_bl.php?nb_prod=20&idbon='+idBon+'&fiche=BL';
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
         	if(data.ETAT_MONTAGE!="" && data.ETAT_MONTAGE!="3"){
				alert("Vous ne pouvez pas imprimer le BL avant la réalisation du montage.");
				return false;
			}
            let dataasarray = Object.values(data);
			//console.log(dataasarray);
            display(dataasarray,idBon,data); 
			// alert(dataasarray[10]);
            const newWindow = window.open('', '_blank', 'width=1000,height=600');
            newWindow.document.open();
            newWindow.document.write(thecontent);
            newWindow.document.close();
            newWindow.onload = function () {
          // newWindow.print();
			changerDateImpr(idBon,'0');
			}
            newWindow.onafterprint = function () {
                newWindow.close();
            };
          
        },
          error: function(error) {
              
              $('#dataContainer').html('Error!');
          }
      });
      }
    
      // Function to display data
      function display(data,idBon,data22) {
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
    //alert(data[12]);
        nclient.append(data[12]); 
        date.append(data[11]);
        nnclient = data[12]; 
        nndate = data[11];
       //alert("dddd");
        thecontent = thecontent+`    <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js"></script>

                         <div class="table-responsive">  <table class="table imprmodal table-container" width="100%">
                           <tr class="second-titling-section">
                        <td colspan="5" class="sname" align="left"  ><div style="white-space: nowrap;"> `+data22.CODE_CLT+`   Depot : `+data22.NOM_DEPOT+`</div><div style="white-space: nowrap;" align="right"> `+data22.NOM_AGENCE+`  </div></td>
                        <td colspan="3" class="barcode_val" id="barcode_val"><div class="barcode_val1"></div>
                             
                        </td>
                        <td colspan="4"><div style="white-space: nowrap;" >BON DE LIVRAISON N° : `+data22.NUM_BL_AN+`</div> <div style="white-space: nowrap;"  align=right> `+data22.DATE_BL+`</div></td>
    
                    </tr>
                          </table><div>
                   <div class="table-responsive">
                      <table class="table table-container" width="100%">
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
        if(CYLS[index]=='0.00' || CYLS[index]=='0,00')
			cylVal = "";
		else cylVal = CYLS[index];
		  if(SPH[index]=='0.00' || SPH[index]=='0,00')
			sphVal = "";
		else sphVal = SPH[index];
		  if(AXES[index]=='0.00' || AXES[index]=='0,00')
			axeVal = "";
		else axeVal = AXES[index];
		  if(ADDS[index]=='0.00' || ADDS[index]=='0,00')
			addVal = "";
		else addVal = ADDS[index];
            testing.append(`
                
                <tr>
                    <td  align="center"><div class="oeil" align="center">` + OEILS[index] + `</div></td>
                    <td  align="center"><div class="iitem"  align="center">` + cylVal + `</div></td>
                    <td align="center"><div class="iitem" align="center">` + sphVal + `</div></td>
                    <td align="center"><div class="iitem" align="center">` + axeVal + `</div></td>
                    <td align="center"><div class="iitem" align="center">` + addVal + `</div></td>
                    <td style="white-space: nowrap;" align="left"><div class="designation" style="white-space: nowrap;" align="left">` + data22.DESIGNATIONS[index] + `</div></td>
                    <td align="center"><div class="quantite" align="center">` + data22.QTES[index] + `</div></td>
                    <td align="center"><div class="iitem" align="center">` + data22.PUS[index] + `</div></td>
                    <td align="center"><div class="iitem" align="center">` + data22.TOTALS_PROD[index] + `</div></td>
                </tr>
            `);
            thecontent = thecontent+ `  <tr>
                    <td align="center"><div class="oeil" align="center">` + OEILS[index] + `</div></td>
                    <td align="center"><div class="iitem" align="center">` + cylVal + `</div></td>
                    <td align="center"><div class="iitem" align="center">` + sphVal + `</div></td>
                    <td align="center"><div class="iitem" align="center">` + axeVal + `</div></td>
                    <td align="center"><div class="iitem" align="center">` + addVal + `</div></td>
                    <td align="left" style="white-space: nowrap;"><div class="designation" align="left" style="white-space: nowrap;">` + data22.DESIGNATIONS[index] + `</div></td>
                    <td align="center"><div class="quantite" align="center">` + data22.QTES[index] + `</div></td>
                    <td align="center"><div class="prix" align="center">` + data22.PUS[index] + `</div></td>
                    <td align="center"><div class="iitem" align="center">` + data22.TOTALS_PROD[index] + `</div></td>
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
                        <td colspan="3" class="barcode_val11" id="barcode_val"><div class="barcode_val1"></div>
                             
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
                        <td colspan="3" class="barcode_val">
                            
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
                                <p>`+data[12]+`</p>
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
                                <p>`+data[12]+`</p>
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
                    `<div class="price"><p>`+ data[12]+`</p></div>`
                ); 
                thecontent = thecontent + `<td colspan='9' style="text-align:right; border: 1px;" >`+ data[12]+`</td></tr>`
                
            }
          
           
        }
    
        thecontent = thecontent + `<tr><td><button class="imprbtn btn btn-success" onclick='window.print();'>Imprimer</button></td></tr></div><script> 
	//document.getElementById('bar').innerHTML='';
	//textToBase64Barcode(`+idBon+`);
	textToBase64Barcode('`+idBon+`');
	//document.getElementById('barcode_inp').value='';
	function textToBase64Barcode(text) {
			//alert("text :"+text);
			
            var canvas = document.createElement("canvas");
			//alert("rr");
           /* JsBarcode(canvas, text, {
              	//  format: "CODE128",
			  	format: "CODE128",
			  	//margin:10,
			  fontOptions: "bold",
                //width: 3,
				 displayValue: true,
				height: 800,
			//	fontSize:230,
			width: 25,
				//font: "fantasy",
				
				//font: "OCR-B",
				text: ''//$("#refmnt")[0].value
            });*/
			//alert("ddd");
			//canvas.style.height = "200px";
		//	canvas.style.width = "400px";
			//alert("text 3:"+text);
			//document.querySelectorAll('.barcode_val').forEach(div => {
                 document.querySelectorAll('.barcode_val1').forEach((div, index) => {
				/* let svg = document.createElement('svg'); // Créer un élément SVG
                div.appendChild(svg); // L'ajouter dans le div
                
                // Générer un code-barres unique pour chaque div
                JsBarcode(svg, "12345678" , {
                    format: "CODE128",
                    displayValue: true,
                    fontSize: 14
                });
				*/
				let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); // Crée un élément SVG correctement
                div.appendChild(svg); // Ajoute le SVG dans le div
                
                // Génère un code-barres valide
                JsBarcode(svg, text, {
                    format: "CODE128",
                    displayValue: false,
                    fontSize: 14,
                    lineColor: "#000",
                    width: 2,
                    height: 40
				
				//let canvas = document.createElement('canvas');
                //canvas.width = div.clientWidth; // Ajuste la largeur du canvas
                //canvas.height = div.clientHeight; // Ajuste la hauteur du canvas
				//alert("text 2:"+text);
                //div.appendChild(canvas);

                // Dessiner quelque chose (exemple : un rectangle rouge)
                //let ctx = canvas.getContext('2d');
                //ctx.fillStyle = "red";
                //ctx.fillRect(20, 20, 100, 100);
            });
			 });
			//alert("dddd44");
           // $("#barcode_val").append(canvas);
          //  return canvas.toDataURL("image/png");
        }
		//textToBase64Barcode('{CB_MNT}'); 
	  
	  
	   </script>`;
       
        /* end code */ 
    
    
    }
function imprBLBis(urlServ,idBon){

	const apiURL = 'https://'+urlServ+'/css/ws/vente/ws_get_info_bl.php?nb_prod=20&idbon='+idBon+'&fiche=BL';
      // Ajax Jquery
	$.ajax({
		url: apiURL,  
		type: 'GET',   
		dataType: 'json',  
		success: function (data) {
			
			var html=`<table align="center" border="0" style="padding:0px;marging:0px; font-size: 10px;padding:0px; margin:0px;" width="100%">
			 <tr><td align="left" width="35%" valign="top" style="white-space: nowrap;font-size: 14px;padding:0px; margin:0px;"><span>Bon de livraison : </span>
                        <span>`+data["NUM_BON_AN"]+`</span>       
                         
                 </td>
			 <td align="center" valign="top" style="padding:0px; margin:0px;"> <svg id="barcode_val1"></svg></td>
			 
			 </tr></table>`;
			
		   html+=`<hr><table align="center" border="0" style="padding:0px;marging:0px; font-size: 10px;" width="100%" > 
			 <tr><td align="left" width="35%" valign="top" style="white-space: nowrap;font-size:10px;"><span>Client : </span>
                        <span>`+data["RAISON_SOCIAL"]+`</span> </td>      
                  <td align="left" width="35%" valign="top" style="white-space: nowrap;font-size:10px;"><span>Livré depuis : </span>
                        <span>`+data["NOM_DEPOT"]+`</span> </td> 
						 <td align="left" width="35%" valign="top" style="white-space: nowrap;font-size:10px;"><span>Date : </span>
                        <span>`+data["DATE_BL"]+`</span> </td>   
                  </tr></table>`;
		
		
		html+=`<br><table width="100%" style="border:1px solid #000; border-collapse: collapse;font-size: 10px;">
                        <thead>
                          <th style="border:1px solid #000; border-collapse: collapse;">O</th>
                          <th style="border:1px solid #000; border-collapse: collapse;">Cyl</th>
                          <th style="border:1px solid #000; border-collapse: collapse;">Sph</th>
                          <th style="border:1px solid #000; border-collapse: collapse;">Axe</th>
                          <th style="border:1px solid #000; border-collapse: collapse;">Add</th>
                          <th style="border:1px solid #000; border-collapse: collapse;">Article</th>
                          <th style="border:1px solid #000; border-collapse: collapse;">Porteur</th>
                          <th style="border:1px solid #000; border-collapse: collapse;">Qté</th>
                          <th style="border:1px solid #000; border-collapse: collapse;">PU</th>
						  <th style="border:1px solid #000; border-collapse: collapse;">Total</th>
                        </thead><tbody> `; 
    	qte=0;
   		data["OEILS"].forEach(function(element, index) {
			if(data["TYPE_LIGNE"][index]!='SUPP'){
			
			html+=` <tr>
                          <td style="border:1px solid #000; border-collapse: collapse;">`+data["OEILS"][index]+`</td>
                          <td style="border:1px solid #000; border-collapse: collapse;">`+data["CYLS"][index]+`</td>
                          <td style="border:1px solid #000; border-collapse: collapse;">`+data["SPHS"][index]+`</td>
                          <td style="border:1px solid #000; border-collapse: collapse;">`+data["AXES"][index]+`</td>
                          <td style="border:1px solid #000; border-collapse: collapse;">`+data["ADDS"][index]+`</td>
                          <td style="border:1px solid #000; border-collapse: collapse;white-space: nowrap;">`+data["NOM_SCAT"][index]+`</td>
                          <td style="border:1px solid #000; border-collapse: collapse;white-space: nowrap;">`+data["NOM_PORTEUR"][index]+`</td>
                          <td style="border:1px solid #000; border-collapse: collapse;">`+data["QTES"][index]+`</td>
                          <td style="border:1px solid #000; border-collapse: collapse;">`+data["PUS"][index]+`</td>
						  <td style="border:1px solid #000; border-collapse: collapse;">`+data["TOTALS_PROD"][index]+`</td>
                        </tr> `;
						qte+=data["QTES"][index];
			}
			else  
			
			html+=` <tr>
                          <td style="border:1px solid #000; border-collapse: collapse;" colspan=7>`+data["DESIGNATIONS"][index]+`</td>
                          
                          <td style="border:1px solid #000; border-collapse: collapse;">`+data["QTES"][index]+`</td>
                          <td style="border:1px solid #000; border-collapse: collapse;">`+data["PUS"][index]+`</td>
						  <td style="border:1px solid #000; border-collapse: collapse;">`+data["TOTALS_PROD"][index]+`</td>
                        </tr> `;
		});
		html+=` </tbody></table><br>`;
        
		html+=`<br><table width="50%" align="right" style="border:1px solid #000; border-collapse: collapse;font-size: 10px;">
		
		<tr><td style="border:1px solid #000; border-collapse: collapse;font-size: 10px;">Quantité </td><td style="border:1px solid #000; border-collapse: collapse;font-size: 10px;"  align="center">`+qte+`</td></tr><tr><td style="border:1px solid #000; border-collapse: collapse;font-size: 10px;">Total TTC </td><td style="border:1px solid #000; border-collapse: collapse;font-size: 10px;" align="center">`+data["TOTALS_BL"]+`</td></tr>`;
		
		var style1=`<style> 
         .txtStyle {
                font-size: 0.7em;
            }

        
        @media (min-width: 793px) and (max-width: 1122px) {
             
             
            .txtStyle {
                font-size: 0.5em;
            }
        }

        
        @media (max-width: 793px) and (min-width: 559px) {
            
            .txtStyle {
                font-size: 0.5em;
            }
        }
    </style>`;
		
	 
				  	
					
					
            
 			var f = window.open('', '', 'height=600,width=800');
			f.document.write('<html><head><title>Imprimer BL'+idBon+'</title>'+style1+'</head><body>');
			 f.document.write(html);
        f.document.write('</body></html>');
       
		
		// Ajouter JsBarcode dynamiquement
            var scriptJsBarcode = f.document.createElement('script');
            scriptJsBarcode.src = 'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js';
            scriptJsBarcode.onload = function () {
                f.textToBase64Barcode(idBon);
            };
            f.document.body.appendChild(scriptJsBarcode);

            // Définir la fonction de génération du barcode dans la fenêtre ouverte
            var scriptFunction = f.document.createElement('script');
            scriptFunction.textContent = `
                function textToBase64Barcode(text) {
                   // alert('Text: ' + text);
                    JsBarcode("#barcode_val1", text, {
					// JsBarcode(svg, text, {
                    format: "CODE128",
                    displayValue: false,
                    fontSize: 14,
                    lineColor: "#000",
                    width: 2,
                    height: 40
				
				//let canvas = document.createElement('canvas');
                //canvas.width = div.clientWidth; // Ajuste la largeur du canvas
                //canvas.height = div.clientHeight; // Ajuste la hauteur du canvas
				//alert("text 2:"+text);
                //div.appendChild(canvas);

                // Dessiner quelque chose (exemple : un rectangle rouge)
                //let ctx = canvas.getContext('2d');
                //ctx.fillStyle = "red";
                //ctx.fillRect(20, 20, 100, 100);
            });
					
					
					
					
					
                }
            `;
            f.document.body.appendChild(scriptFunction);
			
			
			
			
			 f.document.close();
        f.print();
		changerDateImpr(idBon,'0');
		f.onafterprint = function() {
            f.close();
        };
				 
 
return true;
			
        
        },
          error: function(error) {
              alert("Erreur au niveau de serveur.");
             // $('#dataContainer').html('Error!');
          }
      });
      }