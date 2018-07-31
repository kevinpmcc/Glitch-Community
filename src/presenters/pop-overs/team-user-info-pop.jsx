/* global notify */

import React from 'react';
import PropTypes from 'prop-types';

import Thanks from '../includes/thanks.jsx';
import Loader from '../includes/loader.jsx';

const MEMBER_ACCESS_LEVEL = 20;
const ADMIN_ACCESS_LEVEL = 30;

// Remove from Team 👋

const RemoveFromTeam = ({removeFromTeam}) => (
  <section className="pop-over-actions danger-zone">
    <button className="button-small has-emoji button-tertiary button-on-secondary-background" onClick={removeFromTeam}>
      Remove from Team
      <span className="emoji wave" />
    </button>
  </section>
);

RemoveFromTeam.propTypes = {
  removeFromTeam: PropTypes.func.isRequired,
};


// User Actions Section

const UserActions = ({user}) => (
  <section className="pop-over-actions user-actions">
    <a href={user.userLink}>
      <button className="button-small has-emoji button-tertiary">
        <span>Profile </span>
        <img className="emoji avatar" src={user.userAvatarUrl} alt={user.login}></img>
      </button>
    </a>
  </section>
);

UserActions.propTypes = {
  user: PropTypes.shape({
    userLink: PropTypes.string.isRequired,
    userAvatarUrl: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
  }).isRequired,
};


// Admin Actions Section ⏫⏬

const AdminActions = ({user, userIsTeamAdmin, updateUserPermissions}) => {  

  // BUG: If I unadmin myself, shopuld updates currentUser in other components too
  // BUG: if I change a users admin status it doesn't update the view
  // BUG: error on removing from team
  
  
  let updateAdminStatus = () => {
    if (userIsTeamAdmin) {
      updateUserPermissions(user.id, MEMBER_ACCESS_LEVEL)
    } else {
        updateUserPermissions(user.id, MEMBER_ACCESS_LEVEL)
    }
    
  //   if (adminStatusIsUpdating) {
  //     return null;
  //   }
  //   updateAdminStatusIsUpdating(true);
  //   let teamUser = `teams/${teamId}/users/${user.id}`;
  //   api.patch((teamUser), {access_level: accessLevel})
  //     .then(({data}) => {
  //       updateAdminStatusIsUpdating(false);
  //       updateUserIsTeamAdmin(accessLevel);
  //     }).catch(error => {
  //       console.error("updateAdminStatus", accessLevel, error.response.data);
  //       notify.createNotification(<p>{error.response.data.message}</p>, 'notifyError');
  //       updateAdminStatusIsUpdating(false);
  //     });
  // };

  return (
    <section className="pop-over-actions admin-actions">
      { userIsTeamAdmin && 
        <button className="button-small button-tertiary has-emoji" onClick={() => {updateAdminStatus()}}>
          <span>Remove Admin Status </span>
          <span className="emoji fast-down" />
        </button>
      ||
        <button className="button-small button-tertiary has-emoji" onClick={() => {updateAdminStatus()}}>
          <span>Make an Admin </span>
          <span className="emoji fast-up" />
        </button>
      }
    </section>
  );
};

AdminActions.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    login: PropTypes.string.isRequired,
  }).isRequired,
  userIsTeamAdmin: PropTypes.bool.isRequired,
  teamId: PropTypes.number.isRequired,
  updateUserPermissions: PropTypes.func.isRequired,
  // updateAdminStatusIsUpdating: PropTypes.func.isRequired,
  // adminStatusIsUpdating: PropTypes.bool.isRequired,
};


// Thanks 💖

const ThanksCount = ({count}) => (
  <section className="pop-over-info">
    <Thanks count={count} />
  </section>
);


// Team User Info

export default class TeamUserInfoPop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  removeFromTeam() {
    this.props.togglePopover();
    this.props.removeUser(this.props.user.id);
  }
  
  // updateUserIsTeamAdmin(accessLevel) {
  //   let isAdmin = false;
    // if (accessLevel === ADMIN_ACCESS_LEVEL) {
    //   isAdmin = true;
    // }
    // this.setState({
    //   userIsTeamAdmin: isAdmin
    // });
  // }
  
  // updateAdminStatusIsUpdating(value) {
  //   this.setState({
  //     adminStatusIsUpdating: value
  //   });
  // }

  render() {
    return (
      <dialog className="pop-over team-user-info-pop">
        <section className="pop-over-info">
          <a href={this.props.user.userLink}>
            <img className="avatar" src={this.props.user.userAvatarUrl} alt={this.props.user.login} style={this.props.user.style}/>
          </a>
          <div className="info-container">
            <p className="name" title={this.props.user.name}>{this.props.user.name}</p>
            <p className="user-login" title={this.props.user.login}>@{this.props.user.login}</p>
            { this.props.userIsTeamAdmin && 
              <div className="status-badge">
                <span className="status admin" data-tooltip="Can edit team info and billing">
                  Team Admin
                </span>
              </div> 
            }
          </div>
        </section>
        { this.props.user.thanksCount > 0 && <ThanksCount count={this.props.user.thanksCount} /> }
        <UserActions user={this.props.user} />
        { this.props.currentUserIsTeamAdmin &&
          <AdminActions 
            user={this.props.user} 
            userIsTeamAdmin={this.props.userIsTeamAdmin} 
            api={this.props.api} 
            teamId={this.props.teamId} 
            updateUserPermissions={this.props.updateUserPermissions} 
          />
        }
        { this.props.currentUserIsTeamAdmin && <RemoveFromTeam removeFromTeam={this.removeFromTeam} /> }
      </dialog>
    );
  }
}

TeamUserInfoPop.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    login: PropTypes.string.isRequired,
    userAvatarUrl: PropTypes.string.isRequired,
    userLink: PropTypes.string.isRequired,
    thanksCount: PropTypes.number.isRequired,
    isOnTeam: PropTypes.bool,
  }).isRequired,
  currentUserIsOnTeam: PropTypes.bool.isRequired,
  removeUser: PropTypes.func.isRequired,
  userIsTeamAdmin: PropTypes.bool.isRequired,
  api: PropTypes.func.isRequired,
  teamId: PropTypes.number.isRequired,
  currentUserIsTeamAdmin: PropTypes.bool.isRequired,
  updateUserPermissions: PropTypes.func.isRequired,
};

TeamUserInfoPop.defaultProps = {
  user: {
    isOnTeam: false
  },
  currentUserIsOnTeam: false,
};
