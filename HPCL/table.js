

let isLoading = false;

      function loadRegion(region) {
        if (isLoading) {
          return; // Don't proceed if data is already being loaded
        }

        // Update the currentRegionURL based on the selected region
        let currentRegionURL = '';
        switch (region) {
          case 'East':
            currentRegionURL = 'https://script.google.com/macros/s/AKfycbyi1ud9QjtRsA4i-ZMNiF23V9rRZhLJl_wy8S-oxHaZZn_g11LxruAZDrJAaSDIw4M/exec';
            break;
          case 'North':
            currentRegionURL = 'https://script.google.com/macros/s/AKfycbx_sFMP9q5fBTAKNJwVxc0E4VQ_k72OkGHukQ_fOlusNmP9Q3ehPqDqJZgu-B-nEakGsQ/exec';
            break;
          case 'West':
            currentRegionURL = 'https://script.google.com/macros/s/AKfycbzQJVVKYhEOZNiEl76m1MX5uZVyJise6q5mX5Ot6UQ75Dnb5b9QX1sSZBLlqtawG-316Q/exec';
            break;
          case 'South':
            currentRegionURL = 'https://script.google.com/macros/s/AKfycbzdAOl59HE4D4TB4bHF-JpEqZq23TzrLUgcMwfSazKjvXmTY-a-rqSIR9pt3vHmjZdvYA/exec';
            break;
          
            case 'master':
            currentRegionURL = 'https://script.google.com/macros/s/AKfycbyxX05QvG28WpSDoj1AOOB5SPCYBJ_CcnvDWJAqAU8QzxQ1pom7q7w0wBbbdcS-m_QA2Q/exec';
            break;
          default:

            currentRegionURL = ''; // Handle invalid region
        }

        isLoading = true; // Set the flag to indicate loading
        document.getElementById('mytable').innerHTML = '';
        // Show the loader
        document.getElementById('loader').classList.remove('hidden');

        fetch(currentRegionURL)
          .then((res) => res.json())
          .then((data) => {
            // Handle data loading completion
            isLoading = false; // Data loading is complete

            // Hide the loader
            document.getElementById('loader').classList.add('hidden');

            const sitedata = data;
            //console.log(data);
            if (sitedata && sitedata.content.length > 1) {
              // Exclude the first row
              sitedata.content.sort((a, b) => new Date(b[0]) - new Date(a[0]));
              let th = '';
              let tdRange = [];
              switch (localStorage.getItem('role')) {
                case 'FE':
                  th = `
                    <thead>
                      <tr>
                      <th>Date</th>
                      <th>Ro Code</th>
                      <th>RO Name</th>
                      <th>State</th>
                      <th>Regional Office</th>
                      <th>Your Name</th>
                      <th>Audit Status</th>
                      <th>Attachment</th>
                      </tr>
                    </thead>`;
                  tdRange = [0, 1, 2, 3, 4, 30, 32, 33];
                  break;
                case 'SL':
                  th = `
                    <thead>
                      <tr>
                      <th>Date</th>
                      <th>Ro Code</th>
                      <th>RO Name</th>
                      <th>State</th>
                      <th>Regional Office</th>
                      <th>Total Tank</th>
                      <th>Online Tank</th>
                      <th>Offline Tank</th>
                      <th>Tank Offline Remark</th>
                      <th>Total DU</th>
                      <th>Online DU</th>
                      <th>Offline DU</th>
                      <th>DU Offline Remark</th>
                      <th>Motherboard Make</th>
                      <th>Motherboard Serial</th>
                      <th>UPS Status</th>
                      <th>UPS Remark</th>
                      <th>UPS Battery Status</th>
                      <th>UPS Battery Remark</th>
                      <th>DG Status</th>
                      <th>FCC Probe Shield</th>
                      <th>Zener Barrier</th>
                      <th>FCC Earth Voltage</th>
                      <th>HOS connectivity</th>
                      <th>HOS Status</th>
                      <th>Site Offline Remark</th>
                      <th>Interlock report</th>
                      <th>FOIR Report Last 5 days</th>
                      <th>ALL Report Status</th>
                      <th>Your Name</th>
                      <th>Remark</th>
                      <th>Audit Status</th>
                      <th>Attachment</th>
                       </tr>
                    </thead>`;
                  tdRange = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];
                  break;
                case 'admin':
                  th = `
                    <thead>
                      <tr>
                      <th>Date</th>
                        <th>Ro Code</th>
                        <th>RO Name</th>
                        <th>State</th>
                        <th>Regional Office</th>
                        <th>Total Tank</th>
                        <th>Online Tank</th>
                        <th>Offline Tank</th>
                        <th>Tank Offline Remark</th>
                        <th>Total DU</th>
                        <th>Online DU</th>
                        <th>Offline DU</th>
                        <th>DU Offline Remark</th>
                        <th>Motherboard Make</th>
                        <th>Motherboard Serial</th>
                        <th>UPS Status</th>
                        <th>UPS Remark</th>
                        <th>UPS Battery Status</th>
                        <th>UPS Battery Remark</th>
                        <th>DG Status</th>
                        <th>FCC Probe Shield</th>
                        <th>Zener Barrier</th>
                        <th>FCC Earth Voltage</th>
                        <th>HOS connectivity</th>
                        <th>HOS Status</th>
                        <th>Site Offline Remark</th>
                        <th>Interlock report</th>
                        <th>FOIR Report Last 5 days</th>
                        <th>ALL Report Status</th>
                        <th>Your Name</th>
                        <th>Remark</th>
                        <th>Audit Status</th>
                        <th>Attachment</th>
                        <th>Anydesk OR IP</th>
                        <th>Password</th>
                      </tr>
                    </thead>`;
                  tdRange = [...Array(35).keys()];
                  break;
                default:
                  th = ''; // Handle invalid role
                  tdRange = [];
              }
      
              let tr = [];
              sitedata.content.slice(1).forEach((cur) => {
                let td = [];
                cur.forEach((e, i) => {
                  if (tdRange.includes(i)) {
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
                    } else if (i === 32 && (localStorage.getItem('role') == 'SL'|| localStorage.getItem('role') == 'FE' )) {
                      const imgLink = e ? `<a href="${e}" target="_blank">View</a>` : '';
                      td.push(`<td>${imgLink}</td>`);
                    } else {
                      td.push(`<td>${e}</td>`);
                    }
                  }
                });
                let tr1 = `<tr>${td.join('')}</tr>`;
                tr.push(tr1);
              });
      
              document.getElementById('mytable').innerHTML = `${th}<tbody>${tr.join('')}</tbody>`;
              roDataArr = sitedata.content;
      
              filterTable();
            }
          });
      }

          


