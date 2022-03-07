const DOM = {
    content: null,
    popUp: null,
    mainHtmlBody: null,
    closePopUp: null,
    searchInput: null,
    searchContainer: null
}

let coinsData = [];
let setIntervalId;
const cachedCoins = [];
const selectedCoins = [];

const Crypto_API = `https://api.coingecko.com/api/v3/coins`

class CryptoCoinMaker {
    constructor(id, symbol, name) {
        this.id = id
        this.symbol = symbol
        this.name = name
    }
}

DOM.mainHtmlBody = document.querySelector("body")

function showOrHideSearchContainer(status) {
    DOM.searchContainer = document.querySelector("#searchContainer")
    DOM.searchContainer.style.visibility = status
}


async function getCryptoCoinsInit() {

    clearInterval(setIntervalId);

    DOM.mainHtmlBody.style.backgroundImage = "url('./assests/bitcoin-sans-internet.jpg')";
    DOM.content = document.querySelector("#coinsCardsContent")
    DOM.popUp = document.querySelector("#staticBackdrop")
    DOM.closePopUp = document.querySelector("#closePopUp")
    showOrHideSearchContainer("visible")
    DOM.searchInput = document.querySelector("#searchInput")
    drawLoader()

    try {
        const url = `${Crypto_API}/list`
        const result = await fetch(url);
        const jsonResult = await result.json();
        const someHundread = jsonResult.slice(10000, 10100);
        const modeledResult = cryptoCoinMakerFn(someHundread)
        coinsData = modeledResult
        draw(coinsData)

    } catch (ex) {
        console.log(ex)
        const swalTitleText = "Something Went Wrong :(";
        const swalBodyText = "Try to Refresh the Page";
        const swalIconType = "error"
        swal(swalTitleText, swalBodyText, swalIconType, {
            closeOnClickOutside: false,
        })
    }
}

getCryptoCoinsInit()

function handleSearch() {
    const inputValue = DOM.searchInput.value
    if (!inputValue) {
        getCryptoCoinsInit()
    } else {
        const filteredCoins = coinsData.filter((coin) => coin.symbol.toLowerCase() === inputValue.toLowerCase())
        draw(filteredCoins)
    }
}


function deleteFromModal(index, target) {
    // prevent selectedcoin from toggling
    target.checked = true;
    // delete coin from SelectedCoins
    selectedCoins.splice(index, 1)
    // hide the modal
    showOrHideModal("none", "false", "", "true" )
    DOM.popUp.classList.remove("show")
    // draw again
    getCryptoCoinsInit()
}

function cryptoCoinMakerFn(coinsData) {
    if (!Array.isArray(coinsData)) return;
    return coinsData.map(coin => new CryptoCoinMaker(coin.id, coin.symbol, coin.name))
}



function draw(coins) {
    const divsUI = coins.map((coin) => getCoinCardUI(coin))
    DOM.content.innerHTML = "";
    DOM.content.append(...divsUI)
}



