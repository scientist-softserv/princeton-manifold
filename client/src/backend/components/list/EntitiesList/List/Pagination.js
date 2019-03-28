import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Utility from "global/components/utility";

export default class ListEntitiesListPagination extends PureComponent {
  static displayName = "List.Entities.List.Pagination";

  static propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageClick: PropTypes.func.isRequired,
    style: PropTypes.oneOf(["normal", "compact"])
  };

  static defaultProps = {
    style: "normal"
  };

  get pagination() {
    return this.props.pagination;
  }

  get style() {
    return this.props.style;
  }

  get styleProps() {
    if (this.style === "compact") {
      return { compact: true };
    }
    return { compact: false };
  }

  get onPageClick() {
    return this.props.onPageClick;
  }

  //   level={this.props.paginationClass}
  // compact={this.props.compactPagination}

  render() {
    return (
      <div className="entity-list__pagination">
        <Utility.Pagination
          pagination={this.pagination}
          paginationClickHandler={this.onPageClick}
          {...this.styleProps}
        />
      </div>
    );
  }
}
