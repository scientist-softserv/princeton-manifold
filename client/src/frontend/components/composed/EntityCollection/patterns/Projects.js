import React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import EntityThumbnail from "global/components/atomic/EntityThumbnail";
import ThumbnailGrid from "global/components/composed/ThumbnailGrid";
import { ListFilters } from "global/components/list";
import EntityCollection from "../EntityCollection";
import * as shapes from "../shapes";

function ProjectsEntityCollection({
  projects,
  meta,
  filterProps,
  paginationProps,
  ...passThroughProps
}) {
  const showPagination = !isEmpty(meta) && !isEmpty(paginationProps);
  const showFilters = !isEmpty(meta) && !isEmpty(filterProps);
  return (
    <EntityCollection
      title="All Projects"
      icon="projects64"
      UtilityComponent={() => showFilters && <ListFilters {...filterProps} />}
      BodyComponent={props => (
        <ThumbnailGrid {...props}>
          {({ stack }) =>
            projects.map(item => (
              <EntityThumbnail key={item.id} entity={item} stack={stack} />
            ))
          }
        </ThumbnailGrid>
      )}
      countProps={
        isEmpty(meta)
          ? {}
          : {
              pagination: get(meta, "pagination"),
              unit: "project"
            }
      }
      paginationProps={
        !showPagination
          ? {}
          : {
              pagination: get(meta, "pagination"),
              ...paginationProps
            }
      }
      {...passThroughProps}
    />
  );
}

ProjectsEntityCollection.displayName =
  "Frontend.Composed.EntityCollection.Projects";

ProjectsEntityCollection.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  meta: PropTypes.object,
  filterProps: shapes.filters,
  paginationProps: shapes.pagination
};

export default ProjectsEntityCollection;
