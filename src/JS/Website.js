let Dropdown1 = false;

function DropDown(id) {
    if (Dropdown1 == false) {
        document.getElementById(id).style.display = "block";
        document.getElementById(id + 'Icon').innerHTML = "▲";
        Dropdown1 = true;
    } else {
        document.getElementById(id).style.display = "none";
        document.getElementById(id + 'Icon').innerHTML = "▼";
        Dropdown1 = false;
    }
    console.log(Dropdown1);
}