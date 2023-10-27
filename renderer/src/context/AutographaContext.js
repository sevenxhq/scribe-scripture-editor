/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import PropTypes from 'prop-types';
import useProjectsSort from '../components/hooks/projects/useProjectsSort';
// import useScribexState from '../hooks/scribex/useScribexState';
// /home/samueljohn/projects/scribe-scripture-editor/renderer/src/components/hooks/projects/useProjectsSort.js

export const AutographaContext = React.createContext();

const AutographaContextProvider = ({ children }) => {
  const { state, actions } = useProjectsSort();

  const context = {
    states: state,
    action: actions,
  };

  return (
    <AutographaContext.Provider value={context}>
      {children}
    </AutographaContext.Provider>
  );
};
export default AutographaContextProvider;
AutographaContextProvider.propTypes = {
  children: PropTypes.node,
};
