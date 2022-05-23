import {data} from './senate.mjs';
// Close all dropdown lists if the user clicks outside of it


let members = data.results[0].members;


//create function to build a table in js 
buildTable(members);

function buildTable(membersArr) {

  document.getElementById("tbody1").innerHTML = "";

  for (var i = 0; i < membersArr.length; i++) {

      var row = document.createElement("tr");
      var link = document.createElement("a");

      link.textContent = membersArr[i].first_name + " " + (membersArr[i].middle_name || "") + " " + membersArr[i].last_name;
      link.setAttribute("href", membersArr[i].url)

      row.insertCell().append(link);
      row.insertCell().innerHTML = membersArr[i].total_votes;
      row.insertCell().innerHTML = membersArr[i].votes_with_party_pct;

      document.getElementById("tbody1").append(row)
  }
}
