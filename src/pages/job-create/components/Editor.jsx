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
    ['link'],
  ];

  return (
    <ReactQuill
      style={{ height: '350px', margin: '10px 4px 30px 4px' }}
      value={editorValue}
      modules={{
        toolbar: { container: toolbarOptions },
      }}
      onChange={(value) => onChangeEditorValue(value)}
      placeholder="공고와 관련하여 추가로 전하고 싶은 내용을 작성해주세요."
    />
  );
};

export default Editor;
