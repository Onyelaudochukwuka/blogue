import React, { useState, useRef } from 'react';
import { createEditor} from "slate";
import { Slate, withReact, Editable } from "slate-react";
const Slat = () => {
    const editorRef = useRef();
    if (!editorRef.current) editorRef.current = withReact(createEditor());
    const editor = editorRef.current;
    const [value, setValue] = useState([{
        type: "paragraph",
        children: [{ text: "We have some base content." }]
    }
    ]);
   
    return (
        <Slate editor={editor} value={value}
            onChange={(newValue) => {
                console.log(newValue);
                
                setValue(newValue);
        }}
        >
            <Editable
                // Pass in the `renderElement` function.
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={(event) => {
                    if (!event.ctrlKey) {
                        return
                    }

                    // Replace the `onKeyDown` logic with our new commands.
                    switch (event.key) {
                        case '.': {
                            event.preventDefault()
                            CustomEditor.toggleCodeBlock(editor)
                            break
                        }

                        case 'b': {
                            event.preventDefault()
                            CustomEditor.toggleBoldMark(editor)
                            break
                        }
                    }
                }}
            />
        </Slate>
    )
}
export default Slat;