let name = prompt("Lütfen adınızı giriniz")
let myName = document.getElementById("myName").innerHTML = name

// setInterval kullanabilmek için işlemlerimi fonksiyon içine aldım
function time() {
  const today = new Date();

  hour = today.getHours();
  minute = today.getMinutes();
  second = today.getSeconds();

  // bu kısmı w3schools'dan aldım
  const days = ["Pazar", "Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];
  let day = days[today.getDay()];

  /* ödevde gösterilen şekilde, değerleri tek basamakla 
  göstermemek için bu 3 satırı yazıyoruz */
  hour = (hour < 10) ? "0" + hour : hour;
  minute = (minute < 10) ? "0" + minute : minute;
  second = (second < 10) ? "0" + second : second;

  /* değerlerimizi ekrana template ile gösteriyor ve kod satırını 80 
  karakterden kısa tutmak için eşitlikten sonrasını alt satıra alıyoruz */
  document.getElementById("myClock").innerHTML =
  `${hour}:${minute}:${second} ${day}`
}
setInterval(time, 1000);