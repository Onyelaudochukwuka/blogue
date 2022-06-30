import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from 'react-dropzone'

function MyDropzone() {
    const [files, setFiles] = useState([]);
    useEffect(
        () => () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );
    {
        files.map((file, index) => (
            <div key={file.name}>
                <img
                    src={file.preview}
                    style={{ width: "100px", height: "100px" }}
                    alt=""
                />
            </div>
        ))
    };
    const onDrop = useCallback(
        (acceptedFiles) => {
    

            const form = new FormData();

            form.append("fileUpload", acceptedFiles[0]);
console.log(form)
        },
        [setFiles]
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop
    });
    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} className="bg-white p-6 ring-2 outline-none ring-gray-200" />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}
export default MyDropzone;