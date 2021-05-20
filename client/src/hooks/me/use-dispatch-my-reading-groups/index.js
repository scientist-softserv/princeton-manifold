import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { meAPI, requests } from "api";
import { entityStoreActions } from "actions";

const { request } = entityStoreActions;

export default function useDispatchMyReadingGroups(filter, page, fetchVersion) {
  const dispatch = useDispatch();

  useEffect(() => {
    const myReadingGroupsFetch = meAPI.readingGroups(filter, page);
    const myReadingGroupsAction = request(
      myReadingGroupsFetch,
      requests.feMyReadingGroups
    );
    dispatch(myReadingGroupsAction);
  }, [dispatch, JSON.stringify(filter), JSON.stringify(page), fetchVersion]); // eslint-disable-line react-hooks/exhaustive-deps
}
