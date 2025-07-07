import React, { createContext, useContext } from 'react';
import type { AppAbility } from './ability';

export const AbilityContext = createContext<AppAbility>(null as any);
export const useAbility = () => useContext(AbilityContext);