function getCoinCardUI(coinData) {
    const firstCardDiv = document.createElement("div");
    firstCardDiv.classList.add("card", "first-card-Div") // add col ?? try it 

    const secondCardDiv = document.createElement("div");
    secondCardDiv.classList.add("card-body");

    const firstInnerDiv = document.createElement("div");
    firstInnerDiv.classList.add("first-inner-div");

    const cardHeader = document.createElement("h5");
    cardHeader.classList.add("card-title");
    cardHeader.innerText = coinData.symbol.toUpperCase()

    const secondInnerDiv = document.createElement("div");
    secondInnerDiv.classList.add("second-inner-div");

    const toggleLabel = document.createElement("label");
    toggleLabel.classList.add("switch");

    const toggleInput = document.createElement("input");
    toggleInput.type = "checkbox";

    let index = selectedCoins.findIndex((coin) => coin.id == coinData.id)
    if (index !== -1)
        toggleInput.checked = true;
    else {
        toggleInput.checked = false;

    }

    toggleInput.addEventListener('change', () => {
        console.log(coinData)
        if (toggleInput.checked) {
            if (selectedCoins.length === 5) {
                toggleInput.checked = false;

                showOrHideModal("block", "true", "dialog", "false" )
                DOM.popUp.classList.add("modal", "fade", "show")

                document.querySelector("#firstModalCoin").innerText = selectedCoins[0].symbol
                document.querySelector("#secModalCoin").innerText = selectedCoins[1].symbol
                document.querySelector("#thirdModalCoin").innerText = selectedCoins[2].symbol
                document.querySelector("#fourthModalCoin").innerText = selectedCoins[3].symbol
                document.querySelector("#fifthModalCoin").innerText = selectedCoins[4].symbol

                DOM.closePopUp.addEventListener("click", () => {
                    showOrHideModal("none", "false", "", "true" )
                    DOM.popUp.classList.remove("show")
                })

            } else {
                selectedCoins.push(coinData);
            }
        } else {
            const index = selectedCoins.findIndex(coin => coin.id === coinData.id)
            if (index !== -1)
                selectedCoins.splice(index, 1)
        }
        console.log(selectedCoins)
    })

    const toggleSpan = document.createElement("span");
    toggleSpan.classList.add("slider", "round");

    const thirdInnerDiv = document.createElement("div");
    thirdInnerDiv.classList.add("third-inner-div")

    const Para = document.createElement("p");
    Para.classList.add("card-text");
    Para.innerText = coinData.name

    const forthInnerDiv = document.createElement("div");
    forthInnerDiv.classList.add("forth-inner-div");
    forthInnerDiv.style.display = "none";

    const fifthInnerDiv = document.createElement("div");
    fifthInnerDiv.classList.add("more-info-button-div")

    const MoreInfoButton = document.createElement("button");
    MoreInfoButton.classList.add("btn", "btn-primary", "btn-design");
    MoreInfoButton.innerText = "More Info";
    MoreInfoButton.addEventListener("click", async () => {
        if (MoreInfoButton.innerText === "More Info") {
            MoreInfoButton.innerText = "Less Info"
            forthInnerDiv.style.display = "block"
            await _getMoreInfo(coinData.id)
        } else {
            MoreInfoButton.innerText = "More Info"
            forthInnerDiv.style.display = "none"
        }
    })


    const divParentImg = document.createElement("div");
    divParentImg.classList.add("div-parent-img")

    const coinImg = document.createElement("img");
    coinImg.classList.add("coin-image")

    const divParentLabels = document.createElement("div");
    divParentLabels.classList.add("div-parent-labels")

    const labelOne = document.createElement("label");
    const labelTwo = document.createElement("label");
    const labelThree = document.createElement("label");

    firstCardDiv.append(secondCardDiv);
    secondCardDiv.append(firstInnerDiv, secondInnerDiv, thirdInnerDiv, forthInnerDiv, fifthInnerDiv);
    firstInnerDiv.append(cardHeader);
    secondInnerDiv.append(toggleLabel);
    toggleLabel.append(toggleInput, toggleSpan);
    thirdInnerDiv.append(Para)
    forthInnerDiv.append(divParentImg, divParentLabels)
    divParentImg.append(coinImg);
    divParentLabels.append(labelOne, labelTwo, labelThree);
    fifthInnerDiv.append(MoreInfoButton)


    async function _getMoreInfo(id) {
        let jsonResult;
        try {
            jsonResult = cachedCoins.find((coin) => coin.id === id)
            if (!jsonResult) {
                const url = `${Crypto_API}/${id}`
                const result = await fetch(url)
                jsonResult = await result.json()
                cachedCoins.push(jsonResult);
                setTimeout(() => {
                    const index = cachedCoins.findIndex(coin => coin.id === id)
                    if (index !== -1)
                        cachedCoins.splice(index, 1)
                }, 200000);
            }
            coinImg.src = jsonResult.image.large
            labelOne.innerText = `Coin price in USD: ${jsonResult.market_data.current_price.usd} $`
            labelTwo.innerText = `Coin price in EUR: ${jsonResult.market_data.current_price.eur} \u20AC`
            labelThree.innerText = `Coin price in ILS: ${jsonResult.market_data.current_price.ils} \u20AA`
        } catch (ex) {
            console.log(ex)
        }
    }


    return firstCardDiv;
}


function getLoader() {
    const divLoader = document.createElement("div");
    divLoader.className = "ring";
    const spanLoader = document.createElement("span");
    spanLoader.className = "span-loader"
    divLoader.append(spanLoader)
    return divLoader
}

function drawLoader() {
    DOM.content.innerHTML = "";
    DOM.content.append(getLoader())
}

function showOrHideModal (display, ariaModal, role, ariaHidden){
    DOM.popUp.style.display = display
    DOM.popUp.ariaModal = ariaModal
    DOM.popUp.role = role
    DOM.popUp.ariaHidden = ariaHidden
}

