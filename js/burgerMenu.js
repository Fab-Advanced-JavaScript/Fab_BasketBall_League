const init_menu = () => {

    /**
     * this event listener  is for the toggle() to open and close the sidebar menu
     */
    let myBurger = document.querySelector("#burger");
    myBurger.addEventListener("click", toggleBurger);
    

    /**
     * this event listener  to the closebtn to remove the sidebar menu when the user click on it
     */
    let closebtn = document.querySelector("#closebtn");
    closebtn.addEventListener("click", closeBurger); 
}


/*
* this listen to an event on a hamburger menu to display the slide bar menu on and off when clicking on the hamburger icon
* 
*/

const toggleBurger = () => {

    let burgerItems = document.querySelector(".burger-items")
    burgerItems.classList.toggle("showNav");
    console.log('button is clicked to open the sidebar menu');
  }

/*
* this listen to an event to close the burger menu
* 
*/
const closeBurger = () => {

    let burgerItems = document.querySelector(".burger-items")
    burgerItems.classList.remove("showNav")

    console.log('button is clicked to close the burger');

}

window.addEventListener("load", init_menu);