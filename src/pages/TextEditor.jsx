import React, { useEffect, useState, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import debounce from 'lodash/debounce';

const TextEditor = ({ value, setValue }) => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      const docRef = doc(db, 'documents', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDocument(docSnap.data());
        setValue(docSnap.data().content);
      } else {
        console.log('No such document!');
      }
    };

    fetchDocument();
  }, [id, setValue]);

  const debouncedSave = useCallback(
    debounce(async (newValue) => {
      const docRef = doc(db, 'documents', id);
      await updateDoc(docRef, { content: newValue });
    }, 1000), // 1 second debounce
    [id]
  );

  const handleChange = (newValue) => {
    setValue(newValue);
    debouncedSave(newValue);
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'size': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  return (
    <div className='container mt-5'>
      <ReactQuill
        theme='snow'
        value={value}
        onChange={handleChange}
        modules={modules}
      />
    </div>
  );
};

export default TextEditor;
