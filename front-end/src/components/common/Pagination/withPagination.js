import {pure,withStateHandlers,compose,withHandlers} from 'recompose';
import { withRouter } from 'react-router-dom';

const withHandlerOffset = withStateHandlers(
    {offset:0},
    {onChangeOffset:(props) => (value) => ({offset:value})}
)

const withSubmit = withHandlers({
    onSubmit: (props) => (value) => {
        const { history,onChangeOffset } = props;
        const { offset, path, limit} = value;
        const page = parseInt(offset/limit, 10) + 1;

        onChangeOffset(offset);
        history.push(`/${path}/${page}`)
    }
})

export default compose(
    pure,
    withRouter,
    withHandlerOffset,
    withSubmit
);
