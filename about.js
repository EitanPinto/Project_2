function aboutInit() {
    clearInterval(setIntervalId);

    DOM.mainHtmlBody.style.backgroundImage = "url('./assests/rocket_crypto.jpg')";
    DOM.content = document.querySelector("#coinsCardsContent")
    showOrHideSearchContainer("hidden")
    drawLoader()

    const mainHeader = document.createElement("h4");
    mainHeader.classList.add("main-header-about-page")
    mainHeader.innerText = "ABOUT THIS WEBSITE";

    const websiteInfoDiv = document.createElement("div");
    websiteInfoDiv.innerText = `The main goal of this website is to give users information about 
    Crypto Coins and a Live Update of their price of up to 5 coins of their choice, 
    which can be replaced at any moment by choosing different Coins.`;
    websiteInfoDiv.classList.add("website-info-div-about-page")

    const homePageHeader = document.createElement("h5");
    homePageHeader.innerText = "The Home Page";
    homePageHeader.classList.add("home-page-header-about-page")

    const homePageInfoDiv = document.createElement("div");
    homePageInfoDiv.style.textAlign= "center"
    homePageInfoDiv.innerText = 
    `In this page I am basically fetching a 100 Crypto Coins from a third party API Coins list, saving them in an array, and with that array I am building a 
    UI visualization of cards and inserting the information of each Coin to those cards, with an option to enlarge 
    each card to view more content of an image and price value  in diferrent currencies. 
    This process invlolves another fetch request to the API. Before the coins appers on screen, a loader pops up. 
    There is also a search option to search for a specific coin and view it, through the search input on the right side of the Navbar. 
    The user has an option to choose up to 5 Coins with a toggle input. If the user choose more than 5 coins 
    (a sixth coin) , a pop up modal appers on screen which gives him the option to take one coin down from the 
    list of his marked coins or to press on cancel and return back with same coins selected.
    With these marked coins the User can then move to the reports page and check their live updated price in a chart. 
    `
    const reportsPageHeader = document.createElement("h5");
    reportsPageHeader.innerText = "The Reports Page";
    reportsPageHeader.classList.add("home-page-header-about-page")

    const reportsInfoDiv = document.createElement("div");
    reportsInfoDiv.style.textAlign= "center"
    reportsInfoDiv.innerText = 
    `In this page I am using a canvas js template that represnts a live price update of the coins selected in the home page and presenting them in a chart. 
    I am taking the selected coins from the user from the home page (array), loop through it and creating a key called history which is an empty array, 
    then I am fetching from the API with appropiate params (a string of my selected coins symbol), 
    and after I have the results I am looping again on the selected coins and for each coin I am pushing an x & y object that reprsents the time and price in USD. 
    I am sending this data to the chart function and use it. 
    This process is being called every 2 seconds with a set interval for a feel of live update for the convinience of the user.
    `
    const theDeveloperHeader = document.createElement("h5");
    theDeveloperHeader.innerText = "The Developer";
    theDeveloperHeader.classList.add("home-page-header-about-page")

    const theDeveloperMainInfoDiv = document.createElement("div");
    theDeveloperMainInfoDiv.style.marginBottom= "40px"

    const theDeveloperInfoDiv = document.createElement("div");
    theDeveloperInfoDiv.style.textAlign= "center"
    theDeveloperInfoDiv.innerText =
     `This Website was built by Eitan Pinto - a Student at John Brice College who wants to demonstrate 
     his aqquired skils in building a basic website using Html, 
     JS vanilla and basic design of Bootstrap.`


    const theDeveloperImage = document.createElement("img");
    theDeveloperImage.src = "./assests/developer_image.jpg"
    theDeveloperImage.classList.add("developer-image")

    const theDeveloperImageDiv = document.createElement("div");
    theDeveloperImageDiv.classList.add("developer-image-div")

    const mainParentDiv = document.createElement("div");
    mainParentDiv.classList.add("about-page-various-desgin")

    theDeveloperImageDiv.append(theDeveloperImage)
    theDeveloperMainInfoDiv.append(theDeveloperInfoDiv, theDeveloperImageDiv)
    mainParentDiv.append( 
        mainHeader, 
        websiteInfoDiv, 
        homePageHeader, 
        homePageInfoDiv,
        reportsPageHeader,
        reportsInfoDiv,
        theDeveloperHeader,
        theDeveloperMainInfoDiv)

    DOM.content.innerHTML = ""
    DOM.content.append(mainParentDiv);
}




