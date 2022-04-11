import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { UIDConsumer } from "react-uid";
import Utility from "global/components/utility";
import Collapse from "global/components/Collapse";
import classNames from "classnames";
import has from "lodash/has";
import isPlainObject from "lodash/isPlainObject";
import { withTranslation } from "react-i18next";

class ListEntitiesListSearch extends PureComponent {
  static displayName = "List.Entities.List.Search";

  static propTypes = {
    params: PropTypes.array,
    values: PropTypes.object,
    setParam: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    searchStyle: PropTypes.oneOf(["horizontal", "vertical"]),
    t: PropTypes.func
  };

  static defaultProps = {
    params: [],
    values: {},
    searchStyle: "horizontal"
  };

  constructor(props) {
    super(props);
    this.state = {
      keyword: ""
    };
    this.searchInput = React.createRef();
  }

  componentDidMount() {
    if (!has(this.props, "values.keyword")) return;
    this.updateKeywordFromProps();
  }

  componentDidUpdate(prevProps) {
    if (has(prevProps, "values.keyword") || has(this.props, "values.keyword")) {
      if (prevProps.values.keyword !== this.props.values.keyword) {
        this.updateKeywordFromProps();
      }
    }
  }

  onSubmit = event => {
    event.preventDefault();
  };

  get filterParams() {
    return this.params.filter(
      p => !this.reservedNames.includes(p.name) && !p.hidden
    );
  }

  get reservedNames() {
    return ["order", "keyword"];
  }

  get hasFilterParams() {
    return this.filterParams.length > 0;
  }

  get hasOptions() {
    return this.hasFilterParams || this.hasOrderParam;
  }

  get params() {
    return this.props.params;
  }

  get values() {
    return this.props.values;
  }

  get keywordParam() {
    return this.paramByName("keyword");
  }

  get orderParam() {
    return this.paramByName("order");
  }

  get hasOrderParam() {
    return this.hasParam(this.orderParam);
  }

  get hasKeywordParam() {
    return this.hasParam(this.keywordParam);
  }

  get searchStyle() {
    return this.props.searchStyle;
  }

  get idPrefix() {
    return "list-search";
  }

  updateKeywordFromProps() {
    this.setState({ keyword: this.props.values.keyword });
  }

  setKeywordState(event) {
    const value = event.target.value;
    this.setState({ keyword: value });
  }

  setParam(event, paramLike) {
    const param = this.ensureParamObject(paramLike);
    const value = event.target.value;
    const { setParam } = this.props;
    setParam(param, value);
  }

  submitKeywordForm = event => {
    event.preventDefault();
    const { setParam } = this.props;
    setParam(this.keywordParam, this.state.keyword);
  };

  ensureParamObject(param) {
    return isPlainObject(param) ? param : this.paramByName(param);
  }

  paramValue(paramLike) {
    const param = this.ensureParamObject(paramLike);
    return this.values[param.name] || "";
  }

  paramLabel(paramLike) {
    const param = this.ensureParamObject(paramLike);
    return param.label || "";
  }

  paramOptions(paramLike) {
    const param = this.ensureParamObject(paramLike);
    return param.options || [];
  }

  paramByName(paramName) {
    return this.params.find(p => p.name === paramName);
  }

  hasParam(paramLike) {
    const param = this.ensureParamObject(paramLike);
    return isPlainObject(param);
  }

  resetSearch = event => {
    event.preventDefault();
    this.setState({ keyword: "" });
    this.props.onReset();

    // focus on search field
    this.searchInput.current.focus();
  };

  classNameWithStyle(className) {
    return classNames({
      [className]: true,
      [`${className}--horizontal`]: this.searchStyle === "horizontal",
      [`${className}--vertical`]: this.searchStyle === "vertical"
    });
  }

