let nav = document.getElementById("nav-component");
let inAnimating = 0;
// function openNavNode(e){

//     alert("pressed");
  
// }
const nodeDistFromCentre = 100;
const radians_in_circle = 6.28318;
const area_width = 1000;
const area_height = 1000;
const animation_speed = 1000;
function vhToPx(n){
  const viewportHeight = window.innerHeight;
  const pixelValue = (n * viewportHeight) / 100;
  return pixelValue;
}
function vwToPx(n){
  const viewportWidth = window.innerWidth;
  const pixelValue = (n * viewportWidth) / 100;
  return pixelValue;
}
function addClassToElement(element,className){
  element.classList.add(className);
}
function removeClassFromElement(element,className){
  element.classList.remove(className);
}
function getNavTag(navName){
  let objName = 'nav-node-'+navName;
 return objName; //'<div class="nav-circle '+objName+'"></div>';
}
function getTextTag(navName){
  let objName = 'nav-text-'+navName;
  return objName;
}
function getIconTag(navName){
  let objName = 'nav-icon-'+navName;
  return objName;
}
function getCircleTag(navName){
  let objName = 'nav-circle-'+navName;
  return objName;
}
function getObjectFromNavElement(targetObject){
 let classes = targetObject.classList;
  for(let i=0;i<classes.length;i++)
  {
    if(classes[i].startsWith("nav-node-"))
    {
      let startIndex = classes[i].lastIndexOf("-");
      let objName = classes[i].substring(startIndex+1);
      return getNavFromName(objName);
    }
  }
  return null;
}
function getObjectFromName(navName){
  for(let i =0;i<navNodes.length;i++){
    if(navName == navNodes[i].name){
      return navNodes[i];
    }
  }
  return null;
}

//Takes a position and returns the relative position change to get it back in bounds ((0,0) if in bounds already)
// function boundsCorrection(posX,posY){
//   let navStyle = getComputedStyle(nav);
//   let navTop = parseFloat(navStyle.getPropertyValue('top'));
//   let navBottom = navTop + area_height;//parseFloat(navStyle.getPropertyValue('height'));
//   let navLeft = parseFloat(navStyle.getPropertyValue('left'));
//   let navRight = navLeft + area_width;//parseFloat(navStyle.getPropertyValue('width'));
  
//   let leftCorrection =  navLeft - posX ;
//   let topCorrection =   navTop - posY;
//   let rightCorrection = navRight - posX  ;
//   let bottomCorrection =  navBottom - posY;

//   let resultX = 0;
//   let resultY = 0;
//   if(leftCorrection > 0){
//     resultX = leftCorrection;
//   }
//   else if(rightCorrection < 0){
//     resultX = rightCorrection;
//   }
//   if(topCorrection > 0){
//     resultY = topCorrection;
//   }else if(bottomCorrection < 0){
//     resultY = bottomCorrection;
//   }
//   return{
//     x:resultX,
//     y:resultY
//   }
  
// }
function moveNav(navName,posX,posY,obj){
  //setInAnimation(navName,true);
  //obj.setInAnimation(true);
  $(navName).css("z-index","2");//Set lower value for closing
  $(navName).css("pointer-events","none");

  $(navName).animate({left:posX, top:posY},animation_speed);
  $(navName).queue(()=>{
    $(navName).remove();

   $(navName).css("pointer-events","initial");
    $(navName).dequeue();
    
  });

  

}
function hideNodeText(navName){
  let textTag = getTextTag(navName);
  $("."+textTag).hide(400);
}
function showNodeText(navName){
  let textTag = getTextTag(navName);
  $("."+textTag).show();
}
function setInAnimation(navName,ani){
  let obj = getObjectFromName(navName);
  obj.isAnimating = ani;
}
// function shrinkNav(navElement){
//   // $(navElement).bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', (e)=>{
//   //   $(navElement).remove();
//   // })  ;

//   let obj = document.querySelector(navElement);
//   obj.style.height = 0;
//     obj.style.width = 0;

//    // $(obj).delay('2000ms').remove();

