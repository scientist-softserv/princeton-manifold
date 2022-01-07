import React from "react";
import PropTypes from "prop-types";
import CheckFrontendMode from "global/containers/CheckFrontendMode";
import EntityCollection from "frontend/components/composed/EntityCollection";
import lh from "helpers/linkHandler";
import HeadContent from "global/components/HeadContent";
import EventTracker, { EVENTS } from "global/components/EventTracker";
import {
  useSelectSettings,
  useSelectVolume,
  useSelectJournal,
  usePaginationState,
  useFilterState
} from "hooks";
import { RegisterBreadcrumbs } from "global/components/atomic/Breadcrumbs";
import Layout from "frontend/components/layout";

export default function VolumeDetailContainer({ location, match }) {
  const { journal } = useSelectJournal();
  const { volume, issues } = useSelectVolume();
  const settings = useSelectSettings();
  const { paginationState, handlePageChange } = usePaginationState(location);
  const { filterState, updateFilterState } = useFilterState(location);
  if (!journal) return null;

  const ogTitle = () => {
    if (!settings) return null;
    const { socialTitle, title } = journal.attributes;
    return (
      socialTitle ||
      `\u201c${title}\u201d on ${settings.attributes.general.installationName}`
    );
  };

  const ogDescription = () => {
    const { descriptionPlaintext, socialDescription } = journal.attributes;
    return socialDescription || descriptionPlaintext;
  };

  const ogImage = () => {
    const { socialImageStyles, heroStyles } = journal.attributes;
    if (socialImageStyles?.mediumLandscape)
      return socialImageStyles.mediumLandscape;
    if (heroStyles?.mediumLandscape) return heroStyles.mediumLandscape;
    return null;
  };

  const pageChangeHandlerCreator = pageParam => {
    return event => {
      event.preventDefault();
      handlePageChange(pageParam);
    };
  };

  return (
    <div>
      <CheckFrontendMode
        debugLabel="ProjectCollectionDetail"
        isProjectSubpage
      />
      {journal && (
        <EventTracker event={EVENTS.VIEW_RESOURCE} resource={journal} />
      )}
      <RegisterBreadcrumbs
        breadcrumbs={[
          {
            to: lh.link("frontendProjectCollections"),
            label: "Back to Project Collections"
          }
        ]}
      />
      <HeadContent
        title={ogTitle()}
        description={ogDescription()}
        image={ogImage()}
      />
      <h1 className="screen-reader-text">{journal.attributes.title}</h1>
      <h2> Volume Detail Container </h2>
      <Layout.ButtonNavigation
        showProjects={false}
        grayBg={false}
        showProjectCollections
        hideAtNarrow
      />
    </div>
  );
}
