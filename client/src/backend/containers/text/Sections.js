import React from "react";
import Form from "global/components/form";
import { useTranslation } from "react-i18next";
import FormContainer from "global/containers/form";
import { Link } from "react-router-dom";
import lh from "helpers/linkHandler";
import IconComposer from "global/components/utility/IconComposer";
import { childRoutes } from "helpers/router";

export default function TextSectionsContainer({ text, name, refresh, route }) {
  const { t } = useTranslation();

  const renderChildRoutes = () => {
    const closeUrl = lh.link("backendTextSections", text.id);

    return childRoutes(route, {
      drawer: true,
      drawerProps: {
        lockScroll: "always",
        wide: true,
        lockScrollClickCloses: false,
        closeUrl,
        size: "wide"
      },
      childProps: { refresh, text }
    });
  };

  // TODO: Add an Authorize with correct permission.

  return (
    <section>
      {renderChildRoutes()}
      <FormContainer.Form
        className="form-secondary"
        doNotWarn
        groupErrors
        model={"TBD"}
        name={name}
      >
        <Form.Header
          label={t("glossary.section_title_case_other")}
          instructions={t("backend_entities.texts.sections_instructions")}
        />
      </FormContainer.Form>
      <div className="entity-list__button-set-flex">
        <Link
          to={lh.link("backendTextSectionsNew", text.id)}
          className="entity-list__button button-lozenge-secondary"
        >
          <span className="screen-reader-text">
            {t("backend_entities.texts.create_category_button_label")}
          </span>
          <IconComposer
            icon="circlePlus32"
            size={18}
            className="button-icon-secondary__icon button-icon-secondary__icon--large"
          />
          <span className="full" aria-hidden="true">
            {t("backend_entities.texts.add_section_button_label")}
          </span>
          <span className="abbreviated" aria-hidden="true">
            {t("glossary.section_title_case_one")}
          </span>
        </Link>
      </div>
    </section>
  );
}
