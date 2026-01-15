


function compressAndLoadAsBinary() {
  const form = document.forms['dataForm'];
  const imageFileInput = document.getElementById('imageFile');
  const attachmentInput = document.getElementById('attachmentLink');
  
  const maxSize = 1024 * 1024; // Maximum size for each image in bytes

  function processImage(index) {
    if (index >= imageFileInput.files.length) {
      // All images processed, generate PDF and set attachmentInput value
      const pdfBase64 = pdf.output('datauristring').split(',')[1];
      attachmentInput.value = pdfBase64;
      form.style.filter = 'none';
      form.removeAttribute('disabled');
      pdf.deletePage(1); // Delete the first (blank) page
      deactivateLoader();
     // Hide the loader
     // Show the content div
      return;
    }

    const file = imageFileInput.files[index];
    const reader = new FileReader();

    reader.onloadend = function () {
      const binaryData = reader.result;
      const isImage = file.type.startsWith('image');

      if (isImage) {
        const imageElement = new Image();
        imageElement.onload = function () {
          let width = imageElement.width;
          let height = imageElement.height;

          if (binaryData.length > maxSize) {
            const aspectRatio = width / height;
            width = Math.sqrt(maxSize * aspectRatio);
            height = maxSize / width;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const context = canvas.getContext('2d');
          context.drawImage(imageElement, 0, 0, width, height);

          const compressedData = canvas.toDataURL('image/jpeg', 0.7);

          pdf.addPage(); // Add a new page for each image

          // Calculate aspect ratio for fitting the image within the page
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const aspectRatio = width / height;

          if (aspectRatio >= 1) {
            width = pageWidth - 20; // Leave some margin
            height = width / aspectRatio;
          } else {
            height = pageHeight - 20; // Leave some margin
            width = height * aspectRatio;
          }

          pdf.addImage(compressedData, 'JPEG', 10, 10, width, height);

          processImage(index + 1); // Process the next image
        };

        imageElement.src = binaryData;
      } else {
        alert('Unsupported file type');
        processImage(index + 1); // Process the next image
      }
    };

    reader.readAsDataURL(file);
  }

  const pdf = new jsPDF(); // Create a new PDF document

  if (imageFileInput.files.length > 0) {
    form.setAttribute('disabled', 'disabled');
     // Show the loader
     // Hide the content div
    activateLoader();
    // Start processing the first image
    processImage(0);
  } else {
    attachmentInput.value = '';
    // form.style.filter = 'none';
    form.removeAttribute('disabled');
    // Hide the loader
    // Show the content div
    deactivateLoader();
  }
}

document.getElementById('imageFile').addEventListener('change', compressAndLoadAsBinary);






function validateRequiredFields() {
  const requiredFields = document.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    if (field.value.trim() === '') {
      isValid = false;
    }
  });

  return isValid;
}



