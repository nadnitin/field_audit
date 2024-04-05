function loadRegion() {
  let isLoading = false; // Initialize isLoading flag inside the function

  if (isLoading) {
    return; // Don't proceed if data is already being loaded
  }

  // Update the currentRegionURL to fetch the data from server
  let currentRegionURL = 'https://script.google.com/macros/s/AKfycbyYwaAi5EtFH79vLyXo-OXe10e74h2iTPQy1XbfZvcDrHxlYQ3ZE6dafrGarAk9vq2CPg/exec'; // Replace 'YOUR_SERVER_URL_HERE' with the actual URL

  isLoading = true; // Set the flag to indicate loading
  document.getElementById('mytable').innerHTML = '';
  // Show the loader
  document.getElementById('loader').classList.remove('hidden');
  
  // Make a request to your server-side script
  fetch(currentRegionURL)
    .then((res) => res.json())
    .then((data2) => {
      // Handle data loading completion
      isLoading = false; // Data loading is complete
      roDataArr = data2.content2;

      // Hide the loader
      document.getElementById('loader').classList.add('hidden');
      const sitedata = data2;
      
      // Process and render data in your HTML
      if (sitedata && sitedata.content2.length > 1) {
        // Exclude the first row
        sitedata.content2.sort((a, b) => new Date(b[0]) - new Date(a[0]));
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
              
                  </tr>
                </thead>`;
              tdRange = [0, 1, 2, 3, 4, 30, 32];
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
            
                   </tr>
                </thead>`;
                tdRange = Array.from({length: 31}, (_, i) => i);
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
              tdRange = [...Array(34).keys()];
              break;
            default:
              th = ''; // Handle invalid role
              tdRange = [];
          }

        // Render the table headers
        document.getElementById('mytable').innerHTML = th;

        // Save data for later use when state is selected
        document.getElementById('mytable').dataset.content = JSON.stringify(sitedata.content2);
      }
      alert ("Select State from list");
    });
   
}
function displayDataForState(selectedState) {
  
  
  // Retrieve data from the saved dataset
  const sitedata = JSON.parse(document.getElementById('mytable').dataset.content);
  
  // Filter data based on the selected state
  const filteredData = sitedata.filter(row => row[3] === selectedState);

  // Generate HTML for the filtered data
  if (!document.getElementById('mytable').getElementsByTagName('tbody')[0]) {
      document.getElementById('mytable').innerHTML += '<tbody></tbody>';
  }
  let html = '';
  if (filteredData && filteredData.length > 0) {
      filteredData.forEach((row) => {
          html += '<tr>';
          // Include columns based on user role
          const role = localStorage.getItem('role');
          const maxIndex = role === 'admin' ? 34 : 31; // AG if role is admin, AF otherwise
          for (let i = 0; i <= maxIndex; i++) {
              html += '<td>' + row[i] + '</td>';
          }
          html += '</tr>';  
      });
  } else {
      // Display a message if no data is found for the selected state
      html = '<tr><td colspan="8">No data available for the selected state</td></tr>';
      
  }

  // Update the table body with the generated HTML
  document.getElementById('mytable').getElementsByTagName('tbody')[0].innerHTML = html;
}


  loadRegion();
  
  
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
        header = ['Date', 'Ro Code', 'RO Name', 'State', 'Regional Office','Your Name', 'Audit Status']; // set header row
        tdRange = [0,1,2,3,4,27,30];
        break;
      case 'SL':
        header = ['Date', 'Ro Code', 'RO Name', 'State', 'Regional Office', 'Total Tank', 'Online Tank', 'Offline Tank', 
        'Tank Offline Remark', 'Total DU', 'Online DU', 'Offline DU', 'DU Offline Remark', 'Motherboard Make','Motherboard Serial', 'UPS Status', 'UPS Remark', 
        'UPS Battery Status', 'UPS Battery Remark', 'DG Status', 'FCC Probe Shield','Zener Barrier','FCC Earth Voltage', 
        'HOS Connectivety', 'HOS Status', 'Site Offline Remark', 'Interlock report', 'FOIR Report Last 5 days', 'ALL Report Status',
         'Your Name', 'Remark', 'Audit Status', ]; // set header row
        tdRange = [...Array(31).keys()];
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
  
  
  //hide menu 
  function hide() {
    const role = localStorage.getItem('role');
    var downloadButton = document.getElementById('download_button');
    var master = document.getElementById('master');
    var old = document.getElementById('master_download');
    if (role =='admin') {
      downloadButton.style.display = 'show';
      master.style.display='show';
      old.style.display='show';
    }
    else if (role =='SL') {
      downloadButton.style.display = 'show';
      master.style.display='none';
      old.style.display='none';
    }
    else{ downloadButton.style.display = 'none';
    master.style.display='none';
  
    }
    loadRegion();
  }
  
  
  function disableRightClick(event) {
    event.preventDefault(); // Prevent default right-click behavior
  }
  
  // Add event listener to the document for the contextmenu event (right-click)
  document.addEventListener('contextmenu', disableRightClick);       