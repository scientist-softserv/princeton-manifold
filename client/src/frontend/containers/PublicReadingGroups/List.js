import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { readingGroupsAPI } from "api";
import { childRoutes } from "helpers/router";
import HeadContent from "global/components/HeadContent";
import EntityCollectionPlaceholder from "global/components/composed/EntityCollectionPlaceholder";
import GroupsTable from "frontend/components/reading-group/tables/Groups";
import JoinBox from "frontend/components/reading-group/JoinBox";
import { GroupsHeading } from "frontend/components/reading-group/headings";
import {
  useFetch,
  usePaginationState,
  useFilterState,
  useSetLocation,
  useCurrentUser
} from "hooks";

const DEFAULT_SORT_ORDER = "";

function PublicReadingGroupsListContainer({ route }) {
  const [pagination, setPageNumber] = usePaginationState();
  const baseFilters = {
    sort_order: DEFAULT_SORT_ORDER
  };
  const [filters, setFilters] = useFilterState(baseFilters);

  const [rgJoins, setRGJoins] = useState(0);
  const { data: readingGroups, meta } = useFetch({
    request: [readingGroupsAPI.publicIndex, filters, pagination],
    dependencies: [rgJoins]
  });

  useSetLocation({ filters, page: pagination.number });

  const showPlaceholder = "keyword" in filters ? false : !readingGroups?.length;

  const currentUser = useCurrentUser();
  const { t } = useTranslation();

  const childRouteProps = {
    drawer: true,
    drawerProps: {
      context: "frontend",
      size: "wide",
      position: "overlay",
      lockScroll: "always"
    },
    childProps: {
      onSuccess: () => setRGJoins(prev => prev + 1)
    }
  };

  return readingGroups ? (
    <>
      <HeadContent
        title={t("pages.frontend.public_groups")}
        appendDefaultTitle
      />
      <section>
        <div className="container groups-page-container">
          <GroupsHeading currentUser={currentUser} />
          {!showPlaceholder && (
            <GroupsTable
              readingGroups={readingGroups}
              currentUser={currentUser}
              pagination={meta?.pagination}
              onPageClick={page => () => setPageNumber(page)}
              filterProps={{
                onFilterChange: param => setFilters({ newState: param }),
                initialState: filters,
                resetState: baseFilters
              }}
              hideActions
              hideTags
            />
          )}
          {showPlaceholder && (
            <EntityCollectionPlaceholder.ReadingGroups isPublic />
          )}
          {currentUser && (
            <JoinBox onJoin={() => setRGJoins(prev => prev + 1)} />
          )}
        </div>
      </section>
      {childRoutes(route, childRouteProps)}
    </>
  ) : null;
}

PublicReadingGroupsListContainer.propTypes = {
  route: PropTypes.object.isRequired
};

export default PublicReadingGroupsListContainer;