function saveData(e) {
  e.preventDefault();

  const attachmentLink = document.getElementById('attachmentLink');
  const attachmentValue = attachmentLink.value.trim(); // Trim any leading/trailing whitespace

  // Call the validation function and get the validation result
  const validationResult = validation();
  const isValid = validateRequiredFields();


  if (!isValid) {
    highlightRequiredFields();
    alert("Please fill in all required fields.");
    return; // Stop execution

  }



  if (attachmentValue === '') {
    const userResponse = window.confirm('Your data will be saved without attachment. Are you sure you want to continue?');
    if (!userResponse) {
      return; // Stop execution

    }

  }

  // Check the validation result
  if (validationResult === "All Report Mismatch" || validationResult === "FOIR Mismatch" || validationResult === "Need To RE-Validate") {
    alert("Input is not valid. It will not be saved.");
    return; // Stop execution
  }

  // document.getElementById("loader").style.display = "block";
  // document.getElementById("myDiv").style.display = "none";
  activateLoader();

  const form = document.getElementById('dataForm');
  let data = new FormData(form);

  let apiUrl = ''; // Initialize the URL variable

  // Determine the API URL based on the 'state' value
  const stateValue = document.getElementById('state').value;
  if (stateValue === "Delhi & Haryana SO" || stateValue === "Punjab &Himachal SO" || stateValue === "Rajasthan SO" || stateValue === "Uttar Pradesh SO -II" || stateValue === "Uttar Pradesh SO") {
    apiUrl = 'https://script.google.com/macros/s/AKfycby7-mD5A6l4cObP2x6HmhtaHTTlzt-TTqpioIoKDKOIUgQMCVSYrhd-Owg9Mu8AvY5hIg/exec';//NORTH
  }
  else if (stateValue === "Maharashtra SO" || stateValue === "Madhya Pradesh SO" || stateValue === "Gujarat SO") {
    apiUrl = 'https://script.google.com/macros/s/AKfycbyF6yqf_qA3p3UdkiURZBuJzcDwnvCzq__1HzI0PPVWcAjtyQOS8dxZ4-Z9wLNd5U8g/exec';//WEST
  }

  else if (stateValue === "Bihar SO" || stateValue === "IndianOil-AOD St OFF" || stateValue === "West Bengal SO" || stateValue === "Odisha SO") {
    apiUrl = 'https://script.google.com/macros/s/AKfycbzq2_EpLQfJs-FmRf26UNDLLjBJytfDGILIeaQBio7mku7QI9vlRUTMsCLeKUjxhf4k5w/exec';//EAST
  }

  else if (stateValue === "TAPSO" || stateValue === "Kerala SO" || stateValue === "Tamilnadu SO" || stateValue === "Karnataka SO") {
    apiUrl = 'https://script.google.com/macros/s/AKfycbylyUi8PLo-ueTrdnoAQiLM404s1DiqsSdJTHRGJcnTpqylrulTdZ_O-wN3Yy4Wht2G/exec';//SOUTH
  } else {
    alert("Invalid 'state' value. Data will not be saved.");
    

    deactivateLoader();
    return;
  }

  fetch(apiUrl, {
    method: "POST",
    body: data
  })
    .then(res => res.text())
    .then(data => {
      // handle successful response
      alert("Data Saved successfully");
      document.getElementById("dataForm").reset();
      updateFileCount(0);

      

      deactivateLoader();
      // activate loader
      return true;
    })
    .catch(error => {
      // handle error
      console.error(error);
      alert("An error occurred while saving data.");
      
      deactivateLoader();
//deactivate loader
      return false;
    });
}

document.getElementById('submit').addEventListener('click', saveData);


let siteDataArr = [];
const loader = document.getElementById("loader");
const myDiv = document.getElementById("myDiv");
function loaddata() {
  // Activate loader
  activateLoader();

  fetch('https://script.google.com/macros/s/AKfycbxrqf7eUIGoGTJyb8i3lZscFBAENunb_czeBLuDMcPU1Y2YrXmsGKnTl1W3WeubqCaz/exec')
    .then(res => res.json())
    .then(data => {

      const sitedata = data?.content1;
      //Deactivate loader
      deactivateLoader();
      if (sitedata && sitedata.length > 0) {

        siteDataArr = sitedata;
      }

    });

}

function validation() {
  var v = document.getElementById("rdb_vs_cms").value;
  var x = document.getElementById("foir_report_last_five_days").value;
  var z = document.getElementById("reports_status").value;
  var h = document.getElementById("tank_offline").value;
  var l = document.getElementById("du_offline").value;
  var j = document.getElementById("site_status").value;
  var result;

  if (v == "MATCH" && x == "MATCH" && z == "YES" && h == 0 && l == 0) {
    result = "All Report Match";
  } else if (v == "MISMATCH" && x == "MISMATCH" && z == "NO") {
    result = "All Report Mismatch";
  } else if (v == "MISMATCH" && x == "MATCH" && z == "NO") {
    result = "RDB Mismatch";
  } else if (v == "MATCH" && x == "MISMATCH" && z == "NO") {
    result = "FOIR Mismatch";
  } else {
    result = "Need To RE-Validate";
  }

  if (j == "Site Closed") {
    result = "RO Closed";
  }

  document.getElementById('validation').value = result;
  alert("Your Data Submit AS  :-  " + result + "");
}



