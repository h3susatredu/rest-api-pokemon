function showHomeView() {
    document.getElementById("listView").style.display = "none";
    document.getElementById("favView").style.display = "none";
    document.getElementById("searchView").style.display = "none";
    document.getElementById("homeView").style.display = "block";
}
showHomeView();

function showListView() {
    document.getElementById("listView").style.display = "block";
    document.getElementById("favView").style.display = "none";
    document.getElementById("searchView").style.display = "none";
    document.getElementById("homeView").style.display = "none";
}

function showSearchView() {
    document.getElementById("listView").style.display = "none";
    document.getElementById("favView").style.display = "none";
    document.getElementById("searchView").style.display = "block";
    document.getElementById("homeView").style.display = "none";
}

function showFavView() {
    document.getElementById("listView").style.display = "none";
    document.getElementById("favView").style.display = "block";
    document.getElementById("searchView").style.display = "none";
    document.getElementById("homeView").style.display = "none";
}