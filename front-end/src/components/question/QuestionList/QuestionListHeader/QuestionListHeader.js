import React from 'react';
import './QuestionListHeader.scss';
import Typography from "@material-ui/core/Typography";

export default () => {
    return (
        <div className="imageContainer">
            <div className="imageWrap">
                <div className="headerImage" />
            </div>
            <div className="imageCaption">
                <Typography className="imageText" variant="h5" id="tableTitle">
                    Q&A 
                </Typography>
            </div>
        </div>
    )
}
