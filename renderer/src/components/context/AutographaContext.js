/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import useProjectsSort from '../hooks/projects/useProjectsSort';
// import useScribexState from '../hooks/scribex/useScribexState';

export const AutographaContext = createContext();

const AutographaContextProvider = ({ children }) => {
  const { state, actions } = useProjectsSort();
  // const scribexState = useScribexState();

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
