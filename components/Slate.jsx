import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createEditor } from "slate";
import { Slate, Editor, withReact } from "slate-react";
const Slat = () => {
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "We have some base content." }]
        }
    ]);
    const onKeyDown = (e,change) => {
        if (!e.ctrlKey) return;
        e.preventDefault();
        switch (e.key) {
            case 'b': {
                change.addMark('bold');
                return true;
            }
                
        }
    }
    const renderMark = ({mark}) => {
        switch (mark.type) {
            case 'bold':
                
        }
    }
  return (
      <div>
          <Slate
              editor={editor}
              value={value}
              onChange={(newValue) => {
                  console.log(newValue)
                  setValue(newValue)
              }}
              onKeyDown={onKeyDown}
          >
              <Editor style={{ border: "1px solid black" }} />
          </Slate>
      </div>  )
}

export default Slat;