

function saveDataIOCL() {
   
    const Button = document.getElementById("submit1")
   // document.querySelector("#sub").value = "Submit1ing..";
    document.getElementById("submit1").disabled = true;
   
   // const id = document.getElementById('virtual_id').value;
    const form = document.getElementById('iocl');
    

    let data = new FormData(form);
    //(running)https://script.google.com/macros/s/AKfycbw9lLX9f1aC54wPkEccGlOfC6acVK36wcvj6QSE1tIqupUFpM0wkWOAylDsNo0x6MWNuA/exec
    // (Test)  https://script.google.com/macros/s/AKfycbxs9ky-jBMvSL_JB09NNcNGcbtqrA1e3d6B4E3g42q2PQAYl-hzlApPMRQVcrlJJjLfzQ/exec
    fetch('https://script.google.com/macros/s/AKfycbxrqf7eUIGoGTJyb8i3lZscFBAENunb_czeBLuDMcPU1Y2YrXmsGKnTl1W3WeubqCaz/exec', {
        method: "POST",
        body: data
    })
        .then(res => res.text())
        .then(data => {
            //document.querySelector("#sub").value = "Submit1";
            //document.querySelector("#sub").value = "Submit1ing";
            alert("Data Saved successfully ");
            //const successMsg = `${data}: Virtual ID Created successfully ID:-${id}`;
            //document.querySelector("#msg").innerHTML = alert;
            document.getElementById("submit1").disabled = false;
            document.getElementById("iocl").reset();
            window.location.reload();
            return (true);
               
        }); 

}


function saveDataHpcl() {
  
    const Button = document.getElementById("submit2")
   // document.querySelector("#sub").value = "Submit2ing..";
    document.getElementById("submit2").disabled = true;
   
   // const id = document.getElementById('virtual_id').value;
    const form = document.getElementById('hpcl');
    

    let data = new FormData(form);
    //(running)https://script.google.com/macros/s/AKfycbw9lLX9f1aC54wPkEccGlOfC6acVK36wcvj6QSE1tIqupUFpM0wkWOAylDsNo0x6MWNuA/exec
    // (Test)  https://script.google.com/macros/s/AKfycbxs9ky-jBMvSL_JB09NNcNGcbtqrA1e3d6B4E3g42q2PQAYl-hzlApPMRQVcrlJJjLfzQ/exec
    fetch('https://script.google.com/macros/s/AKfycbxeWgGJiKXDadqdnXXqsdx9b4Ojjk6RKWXU5oMQNcP2q37NcIOIyBDo5qOwWnr-F0xRjA/exec', {
        method: "POST",
        body: data
    })
        .then(res => res.text())
        .then(data => {
            //document.querySelector("#sub").value = "Submit2";
            //document.querySelector("#sub").value = "Submit2ing";
            alert("Data Saved successfully ");
            //const successMsg = `${data}: Virtual ID Created successfully ID:-${id}`;
            //document.querySelector("#msg").innerHTML = alert;
            document.getElementById("submit2").disabled = false;
            document.getElementById("hpcl").reset();
            return (true);
               
        }); 

}


