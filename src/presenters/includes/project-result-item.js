import React from 'react';
import PropTypes from 'prop-types';

import { ProjectLink } from './link';
import { StaticUsersList } from '../users-list';
import { FALLBACK_AVATAR_URL, getAvatarUrl } from '../../models/project';

const ProjectResultItem = ({
  onClick,
  isActive,
  isPrivate,
  cdnUrl,
  ...project
}) => {
  const activeClass = isActive ? 'active' : '';
  const privateClass = isPrivate ? 'private' : '';
  const resultClass = `button-unstyled result result-project ${activeClass} ${privateClass}`;
  const srcFallback = FALLBACK_AVATAR_URL;
  const {
    id, domain, description, users,
  } = project;

  return (
    <div>
      <button className={resultClass} onClick={onClick} data-project-id={id} type="button">
        <img
          className="avatar"
          src={getAvatarUrl(id, cdnUrl)}
          alt={`Project avatar for ${domain}`}
          onError={(event) => { event.target.src = srcFallback; }}
        />
        <div className="results-info">
          <div className="result-name" title={domain}>
            {domain}
          </div>
          {description.length > 0 && (
            <div className="result-description">
              {description}
            </div>
          )}
          {!!users && users.length > 0 && <StaticUsersList users={users} />}
        </div>
      </button>
      <ProjectLink
        project={project}
        className="view-result-link button button-small button-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        View →
      </ProjectLink>
    </div>
  );
};

ProjectResultItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  domain: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  users: PropTypes.array,
  isActive: PropTypes.bool,
  isPrivate: PropTypes.bool,
};

ProjectResultItem.defaultProps = {
  users: [],
  isActive: false,
  isPrivate: false,
};

export default ProjectResultItem;
