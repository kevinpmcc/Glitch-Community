import React from "react";
import PropTypes from "prop-types";
import PopoverWithButton from "./popover-with-button";

class DropdownMenu extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    const selectedLi = document.getElementbyClassName
  }
  render(){
    const { contents, selected, togglePopover, updateSelected } = this.props;
    
    return (
      <ul className="pop-over mini-pop" tabIndex="0">
        {contents.map((item, index) => (
          <li
            className={
              "mini-pop-action" + (index === selected ? " selected" : "")
            }
            key={index}
            aria-selected={index == selected}
            onClick={() => {
              updateSelected(index);
              togglePopover();
            }}            
            tabIndex="-1"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }
};

DropdownMenu.propTypes = {
  contents: PropTypes.node.isRequired,
  selected: PropTypes.number.isRequired, // the index of the selected item
  togglePopover: PropTypes.func, // added dynamically from PopoverWithButton
  updateSelected: PropTypes.func.isRequired,
};

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      buttonContents: this.props.buttonContents
    };
    this.updateSelected = this.updateSelected.bind(this);
  }

  componentDidMount() {
    // TO DO - set default menu item based on whether we're on a user or team page
  }

  updateSelected(itemIndex) {
    this.setState({
      selected: itemIndex,
      buttonContents: this.props.menuContents[itemIndex]
    });
    // pass selected button back to onUpdate
    this.props.onUpdate(this.props.menuContents[itemIndex]);
  }

  render() {
    return (
      <PopoverWithButton
        buttonClass="button-small dropdown-btn user-or-team-toggle has-emoji"
        buttonText={this.state.buttonContents}
        containerClass="dropdown"
        dropdown={true}
        passToggleToPop
      >
        <DropdownMenu
          contents={this.props.menuContents}
          selected={this.state.selected}
          updateSelected={this.updateSelected}
        />
      </PopoverWithButton>
    );
  }
}

Dropdown.propTypes = {
  buttonContents: PropTypes.node.isRequired,
  menuContents: PropTypes.node.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default Dropdown;
