function initChart() {
    const chart = new CanvasJS.Chart("lineChart", _getOptions())
    chart.render();

    function _getOptions() {
        return {
            legend: {

                itemclick: function (e) {
                    console.log(e.dataSeries.legendText = "clicked")
                    chart.render();
                }

            }, 
            backgroundColor: "rgba(230, 230, 250, 0.4)",
            title: _getTitle(),
            data: selectedCoins.map((coin) => _getData("line", coin))
        }

        function _getTitle() {
            return { text: "Currency Exchange - Updated Live !" }
        }

        function _getData(plotType, coin) {
            return {
                showInLegend: true,
                legendText: coin.symbol,
                type: plotType,
                dataPoints: coin.history
            }
        }
    }

}

async function updateChart() {

    let coinSymbols = selectedCoins.map((coin) => coin.symbol).join(",");

    const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinSymbols}&tsyms=USD`
    const result = await fetch(url);
    const jsonResult = await result.json();

    const errorMessage = "Error";
    if (jsonResult.Response === errorMessage) {
        DOM.content.innerHTML = "";
        const swalTitleText = "We're Sorry :(";
        const swalBodyText = "The Selected Coin is Not a Valid coin that corresponds with our Third Party API...You can close this pop-up and return to our Home Page to select a new one";
        const swalIconType = "error"
        swal(swalTitleText, swalBodyText, swalIconType, {
        }).then(() => getCryptoCoinsInit())
    } else {

        selectedCoins.map((coin) => {
            if (jsonResult[coin.symbol.toUpperCase()])
                coin.history.push({ x: new Date(), y: jsonResult[coin.symbol.toUpperCase()].USD })
        })

        const reportsDiv = document.createElement("div");
        reportsDiv.id = "lineChart";
        reportsDiv.classList.add("row", "col-md-10" ,"offset-md-1")
        DOM.content.innerHTML = "";
        DOM.content.append(reportsDiv);

        initChart()
    }
}


async function reportsInit() {
    clearInterval(setIntervalId);
    console.log(selectedCoins);
    DOM.mainHtmlBody.style.backgroundImage = "url('./assests/bitcoin-rockets.jpg')";
    DOM.content = document.querySelector("#coinsCardsContent")
    showOrHideSearchContainer("hidden")

    if (selectedCoins.length) {
        drawLoader()
        selectedCoins.forEach((coin) => coin.history = [])
        await updateChart();
        setIntervalId = setInterval(updateChart, 2000);
    } else {
        DOM.content.innerHTML = "";
        const swalTitleText = "Please Select at Least 1 Coin to view Chart's Results";
        const swalBodyText = "You can close this pop-up and return to our Home Page";
        const swalIconType = "info"
        swal(swalTitleText, swalBodyText, swalIconType, {
        }).then(() => getCryptoCoinsInit())
    }
}