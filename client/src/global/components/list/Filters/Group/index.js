import React, { useRef } from "react";
import PropTypes from "prop-types";
import Search from "../Search";
import Filter from "../Filter";
import * as Styled from "./styles";

import withScreenReaderStatus from "hoc/withScreenReaderStatus";

function FiltersGroup(props) {
  const {
    filters,
    hideSearch = false,
    updateFilterState,
    onReset,
    showReset,
    setScreenReaderStatus,
    className
  } = props;

  const searchInput = useRef(null);

  const handleReset = () => {
    onReset();
    setScreenReaderStatus("Search and filters reset.");
    if (searchInput.current) {
      searchInput.current.focus();
      searchInput.current.value = "";
    }
  };

  const onSubmit = e =>
    updateFilterState(e, "keyword", searchInput.current.value);

  /* eslint-disable no-nested-ternary */
  const resetLabel =
    filters?.length && !hideSearch
      ? "Reset Search + Filters"
      : filters?.length
      ? "Reset Filters"
      : "Reset Search";
  /* eslint-disable no-nested-ternary */

  return (
    <Styled.Wrapper
      as={onSubmit ? "form" : "div"}
      onSubmit={onSubmit}
      $count={filters?.length || 0}
      $searchCount={hideSearch ? 0 : 1}
      className={className}
    >
      {!hideSearch && <Search inputRef={searchInput} />}
      <Styled.SelectGroup $count={filters?.length || 0}>
        {filters &&
          filters.map(filter => <Filter key={filter.label} {...filter} />)}
      </Styled.SelectGroup>
      {showReset && (
        <Styled.ResetButton type="reset" onClick={handleReset}>
          {resetLabel}
        </Styled.ResetButton>
      )}
    </Styled.Wrapper>
  );
}

FiltersGroup.displayName = "Global.List.Filters.FiltersGroup";

FiltersGroup.propTypes = {
  onReset: PropTypes.func,
  showReset: PropTypes.bool,
  filters: PropTypes.array,
  updateFilterState: PropTypes.func,
  hideSearch: PropTypes.bool,
  setScreenReaderStatus: PropTypes.func,
  className: PropTypes.string
};

export default withScreenReaderStatus(FiltersGroup);
