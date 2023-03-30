

let ulDOM = document.querySelector("#list")
let input = document.querySelector("#task")
let allLiDOM = document.createElement("li")


// liste elemanı silme fonksiyonunu tanımladık.
function removeElement(erase) { 
  erase.remove();             // Liste elemanını siler
  eraseStrorage(erase);       // Liste elemanının içeriğini localStorage'den siler
}


// Liste elemanını işaretleme fonksiyonunu tanımladık.
function markElement(){
  this.classList.toggle("checked");
}


// listelerdeki kapama tuşu değişkenini liste elemanı silme eventi ile tanımladık.
let closeButton = `<button 
onclick="removeElement(parentNode)" 
style="padding: 13px;" type="button" 
class="close" 
data-dismiss="toast"
aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>`


// Her bir liste elemanı için hem kapama tuşu(liste elemanı silme eventi ile) hem de liste elemanı işaretleme eventi ile tanımlıyoruz.
allLiDOM.forEach(e => {
  e.addEventListener("click", markElement);
  e.innerHTML += `${closeButton}`;
})


function newElement() {

  if (!input.value || input.value.trim() === "") {
    console.log("Değer girmediniz");
    $('.error').toast('show')
    input.value = ""
  }
  else {
    let liDOM = document.createElement("li")
    liDOM.innerHTML = input.value
    ulDOM.append(liDOM)
    $('.success').toast('show')
    // li elemanının içeriğine inputa girilen değeri ve kapama tuşu tanımladık.
    liDOM.innerHTML = `${input.value}${closeButton}`

    // li elemanı için işaretleme fonksiyonu tanımladık.
    liDOM.addEventListener("click", markElement)

    input.value = ""

    // localStorage.setItem("inputValue", `${taskDOM.value}`);
    setStrorage()
  }
}


// Liste elemanı içeriğini localStorage'ye eklediğimiz fonksiyon:
function setStrorage(){
  let toDoList = JSON.parse(localStorage.getItem("toDoList"));   // toDoList ls'sini array'a çevirip olarak çağırdık.
  toDoList.push(`${input.value}`);                             // input'a girdiğimiz yazıyı toDoList array'ine ekledik.
  localStorage.setItem("toDoList", JSON.stringify(toDoList));    // toDoList'i tekrar string'e çevirip ls'ye yolladık.
}


// Liste elemanının içeriğini localStorage'den sildiğimiz fonksiyon:
function eraseStrorage(erase){
  let toDoList = JSON.parse(localStorage.getItem("toDoList"));    // toDoList ls'sini array'a çevirip olarak çağırdık.
  if (toDoList.includes(erase.firstChild.textContent) == true) {  // toDoList array'i listeye yazdığımız metini içeriyorsa
      let indexbul = toDoList.findIndex(e =>                      // Bu metnin(array'in elemanı) index nosunu buluyoruz.
          e == erase.firstChild.textContent
          );
      toDoList.splice(indexbul, 1);                               // index nosundan kendisini bulup array'den siliyoruz.
      localStorage.setItem("toDoList", JSON.stringify(toDoList)); // toDoList'i tekrar string'e çevirip ls'ye yolladık.
  } 
}


// Eğer daha önce oluşturulmuş bir localStorage dosyası yok ise oluşturan fonksiyon:
function localSelf() {
  let toDoList = JSON.parse(localStorage.getItem("toDoList"));    // toDoList ls'sini array'a çevirip olarak çağırdık.
  if (!toDoList) {toDoList = []};                                 // Hali hazırda toDoList array'i yoksa biz oluşturduk.
  localStorage.setItem("toDoList", JSON.stringify(toDoList));     // toDoList'i tekrar string'e çevirip ls'ye yolladık.
}


// Sayfayı her açtığımızda localStorage'de bulunan her elemanı listeye ekleyen fonksiyon:
function localDOM(){
  let toDoList = JSON.parse(localStorage.getItem("toDoList"));    // toDoList ls'sini array'a çevirip olarak çağırdık.
  toDoList.forEach((e, index) => {                                // toDoList'de kayıtlı her eleman ve index nosu için;
      let liDOM = document.createElement("li");                   // liste elemanı oluşturduk.
      ulDOM.append(liDOM);                                      // bu liste elemanlarını listeye(ul) ekledik.
      liDOM.innerHTML = toDoList[index]                           // liste elemanlarının içeriğine toDoList'teki arrayler,
      liDOM.innerHTML += `${closeButton}`                         // ve kapama tuşu ekledik.
      liDOM.addEventListener("click", markElement);               // işaretleme eventi ekledik.
  })
}

localSelf() // Yok ise localStorage dosyası oluşturuldu.

localDOM()  // localStorage'de daha önce kaydettiğimiz liste elemanları DOM arayüzüne eklendi.