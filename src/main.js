let healthcare_ic = []
let healthcare_hotdeals = []
let residential_ic = []
let residential_hotdeals = []
let commercial_ic = []
let commercial_hotdeals = []
let germany_states = []
let germany_objects = []
let germany_income
let germany_inprogress
let germany_closed

let allHeaderClasses = ['Hot Deals', 'Super Core', 'Core/Core Plus', 'Value Added', 'Opportunity', 'Development', 'Workout']

fetch('http://127.0.0.1:5000/residential')
    .then(res => res.json())
    .then(data => {
        for(let e of data.ic){
            healthcare_ic.push(e)
        }
        for(let e of data.hotdeals){
            healthcare_hotdeals.push(e)
        }
        changeHealthCaredata()
    })

fetch('http://127.0.0.1:5000/commercial')
    .then(res => res.json())
    .then(data => {
        for(let e of data.ic){
            commercial_ic.push(e)
        }
        for(let e of data.hotdeals){
            commercial_hotdeals.push(e)
        }
        changeCommercialdata()
    })

fetch('http://127.0.0.1:5000/residential')
    .then(res => res.json())
    .then(data => {
        for(let e of data.ic){
            residential_ic.push(e)
        }
        for(let e of data.hotdeals){
            residential_hotdeals.push(e)
        }
        changeResidentialdata()
    })

fetch('http://127.0.0.1:5000/germany')
    .then(res => res.json())
    .then(data => {
        for(let e of data.objects){
            germany_objects.push(e)
        }
        for(let e of data.state){
            germany_states.push(e)
        }
        germany_income = data.process
        germany_inprogress = data.in_progress
        germany_closed = data.closed

        showGermanyData()
        showState()
    })

let healthcarecount = 0
function changeHealthCaredata(){
    if(healthcarecount === 0){
        showHCHotDeals()
    }

    if(healthcarecount === 1){
        unshowHCHotDeals()
        changeAssetClass()
    }
    else{
        changeAssetClass()
    }
    healthcarecount++
    if(healthcarecount > 6){
        healthcarecount = 0
    }
    setTimeout(changeHealthCaredata, 5000)
}

function showHCHotDeals(){
    let generalDivs = document.getElementsByClassName('generaldata')
    let hotdealDivs = document.getElementsByClassName('hotdealdata')

    for(let i = 0; i<hotdealDivs.length;i++){
        hotdealDivs[i].style.visibility = 'visible'
    }

    for(let i = 0; i<generalDivs.length;i++){
        generalDivs[i].style.visibility = 'hidden'
    }

    let img = document.getElementsByClassName('hotdealImg')
    let ac = document.getElementsByClassName('hotdealAC')
    let priceSize = document.getElementsByClassName('hotdealPriceSize')
    let place = document.getElementsByClassName('hotdealPlace')
    let hcyield = document.getElementsByClassName('hotdealYieald')

    for(let i = 0; i<healthcare_hotdeals.length; i++){
        img[i].src = healthcare_hotdeals[i].imgsrc
        ac[i].innerHTML = healthcare_hotdeals[i].investclass
        place[i].innerHTML = healthcare_hotdeals[i].place
    }
}

function unshowHCHotDeals(){
    let generalDivs = document.getElementsByClassName('generaldata')
    let hotdealDivs = document.getElementsByClassName('hotdealdata')

    for(let i = 0; i<hotdealDivs.length;i++){
        hotdealDivs[i].style.visibility = 'hidden'
    }

    for(let i = 0; i<generalDivs.length;i++){
        generalDivs[i].style.visibility = 'visible'
    }
}

function changeAssetClass() {
    let hcard = document.getElementsByClassName('hcdesc')
    for(let i =0; i<hcard.length;i++){
        hcard[i].innerHTML = allHeaderClasses[healthcarecount]
        if(healthcarecount != 0){
            changeHCData(healthcarecount-1)
        }
    }
}
function changeHCData(index){
    let hcIncomeCard = document.getElementById('hcIncome')
    let hcProgressCard = document.getElementById('hcProgress')
    let hcClosingCard = document.getElementById('hcClosed')

    hcIncomeCard.innerHTML = healthcare_ic[index].income
    hcProgressCard.innerHTML = healthcare_ic[index].progress
    hcClosingCard.innerHTML = healthcare_ic[index].closing
}

/**
 * Commercial
 */
let commercialcount = 0
function changeCommercialdata(){

    console.log(commercialcount)

    if(commercialcount === 0){
        showCOHotDeals()
    }

    if(commercialcount === 1){
        unshowCOHotDeals()
        automateCommercialDate()
    }
    else{
        automateCommercialDate()
    }
    commercialcount++
    if(commercialcount > 6){
        commercialcount = 0
    }
    setTimeout(changeCommercialdata, 5000)
}

