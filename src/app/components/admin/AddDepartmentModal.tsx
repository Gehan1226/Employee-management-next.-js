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
      <DialogContent className="sm:max-w-[800px] w-5/6">
        <DialogHeader>
          <DialogTitle>Create new department</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form action="" className="flex flex-col gap-3 px-4">
            <Input label="Department name" id="dep-name" />
            <Textarea placeholder="Department resposibilities" id="dep-desc" />

            <select name="" id="" className="mt-4">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </form>
        </div>
        <DialogFooter>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 shadow-md"
          >
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
