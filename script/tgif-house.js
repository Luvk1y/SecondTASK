import {houseData} from './house.mjs';
import {states} from './state.mjs';
// Close all dropdown lists if the user clicks outside of it

let members = houseData.results[0].members;
let checkboxes = document.querySelectorAll("input[type=checkbox]");
let check = [];
let selector =document.getElementById('filterstates');

//create function to build a table in js 
//llamada a la funcion para que aparezca la tabla default
buildTable(members);
function buildTable(membersArr) {
  document.getElementById("tbody").innerHTML = ""; //traemos el elemento con id tbody y dentro le añadimos un texto vacio
  for (var i = 0; i < membersArr.length; i++) { //para cada i menor que array.length
      var row = document.createElement("tr"); //let row crear un elemento tr
      var link = document.createElement("a"); //let link crear un elemento a normalmente es un hipervinculo o algo parecido
      link.textContent = membersArr[i].first_name + " " + (membersArr[i].middle_name || "") + " " + membersArr[i].last_name; //el contenido de text content es el first middle y last name en cada indice i del array
      link.setAttribute("href", membersArr[i].url) //link que es crear un elemento a tiene a su vez un setAttribute que le da un atributo id name role href etc al elemento
      row.insertCell().append(link); //a row que es crear un tr le aplicamos insertCell que crea una celda y con append añadimos link dentro de la celda
      row.insertCell().innerHTML = membersArr[i].party; //creamos la celda y le añadimos un texto al html que es el party en cada posicion de i
      row.insertCell().innerHTML = membersArr[i].state; //...el state..
      row.insertCell().innerHTML = membersArr[i].seniority;
      row.insertCell().innerHTML = membersArr[i].votes_with_party_pct;
      document.getElementById("tbody").append(row) //nos traemos tbody y le añadimos row
  }
}

//buildDropdown
buildDropdown(states);
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

//empezamos con los fitros objetivo filtrar un array cuando llegue uno o varios input
//primer objetivo filtrar el array por party si uno o varios checkbox estan activos y devolver un middlearray o el array entero
//segundo objetivo filtrar el middlearray por el estado dependiendo de la option que este activa en el salect y devolver el arraydefinitivo o el array entero y se lo pasamos a buildTable


// filter 
const makeFilterArray = members => {
  check =  Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
                .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
                .map(i => i.value); // gets array with filterboxes taht are checked
               
  let state = selector.value; // gets value from dropdown for states
  //let members = makeArr(data); // makes usable array with function from main.js using data from json data
  let filterarr = []; // creating new empty array that serves as temp to populate new array
  if (check.length == 0 && state == "All states") {
    // case 1: NO Checkboxes; NO Dropdown states => default state
    filterarr = members;
  } else {
    members.forEach(element => {
      if (check.length !== 0 && state == "All states") {
        // case 2: YES Checkboxes are checked; NO Dropdown states
        //filterarr = members; // think this is unneccessary JL 7.2.20
        if (check.includes(element.party)) {
          filterarr.push(element);
        }
      } else if (check.length == 0 && state !== "All states") {
        // case 3: NO Checkboxes are checked; YES Dropdown states
        if (element.state == state) {
          filterarr.push(element);
        }
      } else {
        if (check.includes(element.party) && element.state == state) {
          // case 4: YES Checkboxes are checked; YES Dropdown states

          filterarr.push(element);
        }
      }
    }); // end of foreach=> temp array fiterarry is full of desired data
  }

  return buildTable(filterarr);
};



allEventListener(members);

function allEventListener(arr){
  //checkbox
  let y = "";
  selector.addEventListener('change',(event)=>{
  y =  event.target.value;
  let midArr = arr.filter(x=>x.state===y);
  return makeFilterArray(members)
  });

  //select
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      let  enabledSettings = Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
                              .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
                              .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
      return makeFilterArray(members);
      });
    });
}

