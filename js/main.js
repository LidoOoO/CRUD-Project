var siteName = document.getElementById("siteN");
var siteURL = document.getElementById("siteU");
var index = 1;
var bookmarks = [];

if(localStorage.getItem("books") != null){
    bookmarks = JSON.parse(localStorage.getItem("books"));
    displayData();
}

function validetion(name , url){
    var ur = false;
    var na = false;

    for(var i = 0 ; i < bookmarks.length ; i++){
        if(name == bookmarks[i].siteN || url == bookmarks[i].siteU){
            alert("This name or url already exists")
            return false
        }
    }
    na = true;


        if(/^[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(url)) {
            ur = true;
        }
        else{
            alert("url is not valid")
            return false;
        }
        if(na == true && ur == true){
            return true;
        }
}


function add(){
    if(validetion(siteName.value , siteURL.value) == true){
        var item = {
            siteN:siteName.value,
            siteU:siteURL.value,
            id:index 
        }
        bookmarks.push(item);
        localStorage.setItem("books" , JSON.stringify(bookmarks));
        console.log(bookmarks);
        index = index + 1;
        displayData()
    }
}

function displayData(){
    var cartona = '';
    for(var i = 0; i<bookmarks.length ; i++){
        cartona += `
        <tr data-index="${bookmarks[i].id}">
        <td>${bookmarks[i].id}</td>
        <td>${bookmarks[i].siteN}</td>
        <td>
        <button
            class="btn btn-visit bg-success text-white"
            data-index=""
            
        >
            <a href="https://${bookmarks[i].siteU}" target="_blank">Visit</a>
        </button>
        
        </td>
        <td>
        <button
            class="btn btn-delete bg-danger pe-2 text-white" onclick="del(${i})" 
            data-index="${bookmarks[i].id}"
        >
            Delete
        </button>
        </td>
    </tr>
        `
    }
        document.getElementById("tc").innerHTML = cartona; 

}

function del(id){
    bookmarks.splice(id , 1)
    for(var i = id ; i <bookmarks.length ; i++){
        bookmarks[i].id = bookmarks[i].id - 1;
    }
    if(localStorage.getItem("books") != null){
        index = 1;
    }
    
    localStorage.setItem("books" , JSON.stringify(bookmarks));
    displayData()
}

