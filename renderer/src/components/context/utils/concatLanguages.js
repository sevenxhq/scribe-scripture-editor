export const concatLanguages = async (json, staicLangJson) => {
  const userlanguages = [];
  json.history?.languages?.forEach((userLang) => {
    const obj = {};
    obj.id = userLang?.id || null;
    obj.ang = userLang.title;
    obj.ld = userLang.scriptDirection;
    obj.custom = userLang?.custom || true;
    obj.lc = userLang?.langCode || '';
    userlanguages.push(obj);
  });
  const concatedLang = userlanguages.length > 0
    ? (staicLangJson)
      .concat(userlanguages)
    : staicLangJson;
  return { concatedLang, userlanguages };
};
