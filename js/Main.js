var allWebsites = [];
var currentIndex = -1;

if(localStorage.getItem("website"))
{
  allWebsites = JSON.parse(localStorage.getItem("website"));
  displayWebsites();
}



function addWebsites()
{
    if (
      validateData("webName", "webNameAlertId")&&
      validateData("webUrl", "webURLAlertId")
    ) {

      var website = 
        {
          webName: document.getElementById("webName").value,
          webUrl: document.getElementById("webUrl").value,
          webDesc: document.getElementById("webDesc").value,
        };
  
        allWebsites.push(website);
  
        localStorage.setItem("website" , JSON.stringify(allWebsites))
  
        displayWebsites();
  
        clearWebsites();
    }
    else{
      alert("Please enter valid data")
    }
  }

  function displayWebsites()
  {
    var box="";
      for (var i = 0; i < allWebsites.length; i++) {
        
        box += 
        `
        <tr>
        <td> ${i+1}</td>
        <td> ${allWebsites[i].webName}</td>
        <td> ${allWebsites[i].webDesc}</td>
        <td> <a target="_blank" href="${allWebsites[i].webUrl}" class="btn btn-outline-success text">Visit</a></td>
        <td> <button onclick = getData(${i}) class="btn btn-outline-warning text"><i class="fa-solid fa-pen"></i></button></td>
        <td> <button onclick = remove(${i}) class="btn btn-outline-danger text"><i class="fa-solid fa-trash-can"></i></button></td>
        </tr>
        `
      }

      document.getElementById("tBody").innerHTML = box;

  }


  function clearWebsites()
  {
        document.getElementById("webName").value = "";
        document.getElementById("webUrl").value = "";
        document.getElementById("webDesc").value = "";
  }

  function remove(index)
  {
    allWebsites.splice(index,1);

    displayWebsites();

    localStorage.setItem("website" , JSON.stringify(allWebsites))
  }


  function searchWebsite()
  {
    var userWord = document.getElementById("pSearch").value;
    var box = "";
    for (var i = 0; i < allWebsites.length; i++) 
    {
      if (allWebsites[i].webName.toLowerCase().includes(userWord.toLowerCase())||allWebsites[i].webDesc.toLowerCase().includes(userWord.toLowerCase())) 
      {
        box +=
      `
        <tr>
        <td> ${i+1}</td>
        <td> ${allWebsites[i].webName}</td>
        <td> ${allWebsites[i].webDesc}</td>
        <td> <a target="_blank" href="${allWebsites[i].webUrl}" class="btn btn-outline-success text">Visit</a></td>
        <td> <button onclick = getData(${i}) class="btn btn-outline-warning text">Update</button></td>
        <td> <button onclick = remove(${i}) class="btn btn-outline-danger text">Delete</button></td>
        </tr>
        `
      }
      
    }
    document.getElementById("tBody").innerHTML = box;
  }

  function getData(pIndex)
  {
    document.getElementById("webName").value = allWebsites[pIndex].webName;
    document.getElementById("webUrl").value = allWebsites[pIndex].webUrl;
    document.getElementById("webDesc").value = allWebsites[pIndex].webDesc;
    
    document.getElementById("btnAdd").classList.add("d-none");
    document.getElementById("btnUpdate").classList.remove("d-none");
    
    currentIndex = pIndex;
  }



  function updateWebsite()
  {
    allWebsites[currentIndex].webName=document.getElementById("webName").value ;
    allWebsites[currentIndex].webUrl=document.getElementById("webUrl").value ;
    allWebsites[currentIndex].webDesc=document.getElementById("webDesc").value ;
    
    clearWebsites()
    displayWebsites()

    localStorage.setItem('website' , JSON.stringify(allWebsites))
    document.getElementById("btnAdd").classList.remove("d-none");
    document.getElementById("btnUpdate").classList.add("d-none");
  }

var allRegex = {
webName: /^[A-Z][A-Za-z0-9]+$/,
webUrl: /^((http|https):\/\/)www\.([A-za-z0-9]+)\.(com|(edu\.eg))/,
};

function validateData(inputId, alertId)
{
  var inputValue = document.getElementById(inputId).value;
  allRegex[inputId];
  if (allRegex[inputId].test(inputValue))
  {
    document.getElementById(inputId).classList.add("is-valid");
    document.getElementById(inputId).classList.remove("is-invalid");
    document.getElementById(alertId).classList.add("d-none");
    return true;
  }
  else {
    document.getElementById(inputId).classList.add("is-invalid");
    document.getElementById(inputId).classList.remove("is-valid");
    document.getElementById(alertId).classList.remove("d-none");
    return false;
  }
}


console.log(allRegex.webName);


