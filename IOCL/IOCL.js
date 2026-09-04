function compressAndLoadAsBinary() {
  const form = document.forms['dataForm'];
  const imageFileInput = document.getElementById('imageFile');
  const attachmentInput = document.getElementById('attachmentLink');
  
  const pdf = new jsPDF();
  const maxDimension = 1024;

  function processImage(index) {
    if (index >= imageFileInput.files.length) {
      if (pdf.internal.getNumberOfPages() > 1) {
        pdf.deletePage(1);
      }
      const pdfBase64 = pdf.output('datauristring').split(',')[1];
      attachmentInput.value = pdfBase64;
      if (form) {
        form.style.filter = 'none';
        form.removeAttribute('disabled');
      }
      deactivateLoader();
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

          if (width > height && width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const context = canvas.getContext('2d');
          context.drawImage(imageElement, 0, 0, width, height);

          const compressedData = canvas.toDataURL('image/jpeg', 0.6);

          pdf.addPage();
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const aspectRatio = width / height;

          let renderWidth, renderHeight;
          if (aspectRatio >= 1) {
            renderWidth = pageWidth - 20;
            renderHeight = renderWidth / aspectRatio;
          } else {
            renderHeight = pageHeight - 20;
            renderWidth = renderHeight * aspectRatio;
          }

          pdf.addImage(compressedData, 'JPEG', 10, 10, renderWidth, renderHeight);
          processImage(index + 1);
        };
        imageElement.src = binaryData;
      } else {
        alert('Unsupported file type');
        processImage(index + 1);
      }
    };
    reader.readAsDataURL(file);
  }

  if (imageFileInput.files.length > 0) {
    if (form) form.setAttribute('disabled', 'disabled');
    activateLoader();
    processImage(0);
  } else {
    attachmentInput.value = '';
    if (form) form.removeAttribute('disabled');
    deactivateLoader();
  }
}

function validateRequiredFields() {
  const requiredFields = document.querySelectorAll('[required]');
  let isValid = true;
  requiredFields.forEach(field => {
    if (!field.value || field.value.trim() === '') {
      isValid = false;
    }
  });
  return isValid;
}

function validation() {
  var v = document.getElementById("rdb_vs_cms") ? document.getElementById("rdb_vs_cms").value : "";
  var x = document.getElementById("foir_report_last_five_days") ? document.getElementById("foir_report_last_five_days").value : "";
  var z = document.getElementById("reports_status") ? document.getElementById("reports_status").value : "";
  var h = document.getElementById("tank_offline") ? document.getElementById("tank_offline").value : "";
  var l = document.getElementById("du_offline") ? document.getElementById("du_offline").value : "";
  var j = document.getElementById("site_status") ? document.getElementById("site_status").value : "";
  var result = "";

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

  const validationElem = document.getElementById('validation');
  if (validationElem) {
    validationElem.value = result;
  }

  alert("Your Data Submit AS  :-  " + result);
  return result;
}

function saveData(e) {
  if (e) e.preventDefault();

  const submitBtn = document.getElementById('submit');
  const attachmentLink = document.getElementById('attachmentLink');
  const attachmentValue = attachmentLink ? attachmentLink.value.trim() : '';

  validation();
  const isValid = validateRequiredFields();

  if (!isValid) {
    highlightRequiredFields();
    alert("Please fill in all required fields.");
    return false;
  }

  if (attachmentValue === '') {
    const userResponse = window.confirm('Your data will be saved without attachment. Are you sure you want to continue?');
    if (!userResponse) {
      return false;
    }
  }

  activateLoader();
  if (submitBtn) submitBtn.disabled = true;

  let apiUrl = '';
  const stateElement = document.getElementById('state');
  const stateValue = stateElement ? stateElement.value : '';

  if (stateValue === "Delhi & Haryana SO" || stateValue === "Punjab &Himachal SO" || stateValue === "Rajasthan SO" || stateValue === "Uttar Pradesh SO -II" || stateValue === "Uttar Pradesh SO") {
    apiUrl = 'https://script.google.com/macros/s/AKfycby7-mD5A6l4cObP2x6HmhtaHTTlzt-TTqpioIoKDKOIUgQMCVSYrhd-Owg9Mu8AvY5hIg/exec';
  } else if (stateValue === "Maharashtra SO" || stateValue === "Madhya Pradesh SO" || stateValue === "Gujarat SO") {
    apiUrl = 'https://script.google.com/macros/s/AKfycbyF6yqf_qA3p3UdkiURZBuJzcDwnvCzq__1HzI0PPVWcAjtyQOS8dxZ4-Z9wLNd5U8g/exec';
  } else if (stateValue === "Bihar SO" || stateValue === "IndianOil-AOD St OFF" || stateValue === "West Bengal SO" || stateValue === "Odisha SO") {
    apiUrl = 'https://script.google.com/macros/s/AKfycbzq2_EpLQfJs-FmRf26UNDLLjBJytfDGILIeaQBio7mku7QI9vlRUTMsCLeKUjxhf4k5w/exec';
  } else if (stateValue === "TAPSO" || stateValue === "Kerala SO" || stateValue === "Tamilnadu SO" || stateValue === "Karnataka SO") {
    apiUrl = 'https://script.google.com/macros/s/AKfycbylyUi8PLo-ueTrdnoAQiLM404s1DiqsSdJTHRGJcnTpqylrulTdZ_O-wN3Yy4Wht2G/exec';
  } else {
    alert("Invalid 'state' value. Data will not be saved.");
    deactivateLoader();
    if (submitBtn) submitBtn.disabled = false;
    return false;
  }

  const form = document.getElementById('dataForm');
  const formData = new FormData(form);
  const payload = new URLSearchParams();
  for (const pair of formData.entries()) {
    payload.append(pair[0], pair[1]);
  }

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: payload.toString()
  })
    .then(res => res.text())
    .then(data => {
      alert("Data Saved successfully");
      form.reset();
      updateFileCount(0);
      deactivateLoader();
      if (submitBtn) submitBtn.disabled = false;
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred while saving data: " + error.message);
      deactivateLoader();
      if (submitBtn) submitBtn.disabled = false;
    });

  return false;
}

