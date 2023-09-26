import React from 'react';
import SearchForm from '../../Search/SearchForm';
import { AutographaContext } from '../../context/AutographaContext';

const SearchData = () => {
  const filterList = ['name', 'language', 'date', 'view'];
  const {
    states: {
      // starredProjects,
      // unstarredProjects,
      projects,
    },
    action: {
      setProjects,
    },
  } = React.useContext(AutographaContext);

  return (
    <div>
      <SearchForm
        contentList1={projects}
        contentList2={projects}
        filterList={filterList}
        onfilerRequest={setProjects}
        onfilerRequest2={setProjects}
      />
    </div>
  );
};

export default SearchData;