function getSitedetails() {

  var site_code = document.getElementById("site_code").value;
  if (site_code) {

    const dataIndex = siteDataArr.findIndex(el => el[0] == site_code);

    const selectedsite = siteDataArr[dataIndex];
    if (selectedsite && selectedsite.length > 0) {

      document.getElementById('site_name').value = selectedsite[1];
      document.getElementById('state').value = selectedsite[2];
      document.getElementById('do_office').value = selectedsite[3];


    }
  }
}
function tankvs() {
  var tank = document.getElementById("total_tank").value;
  var online = document.getElementById("tank_online").value;
  var du = document.getElementById("total_du").value;
  var duonline = document.getElementById("du_online").value;
  var total = tank - online;
  var total1 = du - duonline;
  document.getElementById("tank_offline").value = total;
  document.getElementById("du_offline").value = total1;
  if (total < 0) {

    document.getElementById("tank_online").value = "";
    document.getElementById("tank_offline").value = "";
    alert(" Tank Online Vs Offline not match");
  }
  if (total1 < 0) {
    document.getElementById("du_online").value = "";
    document.getElementById("du_offline").value = "";
    alert(" DU Online Vs Offline not match");
  }
}
function empty() {
  var x = document.getElementById("site_code").value;
  var y = document.getElementById("site_name").value;

  if (x === "") {
    alert("Please Enter site code");
    return;
  }

  else if (y === "") {
    alert("Site not found contact your administrator");
  }


}




function Resetname() {
  if (document.getElementById("site_code").click) {
    document.getElementById("site_name").value = "";
    document.getElementById("state").value = "";
    document.getElementById("do_office").value = "";

  }
}


document.getElementById('dataForm').addEventListener('submit', function (e) {
  var inputs = document.querySelectorAll('.required');
  var valid = true;

  inputs.forEach(function (input) {
    if (!input.value.trim()) {
      input.classList.add('invalid');
      valid = false;
    } else {
      input.classList.remove('invalid');
      input.classList.add('valid');
    }
  });

  if (!valid) {
    e.preventDefault();
  }
});

function updateFileCount() {
  const fileInput = document.getElementById("imageFile");
  const fileInputLabel = document.getElementById("fileInputLabel");

  if (fileInput.files.length === 0) {
    fileInputLabel.textContent = "Attachment (0 files)";
  } else {
    fileInputLabel.textContent = `Attachment (${fileInput.files.length} file${fileInput.files.length > 1 ? 's' : ''})`;
  }
}
document.getElementById('imageFile').addEventListener('change', updateFileCount);



document.getElementById('imageFile').addEventListener('change', function () {
  var attachmentLink = document.getElementById("attachmentLink");

  // Check if there are files selected
  if (this.files.length > 0) {
    // Clear attachmentLink value if it has a value
    if (attachmentLink.value.trim() !== "") {
      attachmentLink.value = "";
    } else {
      // Process the file if no value in attachmentLink
      if (!this.dataset.processed) {
        this.dataset.processed = true;
        updateFileCount();
        compressAndLoadAsBinary();
      }
    }
  }
});




document.querySelector('.fileInputLabel').addEventListener('blur', function () {
  // Reset the processed flag when the label is clicked
  document.getElementById('imageFile').dataset.processed = false;

});

// Activate loader and blur background
function activateLoader() {
  document.getElementById('myLoader').style.display = 'block';
  document.getElementById('myDiv').style.filter = 'blur(2px)';
  document.getElementById('myDiv').style.pointerEvents = 'none'; /* Disable clicking on the form */
}

// Deactivate loader and remove blur
function deactivateLoader() {
  document.getElementById('myLoader').style.display = 'none';
  document.getElementById('myDiv').style.filter = 'blur(0)';
  document.getElementById('myDiv').style.pointerEvents = 'auto'; /* Enable clicking on the form */
}

// Function to highlight required fields with a red border
function highlightRequiredFields() {
  const requiredFields = document.querySelectorAll('[required]');
  requiredFields.forEach(field => {
    if (!field.value.trim()) {

      field.style.border = '2px solid red';
    } else {
      field.style.border = ''; // Reset border if the field is not blank
    }
  });
}


var userRole = localStorage.getItem("role");

// Check if the role is "FE"
if (userRole === "FE") {
  // Display the button
  document.getElementById("viewButton").style.display = "block";
  document.getElementById("home").style.display = "block";
} else {
  // Hide the button
  document.getElementById("viewButton").style.display = "none";
  document.getElementById("home").style.display = "none";
}

