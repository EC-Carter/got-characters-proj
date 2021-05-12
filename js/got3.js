let page = 1;
let Characters = [];


function getChar(page){
    //makes call and converts to json
    fetch(`https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=50`)
    .then(data => data.json())

    //sets up the recursive loop
    .then((data)=>{
        if(data.length > 0){
            page += 1;
            Characters = [...Characters,...data];
            getChar(page);
            //console.log(Characters);
        }else{
            let charDisp = document.querySelector("#charDisp");
            let charUl = document.createElement("ul");
            //loop through characters
            for( let i = 0; i < Characters.length;i++){
                let li = document.createElement("li");
                //pull out their name or alias if no name
                if(Characters[i].name != ""){
                    let cName = Characters[i].name;
                    li.innerHTML = `${cName}-`;
                } else {
                    let cName = Characters[i].aliases[0];
                    li.innerHTML = `${cName}-` ;
                }
                //add an api call to house url
                if(Characters[i].allegiances != ""){
                    let houseURL = Characters[i].allegiances[0];
                    fetch(`${houseURL}`)
                    .then(response => response.json())
                    .then(house=>{
                        //console.log(house);
                        let {name,region,coatOfArms,words,ancestralWeapons} = house;
                        li.innerHTML += `<a href ="#">${name}</a>` ;
                        //adds event listener to li
                        li.addEventListener("click",()=>{
                            let hHeading = document.querySelector("#hHeading");
                            let hPara = document.querySelector("#hPara");
                            let text = document.querySelectorAll(".default");
                            text[0].style.display = "none";
                            text[1].style.display = "none";
                            hHeading.innerHTML = `${name}`;
                            hPara.innerHTML = `Region: ${region}<br>
                            Coat Of Arms: ${coatOfArms}<br>
                            Words: ${words}<br>
                            Ancestral Weapon: ${ancestralWeapons[0]}`;
                            
                        }) //eo event listener
                    }) //eo then
                } else {li.innerHTML += "House Unknown"}
                charUl.append(li); 
            }//eo for loop
            charDisp.append(charUl);
        } // eo else block
        
    }) //eo .then

} //eo getChar
getChar(page)

