$(function(){
    var htmlDom = document.getElementById('htmlEditor')
    var cssDom = document.getElementById('cssEditor')
    var jsDom = document.getElementById('jsEditor')

    var htmlConfig = {
        mode: 'text/html'
    }
    var cssConfig = {
        mode: 'text/css'
    }
    var jsConfig = {
        mode: 'text/javascript'
    }

    var htmlEditor = initEditor(htmlDom, htmlConfig)
    var cssEditor = initEditor(cssDom, cssConfig)
    var jsEditor = initEditor(jsDom, jsConfig)

    var htmlCode = '', cssCode = '', jsCode = '';

    CodeMirror.on(htmlEditor, "change", function(instance, changeObj) {
        htmlCode = htmlEditor.getValue();
        show(htmlCode, cssCode, jsCode)
    })
    CodeMirror.on(cssEditor, "change", function(instance, changeObj) {
        cssCode = cssEditor.getValue();
        show(htmlCode, cssCode, jsCode)
    })
    CodeMirror.on(jsEditor, "change", function(instance, changeObj) {
        jsCode = jsEditor.getValue();
        show(htmlCode, cssCode, jsCode)
    })

    // 保存代码
    $('.save-code').on('click', function(){
        var editorData = {
            html_code: htmlEditor.getValue(),
            css_code: cssEditor.getValue(), 
            js_code: jsEditor.getValue(),
            app_id: app_id
        }
        console.log('htmlEditor:', htmlEditor.getValue())
        console.log('cssEditor:', cssEditor.getValue())
        console.log('jsEditor:', jsEditor.getValue())
        console.log('app_id:', app_id)

        $.ajax({
            type: "POST", 
            url: "/code/",
            data: JSON.stringify(editorData),
            dataType: "json",
            contentType: "application/json",
            success: function(data){
                console.log(data);
                window.location.href = "/"
            },
            error: function(){
                alert('代码保存失败重新保存')
            }
        });
    })


    function initEditor(dom, config){
        var mode = config.mode;
        var domEditor = CodeMirror.fromTextArea(dom, {
            theme: 'base16-dark',
            mode: mode,
            lineNumbers: true,
            matchBrackets: true,
            autoCloseBrackets: true,
            tabSize: 4,
            line: true
        })
        return domEditor;
    }

    function show(html, css, js){
        console.log('html:'+html, 'css:'+css, 'js:'+js)
        /* end of do resize here*/
        var iframe = $('#resultiframe')[0],
            doc;

        if (iframe.contentDocument) {
            doc = iframe.contentDocument;
        } else if (iframe.contentWindow) {
            doc = iframe.contentWindow.document;
        } else {
            doc = iframe.document;
        }

        /* 判断用户输入HTML片段还是完成的HTML文档 */
        var completedflag = 0;
        var lowhtml = html.toLowerCase();

        if(lowhtml.toLowerCase().indexOf('</body>') >= 0 && lowhtml.toLowerCase().indexOf('<body>')>=0){
            completedflag = 1;
        }
        
        if(completedflag){
            html = html.replace(/\<link href="style.css" rel="stylesheet"\/>/g,'<style>' + css + '</style>');
            html = html.replace(/\<link rel="stylesheet" href="style.css"\/>/g,'<style>' + css + '</style>');
            html = html.replace(/\<script src="script.js"\>\<\/script\>/g,'<script>' + js + '<\/script>');
            result = html;
        }else{
            result = '<!DOCTYPE HTML><html><head><style>' + css + '</style></head><body>' + html + '<script type="text/javascript">' + js + '<\/script></body></html>';
        }

        doc.open();
        doc.writeln(result);
        doc.close();
    }
})