// }
function getNumberOfActiveNodes(){
  return nav.children.length;
}
function recentreAll(){
  let compStyle = getComputedStyle(nav);
  let compX = parseFloat(compStyle.getPropertyValue('left'));
  let compY = parseFloat(compStyle.getPropertyValue('top'));
  let obj;
  //Set all on screen navs to the nav components position
  for(let i = 0;i<nav.children.length;i++){
    obj = getObjectFromNavElement(nav.children[i]);
    nav.children[i].style.left = compX + obj.originDiffX;
    nav.children[i].style.top = compY + obj.originDiffY;
  }








//  let compStyle = getComputedStyle(nav);
//  let compLeft = 0;//parseFloat(compStyle.getPropertyValue('left'));
//  let compTop = 0;//parseFloat(compStyle.getPropertyValue('top'));
//  let compWidth = document.innerWidth/2;//area_width/2;//parseFloat(compStyle.getPropertyValue('width'))/2;
//  let compHeight = document.innerHeight/2;//area_height/2;//parseFloat(compStyle.getPropertyValue('height'))/2;
//   let centreX = compLeft + compWidth ;
//   let centreY = compTop + compHeight ;
//   //Get Average position of present Nodes
//   let navChildren = nav.children;
//   let totalX=0;
//   let totalY=0;
//  for(let i =0;i<nav.children.length;i++) {
//  let nodeStyle = getComputedStyle(navChildren[i]);
//  totalX += parseFloat(nodeStyle.getPropertyValue('left'));
//  totalY += parseFloat(nodeStyle.getPropertyValue('top'));
//  }
// let avgX = totalX/nav.children.length;
// let avgY = totalY/nav.children.length;
// let diffX= centreX - avgX;
// let diffY= centreY - avgY;
// //Move all navs to centre
// let test = document.querySelector(".nav-node-root");
// let navChildStyle;
// let navChildTop;
// let navChildLeft;
// //test.animate({left:"700px"},2000);
// for(let i =0;i<navChildren.length;i++){
//  navChildStyle = getComputedStyle(navChildren[i]);
//  navChildLeft = parseFloat(navChildStyle.getPropertyValue('left'));
//  navChildTop = parseFloat(navChildStyle.getPropertyValue('top'));

//   navChildren[i].style.top = navChildTop+diffY; 
//    navChildren[i].style.left = navChildLeft+diffX; 
   
// }
}
function destroyNavNode(navElement){
  
  navElement.remove();
}
//Object definitions
class navNode{
  constructor(name,link,subNodes,parent){
    this.name=name;
    this.link=link;
    this.parentPosition=0;//The opposite position occupied on the nodes parent list (uses the number of parents child node and the position of this node on the list to calculate)
    this.subNodes=subNodes;
    this.isBackNode = false;
    this.opened = false;//temporary
    this.parent=parent;
    this.originDiffX=nodeDistFromCentre;//70;//default number (should only be used on root)
    this.originDiffY=0;
    this.isAnimating = false;
  }
  //Alt_node allows a different node to be used for certain functions if the subject node isn't on the html yet
  //Having an altnode as an argument will also result in the this node being added as if it was the first child of the alt node
  openNavNode(offOriginX,offOriginY,alt_name = ""){
  //  alert("pressed");
  let activeName;
if(alt_name == ""){
  activeName =  this.name;
}
else{
  activeName =  alt_name;
}
   let navOrigin = document.querySelector("." + getNavTag(activeName));
   let navOriginStyle = getComputedStyle(navOrigin);
   let rotArray = [];
   //let orX;
   //let orY;

   let orX = navOriginStyle.getPropertyValue('left');
   let orY = navOriginStyle.getPropertyValue('top');



  
let localDiffX = this.originDiffX;
let localDiffY = this.originDiffY;
  let subNodesList = this.subNodes;//local subnodes list so that permenent data relating to the object isn't modified
  if(alt_name!=""){
    let tempList = [];
    for(let i =0;i<subNodesList.length;i++){
      if(alt_name != subNodesList[i]){
        tempList.push(subNodesList[i]);
      }
    }
    subNodesList = tempList;
    subNodesList.unshift(this.name);//Add the current node to the start
    let alt_obj = getObjectFromName(alt_name);
    localDiffX = alt_obj.originDiffX;
    localDiffY = alt_obj.originDiffY;
  }
  //Modified offOrigin to
    let offOriginXmod = offOriginX + (localDiffX);
    let offOriginYmod = offOriginY + (localDiffY);
    let actualOriginXmod = offOriginX + (localDiffX * 2);
    let actualOriginYmod = offOriginY + (localDiffY * 2);
    for(let i = 0;i<subNodesList.length;i++){

      let subObj = getObjectFromName(subNodesList[i]);
        createNavNode(subNodesList[i],subObj.link,orX,orY);
        //If a node has no children it must be given the alternate styles
        if(getObjectFromName(subNodesList[i]).subNodes.length == 0){
         let el = document.querySelector("."+getCircleTag(subNodesList[i])); 
          el.classList.add("terminal-node");
        }
        let modifiedNodeNumber = subNodesList.length + 1;//Size of subnode list plus remain node turned into backnode

        let rot = applyRotationLocal(offOriginX,offOriginY,localDiffX,localDiffY,(6.28318/modifiedNodeNumber)*(i+1)); //applyRotation3("." + getNavTag(subNodesList[i]),offOriginX,offOriginY,localDiffX,localDiffY,(6.28318/modifiedNodeNumber)*(i+1));//applyRotation2("." + getNavTag(this.subNodes[i]),"." + getNavTag(this.name),(6.28318/this.subNodes.length)*i);
        rotArray.push(rot);
  }
  //Check to see if any rot array entries are out of bounds and if so correct all entries by the same amount

//   let highestCorrection  = {x:0,y:0};
//   let currentCorrection;
//   for(let i =0;i<rotArray.length;i++){

//    currentCorrection =  boundsCorrection(rotArray[i].x,rotArray[i].y);
//    if((Math.abs( currentCorrection.x) + Math.abs(currentCorrection.y)) > (Math.abs(highestCorrection.x) + Math.abs(highestCorrection.y))){
//     highestCorrection = currentCorrection;
//    }

//   }
//   //Apply correction value to rotArray
//   for(let i =0;i<rotArray.length;i++){
//       rotArray[i].x = rotArray[i].x + highestCorrection.x;
//       rotArray[i].y = rotArray[i].y + highestCorrection.y;
//   }
// //Apply correction to current node as well (along with animation, since normally you wouldn't need to move this one)
// if(highestCorrection.x != 0 || highestCorrection.y != 0)
// {
//   let elementTag = getNavTag(this.name);
//   let element = document.querySelector("."+ elementTag)
//   let currentStyle = getComputedStyle(element);
//   let currentLeft = parseFloat(currentStyle.getPropertyValue('left'));
//   let currentTop = parseFloat(currentStyle.getPropertyValue('top'));
//   let moddedLeft = highestCorrection.x + currentLeft;
//   let moddedTop = highestCorrection.y + currentTop;


//   $("."+elementTag).animate({left:moddedLeft + "px", top:moddedTop + "px"},2000);


// }
let a =1000;
let b =1000;
$("." + getNavTag(activeName)).css("pointer-events","none");
$("." + getNavTag(activeName)).animate({left:actualOriginXmod,top:actualOriginYmod},animation_speed);
$("." + getNavTag(activeName)).queue(()=>{
  $("." + getNavTag(activeName)).css("pointer-events","initial");
  $("." + getNavTag(activeName)).dequeue();
});
  for(let i =0;i<rotArray.length;i++){
      let sub = "."+getNavTag(subNodesList[i]);
      //set Origin Diff
      let element = document.querySelector(sub);
      
      let obj = getObjectFromNavElement(element);
      let elementIcon = document.querySelector("."+getIconTag(subNodesList[i]));
      let elementText = document.querySelector("."+getTextTag(subNodesList[i]));
      if(obj.isBackNode && this.name!="root"){
        elementIcon.classList.add("nav-icon-back");
        elementText.textContent = "back";
      }
      
      //Apply local coords to originDiffs
      obj.originDiffX =  rotArray[i].x //-  offOriginX;
      obj.originDiffY =  rotArray[i].y //- offOriginY ;

      $(sub).css("z-index","2");//Reduce z-index for movement
      //perform animation
      $(sub).css("pointer-events","none");
      $(sub).animate({left:rotArray[i].x + offOriginXmod, top: rotArray[i].y + offOriginYmod},animation_speed);
      $(sub).queue(()=>{
        
        
        $(sub).css("pointer-events","initial");
        $(sub).css("z-index","3");//Restore z-index once in position
        
        $(sub).dequeue();
      });
      // $(sub).animate({left:rotArray[i].x, top: rotArray[i].y},2000);
      // $(sub).queue(()=>{
      //   $(sub).css("pointer-events","initial");
      //   $(sub).css("z-index","3");//Restore z-index once in position
        
      //   $(sub).dequeue();
      // });

  }
  let elIcon = document.querySelector("."+getIconTag(this.name));
  let elText = document.querySelector("."+getTextTag(this.name));
    if(this.isBackNode && this.name!="root"){
      elIcon.classList.add("nav-icon-back");
      elText.textContent = "back";
    } 
  }
  //Find all child nodes on the html (minus one optionally) and bring them to the navs location before destroying them.
  //Used when a child node is selected (resulting the current node becoming a 'back' node) and when a back node is selected resulting in no additional back nodes
  closeNavNode(preserved = null,posX=-1,posY=-1){
    for(let i = 0;i<this.subNodes.length;i++){
      let sub = document.querySelector("."+getNavTag(this.subNodes[i]));
      let subClassTag ="."+getNavTag(this.subNodes[i]);
      let preservedName;
      if(preserved == null){
        preservedName = "";
      }
      else{
        preservedName =preserved.name;
      }
      if(sub!=null){
        if(this.subNodes[i]!=preservedName){

      
          let origin = document.querySelector("." + getNavTag(this.name));
          let orStyle = getComputedStyle(origin);
          let closeX;
          let closeY;
          if(posX==-1 || posY==-1){
            closeX = orStyle.getPropertyValue('left');
            closeY = orStyle.getPropertyValue('top');
          }
          else{
            closeX = posX;
            closeY = posY;
          }
          //this.isAnimating = true;
          hideNodeText(this.subNodes[i]);
          moveNav(sub,closeX,closeY,this);

        }

      }
    }
    if(!this.isBackNode && this.name != "root"){
      let iconElement = document.querySelector("." + getIconTag(this.name));
      let textElement =document.querySelector("." + getTextTag(this.name));
      textElement.textContent = this.name;
      iconElement.classList.remove("nav-icon-back");
    }
  }
  