function saveDataNayara() {
  
    const Button = document.getElementById("submit3")
   // document.querySelector("#sub").value = "Submit3ing..";
    document.getElementById("submit3").disabled = true;
   
   // const id = document.getElementById('virtual_id').value;
    const form = document.getElementById('Nayara');
    

    let data = new FormData(form);
    //(running)https://script.google.com/macros/s/AKfycbw9lLX9f1aC54wPkEccGlOfC6acVK36wcvj6QSE1tIqupUFpM0wkWOAylDsNo0x6MWNuA/exec
    // (Test)  https://script.google.com/macros/s/AKfycbxs9ky-jBMvSL_JB09NNcNGcbtqrA1e3d6B4E3g42q2PQAYl-hzlApPMRQVcrlJJjLfzQ/exec
    fetch('https://script.google.com/macros/s/AKfycbwA9p-gERcEsl0seZA5iQZGAW5Ua5nVaCuxR0hr0rdFETwb36JcuUDANg_e8payIYYs/exec', {
        method: "POST",
        body: data
    })
        .then(res => res.text())
        .then(data => {
            //document.querySelector("#sub").value = "Submit3";
            //document.querySelector("#sub").value = "Submit3ing";
            alert("Data Saved successfully ");
            //const successMsg = `${data}: Virtual ID Created successfully ID:-${id}`;
            //document.querySelector("#msg").innerHTML = alert;
            document.getElementById("submit3").disabled = false;
            document.getElementById("Nayara").reset();
            return (true);
               
        }); 

}

 // Define countries for each continent
 var countriesByContinent = {
  "Bihar SO": ["BEGUSARAI DIV. OFFIC", "Patna DO", "Ranchi Divisional Of", "Dhanbad DO", "MuzaffarpurDO"],
  "Delhi & Haryana SO": ["Delhi DO", "Panipat DO", "Hissar DO", "Gurgaon DO"],
  "Gujarat SO": ["Surat DO", "Rajkot DO", "Ahmedabad DO"],
  "IndianOil-AOD St OFF": ["Guwahati DO", "Tinsukia DO", "Sichar DO", "Imphal DO"],
  "Karnataka SO": ["Bangalore DO", "Mangalore DO", "Belgaum DO", "Mysore DO", "Bellary DO"],
  "Kerala SO": ["Thiruvananthpuram DO", "Ernakulam (Kochi) DO", "Kozhikode(CalicutDO)"],
  "Madhya Pradesh SO": ["Bhopal DO", "Jabalpur DO", "Raipur DO", "Indore DO"],
  "Maharashtra SO": ["Nagpur DO", "Pune DO", "GOA DO", "Mumbai DO", "AURANGABAD D.O."],
  "Odisha SO": ["Bhubneswar DO", "Sambalpur DO"],
  "Punjab &Himachal SO": ["AMRITSAR DO", "SANGRUR DO", "Bhatinda DO", "JALLANDHAR DO (RE)", "Chandigarh DO", "Shimla DO", "Jammu DO"],
  "Rajasthan SO": ["Jaipur DO", "Jodhpur DO", "AJMER DO", "Udaipur DO"],
  "Tamilnadu SO": ["Chennai DO", "Trichy DO", "Madurai DO", "Coimbatore DO", "Salem DO"],
  "TAPSO": ["Secundrabad DO", "Vishakhapatnam DO", "Vijayawada DO", "TIRUPATI DO", "Warangal DO"],
  "Uttar Pradesh SO": ["Gorakhpur DO", "VARANASI DO", "Allahabad DO", "Kanpur DO","Lucknow DO",""],
  "Uttar Pradesh SO -II": ["Moradabad DO", "Agra DO", "Dehradun DO", "Bareilley DO", "NOIDA DO"],
  "West Bengal SO": ["Kolkata DO", "Siliguri DO", "Durgapur DO", "HALDIA DO"]
 
};

  function populateCountriesIocl() {
    var continentSelect = document.getElementById("state");
    var countrySelect = document.getElementById("division_office");

    // Clear previous options
    countrySelect.innerHTML = "";
    
    // Add new options based on selected continent
    var selectedContinent = continentSelect.value;
    var countries = countriesByContinent[selectedContinent];
    if (countries) {
      for (var i = 0; i < countries.length; i++) {
        var option = document.createElement("option");
        option.text = countries[i];
        option.value = countries[i];
        countrySelect.add(option);
      }
    }
  }

 //HPCL
  var countriesByContinent1 = {
    "Bihar SO": ["Ranchi"],
  "Delhi & Haryana SO": ["Delhi", "Panipat", "Hissar", "Gurgaon"],
  "Gujarat SO": ["Baroda", "Rajkot", "Ahmedabad"],
  "IndianOil-AOD St OFF": ["Guwahati"],
  "Kerala SO": ["Cochin", "Kozhikode"],
  "Madhya Pradesh SO": ["Raipur", "Bilaspur"],
  "Maharashtra SO": ["Aurangabad", "Nashik", "Pune", "Mumbai", "Solapur", "Nagpur", "Vashi", "Vasco"],
  "Odisha SO": ["Bhubaneshwar", "Sambalpur"],
  "Punjab &Himachal SO": ["Jalandhar", "Bathinda", "Chandigarh", "Jammu", "Shimla"],
  "Rajasthan SO": ["Udaipur", "Jaipur", "Kota", "Jodhpur"],
  "Tamilnadu SO": ["Salem", "Trichy", "Chennai", "Madurai", "Coimbatore"],
  "TAPSO": ["Secunderabad", "Nellore", "Warangal", "Vizag", "Kadapa", "Vijayawada"],
  "Uttar Pradesh SO": ["Kota", "Kanpur", "Varanasi", "Gorakhpur", "Lucknow","PRAYAGRAJ RETAIL REGION"],
  "Uttar Pradesh SO-II": ["Agra", "Dehradun", "Meerut"],
  "West Bengal SO": ["Siliguri", "Durgapur"]
   
  };
  
    function populateCountriesHpcl() {
      var continentSelect1 = document.getElementById("State");
      var countrySelect1 = document.getElementById("regional_office");
  
      // Clear previous options
      countrySelect1.innerHTML = "";
      
      // Add new options based on selected continent
      var selectedContinent1 = continentSelect1.value;
      var countries = countriesByContinent1[selectedContinent1];
      if (countries) {
        for (var i = 0; i < countries.length; i++) {
          var option = document.createElement("option");
          option.text = countries[i];
          option.value = countries[i];
          countrySelect1.add(option);
        }
      }
    }
  