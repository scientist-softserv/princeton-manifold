import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import Panel from "../Panel";
import classNames from "classnames";

export default class AnnotationPopupAnnotate extends PureComponent {
  static displayName = "Annotation.Popup.Annotate";

  static propTypes = {
    selectedAnnotation: PropTypes.object,
    showAnnotationsInDrawer: PropTypes.func,
    attachNotation: PropTypes.func.isRequired,
    destroySelected: PropTypes.func.isRequired,
    highlight: PropTypes.func.isRequired,
    annotate: PropTypes.func.isRequired,
    showSecondary: PropTypes.func.isRequired,
    secondary: PropTypes.string,
    direction: PropTypes.string,
    showLogin: PropTypes.func.isRequired,
    text: PropTypes.object.isRequired
  };

  // https://github.com/facebook/react/issues/6653
  // showLogin is undefined at element creation (when prop validation is done).
  static defaultProps = {
    showSecondary: () => {},
    showLogin: () => {}
  };

  highlightSelected() {
    const selected = this.props.selectedAnnotation;
    if (!selected) return false;
    return (
      selected.attributes.abilities.delete &&
      selected.attributes.format === "highlight"
    );
  }

  rowHighlighted() {
    if (!this.highlightSelected()) return null;
    const isCreator = this.props.selectedAnnotation.attributes
      .currentUserIsCreator;
    const label = isCreator ? "You Highlighted" : "A Reader Highlighted";
    return (
      <div key="notice" className="note">
        {label}
      </div>
    );
  }

  rowHighlight() {
    const highlighted = this.highlightSelected();
    const className = classNames({ selected: highlighted });
    const onClick = highlighted
      ? this.props.destroySelected
      : this.props.highlight;
    return (
      <Button
        key={"highlight"}
        className={className}
        onClick={onClick}
        kind="any"
        label="Highlight"
        iconClass="manicon-pencil-simple"
      />
    );
  }

  rowAnnotate() {
    return (
      <Button
        key={"annotate"}
        onClick={this.props.annotate}
        kind="any"
        label="Annotate"
        iconClass="manicon-word-bubble"
      />
    );
  }

  rowNotate() {
    return (
      <Button
        key={"notate"}
        onClick={this.props.attachNotation}
        entity={this.props.text}
        ability="notate"
        label="Resource"
        iconClass="manicon-cube-outline"
      />
    );
  }

  rowShare() {
    return (
      <Button
        key={"share"}
        onClick={() => this.props.showSecondary("share")}
        kind="any"
        label="Share"
        iconClass="manicon-nodes"
      />
    );
  }

  rowLogin() {
    return (
      <Button
        key={"login"}
        onClick={this.props.showLogin}
        kind="unauthenticated"
        label="Login to Annotate"
        iconClass="manicon-person-pencil"
      />
    );
  }

  rowAnnotations() {
    if (!this.props.showAnnotationsInDrawer) return null;
    return (
      <Button
        key={"annotations"}
        onClick={this.props.showAnnotationsInDrawer}
        label="View Annotations"
        iconClass="manicon-word-bubble"
      />
    );
  }

  rows(direction = "up") {
    const rows = [];
    rows.push(this.rowHighlighted());
    rows.push(this.rowHighlight());
    // rows.push(this.rowAnnotations());
    rows.push(this.rowAnnotate());
    rows.push(this.rowNotate());
    rows.push(this.rowShare());
    rows.push(this.rowLogin());
    if (direction === "down") return rows.reverse();
    return rows;
  }

  render() {
    return (
      <Panel
        primary
        secondary={this.props.secondary}
        direction={this.props.direction}
      >
        {this.rows(this.props.direction)}
      </Panel>
    );
  }
}