  closeSelf(posX,posY){
    hideNodeText(this.name);
    let element = document.querySelector("."+getNavTag(this.name));
    moveNav(element,posX,posY);
  }
  //Removes this nav node from the html
  // destroyNavNode(){
  //   let sub = document.querySelector("."+getNavTag(this.subNodes[i]));
  //   sub.remove();
  // }
  moveNavNode(posX, posY){
    let obj = document.querySelector("."+getNavTag(this.name));
    obj.style.top = posY;
    obj.style.left = posX;

  }
  setInAnimation(ani){
    this.isAnimating = ani;
  }
  //Open this specific nav node
  // openNavNode(event) {
  //   if(event.target.classList.contains == "nav-circle" )//if one of the many classes a single div can have is nav-circle
  //   {
  //     alert("pressed");
  //   }
    

  // }

}


function createNavNode(navName,theLink, posX=0,posY=0){
  //let objName = 'nav-circle-'+navNodeObj;
  let elementTag =getNavTag(navName);
  let textTag = getTextTag(navName);
  let iconTag = getIconTag(navName);
  let circleTag = getCircleTag(navName);
  if(navName == "root"){
    navName = "open/close";
  }
  //let obj = getObjectFromName(navName);
  nav.innerHTML += '<div class="nav-node  '+elementTag+' " href="'+theLink +'"><div class="nav-circle '+ circleTag +'"  ><div class = "nav-icon ' + iconTag + '"></div></div><div class="nav-text '+ textTag +' ">'+ navName +'</div></div>';//'<div class="nav-circle '+elementTag+' " ><div>'+ navName +'</div></div>';//Create the object in html
  let element = document.querySelector("."+elementTag);

  element.style.top = posY ;
  element.style.left = posX ;
}
function adjustPosition(navName,posX=0,posY=0){
  let objName =getNavTag(navNodeObj);
  let obj = document.querySelector("."+objName);
  obj.style.top = posX + "px";
  obj.style.left = posY + "px";
}
//Object declarations
const navNodes = [
  new navNode("root","http://#",["home","about","code","portfolio","scs","contact"],""),
  new navNode("home","index.html",[],"root"),
  new navNode("about","About-Me.html",[],"root"),
  new navNode("portfolio","My-Portfolio.html",[],"root"),
  new navNode("code","http://#",["example","demo"],"root"),
  new navNode("scs","SCS-Scheme.html",[],"root"),
  new navNode("contact","index.html#contact",[],"root"),
  //code children
  new navNode("example","Coding-Examples.html",[],"code"),
  new navNode("demo","http://#",["demoA","demoB"],"code"),
  new navNode("demoA","Coding-Examples.html",[],"demo"),
  new navNode("demoB","Coding-Examples.html",[],"demo")
];
function getNavFromName(navName){
  for(let i=0;i<navNodes.length;i++){
    if(navNodes[i].name==navName){
      return navNodes[i];
    }
  }
  return null;
}
// const navNode_root = new navNode("root","http://#",["home","about","code"]);
// const navNode_home = new navNode("home","http://#",[]);
// const navNode_about = new navNode("about","http://#",[]);
// const navNode_code = new navNode("code","http://#",["example","demo"]);
// const navNode_example = new navNode("example","http://#",[]);
// const navNode_demo = new navNode("demo","http://#",[]);

