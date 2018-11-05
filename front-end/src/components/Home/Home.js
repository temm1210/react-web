import React from 'react'
import './Home.scss';
import Typography from '@material-ui/core/Typography';

export default () => {

    return (
		<div className="container">
			<div className="videoWrap">
				<video autoPlay loop muted>
					<source src={require('../../assets/videos/freevideo.mp4')} />
				</video>
			</div>

			<div className="videoCaptionWrap">
				<Typography color="inherit" className="videoCaptionText" noWrap variant="h5">My Portfolio</Typography>
			</div>
		</div>
    )
}
