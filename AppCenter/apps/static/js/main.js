$(function(){
    var htmlDom = document.getElementById('htmlEditor')
    var cssDom = document.getElementById('cssEditor')
    var jsDom = document.getElementById('jsEditor')

    var htmlEditor = initEditor(htmlDom)
    var cssEditor = initEditor(cssDom)
    var jsEditor = initEditor(jsDom)

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
            type: "post", 
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


    function initEditor(dom){
        var domEditor = CodeMirror.fromTextArea(dom, {
            theme: 'base16-dark',
            mode: 'text/html',
            lineNumbers: true,
            matchBrackets: true,
            autoCloseBrackets: true,
            tabSize: 4,
            line: true
        })
        return domEditor;
    }

    CodeMirror.on(htmlEditor, "change", function(instance, changeObj) {
        console.log(htmlEditor.getValue())
        var htmlCode = htmlEditor.getValue();
        show(htmlCode)
    })

    function show(html){
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

        doc.open();
        doc.writeln(html);
        doc.close();
    }
})