import React from "react";
import { useTranslation } from "react-i18next";
import { TypeHeader } from "../parts";
import SortableCollectables from "../../SortableCollectables";
import { collectedShape } from "./helpers";
import { capitalize } from "utils/string";
import * as Styled from "./styles";

function CollectedResources({ showDropzone, ...restProps }) {
  const { t } = useTranslation();

  return (
    <Styled.Type $active={showDropzone}>
      <TypeHeader heading={`${capitalize(t("glossary.resource_other"))}:`} />
      <SortableCollectables type="resources" {...restProps} />
    </Styled.Type>
  );
}

CollectedResources.displayName =
  "ReadingGroup.Collecting.CollectionEditor.Category.Resources";

CollectedResources.propTypes = collectedShape;

export default CollectedResources;
