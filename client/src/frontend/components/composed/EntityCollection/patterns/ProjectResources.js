import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import ResourceList from "frontend/components/resource-list";
import EntityCollection from "../EntityCollection";
import { useListFilters } from "hooks";
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
  const { t } = useTranslation(["frontend"]);

  const showPagination = !isEmpty(resourcesMeta) && !isEmpty(paginationProps);
  const showFilters = !isEmpty(resourcesMeta) && !isEmpty(filterProps);

  const listFiltersProps = useListFilters({ ...filterProps });

  return resources && project ? (
    <EntityCollection
      title={t("pages.resources_all")}
      icon="resources64"
      filterProps={showFilters ? listFiltersProps : null}
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
              unit: "resource"
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
  ) : null;
}

ProjectResourcesEntityCollection.displayName =
  "Frontend.Composed.EntityCollection.ProjectsResources";

ProjectResourcesEntityCollection.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.object),
  resourcesMeta: PropTypes.object,
  project: PropTypes.object,
  filterProps: shapes.filters,
  paginationProps: shapes.pagination,
  itemHeadingLevel: PropTypes.oneOf([2, 3, 4, 5, 6])
};

export default ProjectResourcesEntityCollection;
