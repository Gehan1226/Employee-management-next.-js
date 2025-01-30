import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Button } from "../table/button";
import Input from "../Input";
import { Textarea } from "../textarea";
import DropDownMenu from "../DropDownMenu";

export default function AddDepartmentModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 shadow-md"
        >
          Add Department
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form action="" className="flex flex-col gap-3">
            <Input label="Department name" id="dep-name" />
            <Textarea placeholder="Department description" id="dep-desc" />

            <DropDownMenu
              label="Gender"
              menuItems={[
                { label: "Male", id: "Male" },
                { label: "Female", id: "Female" },
              ]}
              name="gender"
            />

            <DropDownMenu
              label="Gender"
              menuItems={[
                { label: "Male", id: "Male" },
                { label: "Female", id: "Female" },
              ]}
              name="gender"
            />
          </form>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