//navNode_root.openNavNode();
// let testb = document.getElementById("test-button");
// testb.addEventListener("click",(e)=>{
//   recentreAll();
// })
window.addEventListener('resize',()=>{
  if(getNumberOfActiveNodes() != 1)
  recentreAll();
})
nav.addEventListener("click",(e)=>{
  
  if(e.target.parentNode.classList.contains("nav-node")){

    let obj =  getObjectFromNavElement(e.target.parentNode);
     //Initial opening behavour for root
    if(obj.name == "root"  && getNumberOfActiveNodes() == 1){

      let element = document.querySelector("."+getNavTag(obj.name));

   
      let navStyle = getComputedStyle(nav);
      let centerX = parseInt(navStyle.getPropertyValue('left'));
      let centerY = parseInt(navStyle.getPropertyValue('top'));
      //Generate new global coords from the inverse of the relative origin
      let newOriginX = 100 + centerX;
      let newOriginY = 0 + centerY;
      obj.originDiffX = -100;
      obj.originDiffY = 0;
      
      //let el = "." + getNavTag(obj.name);
       $(element).animate({left:centerX+obj.originDiffX,top:centerY},animation_speed);
       $(element).queue(()=>{
        obj.openNavNode(newOriginX + obj.originDiffX ,newOriginY);
       });
       obj.isBackNode =false;
      

    }
    //Closing behavour for root
    else if(obj.name == "root"){  
      let element = document.querySelector("."+getNavTag(obj.name));
      let elementStyle = getComputedStyle(element);
      let elementX = parseInt( elementStyle.getPropertyValue('left'));
      let elementY = parseInt(elementStyle.getPropertyValue('top'));
      obj.isBackNode =false;
      obj.closeNavNode(null,100,vhToPx(600));
    //  $(element).queue(()=>{
        $(element).animate({left:100 , top:vhToPx(50) },animation_speed);
      //  $(element).dequeue();
    //  });
      
    }
 else if(obj.subNodes.length!=0)
{    
  let element = document.querySelector("."+getNavTag(obj.name));
    let iconElement = document.querySelector("."+getIconTag(obj.name));
    let elementStyle = getComputedStyle(element);
    let elementX = parseInt( elementStyle.getPropertyValue('left'));
    let elementY = parseInt(elementStyle.getPropertyValue('top'));

    
    //Generate new global coords from the inverse of the relative origin
    let newOriginX = (obj.originDiffX) + elementX;
    let newOriginY = (obj.originDiffY) + elementY;
    obj.originDiffX = -obj.originDiffX;
    obj.originDiffY = -obj.originDiffY;
    //obj.openNavNode(newOriginX,newOriginY);
    let par_obj = getObjectFromName(obj.parent);

    //$(".nav-icon-root").prop('content','');
    if(obj.isBackNode)
    {

     // console.log("Backnode origin X: "+ newOriginX + " Y: "+ newOriginY);

      if(par_obj != null){
        //first the parent node must be returned to the html
        //createNavNode(par_obj.name,elementX,elementY);
        obj.isBackNode = false;
        par_obj.openNavNode(newOriginX,newOriginY,obj.name);
        obj.closeNavNode(elementX,elementY);
        
        
        
        //removeClassFromElement(iconElement,"nav-icon-back");
      }

    }
    else{
      //console.log("Regularnode origin X: "+newOriginX + " Y: "+newOriginY);
      obj.isBackNode = true;
      obj.openNavNode(newOriginX,newOriginY);
      
      
      //addClassToElement(iconElement,"nav-icon-back");
      if(par_obj != null){
        par_obj.closeNavNode(obj,elementX,elementY);
        par_obj.closeSelf(elementX,elementY);
      }
    }


  }
  else{
    window.location.href = e.target.parentNode.getAttribute("href");
  }

}
});



