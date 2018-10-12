import React, { Fragment } from 'react';

import Button from '../shared/styledComponents/Button';

class AdminInfo extends React.PureComponent<any> {
	render = () => {
		const { onFieldChangeHandler, adminName, adminEmail, showEmail } = this.props;
		return (
			<Fragment>
				<label htmlFor="hostName">
					Your name
					<input type="text" placeholder="Your name" value={adminName} name="adminName" onChange={onFieldChangeHandler} />
				</label>
				<label htmlFor="hostEmail">
					Your email
					<input type="text" placeholder="Your email" value={adminEmail} name="adminEmail" onChange={onFieldChangeHandler} />
				</label>
				<label htmlFor="showHostEmail">
					Your email
					<input type="checkbox" checked={showEmail} id="showHostEmail" onChange={onFieldChangeHandler} />
				</label>
			</Fragment>
		);
	};
}
export default AdminInfo;
