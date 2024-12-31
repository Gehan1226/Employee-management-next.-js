import { DropDownMenuItem } from "@/app/components/DropDownMenu";
import { Department } from "@/app/types/response-types";

export const mapDepartmentToDropdownItem = (departments: Department[]): DropDownMenuItem[] => {
    return departments.map((department) => {
        return { label: department.name, id: department.id.toString() }
    });
}

export const mapRoleToDropdownItem = (roles: string[]): DropDownMenuItem[] => {
    return roles.map((role) => {
        return { label: role, id: role }
    });
}