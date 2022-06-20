// Пишемо свій слайдер зображень

// відображаємо зображення та кнопки Next, Prev з боків від зображення
// При натисканні на Next - показуємо наступне зображення
// При натисканні на Prev - попереднє
// При досягненні останнього зображення – ховати кнопку Next. Аналогічно з першим зображенням та кнопкою
const imgArray = document.querySelectorAll(".slider img")
const slider = document.querySelector(".slider")
const prevBtn = document.querySelector(".prevBtn")
const nextBtn = document.querySelector(".nextBtn")
const sliderParent = slider.parentElement
const imgArrayLength = imgArray.length
console.dir(sliderParent)
const imgContainer = document.querySelector(".imgContainer")
const sliderParentWidth = sliderParent.offsetWidth
const sliderParentHeight = sliderParent.offsetHeight
let shift = 0
let counter = 0
let imgContainerStyle = ""
slider.style=`max-width:${sliderParentWidth}px`
window.onload = imgArray.forEach(function(element){
    element.style=`max-width:${sliderParentWidth}px; height:${sliderParentHeight}px`
    const imgContainerWidth = sliderParentWidth*imgArrayLength
    imgContainerStyle+=`width: ${imgContainerWidth}px;`
    imgContainer.style=imgContainerStyle
    console.log(shift)
})
function btnLimits(){
    if(counter==imgArrayLength-1){
        nextBtn.setAttribute("disabled","")
    }else{
        nextBtn.removeAttribute("disabled")
    }
    if(counter==0){
        prevBtn.setAttribute("disabled","")
    }else{
        prevBtn.removeAttribute("disabled")
    }
}
function addTransform(){
    imgContainerStyle+= `transform:translate(${shift}px);`
    imgContainer.style=imgContainerStyle
}
// nextBtn.addEventListener("click", function(){
    // imgArray[counter].classList.remove("visible")
    // counter+=1
    // imgArray[counter].classList.add("visible")
    // btnLimits()
// })
// prevBtn.addEventListener("click", function(){
//     imgArray[counter].classList.remove("visible")
//     counter-=1
//     imgArray[counter].classList.add("visible")
//     btnLimits()
// })
// imgContainer.style = imgContainerStyle
nextBtn.addEventListener("click",function(){
    shift-=sliderParentWidth;
    console.log(shift)
    addTransform()
    counter+=1
    btnLimits()
})
prevBtn.addEventListener("click",function(){
    shift+=sliderParentWidth;
    console.log(shift)
    addTransform()
    counter-=1
    btnLimits()
})
