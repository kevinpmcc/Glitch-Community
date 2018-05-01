/*
- about = "https://glitch.com/about"
- blog = "https://medium.com/glitch"
- help = "https://glitch.com/faq"
- status = "http://status.glitch.com/"
- support = "https://support.glitch.com"
- legal = "https://glitch.com/legal"
- platforms = "https://glitch.com/forteams"
- opensource = "https://glitch.com/foropensource"
- hiring = "https://www.fogcreek.com/jobs/GlitchDesignEngineer"

footer(role="contentinfo")

  p
    a(href=about data-track="footer → about") About Glitch 🔮
  p
    a(href=blog data-track="footer → blog") Blog 📰
  p
    a(href=help data-track="footer → faq") FAQ ☂️
  p
    a(href=status data-track="footer → system status") System Status 🚥
  p
    a(href=support data-track="footer → support forum") Support Forum 🚑
  p
    a(href=legal data-track="footer → legal stuff") Legal Stuff 👮‍
  p
    a(href=hiring data-track="footer → hiring") Pssst... we're hiring a Design Engineer! 🙋‍
  hr
  p
    a(href=platforms data-track="footer → platforms") 
      img.for-platforms-icon(src="https://cdn.glitch.com/be1ad2d2-68ab-404a-82f4-6d8e98d28d93%2Ffor-platforms-icon.svg?1506442305188")
      span.for-platforms-text Glitch for Teams
*/
import React from 'react';
import PropTypes from 'prop-types';

function FooterLine({href, track, contents}) {
  return <p><a href={href} dataTrack={'footer → '+track}>{contents}</a></p>;
}
FooterLine.propTypes = {
  href: PropTypes.string.isRequired,
  track: PropTypes.string.isRequired,
  contents: PropTypes.node.isRequired,
};

export default function Footer() {
  return (
    <footer role="contentinfo">
      <FooterLine href="https://glitch.com/about" track="about">About Glitch 🔮</FooterLine>
    </footer>
  );
}