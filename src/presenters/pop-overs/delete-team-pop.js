import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Loader } from '../includes/loader';
import { NotificationConsumer } from '../notifications';

class DeleteTeamPopBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamIsDeleting: false,
    };
    this.deleteTeam = this.deleteTeam.bind(this);
  }

  async deleteTeam() {
    if (this.state.teamIsDeleting) {
      return null;
    }
    this.setState({
      teamIsDeleting: true,
    });
    try {
      await this.props.api().delete(`teams/${this.props.teamId}`);
      this.props.history.push('/');
    } catch (error) {
      console.error('deleteTeam', error, error.response);
      this.props.createErrorNotification(
        'Something went wrong, try refreshing?',
      );
      this.setState({
        teamIsDeleting: false,
      });
    }
    return null;
  }

  render() {
    const illustration = 'https://cdn.glitch.com/c53fd895-ee00-4295-b111-7e024967a033%2Fdelete-team.svg?1531267699621';
    return (
      <dialog className="pop-over delete-team-pop" open>
        <section className="pop-over-info">
          <div className="pop-title">
            Delete {this.props.teamName}
          </div>
        </section>
        <section className="pop-over-actions">
          <img
            className="illustration"
            src={illustration}
            aria-label="illustration"
            alt=""
          />
          <div className="action-description">
            Deleting {this.props.teamName} will remove this team page. No
            projects will be deleted, but only current project members will be
            able to edit them.
          </div>
        </section>
        <section className="pop-over-actions danger-zone">
          <button
            type="button"
            className="button-small has-emoji"
            onClick={this.deleteTeam}
          >
            Delete {this.props.teamName}&nbsp;
            <span className="emoji bomb" role="img" aria-label="bomb emoji" />
            {this.state.teamIsDeleting && <Loader />}
          </button>
        </section>

        {/* temp hidden until the email part of this is ready
        <section className="pop-over-info">
          <UsersList users={this.props.teamAdmins}/>
          <p className="info-description">This will also email all team admins, giving them an option to undelete it later</p>
        </section>
         */}
      </dialog>
    );
  }
}

const DeleteTeamPop = withRouter(props => (
  <NotificationConsumer>
    {notifyFuncs => <DeleteTeamPopBase {...notifyFuncs} {...props} />}
  </NotificationConsumer>
));

DeleteTeamPop.propTypes = {
  api: PropTypes.func.isRequired,
  teamId: PropTypes.number.isRequired,
  teamName: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  teamAdmins: PropTypes.array.isRequired,
  togglePopover: PropTypes.func, // required but added dynamically
};

DeleteTeamPop.defaultProps = {
  togglePopover: null,
};

export default DeleteTeamPop;
