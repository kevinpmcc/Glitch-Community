/**
 * Login page for Glitch OAuth
 *
 * Login via email only
 *
 * TODO: Allow login via username/password when that becomes available
 *
 * IMPORTANT: This is considered a proof of concept for OAuth. It is nearly a direct
 * copy of /pop-overs/sign-in-pop.
 */
/* globals API_URL */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { captureException } from '../../utils/sentry';
import { useCurrentUser } from '../current-user';
import { NestedPopover, NestedPopoverTitle } from '../pop-overs/popover-nested';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      done: false,
      error: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ email: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();
    this.setState({ done: true });
    try {
      await this.props.api.post('/email/sendLoginEmail', {
        emailAddress: this.state.email,
      });
      this.setState({ error: false });
    } catch (error) {
      captureException(error);
      this.setState({ error: true });
    }
  }

  render() {
    const isEnabled = this.state.email.length > 0;
    return (
      <NestedPopover alternateContent={() => <SignInWithConsumer {...this.props} />} startAlternateVisible={false}>
        {showCodeLogin => (
          <dialog className="pop-over sign-in-pop">
            <NestedPopoverTitle>
              Email Sign In <span className="emoji email" />
            </NestedPopoverTitle>
            <section className="pop-over-actions first-section">
              {!this.state.done && (
                <form onSubmit={this.onSubmit} style={{ marginBottom: 0 }}>
                  <input value={this.state.email} onChange={this.onChange} className="pop-over-input" type="email" placeholder="new@user.com" />
                  <button style={{ marginTop: 10 }} className="button-small button-link" disabled={!isEnabled}>
                    Send Link
                  </button>
                </form>
              )}
              {this.state.done && !this.state.error && (
                <>
                  <div className="notification notifyPersistent notifySuccess">Almost Done</div>
                  <div>Finish signing in from the email sent to {this.state.email}.</div>
                </>
              )}
              {this.state.done && this.state.error && (
                <>
                  <div className="notification notifyPersistent notifyError">Error</div>
                  <div>Something went wrong, email not sent.</div>
                </>
              )}
            </section>
            {this.state.done && !this.state.error && (
              <SignInCodeSection
                onClick={() => {
                  showCodeLogin(this.props.api);
                }}
              />
            )}
          </dialog>
        )}
      </NestedPopover>
    );
  }
}

class SignInCodeHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      done: false,
      error: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ code: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();
    this.setState({ done: true });
    try {
      const { data } = await this.props.api.post(`/auth/email/${this.state.code}`);
      this.props.setUser(data);
      const { persistentToken } = data;
      const { login } = data;
      if (persistentToken && login) {
        this.props.setIsSignedIn(true);
      }
      this.setState({ error: false });
    } catch (error) {
      captureException(error);
      this.setState({ error: true });
    }
  }

  render() {
    const isEnabled = this.state.code.length > 0;
    return (
      <dialog className="pop-over sign-in-pop middle">
        <NestedPopoverTitle>Use a sign in code</NestedPopoverTitle>
        <section className="pop-over-actions first-section">
          {!this.state.done && (
            <form onSubmit={this.onSubmit} style={{ marginBottom: 0 }}>
              Paste your temporary sign in code below
              <input value={this.state.code} onChange={this.onChange} className="pop-over-input" type="text" placeholder="cute-unique-cosmos" />
              <button style={{ marginTop: 10 }} className="button-small button-link" disabled={!isEnabled}>
                Sign In
              </button>
            </form>
          )}
          {this.state.done && !this.state.error && (
            <>
              <div className="notification notifyPersistent notifySuccess">Success!</div>
            </>
          )}
          {this.state.done && this.state.error && (
            <>
              <div className="notification notifyPersistent notifyError">Error</div>
              <div>Code not found or already used. Try signing in with email.</div>
            </>
          )}
        </section>
      </dialog>
    );
  }
}

const SignInWithConsumer = (props) => {
  const { login } = useCurrentUser();
  return <SignInCodeHandler setUser={login} {...props} />;
};

const EmailSignInButton = ({ onClick }) => (
  <button
    className="button button-small button-link has-emoji"
    onClick={() => {
      onClick();
    }}
  >
    Sign in with Email <span className="emoji email" />
  </button>
);
EmailSignInButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const SignInCodeSection = ({ onClick }) => (
  <section className="pop-over-actions last-section pop-over-info">
    <button className="button-small button-tertiary button-on-secondary-background" onClick={onClick}>
      <span>Use a sign in code</span>
    </button>
  </section>
);
SignInCodeSection.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const SignInPopWithoutRouter = (props) => {
  const { header, prompt, api } = props;
  const { currentUser } = useCurrentUser();
  const { persistentToken, login } = currentUser;

  const [isSignedIn, setIsSignedIn] = useState(false);
  if (!isSignedIn && persistentToken && login) {
    setIsSignedIn(true);
  }

  if (isSignedIn) {
    const queryParamsStart = window.location.href.indexOf('?');
    const queryParams = window.location.href.substring(queryParamsStart);
    window.location.href = `${API_URL}/oauth/dialog/authorize${queryParams}&authorization=${persistentToken}`;
    return null;
  }

  return (
    <NestedPopover alternateContent={() => <SignIn {...props} />} startAlternateVisible={false}>
      {showEmailLogin => (
        <NestedPopover
          alternateContent={() => <SignInWithConsumer {...props} setIsSignedIn={setIsSignedIn} />}
          startAlternateVisible={false}
        >
          {showCodeLogin => (
            <div
              className="pop-over sign-in-pop middle"
              style={{
                position: 'relative',
                margin: '0 auto',
                width: '25%',
              }}
            >
              {header}
              <section className="pop-over-actions first-section">
                {prompt}
                <EmailSignInButton
                  onClick={() => {
                    showEmailLogin(api);
                  }}
                />
              </section>
              <SignInCodeSection
                onClick={() => {
                  showCodeLogin(api);
                }}
              />
            </div>
          )}
        </NestedPopover>
      )}
    </NestedPopover>
  );
};

export const SignInPop = withRouter(SignInPopWithoutRouter);
SignInPop.propTypes = {
  api: PropTypes.func.isRequired,
  header: PropTypes.node,
  prompt: PropTypes.node,
  hash: PropTypes.string,
};

export default function SignInPopContainer(props) {
  return <SignInPop {...props} />;
}
