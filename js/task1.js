// Пишемо свій слайдер зображень
// відображаємо зображення та кнопки Next, Prev з боків від зображення
// При натисканні на Next - показуємо наступне зображення
// При натисканні на Prev - попереднє
// При досягненні останнього зображення – ховати кнопку Next. Аналогічно з першим зображенням та кнопкою
const imgArray = document.querySelectorAll(".slider img")
const imgContainersArray = document.querySelectorAll(".slider .imgContainer div")
const sliderUi = document.querySelector(".sliderUi")
const slider = document.querySelector(".slider")
const prevBtn = document.querySelector(".prevBtn")
const nextBtn = document.querySelector(".nextBtn")
const sliderDotsContainer = document.querySelector(".sliderDots")
const imgContainer = document.querySelector(".imgContainer")
const sliderParent = slider.parentElement.parentElement
const imgArrayLength = imgArray.length
// let sliderParentWidth = slider.parentElement.parentElement.offsetWidth
let sliderParentWidthWithoutButtons = ""
let sliderParentHeight = sliderParent.offsetHeight
// console.dir(prevBtn)
let shift = 0
let counter = 0
// let imgContainerStyle = ""
function centerImg(array){
    // console.dir(img)
    // console.dir(img.offsetWidth)
    array.forEach(function(element){
        let leftAndRightMargins = (sliderParentWidthWithoutButtons - element.offsetWidth)/2
        let topAndBottomMargins = (sliderParentHeight - element.offsetHeight)/2
        element.style.margin=`${topAndBottomMargins}px ${leftAndRightMargins}px`
    })
}
addDots()
function sliderInit(){
    activeDot()
    btnLimits()
    sliderParentWidthWithoutButtons = sliderParent.offsetWidth-prevBtn.clientWidth-nextBtn.clientWidth
    sliderUi.style.width = `${sliderParent.offsetWidth}px`
    sliderDotsContainer.style.maxWidth=`${sliderParent.offsetWidth*0.5}px`
    sliderParentHeight = sliderParent.offsetHeight
    slider.style=`max-width:${sliderParentWidthWithoutButtons}px`
    const imgContainerWidth = sliderParentWidthWithoutButtons*imgArrayLength
    imgContainer.style.width=`${imgContainerWidth}px`
    imgContainersArray.forEach(function(element){
        element.style=`width:${sliderParentWidthWithoutButtons}px; `
    })
    imgArray.forEach(function(element){
        element.style=`max-width:${sliderParentWidthWithoutButtons}px; max-height:${sliderParentHeight}px`
    })
    centerImg(document.querySelectorAll(".slider img"))
}
window.onload = sliderInit
window.addEventListener("resize",sliderInit)
window.addEventListener("resize",disableTransform)
function btnLimits(){
    if(counter==imgArrayLength-1){
        nextBtn.setAttribute("disabled","")
        nextBtn.classList.add("disabled")
    }else{
        nextBtn.removeAttribute("disabled")
        nextBtn.classList.remove("disabled")
    }
    if(counter==0){
        prevBtn.setAttribute("disabled","")
        prevBtn.classList.add("disabled")
    }else{
        prevBtn.removeAttribute("disabled")
        prevBtn.classList.remove("disabled")
    }
}
function addTransform(){
    imgContainer.style.transform=`translate(${shift}px)`
    let styleValue = imgContainer.getAttribute("style")
    let place = styleValue.search("transition")
    styleValue=styleValue.slice(0,place)
    imgContainer.style=styleValue
}
function disableTransform(){
    imgContainer.style.transform="none"
    imgContainer.style.transition="none"
    shift = 0
    counter=0
}
nextBtn.addEventListener("click",function(){
    shift-=sliderParentWidthWithoutButtons;
    addTransform()
    counter+=1
    activeDot()
    btnLimits()
})
prevBtn.addEventListener("click",function(){
    shift+=sliderParentWidthWithoutButtons;
    addTransform()
    counter-=1
    activeDot()
    btnLimits()
})
function activeDot(){
    const sliderDotsContainerArray =  sliderDotsContainer.querySelectorAll("i")
    sliderDotsContainerArray.forEach(function(element){
        element.classList.remove("active")
    })
    sliderDotsContainerArray[counter].classList.add("active")
}
function addDots(){
    for(let i=0; i<imgContainersArray.length; i++){
        sliderDotsContainer.insertAdjacentHTML("beforeend",'<i></i>')
        const sliderDotsArray = sliderDotsContainer.querySelectorAll("i")
        sliderDotsArray[i].addEventListener("click",function(){
            counter=i
            shift = -(i*sliderParentWidthWithoutButtons)
            activeDot()
            addTransform()
            btnLimits()
        })
        
    }
}

