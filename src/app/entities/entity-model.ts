import {EntityPermission} from './entity-permission-model';

export class Entity {
    module: string;
    ufsEntityPermissionList: EntityPermission[]
    permissions: EntityPermission[]
    entityId: number;
    entityName: string;
    permissionId: number;
    permissionName: string;
}
