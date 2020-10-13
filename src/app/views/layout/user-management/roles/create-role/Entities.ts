import {EntityPermission} from './EntityPermission';

export interface Entities {
    entityId: number;
    entityName: string;
    module: string;
    entityPermision: EntityPermission[];
    ufsEntityPermissionList: EntityPermission[];
    permissions: EntityPermission[];
    checked: boolean;
    permissionId: number;
    permissionName: string;
}