function filterTable() {
  let filter = document.getElementById('searchInput').value.toUpperCase();
  let filter2 = document.getElementById('site_name').value.toUpperCase();
  let filter3 = Array.from(document.getElementById('state').selectedOptions).map(option => option.value);

  let rows = document.getElementById('mytable').getElementsByTagName('tr');
  for (let i = 1; i < rows.length; i++) {
    let code = rows[i].getElementsByTagName('td')[1];
    let state = rows[i].getElementsByTagName('td')[3];
    let name = rows[i].getElementsByTagName('td')[2];
    if (name && state && code) {
      let codeText = code.textContent || code.innerText;
      let nameText = name.textContent || name.innerText;
      let stateText = state.textContent || state.innerText;
      let stateMatch = false;

      // Check if the site_name filter is present in the nameText
      let siteNameMatch = nameText.toUpperCase().indexOf(filter2) > -1;

      if (filter3.length === 0) {
        stateMatch = true;
      } else {
        for (let j = 0; j < filter3.length; j++) {
          if (stateText.toUpperCase().indexOf(filter3[j].trim().toUpperCase()) > -1) {
            stateMatch = true;
            break;
          }
        }
      }

      if (codeText.toUpperCase().indexOf(filter) > -1 && stateMatch && siteNameMatch) {
        rows[i].style.display = '';
      } else {
        rows[i].style.display = 'none';
      }
    }
  }
}


