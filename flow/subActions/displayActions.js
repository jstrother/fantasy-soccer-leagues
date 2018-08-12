/*eslint-disable linebreak-style*/

export const ROSTER_SHOW = 'ROSTER_SHOW';
export const rosterShow = () => ({
  type: ROSTER_SHOW,
  rosterVisible: true
});

export const ROSTER_HIDE = 'ROSTER_HIDE';
export const rosterHide = () => ({
  type: ROSTER_HIDE,
  rosterVisible: false
});

export const SCHEDULE_SHOW = 'SCHEDULE_SHOW';
export const scheduleShow = () => ({
  type: SCHEDULE_SHOW,
  scheduleVisible: true
});

export const SCHEDULE_HIDE = 'SCHEDULE_HIDE';
export const scheduleHide = () => ({
  type: SCHEDULE_HIDE,
  scheduleVisible: false
});

export const STANDINGS_SHOW = 'STANDINGS_SHOW';
export const standingsShow = () => ({
  type: STANDINGS_SHOW,
  standingsVisible: true
});

export const STANDINGS_HIDE = 'STANDINGS_HIDE';
export const standingsHide = () => ({
  type: STANDINGS_HIDE,
  standingsVisible: false
});