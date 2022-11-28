console.log('hi i m karan');
showNotes();
// if user add a notes  , add it to the local storage ;
let addBtn = document.getElementById('addBtn');



addBtn.addEventListener("click",function(e){
    let addTxt = document.getElementById('addTxt');
    let addtitle = document.getElementById('title');
    
    if(addTxt.value == "" )
    {
        showNotes();
    }
    else{
        let notes = localStorage.getItem('notes');
    let title = localStorage.getItem('title');
    
    if(notes==null)
    {
        titleObj = [];
        notesObj = [];
    }
    else
    {
        titleObj = JSON.parse(title);
        notesObj = JSON.parse(notes);
    }
    // console.log(addTxt.value);
    // console.log(addtitle.value);
    titleObj.push(addtitle.value);
    notesObj.push(addTxt.value);
    localStorage.setItem("title",JSON.stringify(titleObj));
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTxt.value = "";  
    addtitle.value = "";
    // console.log(titleObj);
    // console.log(notesObj);
  
    showNotes();
    }
    
})

function showNotes()
{
    let notes = localStorage.getItem('notes');
    let title = localStorage.getItem('title');
    // console.log(title);
    if(notes==null)
    {
        titleObj = [];
        notesObj = [];
    }
    else
    {
        titleObj = JSON.parse(title);
        notesObj = JSON.parse(notes);
    }
     
    let html = "";
    notesObj.forEach(function(element,index){
        html += `
            <div class="my-2 mx-2 card card1"  style="width: 18rem;">
                <div class="card-body" >
                    <h5 class="note-title">${titleObj[index]}</h5>
                    <p class="note-txt" >${element}</p>
                    <button id="${index}" class="btn btn-primary" onclick="deleteNote(this.id);">Delete Note</button>
                </div>
            </div>
        `
    }); 
     
    let noteCon = document.getElementById('notes');
    if(notesObj.length != 0)
    {
        noteCon.innerHTML = html;
    }
    else
    {
        noteCon.innerHTML =`Nothing to show! please use "Add Notes" section to add notes.`;
    }
    
}

//delete a note

function deleteNote(index)
{
    // console.log(index ,'i m deleting a note');
    let notes = localStorage.getItem('notes');
    let title = localStorage.getItem('title');
    if(notes==null)
    {
        titleObj = [];
        notesObj = [];
    }
    else
    {
        titleObj = JSON.parse(title);
        notesObj = JSON.parse(notes);
    }

    titleObj.splice(index,1);
    notesObj.splice(index,1);
    // localStorage.clear();
    localStorage.setItem("title",JSON.stringify(titleObj));
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();

}

let se = document.getElementById('search');
se.addEventListener('input',function(){
    let inputValue = se.value.toLowerCase();
    let noteCard = document.getElementsByClassName('card1');
   
    Array.from(noteCard).forEach(function(element){
      let cardTxt = element.getElementsByTagName('p')[0].innerHTML.toLowerCase();
      let titleTxt = element.getElementsByTagName('h5')[0].innerHTML.toLowerCase();
    //   console.log(titleTxt);
    
      if(cardTxt.includes(inputValue) || titleTxt.includes(inputValue))
      {
            element.style.display = "block";
            
      }
      else
      {
        element.style.display = "none";
        
      }
    })
});
     
