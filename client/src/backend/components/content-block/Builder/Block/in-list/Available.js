import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Identity from "../parts/Identity";
import Utility from "global/components/utility";

export default class ProjectContentBlockInListAvailable extends PureComponent {
  static displayName = "Project.Content.Block.InList.Available";

  static propTypes = {
    typeComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onClickAdd: PropTypes.func,
    disabled: PropTypes.bool
  };

  render() {
    const TypeComponent = this.props.typeComponent;

    return (
      <TypeComponent>
        {block => (
          <div
            {...this.props.dragHandleProps}
            className="backend-content-block__inner"
          >
            <Identity icon={block.icon} title={block.title} />
            <button
              className="backend-content-block__button"
              title="Add content block"
              onClick={this.props.onClickAdd}
              disabled={this.props.disabled}
            >
              <Utility.IconComposer
                icon="circlePlus32"
                size={32}
                iconClass="backend-content-block__icon backend-content-block__icon--add"
              />
            </button>
          </div>
        )}
      </TypeComponent>
    );
  }
}
