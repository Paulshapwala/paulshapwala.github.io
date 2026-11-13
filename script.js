'use strict';
const filterButtons=[...document.querySelectorAll('[data-filter]')];
const projects=[...document.querySelectorAll('[data-category]')];
filterButtons.forEach(button=>button.addEventListener('click',()=>{
 const category=button.dataset.filter;
 filterButtons.forEach(item=>{const selected=item===button;item.classList.toggle('selected',selected);item.setAttribute('aria-pressed',String(selected));});
 let visible=0;projects.forEach(project=>{project.hidden=category!=='all'&&project.dataset.category!==category;if(!project.hidden)visible++;});
 document.querySelector('#filter-status').textContent=`Showing ${visible} ${category==='all'?'':category+' '}project${visible===1?'':'s'}`;
}));
const dialog=document.querySelector('#image-dialog');
const dialogImage=document.querySelector('#dialog-image');
let imageOpener=null;
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{
 imageOpener=button;dialogImage.src=button.dataset.image;dialogImage.alt=button.querySelector('img').alt;
 document.querySelector('#dialog-caption').textContent=button.dataset.caption;dialog.showModal();document.body.style.overflow='hidden';
}));
function closeImage(){dialog.close();}
document.querySelector('.dialog-close').addEventListener('click',closeImage);
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeImage();}});
dialog.addEventListener('close',()=>{document.body.style.overflow='';imageOpener?.focus();});
const pieces=['♜♞♝♛♚♝♞♜','♟♟♟♟♟♟♟♟','        ','        ','        ','        ','♟♟♟♟♟♟♟♟','♜♞♝♛♚♝♞♜'];
const board=document.querySelector('.board');pieces.forEach((row,r)=>[...row].forEach((piece,c)=>{const square=document.createElement('span');square.className=`square ${(r+c)%2?'dark':''} ${r>5?'white-piece':''}`;square.textContent=piece;board.append(square);}));
const navigation=[...document.querySelectorAll('nav a')];
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navigation.forEach(link=>{const active=link.hash==='#'+entry.target.id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}});},{rootMargin:'-10% 0px -55% 0px',threshold:0});document.querySelectorAll('main>section').forEach(section=>observer.observe(section));}
