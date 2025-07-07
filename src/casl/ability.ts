// src/casl/ability.ts
import { AbilityBuilder, createMongoAbility, MongoAbility } from '@casl/ability';

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete' | 'view';
export type Subjects = 'dashboard' | 'user' | 'event' | 'group' | 'all';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

interface Permission {
  action: Actions;
  subject: Subjects;
  conditions?: any;
}

export function defineAbilityFor(
  roles: string[],
  permissionsFromAPI: Permission[],
): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (roles.includes('admin')) {
    // Admin: full access to everything
    can('manage', 'all');
  } else {
    // User: define abilities from API permissions
    permissionsFromAPI.forEach((perm) => {
      if (perm.conditions) {
        can(perm.action, perm.subject, perm.conditions);
      } else {
        can(perm.action, perm.subject);
      }
    });
  }

  return build();
}
