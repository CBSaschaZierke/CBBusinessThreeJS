let assetclasses = ['SuperCore', 'Core/Core Plus', 'Value Added', 'Opportunity', 'Development', 'Workout']

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

changeAssetClass()