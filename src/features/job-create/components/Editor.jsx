import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const Editor = ({ editorValue, onChangeEditorValue }) => {
  const toolbarOptions = [
    [{ size: ['small', false, 'large', 'huge'] }],

    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
  ];

  return (
    <ReactQuill
      style={{ height: '350px', margin: '10px 4px 30px 4px' }}
      value={editorValue}
      modules={{
        toolbar: { container: toolbarOptions },
      }}
      onChange={onChangeEditorValue}
      placeholder="어쩌구저쩌구와글와글 이야기를 넣어보세요"
    />
  );
};

export default Editor;
