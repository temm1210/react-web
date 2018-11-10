import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
 
const theme = createMuiTheme();
 
export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offset: 1 };
  }
  state = {
    offset:1
  }
 
  // handleClick(offset) {
  //   this.setState({ offset });
  //   console.log('offset:',offset)
  // }

  handlePage = (offset) => {
    const { limit,history } = this.props;
    const page = parseInt(offset/limit, 10) + 1;
    this.setState({
      offset
    })
    history.push(`/questionlist/${page}`)
  }
 
  render() {
    return (
      <div className="paginationWrap">
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Pagination
            limit={10}
            offset={this.state.offset}
            total={100}
            onClick={(e, offset) => this.handlePage(offset)}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}
 