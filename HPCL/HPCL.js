


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
  //North
  if (stateValue === "Delhi & Haryana SO" || stateValue === "Punjab &Himachal SO" || stateValue === "Rajasthan SO" || stateValue === "Uttar Pradesh SO-II" || stateValue === "Uttar Pradesh SO") {
    apiUrl = 'https://script.google.com/macros/s/AKfycbzeMAFA_DlBlNFtsKm4GfaIgxj6n5enfxLwXhN4Pd7JMuYDmCtJmXlrF5gYaY7ThG8p2A/exec';
  }
  //WEST
  else if (stateValue === "Maharashtra SO" || stateValue === "Madhya Pradesh SO" || stateValue === "Gujarat SO") {
    apiUrl = 'https://script.google.com/macros/s/AKfycbxJW1nXml_WVXNMxM8ugi2R2B4A7C1YVFMY78Gi4Vvan1DMx7bXKZ6kIpbGwCcu1Jd45Q/exec';
  }
//EAST
  else if (stateValue === "Bihar SO" || stateValue === "IndianOil-AOD St OFF" || stateValue === "West Bengal SO" || stateValue === "Odisha SO") {
    apiUrl = 'https://script.google.com/macros/s/AKfycbwoR5DDnxMpiKQ-cVAwS_RGQMcZ3yBvKK82TtgFpX3KLBZFy_N8vtq_7M-qwLSVM5w/exec';
  }
//South
  else if (stateValue === "TAPSO" || stateValue === "Kerala SO" || stateValue === "Tamilnadu SO" || stateValue === "Karnataka SO") {
    apiUrl = 'https://script.google.com/macros/s/AKfycbwF8FdPDcQnlDgUhp1F2VlfFdgQWtMw5jU6hdSBsJISBiIAcYN6W8mNSfL5D2WjjGdXxQ/exec';
  } else {
    alert("Invalid 'state' value. Data will not be saved.");
    // document.getElementById("loader").style.display = "none";
    // document.getElementById("myDiv").style.display = "block";
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

      // document.getElementById("loader").style.display = "none";
      // document.getElementById("myDiv").style.display = "block";
      deactivateLoader();

      return true;
    })
    .catch(error => {
      // handle error
      console.error(error);
      alert("An error occurred while saving data.");
      // document.getElementById("loader").style.display = "none";
      // document.getElementById("myDiv").style.display = "block";
      deactivateLoader();
      return false;
    });
}

document.getElementById('submit').addEventListener('click', saveData);


let roDataArr = [];
function loaddata() {
  // const loader = document.getElementById("loader");
  // const myDiv = document.getElementById("myDiv");
  activateLoader();

  fetch('https://script.google.com/macros/s/AKfycbxeWgGJiKXDadqdnXXqsdx9b4Ojjk6RKWXU5oMQNcP2q37NcIOIyBDo5qOwWnr-F0xRjA/exec')
    .then(res => res.json())
    .then(data => {

      const rodata = data?.content1;
      // loader.style.display = "none";
      // myDiv.style.display = "block";
      deactivateLoader();

      if (rodata && rodata.length > 0) {

        roDataArr = rodata;
      }


    });
}

function getSitedetails() {
  var ro_code = document.getElementById("ro_code").value;
  if (ro_code) {

    const dataIndex = roDataArr.findIndex(el => el[0] == ro_code);

    const selectedro = roDataArr[dataIndex];
    if (selectedro && selectedro.length > 0) {

      document.getElementById('ro_name').value = selectedro[1];
      document.getElementById('state').value = selectedro[2];
      document.getElementById('regional_office').value = selectedro[3];


    }
  }
}
function tankvs() {
  var tank = document.getElementById("total_tank").value;
  var online = document.getElementById("online_tank").value;
  var du = document.getElementById("du_total").value;
  var duonline = document.getElementById("du_online").value;
  var total = tank - online;
  var total1 = du - duonline;
  document.getElementById("offline_tank").value = total;
  document.getElementById("offline_du").value = total1;
  if (total < 0) {

    document.getElementById("online_tank").value = "";
    document.getElementById("offline_tank").value = "";
    alert(" Tank Online Vs Offline not match");
  }
  if (total1 < 0) {
    document.getElementById("du_online").value = "";
    document.getElementById("offline_du").value = "";
    alert(" DU Online Vs Offline not match");
  }
}




function empty() {
  var x = document.getElementById("ro_code").value;
  var y = document.getElementById("ro_name").value;

  if (x === "") {
    alert("Please Enter RO code");
    return;
  }

  else if (y === "") {
    alert("RO not found contact your administrator");
  }


}






function Resetname() {
  if (document.getElementById("ro_code").click) {
    document.getElementById("ro_name").value = "";
    document.getElementById("state").value = "";
    document.getElementById("regional_office").value = "";

  }

}

function validation() {

  var x = document.getElementById("foir_report_last_five_days").value;
  var z = document.getElementById("all_report_status").value;
  var h = document.getElementById("offline_tank").value;
  var l = document.getElementById("offline_du").value;
  var j = document.getElementById("hos_status").value;
  var result;

  if (x == "MATCH" && z == "YES" && h == 0 && l == 0) {
    result = "All Report Match";
  } else if (x == "MISMATCH" && z == "NO") {
    result = "All Report Mismatch";
  } else if (x == "MISMATCH" && z == "NO") {
    result = "FOIR Mismatch";
  } else if (x == "MISMATCH" && z == "NO") {
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


document.getElementById('dataForm').addEventListener('submit', function (e) {
  var inputs = document.querySelectorAll('.required');
  var valid = true;

  inputs.forEach(function (input) {
    if (!input.value.trim()) {
      input.classList.add('invalid');
      field.style.border = '1px solid red';
      
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
