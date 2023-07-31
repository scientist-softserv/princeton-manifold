import React, { useState, useCallback, useEffect } from "react";
import Form from "global/components/form";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import lh from "helpers/linkHandler";
import IconComposer from "global/components/utility/IconComposer";
import { childRoutes } from "helpers/router";
import TOCList from "backend/components/authoring/TOCList";
import { formatTreeData } from "backend/components/authoring/TOCList/treeHelpers";
import { textsAPI } from "api";
import { useApiCallback } from "hooks";
import withConfirmation from "hoc/withConfirmation";
import * as Styled from "./styles";

function TextTOCContainer({ text, route, confirm }) {
  const { t } = useTranslation();

  // tree + setTree are here in the container because child route drawers need to call setTree after save to update the dnd tree. This could instead be implemented as a useEffect in List, but it made more sense to me to call it in the onSuccess callback in the forms. -LD
  const [tocAsDndTree, setTree] = useState(
    formatTreeData(text.attributes?.toc)
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    setTree(formatTreeData(text.attributes?.toc));
  }, [text?.attributes.toc]);

  const updateText = useApiCallback(textsAPI.update);

  const onAutoGenerate = useCallback(async () => {
    setError(null);
    const autoToc = text?.attributes.autoGeneratedTOC;

    const { data, errors } = await updateText(text.id, {
      attributes: { toc: autoToc }
    });
    if (errors) return setError(errors);
    const { toc } = data.attributes;
    setTree(formatTreeData(toc));
  }, [text, updateText]);

  const confirmAutoGenerate = () => {
    const heading = t("modals.auto_generate_toc");
    const message = t("modals.auto_generate_toc_body");
    if (confirm) confirm(heading, message, onAutoGenerate);
  };

  const renderChildRoutes = () => {
    const closeUrl = lh.link("backendTextTOC", text.id);

    return childRoutes(route, {
      drawer: true,
      drawerProps: {
        lockScroll: "always",
        wide: true,
        lockScrollClickCloses: false,
        closeUrl
      },
      childProps: {
        tree: tocAsDndTree,
        setTree,
        textId: text.id,
        sections: text.attributes?.sectionsMap,
        toc: text.attributes?.toc
      }
    });
  };

  return text ? (
    <section>
      {renderChildRoutes()}
      <Styled.Form
        className="form-secondary"
        doNotWarn
        groupErrors
        model={text}
        name="backend-text-sections"
      >
        <Form.Header
          label={t("texts.toc_header")}
          instructions={t("texts.toc_instructions")}
        />
        <div className="entity-list__button-set-flex full-width">
          <Link
            to={lh.link("backendTextTOCEntryNew", text.id)}
            className="entity-list__button button-lozenge-secondary"
          >
            <span className="screen-reader-text">
              {t("texts.add_toc_button_label")}
            </span>
            <IconComposer
              icon="circlePlus32"
              size={18}
              className="button-icon-secondary__icon button-icon-secondary__icon--large"
            />
            <span className="full" aria-hidden="true">
              {t("texts.add_toc_button_label")}
            </span>
          </Link>
          <button
            onClick={confirmAutoGenerate}
            className="entity-list__button button-lozenge-secondary"
          >
            <span className="screen-reader-text">
              {t("texts.auto_toc_button_label")}
            </span>
            <IconComposer
              icon="lightning24"
              size={18}
              className="button-icon-secondary__icon button-icon-secondary__icon--large"
            />
            <span className="full" aria-hidden="true">
              {t("texts.auto_toc_button_label")}
            </span>
          </button>
        </div>
        <TOCList
          toc={text.attributes?.toc}
          tree={tocAsDndTree}
          setTree={setTree}
          textId={text.id}
          error={error}
          setError={setError}
        />
      </Styled.Form>
    </section>
  ) : null;
}

TextTOCContainer.displayName = "Text.Sections";

TextTOCContainer.propTypes = {
  text: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

export default withConfirmation(TextTOCContainer);
