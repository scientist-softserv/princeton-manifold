import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Redirect, useParams } from "react-router-dom";
import CheckFrontendMode from "global/containers/CheckFrontendMode";
import { projectsAPI } from "api";
import lh from "helpers/linkHandler";
import { RegisterBreadcrumbs } from "global/components/atomic/Breadcrumbs";
import EntityCollection from "frontend/components/entity/Collection";
import HeadContent from "global/components/HeadContent";
import { useFetch, usePaginationState } from "hooks";

export default function EventList({ project }) {
  const { id } = useParams();
  const [pagination, setPageNumber] = usePaginationState();
  const { data: events, meta } = useFetch({
    request: [projectsAPI.events, id, null, pagination]
  });
  const { t } = useTranslation();

  const { titlePlaintext, slug, hideActivity, description, avatarStyles } =
    project?.attributes || {};
  const breadcrumbs = useMemo(
    () => [
      {
        to: lh.link("frontendProjectDetail", slug),
        label: titlePlaintext
      }
    ],
    [slug, titlePlaintext]
  );

  if (!project || !events) return null;
  if (hideActivity) return <Redirect to={"/"} />;

  return (
    <>
      <HeadContent
        title={`${titlePlaintext} | ${t("pages.frontend.events")}`}
        description={description}
        image={avatarStyles.mediumSquare}
        appendDefaultTitle
      />
      <CheckFrontendMode
        debugLabel="EventList"
        project={project}
        isProjectSubpage
      />
      <RegisterBreadcrumbs breadcrumbs={breadcrumbs} />
      <EntityCollection.Events
        events={events}
        eventsMeta={meta}
        paginationProps={{
          paginationClickHandler: page => () => setPageNumber(page),
          paginationTarget: "#"
        }}
      />
    </>
  );
}

EventList.displayName = "Frontend.Containers.EventList";

EventList.propTypes = {
  project: PropTypes.object
};
