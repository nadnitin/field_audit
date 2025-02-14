


function logout()
{
  
    window.location = "index.html"; 

    localStorage.setItem("name","logout");
    localStorage.setItem("state","");
    localStorage.setItem("role","");
    localStorage.setItem("username","");
    localStorage.setItem("account_status","");

}



async function validate() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  activateLoader();

  try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxt-_SmtG7TsIr00RP_bmNVTUj2hrpW7dOEyIn7PIX3jtqXQmfIMKfjPkyAKk6lTqfPWA/exec?action=getData');

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const userdata = data?.content;
     //console.log(userdata);
      if (userdata && userdata.length > 0) {
          const foundUser = userdata.find(user => user[0] === username && user[1] === b64EncodeUnicode(password));

          if (foundUser) {
              localStorage.setItem("username", username);
              localStorage.setItem("name", "secrate");
              localStorage.setItem("role", foundUser[2]);
              localStorage.setItem("state", foundUser[4]);
              localStorage.setItem("username", foundUser[0]);
              localStorage.setItem("account_status", foundUser[3]);

              if (foundUser[3] === "active") {
                  window.location = "home.html";
              } else {
                  deactivateLoader();
                  alert("Your account is inactive. Please contact your administrator.");
              }
          } else {
              deactivateLoader();
              alert("Incorrect username or password. Please try again.");
          }
      }
  } catch (error) {
      console.error("Error fetching data:", error);
      deactivateLoader();
      alert("Error.");
  }
}

  


document.addEventListener("DOMContentLoaded", function () {
  // Add event listener to the form
  document.getElementById("form_id").addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      login();
  });
});



function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (username === '' && password === '') {
   validate();
  } else {
    validate();
  }
}






// Function to encode string to Base64
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
    return String.fromCharCode(parseInt(p1, 16))
  }))
}

// Function to decode string from Base64
function b64DecodeUnicode(str) {
  return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(""))
}


function activateLoader() {
  document.getElementById('loader').style.display = 'block';
  document.getElementById('submit').style.display = 'none';
 
}

// Deactivate loader and remove blur
function deactivateLoader() {
  document.getElementById('loader').style.display = 'none';
  document.getElementById('submit').style.display = 'block';
 
}

function disableRightClick(event) {
  event.preventDefault(); // Prevent default right-click behavior
}

// Add event listener to the document for the contextmenu event (right-click)
document.addEventListener('contextmenu', disableRightClick);       
