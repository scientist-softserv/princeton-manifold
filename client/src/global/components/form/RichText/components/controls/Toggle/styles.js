import styled from "@emotion/styled";
import {
  buttonUnstyled,
  utilityPrimary,
  defaultTransitionProps
} from "theme/styles/mixins";

export const Wrapper = styled.div`
  ${buttonUnstyled}
  ${utilityPrimary}
  display: inline-flex;
  border: 1px solid;
  border-radius: 16px;
  color: var(--color-accent-primary);
`;

export const Button = styled.button`
  ${buttonUnstyled}
  ${utilityPrimary}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding-inline: ${({ $padding }) => $padding};
  font-size: 14px;
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  text-transform: none;
  letter-spacing: 0;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  transition: color ${defaultTransitionProps},
    background-color ${defaultTransitionProps},
    border-color ${defaultTransitionProps};

  ${({ $active }) =>
    $active &&
    `
      color: var(--color-neutral-text-extra-dark);
      background-color: var(--hover-color);
      border-color: var(--hover-color);
    `}

  span {
    padding-top: 7px;
    padding-bottom: 9px;
  }

  svg {
    width: 24px;
    height: 24px;
    padding-bottom: 2px;
    margin: 0;
  }

  &:hover {
    color: var(--color-neutral-text-extra-dark);
    background-color: var(--hover-color);
    border-color: var(--hover-color);
  }

  &.focus-visible {
    color: var(--color-neutral-text-extra-dark);
    border-color: var(--hover-color);
    outline: none;
  }

  * + & {
    border-left: 1px solid;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;
  }
`;