function showCOHotDeals(){
    let generalDivs = document.getElementsByClassName('COgeneraldata')
    let hotdealDivs = document.getElementsByClassName('COhotdealdata')

    for(let i = 0; i<hotdealDivs.length;i++){
        hotdealDivs[i].style.visibility = 'visible'
    }

    for(let i = 0; i<generalDivs.length;i++){
        generalDivs[i].style.visibility = 'hidden'
    }

    let img = document.getElementsByClassName('COhotdealImg')
    let ac = document.getElementsByClassName('COhotdealAC')
    let priceSize = document.getElementsByClassName('COhotdealPriceSize')
    let place = document.getElementsByClassName('COhotdealPlace')
    let coyield = document.getElementsByClassName('COhotdealYieald')

    for(let i = 0; i<commercial_hotdeals.length; i++){
        img[i].src = commercial_hotdeals[i].imgsrc
        ac[i].innerHTML = commercial_hotdeals[i].investclass
        place[i].innerHTML = commercial_hotdeals[i].place
    }
}

function unshowCOHotDeals(){
    let generalDivs = document.getElementsByClassName('COgeneraldata')
    let hotdealDivs = document.getElementsByClassName('COhotdealdata')

    for(let i = 0; i<hotdealDivs.length;i++){
        hotdealDivs[i].style.visibility = 'hidden'
    }

    for(let i = 0; i<generalDivs.length;i++){
        generalDivs[i].style.visibility = 'visible'
    }
}
function automateCommercialDate() {
    let hcard = document.getElementsByClassName('COdesc') // TODO change it+
    for(let i =0; i<hcard.length;i++){
        hcard[i].innerHTML = allHeaderClasses[commercialcount]
        if(commercialcount != 0){
            changeCOData(commercialcount-1)
        }
    }
}
function changeCOData(index){
    let coIncomeCard = document.getElementById('coIncome')
    let coProgressCard = document.getElementById('coProgress')
    let coClosingCard = document.getElementById('coClosed')

    coIncomeCard.innerHTML = commercial_ic[index].income
    coProgressCard.innerHTML = commercial_ic[index].progress
    coClosingCard.innerHTML = commercial_ic[index].closing
}

/**
 * Residential
 */
let residentialcount = 0
function changeResidentialdata(){

    if(residentialcount === 0){
        showREHotDeals()
    }

    if(residentialcount === 1){
        unshowREHotDeals()
        automateResidentialDate()
    }
    else{
        automateResidentialDate()
    }
    residentialcount++
    if(residentialcount > 6){
        residentialcount = 0
    }
    setTimeout(changeResidentialdata, 5000)
}

function showREHotDeals(){
    let generalDivs = document.getElementsByClassName('REgeneraldata')
    let hotdealDivs = document.getElementsByClassName('REhotdealdata')

    for(let i = 0; i<hotdealDivs.length;i++){
        hotdealDivs[i].style.visibility = 'visible'
    }

    for(let i = 0; i<generalDivs.length;i++){
        generalDivs[i].style.visibility = 'hidden'
    }

    let img = document.getElementsByClassName('REhotdealImg')
    let ac = document.getElementsByClassName('REhotdealAC')
    let priceSize = document.getElementsByClassName('REhotdealPriceSize')
    let place = document.getElementsByClassName('REhotdealPlace')
    let coyield = document.getElementsByClassName('REhotdealYieald')

    for(let i = 0; i<residential_hotdeals.length; i++){
        img[i].src = residential_hotdeals[i].imgsrc
        ac[i].innerHTML = residential_hotdeals[i].investclass
        place[i].innerHTML = residential_hotdeals[i].place
    }
}

function unshowREHotDeals(){
    let generalDivs = document.getElementsByClassName('REgeneraldata')
    let hotdealDivs = document.getElementsByClassName('REhotdealdata')

    for(let i = 0; i<hotdealDivs.length;i++){
        hotdealDivs[i].style.visibility = 'hidden'
    }

    for(let i = 0; i<generalDivs.length;i++){
        generalDivs[i].style.visibility = 'visible'
    }
}
function automateResidentialDate() {
    let hcard = document.getElementsByClassName('REdesc')
    for(let i =0; i<hcard.length;i++){
        hcard[i].innerHTML = allHeaderClasses[residentialcount]
        if(residentialcount != 0){
            changeREData(residentialcount-1)
        }
    }
}
function changeREData(index){
    let coIncomeCard = document.getElementById('reIncome')
    let coProgressCard = document.getElementById('reProgress')
    let coClosingCard = document.getElementById('reClosed')

    coIncomeCard.innerHTML = residential_ic[index].income
    coProgressCard.innerHTML = residential_ic[index].progress
    coClosingCard.innerHTML = residential_ic[index].closing
}

