import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import './Pagination.scss';

const theme = createMuiTheme();
 
class Paging extends React.Component {

    state = {
        offset:0,
        totalRow:0
    }
    

    handleQuestionList = (offset) => {
        
        console.log('offset:',offset)

        const { limit, getQuestionList,totalCount } = this.props;

        
        const page = parseInt(offset/limit + 1, 10);
        const totalRow = Math.floor(totalCount/parseFloat(limit)) - 1
        
        this.setState({ offset,totalRow });
        getQuestionList(page);
    }
    
    componentDidMount = () => {
        this.handleQuestionList(this.state.offset)
    }
    
    render() {
        const { limit,totalCount } = this.props
        return (
            <div className="paginationWrap">
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <Pagination
                        style={{fontSize:25}}
                        size="large"
                        limit={limit}
                        offset={this.state.offset}
                        total={totalCount}
                        onClick={(e, offset) => this.handleQuestionList(offset)}
                    />
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Paging