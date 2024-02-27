
         
//5th code 
function loadTable() {
  loader.classList.remove('hidden');
  fetch('https://script.google.com/macros/s/AKfycbw9lLX9f1aC54wPkEccGlOfC6acVK36wcvj6QSE1tIqupUFpM0wkWOAylDsNo0x6MWNuA/exec')
    .then(res => res.json())
    .then(data => {
      loader.classList.add('hidden');
      const sitedata = data;
      //console.log(data);
      if (sitedata && sitedata.content.length > 0) {
        const th = `
            <thead>
              <tr>
                <th>Date</th>
                <th>Virtual ID</th>
                <th>Project</th>
                <th>Call Category</th>
                <th>Site Code</th>
                <th>Site Name</th>
                <th>Site Activity</th>
                <th>State</th>
                <th>Division Office</th>
                <th>ENG Name</th>
                <th>Field Remarks</th>
                <th>User ID</th>
                
              </tr>
            </thead>`;
            let tr = [];
            sitedata.content.reduce((prev, cur) => {
              let td = [];
              cur.map((e, i) => {
                if (i === 0) {
                  // Format the date string to 'dd-mm-yyyy hh:mm:ss'
                  const date = new Date(e);
                  const day = String(date.getDate()).padStart(2, '0');
                  const month = String(date.getMonth() + 1).padStart(2, '0');
                  const year = date.getFullYear();
                  const hours = String(date.getHours()).padStart(2, '0');
                  const minutes = String(date.getMinutes()).padStart(2, '0');
                  const seconds = String(date.getSeconds()).padStart(2, '0');
                  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
                  td.push(`<td>${formattedDate}</td>`);
                } else if (i <= 12) {
                  td.push(`<td>${e}</td>`);
                }
              });
              let tr1 = `<tr>${td.join('')}</tr>`;
              tr.push(tr1);
            });
            document.getElementById('mytable').innerHTML = `${th}<tbody>${tr.join('')}</tbody>`;
            roDataArr = sitedata.content;
          }
        });
    }
  


    function filterTable() {
        let filter = document.getElementById('searchInput').value.toUpperCase();
    
        let rows = document.getElementById('mytable').getElementsByTagName('tr');
        for (let i = 1; i < rows.length; i++) {
          
          let code = rows[i].getElementsByTagName('td')[4];
          
          if (code) {
            let codeText = code.textContent || code.innerText;
            
            if (codeText.toUpperCase().indexOf(filter) > -1) {
              rows[i].style.display = '';
            } else {
              rows[i].style.display = 'none';
            }
          }
        }
      }
    
  


function downloadTable() {
  const wb = XLSX.utils.book_new(); // create new workbook
  const sheetName = 'ID'; // set sheet name
    const header = ['Date','Virtual ID','Project','Call Category','Site Name','Site Code','Site Activety','State',
    'Division Office','ENG Name','Field Remark','User ID']; // set header row
    const rows = document.querySelectorAll('#mytable tbody tr');
    const filter = document.getElementById('searchInput').value.toUpperCase();
    //const filter2 = document.getElementById('date').value.toUpperCase();
    const filter3 = document.getElementById('state').value.toUpperCase();
  
    const data = [header]; // initialize data array with header row
    rows.forEach((row) => {
      const date = row.querySelector('td:nth-child(1)');
      const code = row.querySelector('td:nth-child(2)');
      const state = row.querySelector('td:nth-child(4)');
      if (date && code && state) {
        const dateText = date.textContent || date.innerText;
        const codeText = code.textContent || code.innerText;
        const stateText = state.textContent || state.innerText;
        if (dateText.toUpperCase().indexOf(filter2) > -1 && codeText.toUpperCase().indexOf(filter) > -1 && stateText.toUpperCase().indexOf(filter3) > -1) {
          const cols = row.querySelectorAll('td');
          const colsArr = [];
          cols.forEach((col) => {
            colsArr.push(col.innerText);
          });
          data.push(colsArr); // add row to data array
        }
      }
    });
  
    const ws = XLSX.utils.aoa_to_sheet(data); // convert data array to worksheet
    XLSX.utils.book_append_sheet(wb, ws, sheetName); // add worksheet to workbook
  
    XLSX.writeFile(wb, 'Virtual ID.xlsx'); // save workbook as .xlsx file
  }  
loadTable();
