import { createContext, useContext } from 'react';
import { createMongoAbility } from '@casl/ability';
import type { AppAbility, Actions, Subjects } from './ability';

// Empty default ability
const defaultAbility = createMongoAbility<[Actions, Subjects]>([]);

export const AbilityContext = createContext<AppAbility>(defaultAbility);

export const useAbility = () => useContext(AbilityContext);