function downloadTable() {
  const wb = XLSX.utils.book_new(); // create new workbook
  const sheetName = 'HPCL'; // set sheet name
  let header, tdRange;

  switch (localStorage.getItem('role')) {
    case 'FE':
      header = ['Date', 'Ro Code', 'RO Name', 'State', 'Regional Office','Your Name', 'Audit Status', 'Attachment']; // set header row
      tdRange = [0,1,2,3,4,27,30,31];
      break;
    case 'SL':
      header = ['Date', 'Ro Code', 'RO Name', 'State', 'Regional Office', 'Total Tank', 'Online Tank', 'Offline Tank', 
      'Tank Offline Remark', 'Total DU', 'Online DU', 'Offline DU', 'DU Offline Remark', 'Motherboard Make','Motherboard Serial', 'UPS Status', 'UPS Remark', 
      'UPS Battery Status', 'UPS Battery Remark', 'DG Status', 'FCC Probe Shield','Zener Barrier','FCC Earth Voltage', 
      'HOS Connectivety', 'HOS Status', 'Site Offline Remark', 'Interlock report', 'FOIR Report Last 5 days', 'ALL Report Status',
       'Your Name', 'Remark', 'Audit Status', 'Attachment']; // set header row
      tdRange = [...Array(33).keys()];
      break;
    case 'admin':
      header = ['Date', 'Ro Code', 'RO Name', 'State', 'Regional Office', 'Total Tank', 'Online Tank', 'Offline Tank', 'Tank Offline Remark',
       'Total DU', 'Online DU', 'Offline DU', 'DU Offline Remark',  'Motherboard Make','Motherboard Serial','UPS Status', 'UPS Remark', 'UPS Battery Status', 'UPS Battery Remark', 
       'DG Status', 'FCC Probe Shield','Zener Barrier','FCC Earth Voltage', 'HOS Connectivety', 'HOS Status', 'Site Offline Remark', 
       'Interlock report', 'FOIR Report Last 5 days', 'ALL Report Status', 'Your Name', 'Remark', 'Audit Status', 'Attachment',
       'Anydesk OR IP','Password']; // set header row
      tdRange = [...Array(36).keys()];
      break;
    default:
      header = [];
      tdRange = [];
  }

  const rows = document.querySelectorAll('#mytable tbody tr');
  const filter = document.getElementById('searchInput').value.toUpperCase();
  const filter3 = localStorage.getItem('state') ? localStorage.getItem('state').split(',') : [];

  const data = [header]; // initialize data array with header row
  rows.forEach((row) => {
    const code = row.querySelector('td:nth-child(2)');
    const state = row.querySelector('td:nth-child(4)');
    if (code && state) {
      const codeText = code.textContent || code.innerText;
      const stateText = state.textContent || state.innerText;
      let stateMatch = false;
      if (filter3.length === 0) {
        stateMatch = true;
      } else {
        for (let j = 0; j < filter3.length; j++) {
          if (stateText.toUpperCase().indexOf(filter3[j].trim().toUpperCase()) > -1) {
            stateMatch = true;
            break;
          }
        }
      }
      if (codeText.toUpperCase().indexOf(filter) > -1 && stateMatch) {
        const cols = row.querySelectorAll('td');
        const colsArr = [];
        cols.forEach((col, i) => {
          if (tdRange.includes(i)) {
            colsArr.push(col.innerText);
          }
        });
        data.push(colsArr); // add row to data array
      }
    }
  });

  const ws = XLSX.utils.aoa_to_sheet(data); // convert data array to worksheet
  XLSX.utils.book_append_sheet(wb, ws, sheetName); // add worksheet to workbook

  XLSX.writeFile(wb, 'HPCL_Field_Audit.xlsx'); // save workbook as .xlsx file
}



function hide() {
  const role = localStorage.getItem('role');
  var downloadButton = document.getElementById('download_button');
  var master = document.getElementById('master');
  if (role =='admin') {
    downloadButton.style.display = 'show';
    master.style.display='show';
  }
  else if (role =='SL') {
    downloadButton.style.display = 'show';
    master.style.display='none';
  }
  else{ downloadButton.style.display = 'none';
  master.style.display='none';

  }
}
function disableRightClick(event) {
  event.preventDefault(); // Prevent default right-click behavior
}

// Add event listener to the document for the contextmenu event (right-click)
document.addEventListener('contextmenu', disableRightClick);       