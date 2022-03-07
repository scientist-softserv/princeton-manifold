import React, { useCallback } from "react";
import PropTypes from "prop-types";
import lh from "helpers/linkHandler";
import { useTranslation } from "react-i18next";
import EntityThumbnail from "global/components/atomic/EntityThumbnail";
import ThumbnailGrid from "global/components/composed/ThumbnailGrid";
import { FooterLink, ProjectCollectionIcon } from "../parts";
import EntityCollection from "../EntityCollection";
import { getHeroImage, getHeaderLayout } from "../helpers";

function ProjectCollectionSummaryEntityCollection({
  projectCollection,
  paginationProps,
  filterProps,
  limit,
  ...passThroughProps
}) {
  const { t } = useTranslation();

  const {
    title,
    slug,
    descriptionFormatted: description
  } = projectCollection.attributes;

  const mapProjects = useCallback(collection => {
    if (!Array.isArray(collection.relationships.collectionProjects)) return [];
    return collection.relationships.collectionProjects.map(
      cp => cp.relationships.project
    );
  }, []);

  const getProjects = () => {
    const adjustedLimit = limit && limit > 0 ? limit : 100;
    const projects = mapProjects(projectCollection);
    return projects.slice(0, adjustedLimit);
  };

  const projects = getProjects();
  const headerLayout = getHeaderLayout(projectCollection);
  const image = getHeroImage(headerLayout, projectCollection);
  const totalprojectCount =
    projectCollection.relationships.collectionProjects?.length;

  return (
    <EntityCollection
      title={title}
      description={description}
      IconComponent={props => (
        <ProjectCollectionIcon {...props} collection={projectCollection} />
      )}
      image={image}
      headerLayout={headerLayout}
      headerLink={lh.link("frontendProjectCollection", slug)}
      BodyComponent={props =>
        !!projects?.length && (
          <ThumbnailGrid {...props}>
            {({ stack }) =>
              projects.map(item => (
                <EntityThumbnail key={item.id} entity={item} stack={stack} />
              ))
            }
          </ThumbnailGrid>
        )
      }
      FooterComponent={() =>
        totalprojectCount > limit && (
          <FooterLink
            to={lh.link("frontendProjectCollection", slug)}
            label={t("navigation.see_full_collection")}
          />
        )
      }
      {...passThroughProps}
    />
  );
}

ProjectCollectionSummaryEntityCollection.displayName =
  "Frontend.Composed.EntityCollection.ProjectCollectionSummary";

ProjectCollectionSummaryEntityCollection.propTypes = {
  projectCollection: PropTypes.object.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object),
  projectsMeta: PropTypes.object,
  limit: PropTypes.number
};

export default ProjectCollectionSummaryEntityCollection;
