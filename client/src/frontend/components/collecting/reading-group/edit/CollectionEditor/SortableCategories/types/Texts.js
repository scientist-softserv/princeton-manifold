import React from "react";
import { useTranslation } from "react-i18next";
import { TypeHeader } from "../parts";
import SortableCollectables from "../../SortableCollectables";
import { collectedShape } from "./helpers";
import { capitalize } from "utils/string";
import * as Styled from "./styles";

function CollectedTexts({ showDropzone, ...restProps }) {
  const { t } = useTranslation();

  return (
    <Styled.Type $active={showDropzone}>
      <TypeHeader heading={`${capitalize(t("glossary.text_other"))}:`} />
      <SortableCollectables type="texts" {...restProps} />
    </Styled.Type>
  );
}

CollectedTexts.displayName =
  "ReadingGroup.Collecting.CollectionEditor.Category.Texts";

CollectedTexts.propTypes = collectedShape;

export default CollectedTexts;
