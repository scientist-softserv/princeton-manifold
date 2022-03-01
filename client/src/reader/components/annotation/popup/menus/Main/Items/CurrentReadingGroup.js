import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { MenuItem as ReakitMenuItem } from "reakit/Menu";
import IconComposer from "global/components/utility/IconComposer";
import Authorize from "hoc/Authorize";
import withCurrentUser from "hoc/withCurrentUser";
import { t } from "i18next";

function CurrentReadingGroup({
  menu,
  onClick,
  activeMenu,
  currentReadingGroup = "public",
  readingGroups,
  currentUser
}) {
  const canAccessReadingGroups =
    currentUser?.attributes.classAbilities.readingGroup.read;

  function getCurrentGroupName() {
    const { t } = useTranslation();

    if (currentReadingGroup === "public") return t("reader.my_public_annotations");
    if (currentReadingGroup === "private") return t("reader.my_private_annotations");

    const currentGroup = readingGroups.find(
      group => group.id === currentReadingGroup
    );
    return currentGroup.attributes.name;
  }

  return (
    <Authorize kind="any">
      <ReakitMenuItem
        {...menu}
        onClick={onClick}
        tabIndex={menu?.visible ? undefined : -1}
        aria-haspopup="menu"
        aria-expanded={activeMenu === "readingGroup"}
        data-name="readingGroup"
        className="annotation-popup__button annotation-popup__button--stacked annotation-popup__button--secondary-dark"
      >
        <span className="screen-reader-text">{t("actions.select_item", {item: t("glossary.reading_group_one")})}</span>
        <span className="annotation-popup__button-text">
          {canAccessReadingGroups ? t("reader.current_group") : t("reader.current_visibility")}:
        </span>
        <div className="annotation-popup__button-inner-row">
          <span className="annotation-popup__button-text annotation-popup__button-text--small">
            {getCurrentGroupName()}
          </span>
          <IconComposer
            icon="disclosureUp16"
            size={22}
            className="annotation-popup__button-icon annotation-popup__button-icon--disclosure"
          />
        </div>
      </ReakitMenuItem>
    </Authorize>
  );
}

CurrentReadingGroup.displayName =
  "Annotation.Popup.Menus.MainMenu.CurrentReadingGroup";

CurrentReadingGroup.propTypes = {
  menu: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  activeMenu: PropTypes.string,
  readingGroups: PropTypes.array,
  currentReadingGroup: PropTypes.string,
  currentUser: PropTypes.object
};

export default withCurrentUser(CurrentReadingGroup);
