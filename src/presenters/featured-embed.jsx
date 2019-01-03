import React from 'react';
import PropTypes from 'prop-types';

import Link from './includes/link.jsx';




const FeaturedEmbed = ({feature}) => (
    <div className="featured-embed">
      <div className="mask-container">
        <img className='mask mask-4' src={feature.feature_image} alt=""/>
      </div>
      <div className="content" style={{backgroundColor: feature.color}}>
        <div className="description">
          <Link to={`culture${feature.url}`}>
            <h1>{feature.title}</h1>
          </Link>
          <p dangerouslySetInnerHTML={{__html: feature.body}}/>
        </div>
      </div>
      <div className="embed">
         <span dangerouslySetInnerHTML={{__html: feature.embed}}/>
      </div>
  </div>
  );

FeaturedEmbed.propTypes = {
  url: PropTypes.string.isRequired,
  featured_image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  embed: PropTypes.string.isRequired,
}

export default FeaturedEmbed;