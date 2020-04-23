import React, { PureComponent } from "react";
import * as EntitiesList from "backend/components/list/EntitiesList";
import Utility from "global/components/utility";
import has from "lodash/has";
import isFunction from "lodash/isFunction";

export default class FormHasManyList extends PureComponent {
  static displayName = "Form.Picker.List";

  static propTypes = {};

  static defaultProps = {
    listStyle: "well"
  };

  get callbacks() {
    return this.props.callbacks;
  }

  get listCallbacks() {
    const out = {};
    if (this.canReorder) out.onReorder = this.callbacks.reorderSelection;
    return out;
  }

  get canRemove() {
    return has(this.callbacks, "removeSelection");
  }

  get canEdit() {
    return has(this.callbacks, "editSelection");
  }

  get canReorder() {
    return this.props.reorderable && has(this.callbacks, "reorderSelection");
  }

  get resolvedRowComponent() {
    const { rowComponent } = this.props;
    if (isFunction(rowComponent)) return rowComponent;
    if (has(EntitiesList, rowComponent)) return EntitiesList[rowComponent];
  }

  wrappedRowComponent = props => {
    const Row = this.resolvedRowComponent;

    const utility = (
      <>
        {this.canRemove && (
          <button
            type="button"
            className="entity-row__utility-button"
            onClick={event => {
              event.stopPropagation();
              event.preventDefault();
              this.callbacks.removeSelection(props.entity);
            }}
            title="Remove"
          >
            <Utility.IconComposer icon="close32" size={26} />
          </button>
        )}
        {this.canEdit && (
          <button
            type="button"
            className="entity-row__utility-button"
            onClick={event => {
              event.stopPropagation();
              event.preventDefault();
              this.callbacks.editSelection(props.entity);
            }}
            title="Edit"
          >
            <Utility.IconComposer icon="annotate32" size={26} />
          </button>
        )}
      </>
    );

    return <Row {...props} clickable={false} utility={utility} />;
  };

  render() {
    return (
      <div className={this.props.className}>
        <EntitiesList.default
          emptyMessage="None Added"
          listStyle={this.props.listStyle}
          sortableStyle="tight"
          callbacks={this.listCallbacks}
          entityComponent={this.wrappedRowComponent}
          entityComponentProps={this.props.rowProps}
          entities={this.props.entities}
        />
      </div>
    );
  }
}
