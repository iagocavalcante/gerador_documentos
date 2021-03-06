const Validations = {
  install(Vue, options) {

    Vue.prototype.$printContent = (modeloDocumento) => {
      var tela_impressao = "";
      var conteudo = modeloDocumento
      tela_impressao = window.open("");
      tela_impressao.document.write("<html><head>");
      tela_impressao.document.write(
        "<link rel='stylesheet' type='text/css' href='/static/css/quill.bubble.css'>"
      );
      // if (process.env.NODE_ENV == 'development') {
      //   tela_impressao.document.write(
      //     "<link rel='stylesheet' type='text/css' href='/static/css/quill.bubble.css'>"
      //   );
      // } else {
      //   tela_impressao.document.write(
      //     "<link rel='stylesheet' type='text/css' href='/spaweb/static/css/quill.bubble.css'>"
      //   );
      // }
      tela_impressao.document.write("</head><body >");
      tela_impressao.document.write("<div class='ql-editor'>");
      tela_impressao.document.write(conteudo);
      tela_impressao.document.write("</div>");
      tela_impressao.document.write('<script type="text/javascript" DEFER="DEFER">function pageCompleted(){window.document.close(); window.focus(); window.print(); window.close()}; pageCompleted();</script>')
      tela_impressao.document.write("</body></html>");

    },
      Vue.prototype.$toggleClass = (element, className) => {
        if (!element || !className) {
          return;
        }

        var classString = element.className,
          nameIndex = classString.indexOf(className);
        if (nameIndex == -1) {
          classString += " " + className;
        } else {
          classString =
            classString.substr(0, nameIndex) +
            classString.substr(nameIndex + className.length);
        }
        element.className = classString;
      },
      Vue.prototype.$numeroLinhasPagina = (pagina, linhas, totalRows) => {
        let linhasPaginaAtual = linhas * pagina - (linhas - 1);
        let linhasTotaisAteAPaginaAtual = linhasPaginaAtual + linhas - 1;
        if (pagina == 1) {
          if (totalRows < linhas) {
            if (totalRows > linhas) {
              return pagina + "-" + linhas;
            } else {
              return pagina + "-" + totalRows;
            }
          }
          return pagina + "-" + linhas;
        } else {
          if (linhasTotaisAteAPaginaAtual < totalRows) {
            return linhasPaginaAtual + "-" + (linhasPaginaAtual + linhas - 1);
          } else if (linhasTotaisAteAPaginaAtual >= totalRows) {
            return linhasPaginaAtual + "-" + totalRows;
          }
        }
      },
      Vue.prototype.$replaceDocumento = (arrayOld, documento, modeloDocumento) => {
        let newArray = [];
        let arrayTagsCopia = Object.assign([], arrayOld)

        for (let i in arrayTagsCopia) {
          arrayTagsCopia[i] = arrayTagsCopia[i].replace("{!", "")
          arrayTagsCopia[i] = arrayTagsCopia[i].replace("}", "")
          newArray.push(arrayTagsCopia[i])
        }
        let temp = document.createElement('div');
        temp.innerHTML = modeloDocumento;
        let contentHTML = temp;
        let elements = contentHTML.getElementsByTagName("*");
        for (let e = 0; e < elements.length; e++) {
          for (let i = 0; i < arrayOld.length; i++) {
            for (let j in documento) {
              if (newArray[i] == j) {
                let txt = contentHTML.innerHTML.replace(arrayOld[i], documento[j]);
                contentHTML.innerHTML = txt;
              }

            }
          }
        }

        return contentHTML.innerHTML;

      }
  }
}
export default Validations
