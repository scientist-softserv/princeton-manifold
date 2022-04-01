import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Form from "global/components/form";
import setter from "global/components/form/setter";
import IconComposer from "global/components/utility/IconComposer";
import { DrawerContext } from "helpers/contexts";
import { Trans, withTranslation } from "react-i18next";
import { t } from "i18next";

class IngestionFormUpload extends PureComponent {
  static displayName = "ProjectDetail.Text.Ingestion.Form.Upload";

  static propTypes = {
    getModelValue: PropTypes.func,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    cancelUrl: PropTypes.string,
    setOther: PropTypes.func,
    header: PropTypes.string,
    t: PropTypes.func
  };

  onSourceChange = source => {
    this.props.setOther(source, "attributes[source]");
    this.props.setOther(null, "attributes[externalSourceUrl]");
  };

  onUrlChange = event => {
    this.props.setOther(event.target.value, "attributes[externalSourceUrl]");
    this.props.setOther(null, "attributes[source]");
  };

  get valid() {
    return this.ingestionSource || this.ingestionSourceUrl;
  }

  get ingestionSource() {
    return (
      this.props.getModelValue("attributes[source]") ||
      this.props.getModelValue("attributes[sourceFileName]")
    );
  }

  get ingestionSourceUrl() {
    return this.props.getModelValue("attributes[externalSourceUrl]");
  }

  get buttonClasses() {
    return classNames(
      "buttons-icon-horizontal__button",
      "button-icon-secondary",
      "button-icon-secondary--in-drawer"
    );
  }

  handleCancelClick = event => {
    event.preventDefault();
    this.props.cancelUrl
      ? this.props.history.push(this.props.cancelUrl)
      : this.props.history.goBack();
  };

  render() {
    const formHeader = this.props.header || "Upload";

    const fileInstructions = (
      <span className="instructions">
        <Trans
          i18nKey="backend.forms.ingestion.instructions"
          components={[ <br />,
          <a
            href="https://manifoldscholar.github.io/manifold-docusaurus/docs/backend/texts#adding-texts"
            target="_blank"
            rel="noopener noreferrer"
          >
            #
          </a>]}
        />
      </span>
    );

    /* eslint-disable max-len */
    return (
      <DrawerContext.Consumer>
        {contextProps => (
          <div>
            <Form.Header label={formHeader} id={contextProps?.headerId} />
            <Form.TusUpload
              inlineStyle={{ width: "100%" }}
              layout="landscape"
              instructions={fileInstructions}
              label={t("backend.forms.ingestion.upload_file")}
              value={this.props.getModelValue("attributes[source]")}
              initialValue={this.props.getModelValue(
                "attributes[sourceFileName]"
              )}
              set={this.onSourceChange}
              accepts="any"
            />
            <div className="form-divider">{t("common.or")}</div>
            <Form.TextInput
              label={t("backend.forms.ingestion.url")}
              focusOnMount
              instructions={t("backend.forms.ingestion.url_instructions")}
              value={this.props.getModelValue("attributes[externalSourceUrl]")}
              onChange={event => this.onUrlChange(event)}
            />
            <div style={{ marginTop: 30 }} className="buttons-icon-horizontal">
              {this.props.cancelUrl ? (
                <button
                  onClick={this.handleCancelClick}
                  className={classNames(
                    this.buttonClasses,
                    "button-icon-secondary--dull"
                  )}
                >
                  <IconComposer
                    icon="close16"
                    size="default"
                    className="button-icon-secondary__icon"
                  />
                  <span>{t("actions.cancel")}</span>
                </button>
              ) : null}
              <button
                type="submit"
                className={this.buttonClasses}
                disabled={!this.valid}
              >
                <IconComposer
                  icon="checkmark16"
                  size="default"
                  className="button-icon-secondary__icon"
                />
                <span>{t("actions.continue")}</span>
              </button>
            </div>
          </div>
        )}
      </DrawerContext.Consumer>
    );
  }
}

export default withTranslation()(setter(IngestionFormUpload));