let siteDataArr = [];

function loaddata() {
  activateLoader();
  fetch('https://script.google.com/macros/s/AKfycbxrqf7eUIGoGTJyb8i3lZscFBAENunb_czeBLuDMcPU1Y2YrXmsGKnTl1W3WeubqCaz/exec')
    .then(res => res.json())
    .then(data => {
      const sitedata = data?.content1;
      deactivateLoader();
      if (sitedata && sitedata.length > 0) {
        siteDataArr = sitedata;
      }
    })
    .catch(err => {
      console.error(err);
      deactivateLoader();
    });
}

function getSitedetails() {
  var siteCodeElem = document.getElementById("site_code");
  var site_code = siteCodeElem ? siteCodeElem.value : "";
  if (site_code) {
    const dataIndex = siteDataArr.findIndex(el => el[0] == site_code);
    const selectedsite = siteDataArr[dataIndex];
    if (selectedsite && selectedsite.length > 0) {
      if (document.getElementById('site_name')) document.getElementById('site_name').value = selectedsite[1];
      if (document.getElementById('state')) document.getElementById('state').value = selectedsite[2];
      if (document.getElementById('do_office')) document.getElementById('do_office').value = selectedsite[3];
    }
  }
}

function tankvs() {
  var tank = Number(document.getElementById("total_tank")?.value) || 0;
  var online = Number(document.getElementById("tank_online")?.value) || 0;
  var du = Number(document.getElementById("total_du")?.value) || 0;
  var duonline = Number(document.getElementById("du_online")?.value) || 0;
  var total = tank - online;
  var total1 = du - duonline;

  if (document.getElementById("tank_offline")) document.getElementById("tank_offline").value = total;
  if (document.getElementById("du_offline")) document.getElementById("du_offline").value = total1;

  if (total < 0) {
    if (document.getElementById("tank_online")) document.getElementById("tank_online").value = "";
    if (document.getElementById("tank_offline")) document.getElementById("tank_offline").value = "";
    alert("Tank Online Vs Offline not match");
  }
  if (total1 < 0) {
    if (document.getElementById("du_online")) document.getElementById("du_online").value = "";
    if (document.getElementById("du_offline")) document.getElementById("du_offline").value = "";
    alert("DU Online Vs Offline not match");
  }
}

function empty() {
  var x = document.getElementById("site_code")?.value || "";
  var y = document.getElementById("site_name")?.value || "";
  if (x === "") {
    alert("Please Enter site code");
  } else if (y === "") {
    alert("Site not found contact your administrator");
  }
}

function Resetname() {
  if (document.getElementById("site_name")) document.getElementById("site_name").value = "";
  if (document.getElementById("state")) document.getElementById("state").value = "";
  if (document.getElementById("do_office")) document.getElementById("do_office").value = "";
}

function updateFileCount(count) {
  const fileInput = document.getElementById("imageFile");
  const fileInputLabel = document.getElementById("fileInputLabel");
  if (!fileInputLabel) return;

  const totalFiles = (typeof count === 'number') ? count : (fileInput ? fileInput.files.length : 0);
  if (totalFiles === 0) {
    fileInputLabel.textContent = "Attachment (0 files)";
  } else {
    fileInputLabel.textContent = `Attachment (${totalFiles} file${totalFiles > 1 ? 's' : ''})`;
  }
}

function activateLoader() {
  const loaderElem = document.getElementById('myLoader');
  const divElem = document.getElementById('myDiv');
  if (loaderElem) loaderElem.style.display = 'block';
  if (divElem) {
    divElem.style.filter = 'blur(2px)';
    divElem.style.pointerEvents = 'none';
  }
}

function deactivateLoader() {
  const loaderElem = document.getElementById('myLoader');
  const divElem = document.getElementById('myDiv');
  if (loaderElem) loaderElem.style.display = 'none';
  if (divElem) {
    divElem.style.filter = 'blur(0)';
    divElem.style.pointerEvents = 'auto';
  }
}

function highlightRequiredFields() {
  const requiredFields = document.querySelectorAll('[required]');
  requiredFields.forEach(field => {
    if (!field.value || !field.value.trim()) {
      field.style.border = '2px solid red';
    } else {
      field.style.border = '';
    }
  });
}

const imageFileInput = document.getElementById('imageFile');
if (imageFileInput) {
  imageFileInput.addEventListener('change', function () {
    const attachmentLink = document.getElementById("attachmentLink");
    if (this.files.length > 0) {
      if (attachmentLink && attachmentLink.value.trim() !== "") {
        attachmentLink.value = "";
      }
      updateFileCount();
      compressAndLoadAsBinary();
    }
  });
}

const fileLabel = document.querySelector('.fileInputLabel');
if (fileLabel && imageFileInput) {
  fileLabel.addEventListener('blur', function () {
    imageFileInput.dataset.processed = false;
  });
}

const submitBtn = document.getElementById('submit');
if (submitBtn) {
  submitBtn.addEventListener('click', saveData);
}
