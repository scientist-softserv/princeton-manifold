import {
  reactSlideTransition,
  respond,
  rgba,
  listHorizontal,
  buttonUnstyled,
  utilityPrimary,
  defaultTransitionProps
} from "theme/styles/mixins";

export default `
.reader-header {
  --padding-lateral: var(--container-padding-inline-narrow);
  --padding-lateral-narrow: 11px;

  ${reactSlideTransition("left", ".reader-return-menu")}
  ${reactSlideTransition("right", ".user-menu")}
  ${reactSlideTransition("right", ".search-menu")}

  position: fixed;
  top: 0;
  width: 100%;
  box-shadow: 0 -10px 20px 7px ${rgba("neutralBlack", 0.25)};

  &__inner {
    position: relative;
    display: grid;
    grid-template: "menu-group-left title-bar menu-group-right" 46px / max-content 1fr max-content;
    width: 200vw;
    background-color: var(--box-bg-color);
    transition: transform var(--transition-duration-default) ease-out;

    &--shifted {
      transform: translateX(-100vw);
    }

    ${respond(`width: 100%;`, 50)}
  }

  &__menu-group {
    display: flex;

    &--left {
      grid-area: menu-group-left;
      width: 100vw;

      ${respond(`width: auto;`, 50)}
    }

    &--right {
      grid-area: menu-group-right;
      width: 100vw;

      ${respond(`width: auto;`, 50)}
    }
  }

  &__title-bar {
    font-family: var(--font-family-heading);
    position: relative;
    display: none;
    grid-area: title-bar;
    height: 100%;
    overflow: hidden;
    font-size: 18px;
    font-weight: var(--font-weight-medium);

    ${respond(`display: block;`, 75)}
  }

  &__title-bar-inner {
    position: relative;
    width: 100%;
    height: 100%;
    padding-right: var(--padding-lateral);
    padding-left: var(--padding-lateral);
    margin: 0;
    transition: transform 0.4s var(--transition-timing-function);

    .reader-header__title-bar--show-section & {
      transform: translateY(-100%);
    }
  }

  &__title-bar-text {
    display: flex;
    align-items: center;
    height: 100%;
  }

  &__title-inner-text {
    position: relative;
    top: -2px;
    overflow: hidden;
    line-height: 1.5;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__title-bar-collecting-toggle {
    margin-left: 12px;
    transform: translateY(-3px);
  }

  &__button {
    ${buttonUnstyled}
    ${utilityPrimary}
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    padding-top: 2px;
    padding-bottom: 2px;
    font-size: 13px;
    transition: color ${defaultTransitionProps}, background-color ${defaultTransitionProps};

    ${respond(`font-size: 14px;`, 50)}

    &:active,
    &.button-active,
    &:hover,
    &.focus-visible {
      color: var(--color-neutral-text-extra-dark);
      outline: 0;
    }

    &.button-active:not(.focus-visible),
    &:hover,
    &.focus-visible {
      background-color: var(--color-interaction-light);
    }

    &.button-active.focus-visible {
      background-color: var(--color-interaction-dark);
    }

    &--pad-default {
      padding-right: var(--padding-lateral);
      padding-left: var(--padding-lateral);
    }

    &--pad-narrow {
      padding-right: var(--padding-lateral-narrow);
      padding-left: var(--padding-lateral-narrow);
    }

    &--gray {
      background-color: var(--box-strong-bg-color);
    }
  }

  &__button-icon {
    margin-left: 1em;

    &--large {
      display: none;

      ${respond(`display: block;`, 50)}
    }

    &--small {
      position: relative;
      top: 1px;

      ${respond(`display: none;`, 50)}
    }
  }

  &__options-button {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 110px;

    ${respond(`display: none;`, 50)}
  }

  &__options-button-icon {
    margin-right: -10px;
    margin-left: 3px;
  }

  &__nav-list {
    ${listHorizontal}
    position: relative;
    display: block;
    height: 100%;
  }

  &__nav-item {
    position: relative;
    height: 100%;
    vertical-align: middle;

    svg {
      width: 28px;
      height: 28px;

      ${respond(
        `width: 32px;
      height: 32px;`,
        50
      )}
    }
  }

  &__panels {
    position: absolute;
    width: 100%;

    &--left {
      left: 0;
    }

    &--right {
      right: 0;
    }
  }

  .reader-return-menu,
  .search-menu,
  .user-menu {
    position: absolute;
    top: 0;
  }

  .search-menu,
  .user-menu {
    right: 0;
  }
}
`;
