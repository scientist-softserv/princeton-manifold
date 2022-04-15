import { useRef, useState, useEffect, useCallback } from "react";
import { useMenuState } from "reakit/Menu";

const MENU_OPTIONS = {
  loop: true
};

export default function useAnnotationMenu({ menuArray, defaultMenu, visible }) {
  const lastFocus = useRef();
  const lastActiveMenu = useRef();

  /**
   * Normally we shouldn't use a hook inside a callback like this.
   * But since `menuArray` never changes, it should be safe to do so here.
   */
  /* eslint-disable react-hooks/rules-of-hooks */
  const menus = Object.fromEntries(
    menuArray.map(menu => [
      menu,
      {
        ...useMenuState(MENU_OPTIONS),
        // Prevent reakit from moving focus based on mouse events,
        // which causes selection highlighting to disappear in FF and Safari
        // see https://github.com/ManifoldScholar/manifold/pull/3086#issuecomment-1030141362
        onMouseEnter: event => event.preventDefault(),
        onMouseMove: event => event.preventDefault(),
        onMouseLeave: event => event.preventDefault(),
        onMouseDown: event => event.preventDefault(),
        onTouchEnd: event => event.preventDefault()
      }
    ])
  );
  /* eslint-enable react-hooks/rules-of-hooks */

  const [activeMenu, setMenu] = useState(null);

  // track the previous state so that we can detect movement between two menus (see `handleKeyDown`)
  useEffect(() => {
    lastActiveMenu.current = activeMenu;
  }, [activeMenu]);

  useEffect(() => {
    if (visible) {
      lastFocus.current = document.activeElement;
      setMenu(defaultMenu);
    } else {
      if (lastFocus.current) {
        lastFocus.current.focus();
      }
      setMenu(null);
    }
  }, [visible, defaultMenu]);

  // Move between main and submenus using left & right arrow keys
  //
  // We use a `data-name` attr on default menu items linked to submenus
  // in order to tell which submenu should be opened on right arrow keyDown
  const handleKeyDown = useCallback(
    (event, sourceMenu) => {
      const {
        key,
        target: { dataset }
      } = event;

      if (key === "ArrowRight") {
        if (sourceMenu === defaultMenu && dataset.name) {
          setMenu(dataset.name);
        } else {
          event.preventDefault(); // prevent arrowing out of menu altogether in caret browsing mode
        }
      }

      if (key === "ArrowLeft") {
        if (sourceMenu !== defaultMenu) {
          setMenu("main");
        } else {
          event.preventDefault(); // prevent arrowing out of menu altogether in caret browsing mode
        }
      }
    },
    [defaultMenu]
  );

  const setActiveMenu = useCallback(name => setMenu(name), []);

  return {
    menus,
    activeMenu,
    lastActiveMenu,
    setActiveMenu,
    handleKeyDown
  };
}
