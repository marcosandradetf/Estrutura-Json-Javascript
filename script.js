document.getElementsByTagName('body')[0].style.background = 'gray';
document.body.appendChild(document.createElement('h2'));
document.getElementsByTagName('h2')[0].innerText = 'Estados do Brasil';

//------------------------------

document.body.appendChild(document.createElement('label'));
document.getElementsByTagName('label')[0].innerText = 'UF: ';
document.body.appendChild(document.createElement('select'));
const ufs = document.getElementsByTagName('select')[0];
ufs.setAttribute('onchange', 'atualizar()');

document.body.appendChild(document.createElement('br'));
document.body.appendChild(document.createElement('br'));

//-------------------------------------------

document.body.appendChild(document.createElement('img'));
const bandeira = document.getElementsByTagName('img')[0];
bandeira.style = 'width: 320px;' + 'height: 224px;';

//---------------------------

document.body.appendChild(document.createElement('div'));
const texto = document.getElementsByTagName('div')[0];
texto.style =
  'background-color: white;' +
  'font-family: Arial, Helvetica, sans-serif;' +
  'margin: 4px, 4px;' +
  'padding: 4px;' +
  'width: 500px;' +
  'height: 500px;' +
  'overflow-x: hidden;' +
  'overflow-y: auto;' +
  'text-align: justify;';

// JAVASCRIPT

const listarEstados = async () => {
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome";
  fetch(url)
    .then(response => response.json())
    .then(listaUfs => {
      listaUfs.forEach(item => {
        let opt = document.createElement('option');
        opt.value = item.sigla;
        opt.innerHTML = item.nome;
        ufs.appendChild(opt);
      });
      atualizar();
    });
}
listarEstados();

const atualizar = () => {
  bandeira.src = ufs.value + '.png';
  carregaTexto();
}

const carregaTexto = () => {
  const uf = ufs.options[ufs.selectedIndex].text;
  const url = "https://pt.wikipedia.org/w/api.php?&origin=*&format=json&action=query&prop=extracts&exlimit=max&explaintext&titles=" + uf + " (estado)";
  const url2 = "https://pt.wikipedia.org/w/api.php?&origin=*&format=json&action=query&prop=extracts&exlimit=max&explaintext&titles=" + uf;
  
  const f_url1 = () => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const idsPaginas = Object.keys(data.query.pages);
        const idPagina = idsPaginas[0];
        const pagina = data.query.pages[idPagina];
        const dadosPagina = pagina.extract.replaceAll('\n', '<br>');
        texto.innerHTML = dadosPagina;
      });
  }

  const f_url2 = () => {
    fetch(url2)
      .then(response => response.json())
      .then(data => {
        const idsPaginas = Object.keys(data.query.pages);
        const idPagina = idsPaginas[0];
        const pagina = data.query.pages[idPagina];
        const dadosPagina = pagina.extract.replaceAll('\n', '<br>');
        texto.innerHTML = dadosPagina;
      });
  }
  
  if (uf == 'Espírito Santo'|| uf == 'São Paulo' || uf == 'Rio de Janeiro') {
    f_url1();
  } else if( uf == 'Distrito Federal'){
    fetch('https://pt.wikipedia.org/w/api.php?&origin=*&format=json&action=query&prop=extracts&exlimit=max&explaintext&titles=Distrito%20Federal%20(Brasil)')
      .then(response => response.json())
      .then(data => {
        const idsPaginas = Object.keys(data.query.pages);
        const idPagina = idsPaginas[0];
        const pagina = data.query.pages[idPagina];
        const dadosPagina = pagina.extract.replaceAll('\n', '<br>');
        texto.innerHTML = dadosPagina;
      });
  } else {
    f_url2();
  }
}

//preview
console.log(document.getElementsByTagName('body')[0]);