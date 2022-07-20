let Dropdown1 = false;

function DropDown(id) {
    if (Dropdown1 == false) {
        document.getElementById(id).style.display = "block";
        Dropdown1 = true;
    } else {
        document.getElementById(id).style.display = "none";
        Dropdown1 = false;
    }
    console.log(Dropdown1);
}