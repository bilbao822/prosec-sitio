/* PROSEC Ingeniería Estructural - menú móvil, galería y formulario de cotización */
(function(){
  var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};

  // Menú móvil
  var btn=$('#menu-btn'),nav=$('#nav');
  btn.addEventListener('click',function(){
    var abierto=nav.classList.toggle('abierto');
    btn.setAttribute('aria-expanded',abierto);
    btn.setAttribute('aria-label',abierto?'Cerrar menú':'Abrir menú');
  });
  nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('abierto');btn.setAttribute('aria-expanded','false');}});

  // Galería: filtros y visor
  var items=$$('.g-item'),chips=$$('.chip');
  chips.forEach(function(c){c.addEventListener('click',function(){
    var f=c.getAttribute('data-f');
    chips.forEach(function(x){x.setAttribute('aria-pressed',x===c)});
    items.forEach(function(it){it.hidden=!(f==='todos'||it.getAttribute('data-cat')===f)});
  })});
  var visor=$('#visor'),vImg=$('#v-img'),vPie=$('#v-pie'),actual=0;
  function visibles(){return items.filter(function(it){return !it.hidden})}
  function mostrar(it){var im=$('img',it);vImg.src=im.getAttribute('src');vImg.alt=im.alt;vPie.textContent=im.alt;}
  function mover(d){var v=visibles();if(!v.length)return;actual=(actual+d+v.length)%v.length;mostrar(v[actual]);}
  function cerrar(){if(visor.close){visor.close();}else{visor.removeAttribute('open');}}
  items.forEach(function(it){it.addEventListener('click',function(){
    actual=visibles().indexOf(it);mostrar(it);
    if(visor.showModal){visor.showModal();}else{visor.setAttribute('open','');}
  })});
  $('#v-prev').addEventListener('click',function(){mover(-1)});
  $('#v-next').addEventListener('click',function(){mover(1)});
  $('#v-cerrar').addEventListener('click',cerrar);
  visor.addEventListener('click',function(e){if(e.target===visor){cerrar();}});
  visor.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')mover(-1);if(e.key==='ArrowRight')mover(1);});

  // Solicitud de cotización: envía la solicitud o la abre en el correo del visitante.
  var form=$('#form-cotizacion'),aviso=$('#form-aviso'),texto=$('#aviso-texto'),caja=$('#aviso-mensaje'),copiar=$('#aviso-copiar');
  function decir(t,conMensaje){texto.textContent=t;aviso.hidden=false;caja.hidden=!conMensaje;copiar.hidden=!conMensaje;}
  function valor(id){return $('#'+id).value.trim()}
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var via=(e.submitter&&e.submitter.getAttribute('data-via'))||'formulario';
    var falta=$$('[required]',form).filter(function(c){return !c.value.trim()})[0];
    if(falta){decir('Complete nombre, teléfono y descripción del trabajo.',false);falta.focus();return;}
    var lineas=['Solicitud de cotización','Nombre: '+valor('f-nombre')];
    if(valor('f-empresa'))lineas.push('Empresa o entidad: '+valor('f-empresa'));
    lineas.push('Teléfono: '+valor('f-telefono'));
    if(valor('f-email'))lineas.push('Correo: '+valor('f-email'));
    if(valor('f-ciudad'))lineas.push('Ciudad de la obra: '+valor('f-ciudad'));
    lineas.push('Servicio: '+valor('f-servicio'),'Descripción: '+valor('f-detalle'));
    var mensaje=lineas.join('\n');
    caja.value=mensaje;
    if(via==='formulario'){
      // Envía la solicitud por FormSubmit (formsubmit.co) al correo gerencia@prosecie.com. Si no se puede, ofrece copiar el texto.
      var boton=e.submitter||$('button[data-via="formulario"]',form);
      var fallo=function(){boton.disabled=false;decir('No pudimos registrar la solicitud en este momento. Copie este texto y envíelo a gerencia@prosecie.com.',true);};
      if(!window.fetch||!window.FormData){fallo();return;}
      var datos={};new FormData(form).forEach(function(v,k){datos[k]=v;});
      if(datos._honey){return;}
      if(datos.email){datos._replyto=datos.email;}
      boton.disabled=true;decir('Enviando la solicitud…',false);
      fetch('https://formsubmit.co/ajax/gerencia@prosecie.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(datos)})
        .then(function(r){return r.json().catch(function(){return {};}).then(function(d){
          if(!r.ok||String(d.success)!=='true'){fallo();return;}
          boton.disabled=false;form.reset();
          decir('Solicitud enviada. Gracias; le responderemos a los datos de contacto que nos indicó.',false);
        });},fallo);
      return;
    }
    var a=document.createElement('a');
    a.href='mailto:gerencia@prosecie.com?subject='+encodeURIComponent('Solicitud de cotización - '+valor('f-servicio'))+'&body='+encodeURIComponent(mensaje);
    document.body.appendChild(a);a.click();a.remove();
    decir('Se abrió su programa de correo con la solicitud redactada. Envíela desde allí. Si no se abrió, copie este texto y envíelo a gerencia@prosecie.com.',true);
  });
  copiar.addEventListener('click',function(){
    var listo=function(){copiar.textContent='Texto copiado'};
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(caja.value).then(listo,function(){caja.focus();caja.select();});}
    else{caja.focus();caja.select();}
  });
})();