  /* eslint-disable react/no-array-index-key */
  /* these filters never change after render */
  render() {
    const baseClass = "entity-list-search";
    const t = this.props.t;

    return (
      <div className={`entity-list__search ${baseClass}`}>
        <Collapse>
          {this.hasKeywordParam && (
            <form onSubmit={this.submitKeywordForm}>
              <div className={`${baseClass}__keyword-row`}>
                <button className={`${baseClass}__search-button`}>
                  <Utility.IconComposer icon="search16" size={20} />
                  <span className="screen-reader-text">
                    {t("search.title")}
                  </span>
                </button>
                <div className={`${baseClass}__keyword-input-wrapper`}>
                  <UIDConsumer name={id => `${this.idPrefix}-${id}`}>
                    {id => (
                      <>
                        <label htmlFor={id} className="screen-reader-text">
                          {t("search.instructions")}
                        </label>
                        <input
                          ref={this.searchInput}
                          className={`${baseClass}__keyword-input`}
                          id={id}
                          value={this.state.keyword}
                          type="text"
                          placeholder={this.paramLabel(this.keywordParam)}
                          onChange={e => this.setKeywordState(e)}
                        />
                      </>
                    )}
                  </UIDConsumer>
                </div>
                <button
                  onClick={this.resetSearch}
                  className={`${baseClass}__text-button`}
                >
                  {t("actions.reset")}
                </button>
                {this.hasOptions && (
                  <Collapse.Toggle
                    className={`${baseClass}__text-button ${baseClass}__text-button--foregrounded`}
                  >
                    {t("common.option_title_case_other")}
                  </Collapse.Toggle>
                )}
              </div>
            </form>
          )}
          {this.hasOptions && (
            <Collapse.Content>
              <UIDConsumer name={id => `${this.idPrefix}-${id}`}>
                {id => (
                  <>
                    <div
                      className={this.classNameWithStyle(
                        `${baseClass}__options`
                      )}
                    >
                      {this.filterParams.map((param, i) => (
                        <div
                          key={i}
                          className={this.classNameWithStyle(
                            `${baseClass}__option`
                          )}
                        >
                          <div className={`select`}>
                            <span
                              className={`select__label ${
                                i > 0 ? `select__label--empty` : ""
                              }`}
                            >
                              {i === 0
                                ? t("filters.labels.filter_results")
                                : "\u00A0"}
                            </span>
                            <div className={`select__wrapper`}>
                              <label
                                htmlFor={`${id}-filter-${i}`}
                                className="screen-reader-text"
                              >
                                {param.label === "Draft" &&
                                  t("filters.labels.by_draft")}
                                {param.label === "Role" &&
                                  t("filters.labels.by_role")}
                              </label>
                              <select
                                id={`${id}-filter-${i}`}
                                onChange={e => this.setParam(e, param)}
                                value={this.paramValue(param)}
                              >
                                {this.paramOptions(param).map(
                                  (option, optionIndex) => (
                                    <option
                                      key={optionIndex}
                                      value={option.value || ""}
                                    >
                                      {option.label}
                                    </option>
                                  )
                                )}
                              </select>
                              <Utility.IconComposer icon="disclosureDown24" />
                            </div>
                          </div>
                        </div>
                      ))}
                      {this.hasOrderParam && (
                        <div
                          className={this.classNameWithStyle(
                            `${baseClass}__option`
                          )}
                        >
                          <div className={`select`}>
                            <span className={`select__label`}>
                              {t("filters.labels.order_results")}
                            </span>
                            <div className={`select__wrapper`}>
                              <label
                                htmlFor={`${id}-order`}
                                className="screen-reader-text"
                              >
                                {t("filters.labels.order_results")}
                              </label>
                              <select
                                id={`${id}-order`}
                                onChange={e =>
                                  this.setParam(e, this.orderParam)
                                }
                                value={this.paramValue(this.orderParam)}
                              >
                                {this.paramOptions(this.orderParam).map(
                                  (option, optionIndex) => (
                                    <option
                                      key={optionIndex}
                                      value={option.value || ""}
                                    >
                                      {option.label}
                                    </option>
                                  )
                                )}
                              </select>
                              <Utility.IconComposer icon="disclosureDown24" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </UIDConsumer>
            </Collapse.Content>
          )}
        </Collapse>
      </div>
    );
  }
}

export default withTranslation()(ListEntitiesListSearch);
