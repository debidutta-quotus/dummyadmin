export const handleClickOutside = (
  event: MouseEvent,
  refs: React.RefObject<Element | null>[],
  closeActions: (() => void)[]
) => {
  const isInside = refs.some((ref) => ref.current?.contains(event.target as Node));
  if (!isInside) closeActions.forEach((action) => action());
};
