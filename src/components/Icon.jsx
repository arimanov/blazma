import React from 'react';
import {SvgXml} from 'react-native-svg';
import gitBranchOutline from '../assets/icons/git-branch-outline.svg';
import chevronBackOutline from '../assets/icons/chevron-back-outline.svg';
import chevronForwardOutline from '../assets/icons/chevron-forward-outline.svg';
import arrowBackCircle from '../assets/icons/arrow-back-circle.svg';
import arrowForwardCircle from '../assets/icons/arrow-forward-circle.svg';
import arrowUpCircle from '../assets/icons/arrow-up-circle.svg';
import arrowUpCircleOutline from '../assets/icons/arrow-up-circle-outline.svg';
import informationCircleOutline from '../assets/icons/information-circle-outline.svg';
import languageOutline from '../assets/icons/language-outline.svg';
import logoGithub from '../assets/icons/logo-github.svg';
import mailOpenOutline from '../assets/icons/mail-open-outline.svg';
import moonOutline from '../assets/icons/moon-outline.svg';
import personCircleOutline from '../assets/icons/person-circle-outline.svg';
import settingsOutline from '../assets/icons/settings-outline.svg';
import terminalOutline from '../assets/icons/terminal-outline.svg';
import trashOutline from '../assets/icons/trash-outline.svg';
import chevronBackCircle from '../assets/icons/chevron-back-circle.svg';
import chevronForwardCircle from '../assets/icons/chevron-forward-circle.svg';
import chatbubbleEllipsesOutline from '../assets/icons/chatbubble-ellipses-outline.svg';
import exitOutline from '../assets/icons/exit-outline.svg';

const Icon = function ({name, size, color}) {
  const names = new Map([
    ['git-branch-outline', gitBranchOutline],
    ['chevron-back-outline', chevronBackOutline],
    ['chevron-forward-outline', chevronForwardOutline],
    ['arrow-up-circle', arrowUpCircle],
    ['arrow-up-circle-outline', arrowUpCircleOutline],
    ['arrow-back-circle', arrowBackCircle],
    ['arrow-forward-circle', arrowForwardCircle],
    ['information-circle-outline', informationCircleOutline],
    ['language-outline', languageOutline],
    ['logo-github', logoGithub],
    ['mail-open-outline', mailOpenOutline],
    ['moon-outline', moonOutline],
    ['person-circle-outline', personCircleOutline],
    ['settings-outline', settingsOutline],
    ['terminal-outline', terminalOutline],
    ['trash-outline', trashOutline],
    ['chevron-back-circle', chevronBackCircle],
    ['chevron-forward-circle', chevronForwardCircle],
    ['chatbubble-ellipses-outline', chatbubbleEllipsesOutline],
    ['exit-outline', exitOutline],
  ]);

  return (
    <SvgXml
      width={size}
      height={size}
      xml={names.get(name)}
      color={color}
      fill={color}
    />
  );
};

export default Icon;
