$(function () {
    // Init Variable
    const $btnCompare = $('#compareButton');
    const $clearAll = $('#clearAll');
    const $switchButton = $('#switchButton');
    const $inputText1 = $('#inputText1');
    const $inputText2 = $('#inputText2');


    $btnCompare.on('click', handleCompareTextFunc);
    $clearAll.on('click', handleClearAll);
    $switchButton.on('click', handleSwitchText);
    
    let editor = null;

    function initTool(text1, text2) {
        require.config({
            paths: {
                vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.10.1/min/vs"
            }
        });
        require(["vs/editor/editor.main"], () => {
            editor = monaco.editor.createDiffEditor(
                document.getElementById("container")
            );

            editor.setModel({
                original: monaco.editor.createModel(text1, "javascript"),
                modified: monaco.editor.createModel(text2, "javascript")
            });
        });
    }

    function handleCompareTextFunc() {
        const text1 = $inputText1.val();
        const text2 = $inputText2.val();

        if (editor) {
            editor.setModel({
                original: monaco.editor.createModel(text1, "javascript"),
                modified: monaco.editor.createModel(text2, "javascript")
            });
        } else {
            initTool(text1, text2);
        }
    }


    function handleClearAll() {
        $inputText1.val('');
        $inputText2.val('');
        editor.onHide();
    }

    function handleSwitchText() {
        const text1 = $inputText1.val();
        const text2 = $inputText2.val();
        if (text1 === text2) {
            return;
        }
        $inputText1.val(text2);
        $inputText2.val(text1);
    }
});