import React, { Fragment } from 'react';

class AdminInfo extends React.Component<any> {
	render = () => {
		const {
			onFieldChangeHandler,
			onFieldFocusHandler,
			onFieldBlurHandler,
			errors,
			adminName,
			adminEmail,
			showEmail
		} = this.props;
		return (
			<Fragment>
				<label htmlFor="hostName">
					Your name
					<input type="text" placeholder="Your name" value={adminName} name="adminName" onChange={onFieldChangeHandler} />
				</label>
				<label htmlFor="hostEmail">
					Your email
					<input
						className={errors.adminEmail ? 'error' : ''}
						type="email"
						placeholder="Your email"
						value={adminEmail}
						name="adminEmail"
						onChange={onFieldChangeHandler}
						onFocus={onFieldFocusHandler}
						onBlur={onFieldBlurHandler}
					/>
					{errors.adminEmail ? <span className="errorMessage">{errors.adminEmail}</span> : null}
				</label>
				<label htmlFor="showHostEmail">
					Should we show your email?
					<input type="checkbox" checked={showEmail} id="showHostEmail" onChange={onFieldChangeHandler} />
				</label>
			</Fragment>
		);
	};
}
export default AdminInfo;
