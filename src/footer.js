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

        addFooterContent()
    })


function addFooterContent(){
    let contentpanel = document.getElementById('list')

    for(const e of germany_objects){
        let priceperm = (e.price/e.size).toFixed(2)
        contentpanel.innerHTML += `<li class="footer-item"><h3>${e.place} ${e.ac}</h3><h1>${priceperm}€/m² ${e.ic}</h1></li>`
    }

    footerautoslide()
}

let itemIndex = 0

function footerautoslide(){
    let item = document.getElementById('list')
    item.classList.add('auto')
    // itemIndex++
    // if(itemIndex >= items.length){
    //     itemIndex = 0
    // }

    setTimeout(footerautoslide, 1000)
}