createNavNode("root","#","100px",vhToPx(50));


const circleDiv = '<div class="nav-node"></div>';
function createCircle(){
document.getElementById("nav-component").innerHTML += circleDiv;
}
function applyRotationLocal(originX,originY,orDiffX,orDiffY, angle){
  let orX = originX; 
  let orY = originY; 
  let tarY = orY + orDiffY;// orY ;//orDiffY;//orY + 70;
  let tarX = orX + orDiffX;// orX + 70;//orDiffX;//orX;
  //Place coords in terms of origin
  let translateX = tarX - orX;
  let translateY = tarY - orY;

  let cosTheta = Math.cos(angle);
  let sinTheta = Math.sin(angle);
  let rotatedX = translateX * cosTheta - translateY * sinTheta;
  let rotatedY = translateX * sinTheta + translateY * cosTheta;

  return{
    x:rotatedX,
    y:rotatedY
  }
}
function applyRotation3(targetName,originX,originY,orDiffX,orDiffY, angle){


  let orX = originX; 
  let orY = originY; 
  let tarY = orY + orDiffY;// orY ;//orDiffY;//orY + 70;
  let tarX = orX + orDiffX;// orX + 70;//orDiffX;//orX;
  //Place coords in terms of origin
  let translateX = tarX - orX;
  let translateY = tarY - orY;

  let cosTheta = Math.cos(angle);
  let sinTheta = Math.sin(angle);
  let rotatedX = translateX * cosTheta - translateY * sinTheta;
  let rotatedY = translateX * sinTheta + translateY * cosTheta;
  //Place coords back into global coords
  //And place result in target


  return {
    x:rotatedX + orX,
    y:rotatedY + orY
  }
  // let debugStyle = getComputedStyle(targetItem);
  // let debugX = debugStyle.getPropertyValue('left');
  // let debugY= debugStyle.getPropertyValue('top');
 //$(targetItem).animate({left:rotatedX + orX, top: rotatedY + orY},2000);
  // $(targetItem).queue(()=>{
  //   //$(targetItem).remove();
  //   //$(targetItem).dequeue();
  // });

}
// function applyRotation2(targetName,originName, angle){

