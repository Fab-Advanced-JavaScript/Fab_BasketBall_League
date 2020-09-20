const init = () => {
    console.log("let get the web version up and running");

    let myBurger = document.querySelector("#burger");
    myBurger.addEventListener("click", toggleBurger);

}

/*
*toggles hamburger menu in and out when clicking on the hamburger icon
 * 
 */
const toggleBurger = () => {
    console.log('i am about the wire this');

    let div = document.querySelector('.menu-items')

    if(!div) {
        let div = document.createElement('div');
        div.classList.add("menu-items");
        let ul = document.createElement('ul');
        ul.setAttribute("id", "items");
        let createLine1 = document.createElement('hr');
        let createLine2 = document.createElement('hr');
        let li1 = document.createElement('li');
        let li2 = document.createElement('li');
        let li3 = document.createElement('li');
        let linebreak1 = document.createElement('br');
        let linebreak2 = document.createElement('br');

        li1.innerHTML = "Full Schedule";
        li2.innerHTML = "FBL Events";
        li3.innerHTML = "2020 FBL Drafts";
       
        ul.appendChild(li1);
        ul.appendChild(linebreak1);
        ul.appendChild(createLine1);
        ul.appendChild(li2);
        ul.appendChild(linebreak2);
        ul.appendChild(createLine2);
        ul.appendChild(li3);
        div.appendChild(ul);
        document.body.appendChild(div);
    } else {
        // let myUl = document.querySelector("#items");
        // myUl.remove();
        // div.remove();
        div.parentNode.removeChild(div);
    }

  }

window.addEventListener("load", init);
