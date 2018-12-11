import React from 'react'
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import './Home.scss';

export default () => {
    return (
		<div className="container">
			
			<div className="videoWrap">
				{/* <video autoPlay loop muted>
					<source src={require('../../assets/videos/IndianTea.mp4')} />
				</video> */}
				<div className="home-image"></div>
			</div>

			<div className="videoCaptionWrap">
				<Typography color="inherit" className="videoCaptionText" noWrap variant="h5">My Portfolio</Typography>
			</div>
		
			<div className="home-body">
				<Link to={'/questionlist/1'}>
					<div className="question-link-wrap">			
						<div className="question-link-image"></div>
						<div className="question-link-text">
							<div class="t2"></div>
							<Typography id="questionBoard" style={{color:'white', fontSize:'26px',letterSpacing: '1px'}} variant="h3" >
								Q&A 게시판					
							</Typography>
							<div class="t1"></div>
						</div>
					</div>
				</Link>
			</div>
		</div>
    )
}
