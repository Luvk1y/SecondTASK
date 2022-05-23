import {data} from './senate.mjs';


let members = data.results[0].members;


let filtMembers = members.filter(function (el){
    
    return el.first_name &&
        el.last_name &&
        el.votes_with_party_pct &&
        el.missed_votes &&
        el.missed_votes_pct &&
        el.url;
});
console.log(filtMembers,"filtro");

createTable(filtMembers)

function createTable(membersArr) {
    document.getElementById("tbody").innerHTML = "";
    membersArr.forEach(createTableRow)
}

function createTableRow(member) {    
// Member = {name: xxx, party: D, state: MI,....} and getting the next object in each iteration
    const tableRow = document.createElement('tr');
    Object.values(member).forEach((value, index, array) => {   
// Object.values(member) is ['xxx', 'D', 'MI,....]
        if (index < array.length - 1){                
// This condition is to filter the urls not to show in the table. 
//Only one array has been created (summarySenateData).
// Another array for the urls wasn't created to have the consistency.
            const rowCell = document.createElement('td');
            const rowCellText = (index === 0 && array[array.length - 1]) //?createAnchorTag(value, array[array.length - 1]): document.createTextNode(${value}); 
// This condition means: we are creating anchor tag in the name of a member in case;
                ? createAnchorTag(value, array[array.length - 1])                       
// Both the index is 0 which means we are creating the name cell in the table and the
                : document.createTextNode(${value});                                     
// Member in the loop has an url. If this condition is false then we only show the name as plain text, not as a link.
            rowCell.appendChild(rowCellText);
            tableRow.appendChild(rowCell);
        }
    })
    document.getElementById("tbody").append(row)
}

function createAnchorTag(anchorText, urlValue) {
    const anchorTag = document.createElement('a');
    const anchorTagText = document.createTextNode(anchorText);
    anchorTag.href = urlValue;
    anchorTag.target = '_blank';
    anchorTag.appendChild(anchorTagText);
    return anchorTag;
}