
"use strict"


let production = document.getElementById("production");
let gold = document.getElementById("gold");
let science = document.getElementById("science");
let food = document.getElementById("food");

function showResources(planet){
  console.log(planet.resources);

  production.innerHTML =  totalResources[0]+" +"+planet.resources[0];
  gold.innerHTML =    totalResources[1]+" +"+planet.resources[1];
  science.innerHTML = totalResources[2]+" +"+planet.resources[2];
  food.innerHTML =  totalResources[3]+" +"+planet.resources[3];

  colonizeOff();
  if(!planet.colonized){
    console.log("showing colonize button");
    document.getElementById("colonize").classList.remove("hidden");
    let index= 0;
    for(let i = 0; i<4; i++){
      if(planet==planetArray[i]){
        index=i;
      }
    }
    nextColonizable= index;
    console.log("next colonizable is: "+nextColonizable);
    document.getElementById("colonize").addEventListener("click", 
      function() {colonizePlanet()}
      );
  }


}

document.addEventListener("click", function(){
 colonizeOff()});

function colonizeOff(){
  console.log("hidding colonize button");
  document.getElementById("colonize").classList.add("hidden");

  
}

function showAllResources(planetArray){
  console.log("clicking System button");

  let p = 0;
  let g = 0;
  let s = 0;
  let f = 0;
  for(let i = 0; i< 4; i++){
    if(planetArray[i].colonized){
      p+=planetArray[i].resources[0];
      g+=planetArray[i].resources[1];
      s+=planetArray[i].resources[2];
      f+=planetArray[i].resources[3];
    }
    
  }
  production.innerHTML=  totalResources[0]+" +"+p;
  gold.innerHTML=  totalResources[1]+" +"+g;
  science.innerHTML= totalResources[2]+" +"+s;
  food.innerHTML=  totalResources[3]+" +"+f;
}

function populatePlanets(){
  for (let i=0; i<4; i++){
      let planetsElement = document.getElementById("planets");
      let planetElement = document.createElement("div");
      planetElement.classList.add("planet");
      planetsElement.appendChild(planetElement);

      let baseValue= 10;
      
      let res= [0,0,0,0];
      for(let j = 0; j<3; j++){
        let value = Math.ceil(Math.random()*baseValue/2);

        baseValue-=value;
        res[j]= value+1;
      }
      res[3]= baseValue+1;
      console.log(res);
      planetArray[i]= planetElement;

      planetElement.resources= res;
      if(i!= 0){
        planetElement.colonized= 0;
        planetElement.classList.add("uncolonized");

      }
      else{
        planetElement.colonized= 1;
      }
      planetElement.addEventListener("click", function(ev) {
        ev.stopPropagation();
        showResources(planetElement);
        }, false);

      
  }
  console.log("populate planets is done");
      
}

let planetArray = [0,0,0,0];
let totalResources = [0,0,0,0];
let nextColonizable = 0;
populatePlanets();

console.log(planetArray);


document.getElementById("system").addEventListener("click", function() {
  showAllResources(planetArray)});

document.getElementById("endTurn").addEventListener("click", function() {
  endTurn(planetArray)});

document.getElementById("researchButton").addEventListener("click", function() {
  toggleResearch()});


function toggleResearch(){
  console.log("toggling research");
  if (document.getElementById("researchSection").classList.contains("hidden")){
    document.getElementById("researchSection").classList.remove("hidden");
  }
  else{
    document.getElementById("researchSection").classList.add("hidden");
  }
}
function endTurn(planetArray){
  console.log("ending turn");

  let p = 0;
  let g = 0;
  let s = 0;
  let f = 0;
  for(let i = 0; i< 4; i++){
    if(planetArray[i].colonized){
      p+=planetArray[i].resources[0];
      g+=planetArray[i].resources[1];
      s+=planetArray[i].resources[2];
      f+=planetArray[i].resources[3];
    }
    
  }
  totalResources[0]+=p;
  totalResources[1]+=g;
  totalResources[2]+=s;
  totalResources[3]+=f;
  production.innerHTML=  totalResources[0]+" +"+p;
  gold.innerHTML=  totalResources[1]+" +"+g;
  science.innerHTML= totalResources[2]+" +"+s;
  food.innerHTML=  totalResources[3]+" +"+f;
}

function colonizePlanet(){
  console.log("colonizing");
  let planet = planetArray[nextColonizable];
  planet.colonized=1;
  planet.classList.remove("uncolonized");
}