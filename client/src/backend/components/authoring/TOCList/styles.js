import styled from "@emotion/styled";
import {
  draggable,
  dragging,
  buttonUnstyled,
  setHoverStyle,
  textTruncate,
  respond
} from "theme/styles/mixins";

export const Item = styled.div`
  & + & {
    padding-block-start: 16px;
  }
  color: var(--color-neutral-text-extra-light);
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ChildLink = styled.div`
  height: 8px;
  width: 16px;
  border-bottom-left-radius: 4px;
  border-left: 1px solid currentColor;
  border-bottom: 1px solid currentColor;
  color: var(--color-neutral-ui-light);
`;

export const Title = styled.div`
  overflow: hidden;
  ${textTruncate}
  font-family: var(--font-family-sans);
  font-size: 17px;
  font-weight: var(--font-weight-semibold);
`;

export const BG = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  background-color: var(--box-bg-color);
  border-radius: var(--box-border-radius);

  ${({ $isDragging }) =>
    $isDragging && `background-color: var(--drawer-bg-color)`}
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  color: var(--color-neutral-ui-light);

  &:hover ~ ${Title} {
    color: var(--highlight-color);
  }

  &:hover ~ ${BG} {
    background-color: var(--drawer-bg-color);
  }
`;

export const Inner = styled.div`
  --item-background: var(--box-bg-color);

  ${draggable}
  padding: 10px 24px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  width: ${({ $depth }) => `calc(100% - ${$depth * 24}px)`};
  cursor: default;
  background-color: transparent;
  position: relative;
  border: 1px solid var(--box-bg-color);
  color: var(--text-neutral-extra-light);

  ${({ $isDragging }) => $isDragging && dragging}
  margin-inline-start: ${({ $depth }) => `${$depth * 24}px`};
  ${({ $isTarget }) => $isTarget && `border-color: var(--highlight-color);`}

`;

export const Button = styled.button`
  ${buttonUnstyled}

  padding-inline: 3px;

  ${respond(`padding-inline: 6px;`, 30)};
`;

export const DragHandle = styled(Button)`
  cursor: grab;
  ${setHoverStyle()}
`;
