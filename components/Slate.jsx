import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createEditor, Editor, Transforms } from "slate";
import { Boldmark } from './Slate'
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
    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])

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
                onKeyDown={(event) => {
                    if (!event.ctrlKey) {
                        return
                    }

                    switch (event.key) {
                        // When "`" is pressed, keep our existing code block logic.
                        case '/': {
                            event.preventDefault()
                            const [match] = Editor.nodes(editor, {
                                match: n => n.type === 'code',
                            })
                            Transforms.setNodes(
                                editor,
                                { type: match ? 'paragraph' : 'code' },
                                { match: n => Editor.isBlock(editor, n) }
                            )
                            break
                        }

                        // When "B" is pressed, bold the text in the selection.
                        case 'b': {
                            event.preventDefault()
                            Transforms.setNodes(
                                editor,
                                { bold: true },
                                // Apply it to text nodes, and split the text node up if the
                                // selection is overlapping only part of it.
                                { match: n => Text.isText(n), split: true }
                            )
                            break
                        }
                    }
                }}
            />
        </Slate>
    )
}



const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
}

export default Slat;