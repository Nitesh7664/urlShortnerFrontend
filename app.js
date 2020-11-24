var longUrl = document.querySelector("#longUrl");
var shorten = document.querySelector("#shorten");
var shortUrl = document.querySelector("#shortUrl");
var copyBtn = document.querySelector("#copyBtn");
var spinner = document.querySelector("#spinner");
var shortForm = document.querySelector("#shortForm");
var shortPara = document.querySelector("#shortPara");
var errorMessageContainer = document.querySelector('#errorMessageContainer')

shorten.addEventListener("click", () => {
   errorMessageContainer.innerHTML = ""
   errorMessageContainer.classList.add("hide")
  shortForm.classList.add("hide");
  shortPara.classList.add("hide");
  spinner.classList.remove("hide");
  axios
    .post("https://urlbitly.herokuapp.com/shorten", {
      longUrl: longUrl.value,
    })
    .then((responseData) => {

      if(responseData.data.message){
         const errorMessage = document.createElement('p')
         const text = document.createTextNode(responseData.data.message);
         errorMessage.appendChild(text)
         errorMessageContainer.classList.add('error')
         errorMessageContainer.appendChild(errorMessage)
         errorMessageContainer.classList.remove("hide")
      }

      spinner.classList.add("hide");
      shortForm.classList.remove("hide");
      shortPara.classList.remove("hide");
      shortUrl.value = responseData.data.shortUrl;
    })
    .catch((err) => console.log(err));
});

copyBtn.addEventListener("click", () => {
  shortUrl.select();
  document.execCommand("copy");
  alert("Copied to the clipboard");
});
