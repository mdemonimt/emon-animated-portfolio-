window.DataTools=(()=>{
 function parseCSV(text){let s=String(text).replace(/^\uFEFF/,'');const out=[];let row=[],field='',quotes=false;for(let i=0;i<s.length;i++){let ch=s[i];if(quotes){if(ch==='"'&&s[i+1]==='"'){field+='"';i++}else if(ch==='"'){quotes=false}else field+=ch}else if(ch==='"'){if(field==='')quotes=true;else field+=ch}else if(ch===','){row.push(field);field=''}else if(ch==='\r'||ch==='\n'){if(ch==='\r'&&s[i+1]==='\n')i++;row.push(field);out.push(row);field='';row=[]}else field+=ch}if(quotes)throw new Error('The CSV contains an unclosed quoted field.');if(field!==''||row.length||!out.length){row.push(field);out.push(row)}while(out.length>1&&out[out.length-1].every(v=>v===''))out.pop();return out}
 function csvEncodeCell(value){let s=String(value??'');const t=s.trimStart();if(/^[=+@]/.test(t)||(/^-(?!\d+(?:\.\d+)?$)/.test(t)))s="'"+s;return /[",\r\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s}
 function makeCSV(rows){return rows.map(row=>row.map(csvEncodeCell).join(',')).join('\r\n')+'\r\n'}
 function download(name,content,type='text/csv;charset=utf-8'){const blob=new Blob(['\uFEFF',content],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),800)}
 function html(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
 function showStatus(id,msg,isError=false){let el=document.getElementById(id);if(el){el.textContent=msg;el.style.color=isError?'#b43620':'#4d6444';el.setAttribute('role','status')}}
 function fileText(file){if(!file)return Promise.reject(new Error('Choose a CSV file first.'));if(file.size>8*1024*1024)return Promise.reject(new Error('Please choose a CSV smaller than 8 MB.'));return file.text()}
 return{parseCSV,csvEncodeCell,makeCSV,download,html,showStatus,fileText}
})();
