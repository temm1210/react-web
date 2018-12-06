import React, { Component } from 'react';
import ClassicEditor from 'ClassicEditor'
import './editor.scss';

class CKEditor extends Component {
    bindChangeEvent = (editor, element) => {
      element.on('change:data', () => {
        if (element.differ.getChanges().length > 0 ) {
          this.props.onChange(editor.getData());
        }
      });
    }

    setIdNumber = () => {
      let { idNumber } = this.props;
      idNumber = idNumber || 1;

      return `editor${idNumber}`;
    }

    componentDidMount() {
      const { config, init, data} = this.props;
      const textarea = document.querySelector( `#${this.setIdNumber()}` )

      ClassicEditor
        .create(textarea ,init)
        .then(editor => {
          Object.assign(editor, config);
          editor.setData(data);
          this.bindChangeEvent(editor, editor.model.document);
        })
        .catch( error => {
            console.error(error);
        });
    }
  
    render() {
      const { data } = this.props;

      return (
        <textarea id={`${this.setIdNumber()}`} className={`${this.setIdNumber()}`} name={`${this.setIdNumber()}`} defaultValue={data}>
        </textarea>
      )
    }
}

export default CKEditor;