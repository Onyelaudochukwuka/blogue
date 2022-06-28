import React, { useState, useRef, useEffect, useMemo } from 'react';
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
    const onKeyDown = (e,change) => {
        
        switch (e.key) {
            case '&': {
                e.preventDefault();
                editor.insertText('and');
                return true;
            }
                
        }
    }
    const renderMark = (props) => {
        switch (props.mark.type) {
            case 'bold':
                return <Boldmark {...props} />
        }
    }
  return (
      <div>
          <Slate
              editor={editor}
              value={value}
              renderMark={renderMark}
              onChange={(newValue) => {
                  console.log(newValue)
                  return setValue(newValue)

              }}
          >
              <Editable
                  
                  onKeyDown={onKeyDown}
                  style={{ border: "1px solid black" }}
              
              />
          </Slate>
      </div>  )
}

export default Slat;