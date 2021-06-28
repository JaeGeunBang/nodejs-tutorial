
var template = {
    HTML:function(title, list, body, control) {
        return `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title} </title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="index.html">WEB</a></h1>
              ${list}
              ${control}
              <h2>${title}</h2>
              <p>${body}</p>
            </body>
            </html>
        `;
    },
    list:function(filelist) {
        var list = '<ul>';
        var i = 0 ;
        while(i < filelist.length) {
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
        }
        list = list + '</ul>';
        return list;
    }
}

module.exports = template