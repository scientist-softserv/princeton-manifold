import React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import ResourceList from "frontend/components/resource-list";
import EntityCollection from "../EntityCollection";
import * as shapes from "../shapes";

function ProjectResourcesEntityCollection({
  project,
  resources,
  resourcesMeta,
  filterProps,
  paginationProps,
  itemHeadingLevel,
  ...passThroughProps
}) {
  const showPagination = !isEmpty(resourcesMeta) && !isEmpty(paginationProps);
  const showFilters = !isEmpty(resourcesMeta) && !isEmpty(filterProps);
  return (
    <EntityCollection
      title="All Project Resources"
      icon="resources64"
      UtilityComponent={props =>
        showFilters && <ResourceList.Filters {...props} {...filterProps} />
      }
      BodyComponent={props => (
        <ResourceList.Cards
          project={project}
          resources={resources}
          itemHeadingLevel={itemHeadingLevel}
          {...props}
        />
      )}
      countProps={
        !resourcesMeta
          ? {}
          : {
              pagination: get(resourcesMeta, "pagination"),
              singularUnit: "resource",
              pluralUnit: "resources"
            }
      }
      paginationProps={
        !showPagination
          ? {}
          : {
              pagination: get(resourcesMeta, "pagination"),
              ...paginationProps
            }
      }
      {...passThroughProps}
    />
  );
}

ProjectResourcesEntityCollection.displayName =
  "Global.Composed.EntityCollection.ProjectsResources";

ProjectResourcesEntityCollection.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.object).isRequired,
  resourcesMeta: PropTypes.object,
  project: PropTypes.object,
  filterProps: shapes.filters,
  paginationProps: shapes.pagination,
  itemHeadingLevel: PropTypes.oneOf([2, 3, 4, 5, 6])
};

export default ProjectResourcesEntityCollection;