//   let originItem = document.querySelector(originName);
//   let targetItem = document.querySelector(targetName);
//   let style= getComputedStyle(originItem);
//   let posY = style.getPropertyValue('top');
//   let posX = style.getPropertyValue('left');

//   let orX =   parseInt( style.getPropertyValue('left'));// + (parseInt(style.getPropertyValue('width'))/2);
//   let orY = parseInt( style.getPropertyValue('top'));// + (parseInt(style.getPropertyValue('height'))/2);
//   let tarY = orY + 70;
//   let tarX = orX;
//   //Place coords in terms of origin
//   let translateX = tarX - orX;
//   let translateY = tarY - orY;

//   let cosTheta = Math.cos(angle);
//   let sinTheta = Math.sin(angle);
//   let rotatedX = translateX * cosTheta - translateY * sinTheta;
//   let rotatedY = translateX * sinTheta + translateY * cosTheta;
//   //Place coords back into global coords


//   return {
//     x:rotatedX + orX,
//     y:rotatedY + orY
//   }


// }
// function applyRotation(targetItem,originItem, angle){

//     let style= getComputedStyle(originItem);
//     let posY = style.getPropertyValue('top');
//     let posX = style.getPropertyValue('left');
//    // let test = parseInt( style.getPropertyValue('left')) ;
//    // let test2 =parseInt(style.getPropertyValue('width'))/2;
//     let orX =   parseInt( style.getPropertyValue('left'));// + (parseInt(style.getPropertyValue('width'))/2);
//     let orY = parseInt( style.getPropertyValue('top'));// + (parseInt(style.getPropertyValue('height'))/2);
//     let tarY = orY + 70;
//     let tarX = orX;
//     //Place coords in terms of origin
//     let translateX = tarX - orX;
//     let translateY = tarY - orY;

//     let cosTheta = Math.cos(angle);
//     let sinTheta = Math.sin(angle);
//     let rotatedX = translateX * cosTheta - translateY * sinTheta;
//     let rotatedY = translateX * sinTheta + translateY * cosTheta;
//     //Place coords back into global coords
//     //And place result in target
//     targetItem.style.left = rotatedX + orX;
//     targetItem.style.top = rotatedY + orY;


// }


