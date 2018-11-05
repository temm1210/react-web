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


    componentDidMount() {

      const { config, init } = this.props;
      const textarea = document.querySelector( '#editor' )

      ClassicEditor
        .create(textarea ,init)
        .then(editor => {
          Object.assign(editor, config);
          editor.setData(this.props.data);
          this.bindChangeEvent(editor, editor.model.document);
        })
        .catch( error => {
            console.error(error);
        });
    }
  
    render() {
      return (
        <textarea id={'editor'} name={'editor'}>
        </textarea>
      )
    }
}

export default CKEditor;