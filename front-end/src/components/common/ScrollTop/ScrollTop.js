import { withHandlers } from 'recompose';

export default withHandlers({
    handleScrollTop:(props) => (value) => window.scrollTo(0,value)
})




