import { DropDownMenuItem } from "@/components/DropDownMenu";
import { DepartmentResponse, RoleResponse } from "@/types/department-roles";

export const mapDepartmentToDropdownItem = (departments: DepartmentResponse[]): DropDownMenuItem[] => {
    return departments.map((department) => {
        return { label: department.name, id: department.id.toString() }
    });
}

export const mapRoleToDropdownItem = (roles: RoleResponse[]): DropDownMenuItem[] => {
    return roles.map((role) => {
        return { label: role.name, id: role.id.toString() }
    });
}