import "./css/index.css"
import IMask from "imask";

const ccBgColor1 = document.querySelector('.cc .cc-bg svg > g g:nth-child(1) path');
const ccBgColor2 = document.querySelector('.cc .cc-bg svg > g g:nth-child(2) path');
const ccTypeImg = document.querySelector('.cc .cc-logo span:nth-child(2) img')

function setCard(type) {
  const cardColors = {
    "visa": ["#2D57F2", "#436D99"],
    "mastercard": ["#C69347", "#DF6F29"],
    "amex": ["#B0B0B0 ", "#FFFFFF"],
    "default": ["black", "gray"]
  }
  ccBgColor1.setAttribute("fill", cardColors[type][0])
  ccBgColor2.setAttribute("fill", cardColors[type][1])
  ccTypeImg.setAttribute("src", `cc-${type}.svg`)
}

const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000"
};
const securityCodeMasked = IMask(securityCode, securityCodePattern);

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2, 4),
      to: String(new Date().getFullYear() + 10).slice(2, 4),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    }
  }
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)


const cardNumber = document.querySelector('#card-number')
const cardNumberPatter = {
  mask: [
    {
      mask: '0000 000000 00000',
      regex: /^3[47]\d{0,13}/,
      cardtype: 'amex'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^4\d{0,15}/,
      cardType: 'visa'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: 'mastercard'
    },
    {
      mask: '0000 0000 0000 0000',
      cardType: 'default'
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    var number = (dynamicMasked.value + appended).replace(/\D/g, '');
    const foundMask = dynamicMasked.compiledMasks.find(({ regex }) => number.match(regex))
    return foundMask
  }
}
const cardNumberMasked = IMask(cardNumber, cardNumberPatter)

globalThis.setCardType = setCard;