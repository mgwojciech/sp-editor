import { Dispatch } from 'redux';
import * as rootActions from '../../../store/home/actions';
import { HomeActions, MessageBarColors } from '../../../store/home/types';
import * as actions from '../../../store/siteproperties/actions';
import { ISiteProperty, ISite, SitePropertiesActions } from '../../../store/siteproperties/types';
import { spDelay } from '../../../utilities/utilities';
import { createSiteProperty } from './createsiteproperty';
import { getSiteProperties } from './getsiteproperties';
import { getSites } from './getsites';

export async function getAllSiteProperties(dispatch: Dispatch<SitePropertiesActions | HomeActions>, siteId: string) {
  dispatch(rootActions.setLoading(true));

  chrome.scripting
    .executeScript({
      target: { tabId: chrome.devtools.inspectedWindow.tabId },
      world: 'MAIN',
      args: [siteId, chrome.runtime.getURL('')],
      func: getSiteProperties,
    })
    .then(async (injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any;
        if (res.success) {
          /* on success */
          let siteProperties: ISiteProperty[] = res.result;

          // add webproperties to state
          dispatch(actions.setAllSiteProperties(siteProperties));
          // hide loading component
          dispatch(rootActions.setLoading(false));
        } else {
          /* on error */
          // hide loading component
          dispatch(rootActions.setLoading(false));
          // show error message
          dispatch(
            rootActions.setAppMessage({
              showMessage: true,
              message: res.errorMessage,
              color: MessageBarColors.danger,
            })
          );
        }
      }
    });
}

export async function addSiteProperty(
  dispatch: Dispatch<SitePropertiesActions | HomeActions>,
  payload: ISiteProperty,
  site: ISite,
  update: boolean
) {
  // show loading spinner
  dispatch(rootActions.setLoading(true));
  // close panel
  if (update) {
    dispatch(actions.setConfirmEditDialog(true));
    dispatch(actions.setEditPanel(false));
  } else {
    dispatch(actions.setNewPanel(false));
  }

  chrome.scripting
    .executeScript({
      target: { tabId: chrome.devtools.inspectedWindow.tabId },
      world: 'MAIN',
      args: [payload, site, chrome.runtime.getURL('')],
      func: createSiteProperty,
    })
    .then(async (injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any;
        if (res.success) {
          /* on success */
          // add small delay just be sure SP can process previous requests
          await spDelay(500);
          // load all scriptlinks
          getAllSiteProperties(dispatch, site.key);
          // set success message
          dispatch(
            rootActions.setAppMessage({
              showMessage: true,
              message: !update ? 'Site Property added succesfully!' : 'Site Property updated succesfully!',
              color: MessageBarColors.success,
            })
          );
        } else {
          /* on error */
          // hide loading
          dispatch(rootActions.setLoading(false));
          // show error message
          dispatch(
            rootActions.setAppMessage({
              showMessage: true,
              message: res.errorMessage,
              color: MessageBarColors.danger,
            })
          );
        }
      }
    });
}

export async function getAllSites(
  dispatch: Dispatch<SitePropertiesActions | HomeActions>,
  queryText: string,
  selectedSite: string | undefined
) {
  dispatch(rootActions.setLoading(true));

  return chrome.scripting
    .executeScript({
      target: { tabId: chrome.devtools.inspectedWindow.tabId },
      world: 'MAIN',
      args: [queryText, chrome.runtime.getURL('')],
      func: getSites,
    })
    .then(async (injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any;
        if (res.success) {
          /* on success */
          const sites: ISite[] = res.result;
          if (sites) {
            dispatch(actions.setAllSites(sites));
            dispatch(actions.setAllSiteProperties([]));
          } else {
            dispatch(actions.setSelectedSite(undefined));
            dispatch(actions.setAllSiteProperties([]));
            dispatch(actions.setAllSites([]));
          }
          // hide loading component
          dispatch(rootActions.setLoading(false));
        } else {
          /* on error */
          // hide loading component
          dispatch(rootActions.setLoading(false));
          // show error message
          dispatch(
            rootActions.setAppMessage({
              showMessage: true,
              message: res.errorMessage,
              color: MessageBarColors.danger,
            })
          );
        }
        return res.result;
      }
    });
}
