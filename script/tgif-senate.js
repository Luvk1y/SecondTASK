import {senateData} from './senate.mjs';
// Close all dropdown lists if the user clicks outside of it


let members = senateData.results[0].members;
const filters = document.querySelector('#filterType');


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
      let td =row.insertCell();
      console.log(td.id=`${members[i].party}`,'id');
     // td.id=`${members[i].party}`;
      td.innerHTML = membersArr[i].party;
      
      row.insertCell().innerHTML = membersArr[i].state;
      row.insertCell().innerHTML = membersArr[i].seniority;
      row.insertCell().innerHTML = membersArr[i].votes_with_party_pct;

      document.getElementById("tbody").append(row)

  }

}


//filter 

function filterKey(e) {
  const tgt = e.target;
 
  let name = tgt.value;
  
  let keys = document.querySelectorAll(`[id^=${name}]`);
  console.log(keys,'cc')
  for (let cell of keys) {
    if (tgt.checked) {
     
      cell.closest('tr').classList;
      console.log( cell.closest('tr').classList,'sss')
      console.log( cell.closest('tr').classList.remove('off'), 'xx');
    } else {
      cell.closest('tr').classList.add('off');
    }
  }
}

filters.onchange = filterKey;



function createFilters(array) {
  let set = Array.from(new Set([...array]));
  set.forEach(function(name) {
    let chk = `<label><input type="checkbox" data-filter="${name}" checked>${name}</label>`;
    filters.lastElementChild.insertAdjacentHTML('beforeend', chk);
  });
};









//llamamos a buildTable() para que nos cree la tabla


var republican = document.getElementById("R");
var indipendent = document.getElementById("ID");
var democratic  = document.getElementById("D");

let republicanMembers = members.filter(function(members){
  return members.party === "R";
})

let democratMembers = members.filter(function(members){
  return members.party === "D";
})

let indepMembers = members.filter(function(members){
  return members.party === "ID"
})


republican.addEventListener('change', function() {
  if (this.checked) {
    buildTable(republicanMembers)
  } else {
    buildTable(members);
    console.log("Checkbox is not checked..");
  }
});

democratic.addEventListener('change', function() {
  if (this.checked) {
   buildTable(democratMembers)
  } else {
    buildTable(members);
    console.log("Checkbox is not checked..");
  }
});

indipendent.addEventListener('change', function() {
  if (this.checked) {
    buildTable(indepMembers)
  } else {
    buildTable(members);
    console.log("Checkbox is not checked..");
  }
});