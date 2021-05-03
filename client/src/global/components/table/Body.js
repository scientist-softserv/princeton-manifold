import React from "react";
import PropTypes from "prop-types";
import TableHeaders from "./Headers";
import Row from "./Row";
import { TableHeaderContext } from "helpers/contexts";

export default class TableBody extends React.PureComponent {
  static displayName = "GenericTable.Body";

  static propTypes = {
    rows: PropTypes.array,
    linkCreator: PropTypes.func
  };

  get ariaLabel() {
    if (!this.props.label) return null;
    return `${this.props.label} Table.`;
  }

  render() {
    const label = this.props.label;
    const context = {
      markup: this.props.markup
    };

    const rows = this.props.models.map(model => {
      return (
        <Row key={model.id} model={model} linkCreator={this.props.linkCreator}>
          {this.props.children}
        </Row>
      );
    });

    let i = 0;
    const headers = React.Children.map(
      this.props.children.filter(Boolean),
      child => {
        return {
          key: i++,
          label: child.props.header,
          icon: child.props.headerIcon,
          align: child.props.align
        };
      }
    );

    return (
      <TableHeaderContext.Provider value={context}>
        {this.props.markup === "table" && (
          <div className="table__responsive-container">
            <table className="table__table" aria-label={this.ariaLabel}>
              <TableHeaders headers={headers} />
              <tbody>{rows}</tbody>
            </table>
          </div>
        )}
        {this.props.markup === "dl" && (
          <ol className="table__ordered-list" aria-label={`${label} List.`}>
            {rows}
          </ol>
        )}
      </TableHeaderContext.Provider>
    );
  }
}
