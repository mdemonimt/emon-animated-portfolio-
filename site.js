document.addEventListener('DOMContentLoaded',()=>{
 const mobile=document.querySelector('.nav-mobile');const nav=document.querySelector('.navlinks');
 if(mobile&&nav){mobile.addEventListener('click',()=>{const open=nav.classList.toggle('open');mobile.setAttribute('aria-expanded',String(open));mobile.textContent=open?'Close ✕':'Menu ☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');mobile.textContent='Menu ☰';mobile.setAttribute('aria-expanded','false')}))}
 const sections=document.querySelectorAll('.reveal');if('IntersectionObserver'in window){let observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}})},{threshold:.1});sections.forEach(el=>observer.observe(el))}else sections.forEach(el=>el.classList.add('visible'));
 document.querySelectorAll('.service-item').forEach(d=>d.addEventListener('toggle',()=>{if(d.open) document.querySelectorAll('.service-item').forEach(other=>{if(other!==d)other.open=false})}));
 document.getElementById('year')?.replaceChildren(document.createTextNode(String(new Date().getFullYear())));
});
