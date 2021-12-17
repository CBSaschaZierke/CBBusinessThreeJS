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

let commercial
let residential
let healthcare

let allHeaderClasses = ['Hot Deals', 'Super Core', 'Core/Core Plus', 'Value Added', 'Opportunity', 'Development', 'Workout']

// fetch('http://194.163.147.192:5555/germany')
fetch('http://localhost:5000/germany')
    .then(res => res.json())
    .then(data => {
        // for(let e of data.objects){
        //     germany_objects.push(e)
        // }
        for(let e of data.state){
            germany_states.push(e)
        }
        germany_income = data.process
        germany_inprogress = data.in_progress
        germany_closed = data.closed

        showGermanyData()
    })

fetch('http://localhost:5000/germany/objects')
    .then(res => res.json())
    .then(data => {
        germany_objects = data
        addFooterContent()
    })

let healthcarecount = 0
export let hcOnView = false
export function setHcOnView(bool){
    hcOnView = bool
}

export function changeHealthCaredata(){
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
    if(hcOnView){
        setTimeout(changeHealthCaredata, 5000)
    }
}

function showHCHotDeals(){
    fetch('http://localhost:5000/healthcare')
        .then(res => res.json())
        .then(data => {
            for(let e of data.ic){
                healthcare_ic.push(e)
            }
            for(let e of data.hotdeals){
                healthcare_hotdeals.push(e)
            }
            healthcare = {
                VolClosed: data.VolClosed,
                VolIncome: data.VolIncome,
                VolProgress: data.VolProgress,
                QuaIncome: data.QuaIncome,
                QuaProgress: data.QuaProgress,
                QuaClosed: data.QuaClosed
            }
        })

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
    hotScoreHealthCare()

    for(let i = 0; i<healthcare_hotdeals.length; i++){
        let price = (healthcare_hotdeals[i].price / healthcare_hotdeals[i].size).toFixed(2)
        img[i].src = healthcare_hotdeals[i].imgsrc
        ac[i].innerHTML = healthcare_hotdeals[i].investclass
        priceSize[i].innerHTML = `${price}€/m²`
        place[i].innerHTML = healthcare_hotdeals[i].place
        hcyield[i].innerHTML = `+${healthcare_hotdeals[i].hotdealyield}%`
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
    let hcIncomeCardVol = document.getElementById('hcIcvol_inc')
    let hcIncomeCardQua = document.getElementById('hcIcqua_inc')
    let hcProgressCardVol = document.getElementById('hcIcvol_pro')
    let hcProgressCardQua = document.getElementById('hcIcqua_pro')
    let hcClosingCardVol = document.getElementById('hcIcvol_clo')
    let hcClosingCardQua = document.getElementById('hcIcqua_clo')

    let hcGenIncomeCardVol = document.getElementById('hcvol_inc')
    let hcGenIncomeCardQua = document.getElementById('hcqual_inc')
    let hcGenProgressCardVol = document.getElementById('hcvol_pro')
    let hcGenProgressCardQua = document.getElementById('hcqual_pro')
    let hcGenClosingCardVol = document.getElementById('hcvol_clo')
    let hcGenClosingCardQua = document.getElementById('hcqual_clo')

    hcIncomeCardVol.innerHTML = `${(healthcare_ic[index].income.volume/1000000).toFixed(2)}Mio € (${((healthcare_ic[index].income.volume/1000000)/healthcare.VolIncome).toFixed(2)}%)`
    hcIncomeCardQua.innerHTML = `${healthcare_ic[index].income.quantity} (${(healthcare_ic[index].income.quantity/healthcare.QuaIncome).toFixed(2)}%)`
    hcProgressCardVol.innerHTML = `${(healthcare_ic[index].progress.volume/1000000).toFixed(2)}Mio € (${((healthcare_ic[index].progress.volume/1000000)/healthcare.QuaIncome).toFixed(2)}%)`
    hcProgressCardQua.innerHTML = `${healthcare_ic[index].progress.quantity} (${(healthcare_ic[index].progress.quantity/healthcare.QuaProgress).toFixed(2)}%)`
    hcClosingCardVol.innerHTML = `${(healthcare_ic[index].closing.volume/1000000).toFixed(2)}Mio € (${isNaN(((healthcare_ic[index].closing.volume/1000000)/healthcare.VolClosed).toFixed(2)) ? 0 :((healthcare_ic[index].closing.volume/1000000)/healthcare.VolClosed).toFixed(2)}%)`
    hcClosingCardQua.innerHTML = `${healthcare_ic[index].closing.quantity} (${isNaN((healthcare_ic[index].closing.quantity/healthcare.QuaClosed).toFixed(2)) ? 0 : (healthcare_ic[index].closing.quantity/healthcare.QuaClosed).toFixed(2)}%)`

    hcGenIncomeCardVol.innerHTML = `${healthcare.VolIncome}Mio € (100%)`
    hcGenProgressCardVol.innerHTML = `${healthcare.VolProgress}Mio € (100%)`
    hcGenClosingCardVol.innerHTML = `${healthcare.VolClosed}Mio € (100%)`
    hcGenIncomeCardQua.innerHTML = `${healthcare.QuaIncome} (100%)`
    hcGenProgressCardQua.innerHTML = `${healthcare.QuaProgress} (100%)`
    hcGenClosingCardQua.innerHTML = `${healthcare.QuaClosed} (100%)`
}

/**
 * Commercial
 */
let commercialcount = 0
export let CoOnView = false
export function setCoOnView(bool){
    CoOnView = bool
}

export function changeCommercialdata(){

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

    if(CoOnView){
        setTimeout(changeCommercialdata, 5000)
    }
}

function showCOHotDeals(){
    fetch('http://localhost:5000/commercial')
        .then(res => res.json())
        .then(data => {
            for(let e of data.ic){
                commercial_ic.push(e)
            }
            for(let e of data.hotdeals){
                commercial_hotdeals.push(e)
            }
            commercial = {
                VolClosed: data.VolClosed,
                VolIncome: data.VolIncome,
                VolProgress: data.VolProgress,
                QuaIncome: data.QuaIncome,
                QuaProgress: data.QuaProgress,
                QuaClosed: data.QuaClosed
            }
        })
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
    hotScoreCommercial()

    for(let i = 0; i<commercial_hotdeals.length; i++){
        let price = (commercial_hotdeals[i].price / commercial_hotdeals[i].size).toFixed(2)
        img[i].src = commercial_hotdeals[i].imgsrc
        ac[i].innerHTML = commercial_hotdeals[i].investclass
        priceSize[i].innerHTML = `${price}€/m²`
        place[i].innerHTML = commercial_hotdeals[i].place
        coyield[i].innerHTML = `+${commercial_hotdeals[i].hotdealyield}%`
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
    let coIncomeCardVol = document.getElementById('coIcvol_inc')
    let coIncomeCardQua = document.getElementById('coIcqua_inc')
    let coProgressCardVol = document.getElementById('coIcvol_pro')
    let coProgressCardQua = document.getElementById('coIcqua_pro')
    let coClosingCardVol = document.getElementById('coIcvol_clo')
    let coClosingCardQua = document.getElementById('coIcqua_clo')

    let coGenIncomeCardVol = document.getElementById('covol_inc')
    let coGenIncomeCardQua = document.getElementById('coqual_inc')
    let coGenProgressCardVol = document.getElementById('covol_pro')
    let coGenProgressCardQua = document.getElementById('coqual_pro')
    let coGenClosingCardVol = document.getElementById('covol_clo')
    let coGenClosingCardQua = document.getElementById('coqual_clo')

    coIncomeCardVol.innerHTML = `${(commercial_ic[index].income.volume/1000000).toFixed(2)}Mio € (${((commercial_ic[index].income.volume/1000000)/commercial.VolIncome).toFixed(2)}%)`
    coIncomeCardQua.innerHTML = `${commercial_ic[index].income.quantity} (${(commercial_ic[index].income.quantity/commercial.QuaIncome).toFixed(2)}%)`
    coProgressCardVol.innerHTML = `${(commercial_ic[index].progress.volume/1000000).toFixed(2)}Mio € (${((commercial_ic[index].progress.volume/1000000)/commercial.VolProgress).toFixed(2)}%)`
    coProgressCardQua.innerHTML = `${commercial_ic[index].progress.quantity} (${(commercial_ic[index].progress.quantity/commercial.QuaProgress).toFixed(2)}%)`
    coClosingCardVol.innerHTML = `${(commercial_ic[index].closing.volume/1000000).toFixed(2)}Mio € (${isNaN(((commercial_ic[index].closing.volume/1000000)/commercial.VolClosed).toFixed(2)) ? 0 : ((commercial_ic[index].closing.volume/1000000)/commercial.VolClosed).toFixed(2)}%)`
    coClosingCardQua.innerHTML = `${commercial_ic[index].closing.quantity} (${isNaN((commercial_ic[index].closing.quantity/commercial.QuaClosed)) ? 0 : (commercial_ic[index].closing.quantity/commercial.QuaClosed).toFixed(2)}%)`

    coGenIncomeCardVol.innerHTML = `${commercial.VolIncome}Mio € (100%)`
    coGenProgressCardVol.innerHTML = `${commercial.VolProgress}Mio € (100%)`
    coGenClosingCardVol.innerHTML = `${commercial.VolClosed}Mio € (100%)`
    coGenIncomeCardQua.innerHTML = `${commercial.QuaIncome} (100%)`
    coGenProgressCardQua.innerHTML = `${commercial.QuaProgress} (100%)`
    coGenClosingCardQua.innerHTML = `${commercial.QuaClosed} (100%)`
}

/**
 * Residential
 */
let residentialcount = 0
export let ResOnView = false
export function setResOnView(bool){
    ResOnView = bool
}

export function changeResidentialdata(){

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
    if(ResOnView) {
        setTimeout(changeResidentialdata, 5000)
    }
}

function showREHotDeals(){
    fetch('http://localhost:5000/residential')
    .then(res => res.json())
    .then(data => {
        for(let e of data.ic){
            residential_ic.push(e)
        }
        for(let e of data.hotdeals){
            residential_hotdeals.push(e)
        }
        residential = {
            VolClosed: data.VolClosed,
            VolIncome: data.VolIncome,
            VolProgress: data.VolProgress,
            QuaIncome: data.QuaIncome,
            QuaProgress: data.QuaProgress,
            QuaClosed: data.QuaClosed
        }
    })

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
    hotScoreResidential()

    for(let i = 0; i<residential_hotdeals.length; i++){
        let price = (residential_hotdeals[i].price / residential_hotdeals[i].size).toFixed(2)
        img[i].src = residential_hotdeals[i].imgsrc
        ac[i].innerHTML = residential_hotdeals[i].investclass
        priceSize[i].innerHTML = `${price}€/m²`
        place[i].innerHTML = residential_hotdeals[i].place
        coyield[i].innerHTML = `+${residential_hotdeals[i].hotdealyield}%`
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
    let reIncomeCardVol = document.getElementById('reIcvol_inc')
    let reIncomeCardQua = document.getElementById('reIcqua_inc')
    let reProgressCardVol = document.getElementById('reIcvol_pro')
    let reProgressCardQua = document.getElementById('reIcqua_pro')
    let reClosingCardVol = document.getElementById('reIcvol_clo')
    let reClosingCardQua = document.getElementById('reIcqua_clo')

    let reGenIncomeCardVol = document.getElementById('revol_inc')
    let reGenIncomeCardQua = document.getElementById('requal_inc')
    let reGenProgressCardVol = document.getElementById('revol_pro')
    let reGenProgressCardQua = document.getElementById('requal_pro')
    let reGenClosingCardVol = document.getElementById('revol_clo')
    let reGenClosingCardQua = document.getElementById('requal_clo')

    reIncomeCardVol.innerHTML = `${(residential_ic[index].income.volume/1000000).toFixed(2)}Mio € (${((residential_ic[index].income.volume/1000000)/residential.VolIncome).toFixed(2)}%)`
    reIncomeCardQua.innerHTML = `${residential_ic[index].income.quantity} (${(residential_ic[index].income.quantity/residential.QuaIncome).toFixed(2)}%)`
    reProgressCardVol.innerHTML = `${(residential_ic[index].progress.volume/1000000).toFixed(2)}Mio € ${((residential_ic[index].progress.volume/1000000)/residential.VolProgress).toFixed(2)}%`
    reProgressCardQua.innerHTML = `${residential_ic[index].progress.quantity} (${(residential_ic[index].progress.quantity/residential.QuaProgress).toFixed(2)}%)`
    reClosingCardVol.innerHTML = `${(residential_ic[index].closing.volume/1000000).toFixed(2)}Mio € ${((residential_ic[index].closing.volume/1000000)/residential.VolClosed).toFixed(2)}%`
    reClosingCardQua.innerHTML = `${residential_ic[index].closing.quantity} (${(residential_ic[index].closing.quantity/residential.QuaClosed)}%)`

    reGenIncomeCardVol.innerHTML = `${residential.VolIncome}Mio € (100%)`
    reGenProgressCardVol.innerHTML = `${residential.VolProgress}Mio € (100%)`
    reGenClosingCardVol.innerHTML = `${residential.VolClosed}Mio € (100%)`
    reGenIncomeCardQua.innerHTML = `${residential.QuaIncome} (100%)`
    reGenProgressCardQua.innerHTML = `${residential.QuaProgress} (100%)`
    reGenClosingCardQua.innerHTML = `${residential.QuaClosed} (100%)`
}



function hotScoreHealthCare(){
    let hotDealHCCount = 0
    for(let i=0; i<healthcare_hotdeals.length;i++){
        let score = healthcare_hotdeals[i].hotscore
        chilliDeals(hotDealHCCount, (hotDealHCCount+3), score)
        hotDealHCCount += 3
    }
}



function hotScoreCommercial(){
    let hotDealCoCount = 9
    for(let i=0; i<commercial_hotdeals.length;i++){
        let score = commercial_hotdeals[i].hotscore
        chilliDeals(hotDealCoCount, (hotDealCoCount+3), score)
        hotDealCoCount += 3
    }
}



function hotScoreResidential(){
    let hotDealReCount = 18
    for(let i=0; i<residential_hotdeals.length;i++){
        let score = residential_hotdeals[i].hotscore
        chilliDeals(hotDealReCount, (hotDealReCount+3), score)
        hotDealReCount += 3
    }
}

const hotdealimgs = document.querySelectorAll('.Hotimg')

function chilliDeals(x,y, b){
    let zahl = b
    for(x; x < y; x++){
        if(zahl === 3){
            hotdealimgs[x].src = 'https://i.imgur.com/h5iHym6.png'
            zahl = zahl -1
        }
        else if(zahl === 2){
            hotdealimgs[x].src = 'https://i.imgur.com/h5iHym6.png'
            zahl = zahl -1
        }
        else if(zahl === 1){
            hotdealimgs[x].src = 'https://i.imgur.com/h5iHym6.png'
            zahl = zahl -1
        }
        else if(zahl === 0){
            hotdealimgs[x].src = 'https://i.imgur.com/9YAX1Da.png'
        }
    }
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

    gerVolInc.innerHTML = `${(germany_income.volume/1000000).toFixed(2)}Mio € (100%)`
    gerQuaInc.innerHTML = `${germany_income.quantity} (100%)`

    gerVolPro.innerHTML = `${(germany_inprogress.volume/1000000).toFixed(2)}Mrd € (100%)`
    gerQuaPro.innerHTML = `${germany_inprogress.quantity} (100%)`

    gerVolClo.innerHTML = `${(germany_closed.volume/1000000).toFixed(2)}Mrd € (100%)`
    gerQuaClo.innerHTML = `${germany_closed.quantity} (100%)`

}

let statecount = 0
export let onView = false
export function setOnView(bool){
    onView = bool;
}

export function showState(){
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

    if(onView) {
        setTimeout(showState, 5000)
    }
}

function showStateIncome(index){
    let volincome = document.getElementById('statevol_inc')
    let quaincome = document.getElementById('statequa_inc')
    let quapercent = germany_states[index].process.quantity/germany_income.quantity
    quapercent = quapercent.toFixed(2)

    volincome.innerHTML = `${(germany_states[index].process.volume/1000000).toFixed(2)}Mio € (${(germany_states[index].process.volume/germany_income.volume).toFixed(2)}%)`
    quaincome.innerHTML = `${germany_states[index].process.quantity} (${quapercent}%)`
}

function showStateProgress(index){
    let volprogress = document.getElementById('statevol_pro')
    let quaprogress = document.getElementById('statequa_pro')
    let quapercent = germany_states[index].in_progress.quantity/germany_inprogress.quantity
    quapercent = quapercent.toFixed(2)

    volprogress.innerHTML = `${(germany_states[index].in_progress.volume/1000000).toFixed(2)}Mio € (${(germany_states[index].in_progress.volume/germany_income.volume).toFixed(2)}%)`
    quaprogress.innerHTML = `${germany_states[index].in_progress.quantity} (${quapercent}%)`
}

function showStateClosed(index){
    let volclosed = document.getElementById('statevol_clo')
    let quaclosed = document.getElementById('statequa_clo')
    let quapercent = germany_states[index].closed.quantity/germany_closed.quantity
    quapercent = quapercent.toFixed(2)

    volclosed.innerHTML = `${(germany_states[index].closed.volume/1000000).toFixed(2)}Mio € (${(germany_states[index].closed.volume/germany_closed.volume).toFixed(2)}%)`
    quaclosed.innerHTML = `${germany_states[index].closed.quantity} (${quapercent}%)`
}

/**
 * Footer
 */
function addFooterContent(){
    let contentpanel = document.getElementById('list')

    for(const e of germany_objects){
        let priceperm
        if(e.size === 0 && e.price === 0){
            priceperm = ``
        }
        else if(e.price === 0){
            priceperm = `${e.size}m²`
        }
        else if(e.size === 0){
            priceperm = `${e.price}€`
        }
        else {
            priceperm = `${(e.price / e.size).toFixed(0)}€/m²`
        }
        e.ic = upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(e.ic));
        e.ac = upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(e.ac));
        contentpanel.innerHTML += `<li class="footer-item"><h3>${e.place} ${e.ac}</h3><h1>${priceperm} ${e.ic}</h1></li>`
    }

    let len = germany_objects.length;

    footerautoslide(len)
}

function footerautoslide(sec){
    let item = document.getElementById('list')
    // item.style.animation = `scroll ${sec}s linear infinite`
    item.classList.add('auto')
}

function upperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseAllWordsExceptFirstLetters(string) {
    return string.replace(/\S*/g, function (word) {
        return word.charAt(0) + word.slice(1).toLowerCase();
    });
}
