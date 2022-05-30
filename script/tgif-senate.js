import {senateData} from './senate.mjs';
import {states} from './state.mjs';
// Close all dropdown lists if the user clicks outside of it


let members = senateData.results[0].members;
let checkboxes = document.querySelectorAll("input[type=checkbox]");
let enabledSettings = [];
let selector =document.getElementById('filterstates');
let defARR = [];


//create function to build a table in js 
//llamada a la funcino para que aparezca la tabla default
buildTable(members);

function buildTable(membersArr) {
  document.getElementById("tbody").innerHTML = "";
  for (var i = 0; i < membersArr.length; i++) {

      var row = document.createElement("tr");
      var link = document.createElement("a");
      link.textContent = membersArr[i].first_name + " " + (membersArr[i].middle_name || "") + " " + membersArr[i].last_name;
      link.setAttribute("href", membersArr[i].url)
      row.insertCell().append(link);
      row.insertCell().innerHTML = membersArr[i].party;
      row.insertCell().innerHTML = membersArr[i].state;
      row.insertCell().innerHTML = membersArr[i].seniority;
      row.insertCell().innerHTML = membersArr[i].votes_with_party_pct;
      document.getElementById("tbody").append(row)

  }

}

//buildDropdown
buildDropdown(states)

function buildDropdown(states){
  const keyStates = Object.keys(states); //dentro del objeto solo nos quedamos con las claves que son las abreviaciones
  var selectmenu = document.getElementById('filterstates'); //nos traemos del html el elemento con id filterstates
  keyStates.forEach((key, index) => { //para cada key dentro de keyStates
    let stateOptions = document.createElement('option'); //creamos elementos option
    stateOptions.value = `${key}`;//el valor sera la key
    stateOptions.text =`${key}`;//el texto sera la key tambien
    selectmenu.appendChild(stateOptions);//añadimos elementos hijo de tipo option al select
  });
}

filterMembers(members)

function filterMembers(arr){
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
       enabledSettings = 
        Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
        .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
        .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
        return  enabledSettings.length>0?  buildTable(arr.filter(x => enabledSettings.indexOf(x.party) !== -1))  : buildTable(arr);
});
});
}
filterStates(members)
function filterStates(arr){
  let y = "";
  selector.addEventListener('change',(event)=>{
  y =  event.target.value;
  return y !== "All states" ? buildTable(arr.filter(x=>x.state===y)) : buildTable(arr);
});
}

