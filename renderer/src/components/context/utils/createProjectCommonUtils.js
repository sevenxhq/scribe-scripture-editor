import PropTypes from 'prop-types';
import * as logger from '../../../logger';
import { updateJson } from './updateJson';
import { uniqueId } from './uniqueId';

export const createProjectCommonUtils = async ({
  language,
  customLanguages,
  copyright,
  licenceList,
  setCopyRight,
  canonSpecification,
  setUsername,
  setLicenseList,
  setCanonList,
  setLanguages,
  setCustomLanguages,
}) => {
  logger.debug('ProjectContext.js', 'In createProject common utils');
  if (language?.id) {
    // /check lang exist in backend and check any field value changed
    if (uniqueId(customLanguages, language.id)) {
      customLanguages.forEach(async (lang) => {
        if (lang.id === language.id) {
          if (
            lang.ang !== language.ang
            || lang.ld !== language.ld
            || lang.lc !== language.lc
          ) {
            await updateJson({
              currentSettings: 'languages',
              setUsername,
              copyright,
              language,
              canonSpecification,
              setLicenseList,
              setCanonList,
              setLanguages,
              setCustomLanguages,
            });
          }
        }
      });
    } else {
      // add language to custom
      await updateJson({
        currentSettings: 'languages',
        setUsername,
        copyright,
        language,
        canonSpecification,
        setLicenseList,
        setCanonList,
        setLanguages,
        setCustomLanguages,
      });
    }
  }
  // Update Custom licence into current list.
  if (copyright.title === 'Custom') {
    await updateJson({
      currentSettings: 'copyright',
      setUsername,
      copyright,
      language,
      canonSpecification,
      setLicenseList,
      setCanonList,
      setLanguages,
      setCustomLanguages,
    });
  } else {
    const myLicence = Array.isArray(licenceList)
      ? licenceList.find((item) => item.title === copyright.title)
      : [];
    // eslint-disable-next-line import/no-dynamic-require
    const licensefile = require(`../../../lib/license/${copyright.title}.md`);
    myLicence.licence = licensefile.default;
    setCopyRight(myLicence);
  }
};

createProjectCommonUtils.propTypes = {
  language: PropTypes.object,
  customLanguages: PropTypes.array,
  licenceList: PropTypes.array,
  setCopyRight: PropTypes.func,
  canonSpecification: PropTypes.object,
  setUsername: PropTypes.func,
};
