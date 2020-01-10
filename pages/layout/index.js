import { useState, useEffect } from 'react'

import '../../public/assets/styles/layout.less'

const Layout = ({ }) => {


	return (
		<React.Fragment>
			<div class="flex-outer-container">
				<div class="flex-container">
					<div class="flex-item">
						<div class="flex-outer-container">
							<div class="flex-container">
								<div class="flex-item">1</div>
								<div class="flex-item">2</div>
								<div class="flex-item">3</div>
								<div class="flex-item">4</div>
							</div>
						</div>
					</div>
					<div class="flex-item">
						<div class="flex-outer-container">
							<div class="flex-container">
								<div class="flex-item">1</div>
								<div class="flex-item">2</div>
								<div class="flex-item">3</div>
								<div class="flex-item">4</div>
							</div>
						</div>
					</div>
					<div class="flex-item">
						<div class="flex-outer-container">
							<div class="flex-container">
								<div class="flex-item">1</div>
								<div class="flex-item">2</div>
								<div class="flex-item">3</div>
								<div class="flex-item">4</div>
							</div>
						</div>
					</div>
					<div class="flex-item">
						<div class="flex-outer-container">
							<div class="flex-container">
								<div class="flex-item">1</div>
								<div class="flex-item">2</div>
								<div class="flex-item">3</div>
								<div class="flex-item">4</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}


export default Layout