/**
 * Germany
 */

function showGermanyData(){
    let gerVolInc = document.getElementById('gervol_inc')
    let gerQuaInc = document.getElementById('gerqua_inc')
    let gerVolPro = document.getElementById('gervol_pro')
    let gerQuaPro = document.getElementById('gerqua_pro')
    let gerVolClo = document.getElementById('gervol_clo')
    let gerQuaClo = document.getElementById('gerqua_clo')

    gerVolInc.innerHTML = `${germany_income.volume}Mrd € (100%)`
    gerQuaInc.innerHTML = `${germany_income.quantity} (100%)`

    gerVolPro.innerHTML = `${germany_inprogress.volume}Mrd € (100%)`
    gerQuaPro.innerHTML = `${germany_inprogress.quantity} (100%)`

    gerVolClo.innerHTML = `${germany_closed.volume}Mrd € (100%)`
    gerQuaClo.innerHTML = `${germany_closed.quantity} (100%)`

}

let statecount = 0
function showState(){
    let state = document.getElementById('germandesc')
    let img = document.getElementById('Germany germanyImg')

    state.innerHTML = germany_states[statecount].name_eng
    img.src = germany_states[statecount].imgsrc
    let file = germany_states[statecount].imgsrc
    showStateIncome(statecount)
    showStateProgress(statecount)
    showStateClosed(statecount)
    statecount++
    if(statecount > 15){
        statecount = 0
    }
    setTimeout(showState, 5000)
}

function showStateIncome(index){
    let volincome = document.getElementById('statevol_inc')
    let quaincome = document.getElementById('statequa_inc')
    let quapercent = germany_states[index].process.quantity/germany_income.quantity
    quapercent = quapercent.toFixed(2)

    volincome.innerHTML = `${germany_states[index].process.volume}Mrd € (${(germany_states[index].process.volume/germany_income.volume).toFixed(2)}%)`
    quaincome.innerHTML = `${germany_states[index].process.quantity} (${quapercent}%)`
}

function showStateProgress(index){
    let volprogress = document.getElementById('statevol_pro')
    let quaprogress = document.getElementById('statequa_pro')
    let quapercent = germany_states[index].in_progress.quantity/germany_inprogress.quantity
    quapercent = quapercent.toFixed(2)

    volprogress.innerHTML = `${germany_states[index].in_progress.volume}Mrd € (${(germany_states[index].in_progress.volume/germany_income.volume).toFixed(2)}%)`
    quaprogress.innerHTML = `${germany_states[index].in_progress.quantity} (${quapercent}%)`
}

function showStateClosed(index){
    let volclosed = document.getElementById('statevol_clo')
    let quaclosed = document.getElementById('statequa_clo')
    let quapercent = germany_states[index].closed.quantity/germany_closed.quantity
    quapercent = quapercent.toFixed(2)

    volclosed.innerHTML = `${germany_states[index].closed.volume}Mrd € (${(germany_states[index].closed.volume/germany_closed.volume).toFixed(2)}%)`
    quaclosed.innerHTML = `${germany_states[index].closed.quantity} (${quapercent}%)`
}

let bls = [
    {
        "name": 'Berlin',
        "src": "https://i.imgur.com/SEJsrbS.png"
    },
    {
        "name": 'Baden-Würtemberg',
        "src": "https://i.imgur.com/woqz9f6.png"
    },
    {
        "name": 'Brandenburg',
        "src": "https://i.imgur.com/V4ekzZh.png"
    }
]

let blindex = 0
function changeGermanBL(){
    let text = document.getElementById('germandesc')
    let img = document.getElementById('Germany')
    if(blindex >= bls.length){
        blindex = 0
    }
    text.innerHTML = bls[blindex].name
    // img.src = bls[blindex].src
    blindex++
    setTimeout(changeGermanBL, 1000)
}

let divindex = 0
let divs = document.getElementsByClassName('footer-content')

function footerautoslide(){
    let i
    let items = divs[divindex].getElementsByClassName('footer-item')
    divs[divindex].style.display = ''
    for(i = 0; i < items.length; i++){
        items[i].style.animation = 'footerslide 30s linear'
    }
    items[items.length-1].addEventListener('animationend', testfunc)
}

function testfunc(){
    divs[divindex].style.display = 'none'
    if(divindex+1 == divs.length){divindex = 0}
    else {
        divindex += 1
    }
    footerautoslide()
}

footerautoslide()