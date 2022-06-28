import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
const Slate = () => {
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "We have some base content." }]
        }
    ]);
  return (
      <div>
          <Slate
              editor={editor}
              value={value}
              onChange={(newValue) => {
                  console.log(newValue)
                  setValue(newValue)
              }}
          >
              <Editable style={{ border: "1px solid black" }} />
          </Slate>
      </div>  )
}

export default Slate