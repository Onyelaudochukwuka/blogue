import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createEditor, Editor, Transforms, Text } from "slate";
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
    const CustomEditor = {
        isBoldMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: n => n.bold === true,
                universal: true,
            })

            return !!match
        },

        isCodeBlockActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: n => n.type === 'code',
            })

            return !!match
        },

        toggleBoldMark(editor) {
            const isActive = CustomEditor.isBoldMarkActive(editor)
            Transforms.setNodes(
                editor,
                { bold: isActive ? null : true },
                { match: n => Text.isText(n), split: true }
            )
        },

        toggleCodeBlock(editor) {
            const isActive = CustomEditor.isCodeBlockActive(editor)
            Transforms.setNodes(
                editor,
                { type: isActive ? null : 'code' },
                { match: n => Editor.isBlock(editor, n) }
            )
        },
    }

    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            case 'bold':
                return <BoldElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])
    // Define a leaf rendering function that is memoized with `useCallback`.
    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, []);
            
    return (
            <Slate editor={editor} value={value}
            onChange={(newValue) => {
                console.log(newValue);
                const isAstChange = editor.operations.some(
                    op => 'set_selection' !== op.type
                )
                if (isAstChange) {
                    // Save the value to Local Storage.
                    const content = JSON.stringify(value)
                    localStorage.setItem('content', content)
                }
                setValue(newValue);
        }}
        >
            <div>
                <button
                    onMouseDown={event => {
                        event.preventDefault()
                        CustomEditor.toggleBoldMark(editor)
                    }}
                >
                    Bold
                </button>
                <button
                    onMouseDown={event => {
                        event.preventDefault()
                        CustomEditor.toggleCodeBlock(editor)
                    }}
                >
                    Code Block
                </button>
            </div>
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


const CodeElement = props => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    )
};
const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>

}
const BoldElement = (props) => {
    return (
        <pre {...props.attributes}>
            <strong>{props.children}</strong>
        </pre>
    )
}
// Define a React component to render leaves with bold text.
const Leaf = props => {
    return (
        <span
            {...props.attributes}
            style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
        >
            {props.children}
        </span>
    )
}

export default Slat;