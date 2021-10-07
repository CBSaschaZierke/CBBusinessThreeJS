let assetclasses = ['SuperCore', 'Core/Core Plus', 'Value Added', 'Opportunity', 'Development', 'Workout']


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
function changeAssetClass() {
    let hcard = document.getElementsByClassName('desc')
    console.log(hcard)
    if(acindex >= assetclasses.length){
        acindex = 0
    }
    for(let i =0; i<hcard.length;i++){
        hcard[i].innerHTML = assetclasses[acindex]
    }
    acindex++
    setTimeout(changeAssetClass, 1000)
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

changeAssetClass()
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