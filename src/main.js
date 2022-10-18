import "./css/index.css"

const ccBgColor1 = document.querySelector('.cc .cc-bg svg > g g:nth-child(1) path');
const ccBgColor2 = document.querySelector('.cc .cc-bg svg > g g:nth-child(2) path');
const ccTypeImg = document.querySelector('.cc .cc-logo span:nth-child(2) img')

function setCard(type){
  const cardColors = {
    "visa":  ["#2D57F2", "#436D99"],
    "mastercard": ["#C69347","#DF6F29"],
    "amex": ["#B0B0B0 ","#FFFFFF"],
    "default": ["black", "gray"]
  }
  ccBgColor1.setAttribute("fill", cardColors[type][0])
  ccBgColor2.setAttribute("fill", cardColors[type][1])
  ccTypeImg.setAttribute("src",`cc-${type}.svg`)
}
globalThis.setCardType = setCard;