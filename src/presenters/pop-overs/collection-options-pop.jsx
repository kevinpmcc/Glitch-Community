import React from 'react';
import PropTypes from 'prop-types';
import PopoverContainer from './popover-container.jsx';
import {CurrentUserConsumer} from '../current-user.jsx';

import OverlaySelectCollection from '../overlays/overlay-select-collection.jsx';
import NestedPopover from './popover-nested.jsx';

const PopoverButton = ({onClick, text, emoji}) => (
  <button className="button-small has-emoji button-tertiary" onClick={onClick}>
    <span>{text} </span>
    <span className={`emoji ${emoji}`}></span>
  </button>
);

// Collection Options Pop
const CollectionOptionsPop = (props) => {
  
  function animate(event, className, func) {
    const projectContainer = event.target.closest('li');
    projectContainer.addEventListener('animationend', func, {once: true});
    projectContainer.classList.add(className);
    props.togglePopover();
  }

  function animateThenDeleteCollection(event) {
    animate(event, 'slide-down', () => props.deleteCollection(props.collection.id));
  }  
  
  return(
    <dialog className="pop-over collection-options-pop">
      <section className="pop-over-actions danger-zone last-section">
        {/*
          <PopoverButton onClick={() => props.deleteCollection(props.collection.id)} text="Delete Collection " emoji="bomb"/>
          */}
        
        {props.deleteCollection && <PopoverButton onClick={animateThenDeleteCollection} text="Delete Collection " emoji="bomb"/>}
        
        </section>
    </dialog>
  );
};

CollectionOptionsPop.propTypes = {
  togglePopover: PropTypes.func.isRequired,
  deleteCollection: PropTypes.func,
};
  
// Collection Options Container
export default function CollectionOptions({deleteCollection, collection}) {
  if(!deleteCollection) {
    return null;
  }

  return (
    <PopoverContainer>
      {({togglePopover, visible}) => (
        <CurrentUserConsumer>
          {user => (
            <div className="collection-pop-over">
              <button className="collection-options button-borderless opens-pop-over" onClick={togglePopover}> 
                <div className="down-arrow" />
              </button>
              { visible && <CollectionOptionsPop collection={collection} deleteCollection={deleteCollection} togglePopover={togglePopover} currentUser={user}/> }
            </div>
          )}
        </CurrentUserConsumer>
      )}
    </PopoverContainer>
  );
}

CollectionOptions.propTypes = {
  collection: PropTypes.object.isRequired,
  deleteCollection: PropTypes.func
};

