let healthcare_ic = []
let residential_ic = []
let commercial_ic = []

fetch('http://127.0.0.1:5000/residential')
    .then(res => res.json())
    .then(data => {
        for(let e of data.ic){
            healthcare_ic.push(e)
        }
        console.log(healthcare_ic[0])
        // changeAssetClass()
    })

fetch('http://127.0.0.1:5000/commercial')
    .then(res => res.json())
    .then(data => {
        for(let e of data.ic){
            commercial_ic.push(e)
        }
        changeCommercialData()
    })


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

let acindex = 0
export function changeAssetClass() {
    let hcard = document.getElementsByClassName('desc')
    if(acindex >= healthcare_ic.length){
        acindex = 0
    }
    for(let i =0; i<hcard.length;i++){
        hcard[i].innerHTML = healthcare_ic[acindex].name
        changeHCData(acindex)
    }
    acindex++
    setTimeout(changeAssetClass, 5000)
}
function changeHCData(index){
    let hcIncomeCard = document.getElementById('hcIncome')
    let hcProgressCard = document.getElementById('hcProgress')
    let hcClosingCard = document.getElementById('hcClosed')

    hcIncomeCard.innerHTML = healthcare_ic[index].income
    hcProgressCard.innerHTML = healthcare_ic[index].progress
    hcClosingCard.innerHTML = healthcare_ic[index].closing
}

let coindex = 0
function changeCommercialData() {
    let hcard = document.getElementsByClassName('desc') // TODO change it
    if(coindex >= commercial_ic.length){
        coindex = 0
    }
    for(let i =0; i<hcard.length;i++){
        hcard[i].innerHTML = commercial_ic[acindex].name
        changeCOData(coindex)
    }
    coindex++
    setTimeout(changeAssetClass, 1000)
}
function changeCOData(index){
    let coIncomeCard = document.getElementById('coIncome')
    let coProgressCard = document.getElementById('coProgress')
    let coClosingCard = document.getElementById('coClosed')

    coIncomeCard.innerHTML = commercial_ic[index].income
    coProgressCard.innerHTML = commercial_ic[index].progress
    coClosingCard.innerHTML = commercial_ic[index].closing
}

let blindex = 0
function changeGermanBL(){
    let text = document.getElementById('germandesc')
    let img = document.getElementById('Germany')
    if(blindex >= bls.length){
        blindex = 0
    }
    text.innerHTML = bls[blindex].name
    img.src = bls[blindex].src
    blindex++
    setTimeout(changeGermanBL, 1000)
}
changeGermanBL()

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