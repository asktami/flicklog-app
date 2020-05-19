import React from 'react';

const LoginForm = (props) => {
	const { handleSubmitJwtAuth, error } = props;
	return (
		<form onSubmit={handleSubmitJwtAuth}>
			<fieldset>
				<legend>Login</legend>
				<div role="alert">{error && <p className="error">{error}</p>}</div>
				<div>
					<label htmlFor="username">Username</label>
					<input type="text" required name="username" id="username" />
				</div>
				<div className="password">
					<label htmlFor="password">Password</label>
					<input required name="password" type="password" id="password" />
				</div>
				<div className="btn-container">
					<button className="btn btn-as-link">Login</button>
				</div>
			</fieldset>
		</form>
	);
};
export default LoginForm;
