import React from "react";
import { TypeHeader } from "../parts";
import SortableCollectables from "../../SortableCollectables";
import { collectedShape } from "./helpers";
import * as Styled from "./styles";

function CollectedProjects({ showDropzone, ...restProps }) {
  return (
    <Styled.Type $active={showDropzone}>
      <TypeHeader heading={"Projects:"} />
      <SortableCollectables type="projects" {...restProps} />
    </Styled.Type>
  );
}

CollectedProjects.displayName =
  "ReadingGroup.Collecting.CollectionEditor.Category.Projects";

CollectedProjects.propTypes = collectedShape;

export default CollectedProjects;
